"use client";

import { useRouter,useSearchParams } from "next/navigation";
import React, { useState,useEffect } from 'react';
import { useForm,Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { postBooking } from "@/lib/api";

const bookingSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  contactBy: z.array(z.string()).min(1, { message: "Please select a contact method" }),
  concern: z.string().optional(),
  safetyGuidelines: z.boolean().refine((val) => val === true, {
    message: "You must agree to the safety guidelines",
  }),
});

const Checkbox: React.FC<{
  label: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  value?: string;
}> = ({ label, checked, onChange, name, value }) => (
  <label className="flex items-center space-x-3 cursor-pointer">
    <input
      type="checkbox"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      className="sr-only"
    />
    <div
      className={`w-5 h-5 border-2 rounded flex-shrink-0 flex items-center justify-center transition-colors ${
        checked ? "bg-green-800 border-green-800" : "border-gray-300"
      }`}
    >
      {checked && (
        <svg
          className="w-3 h-3 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
      )}
    </div>
    <span className="text-sm text-black">{label}</span>
  </label>
);

const Section: React.FC<{  id?: string; title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
  <div className={`p-8 border border-gray-200 rounded-lg bg-white text-black ${className}`}>
    <h3 className="text-2xl text-black mb-6">{title}</h3>
    {children}
  </div>
);

const InputField: React.FC<any> = ({ label, placeholder, type = "text", containerClassName = "", ...rest }) => (
  <div className={containerClassName}>
    <label className="block text-sm font-medium text-gray-800 mb-1">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-800 focus:border-green-800 transition bg-white text-black"
      {...rest}
    />
  </div>
);

const SessionPackageRadio: React.FC<{
  value: number;
  label: string;
  duration: string;
  price: string;
  selectedValue: number;
  onChange: (value: number) => void;
}> = ({ value, label, duration, price, selectedValue, onChange }) => (
  <label
    className={`p-4 rounded-lg text-center cursor-pointer transition-all duration-200 bg-white text-black ${
      selectedValue === value
        ? 'border-2 border-green-800 bg-green-50 shadow-md'
        : 'border border-gray-300 hover:border-green-800/60'
    }`}
  >
    <input
      type="radio"
      name="sessionPackage"
      value={value}
      checked={selectedValue === value}
      onChange={() => onChange(value)}
      className="sr-only"
    />
    <div className="font-bold text-lg">{label}</div>
    <div className="text-sm text-gray-600">{duration}</div>
    <div className="text-sm text-gray-600">{price}</div>
  </label>
);

type BookingFormData = z.infer<typeof bookingSchema>;

const BookingForm: React.FC = () => {
  const [sessionPackage, setSessionPackage] = useState<number>(1);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [dates, setDates] = useState<(Date | null)[]>([]);
  const [appointmentTimes, setAppointmentTimes] = useState<string[]>([]);
  const searchParams = useSearchParams();
 

  useEffect(() => {
    const pkg = Number(searchParams.get("package"));
    if (pkg === 1 || pkg === 5 || pkg === 10) {
      setSessionPackage(pkg);
    }
  }, [searchParams]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      contactBy: ["whatsapp"],
      safetyGuidelines: false,
    },
  });

  const router = useRouter();

  const onSubmit = async (data: BookingFormData) => {
    setSubmissionStatus('loading');

    // 1. Prepare payload that matches your backend
    const payload = {
      name: data.fullName,
      email: data.email,
      phone: data.phone,
      service_type: data.contactBy || [],
      session_package: sessionPackage ?? 1,
      session: dates.map((d, i) =>
        d ? `${d.toISOString().split("T")[0]} : ${appointmentTimes[i] || "09:00"}` : null
      ),  
      appointment_date: dates[0] ? dates[0].toISOString() : null, // use first session date as main
      appointment_time: appointmentTimes[0] || null, // use first session time as main
      notes: data.concern || "",
      safety_guidelines: data.safetyGuidelines ? 1 : 0,
    };

    try {
      const result = await postBooking({
        ...payload,
        sessionPackage,
        date: dates.filter(Boolean).map((d) => d!.toISOString()),
      });

      if (result.status === "success") {
        console.log("✅ Booking created:", result.data);
        sessionStorage.setItem("formSuccess", "true");
        // Redirect to success page
        router.push("/success");
        setSubmissionStatus("success");
      } else {
        console.warn("⚠️ Booking failed:", result.message);
        setSubmissionStatus("error");
      }
    } catch (error) {
      console.error(" Failed:", error);
      setSubmissionStatus("error");
    }
  };

  const today = new Date();
  const threeDaysLater = new Date();
  threeDaysLater.setDate(today.getDate() + 1);

  const blockedDates = Array.from({ length: 3 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i + 1);
    return d.toDateString();
  });

  const isBlockedDate = (d: Date | null) =>
    !!d && blockedDates.includes(d.toDateString());

  
  
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-12 bg-white text-black p-6 md:p-12 rounded-lg shadow-sm"
    >
      <Section title="Personal Detail">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 md:col-span-2">
            <InputField label="Your full name" placeholder="Insert your full name" {...register("fullName")} />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}

            <InputField label="Email address" placeholder="Insert your business email" type="email" {...register("email")} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

            <InputField label="Phone number" placeholder="+62 | 8123412345" type="tel" {...register("phone")} />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>

          <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            I want to be contacted by
            <span className="text-red-500 ml-1">*</span>
          </label>
            <div className="flex flex-col md:flex-row md:space-x-6 space-y-3 md:space-y-0">
              {["whatsapp", "email", "phone"].map((option) => (
                <Controller
                  key={option}
                  name="contactBy"
                  control={control}
                  render={({ field }) => {
                    const selected = field.value || [];
                    const checked = selected.includes(option);

                    return (
                      <Checkbox
                        label={option.charAt(0).toUpperCase() + option.slice(1)}
                        value={option}
                        checked={checked}
                        onChange={(e) => {
                          if (e.target.checked) {
                            field.onChange([...selected, option]);
                          } else {
                            field.onChange(selected.filter((v) => v !== option));
                          }
                        }}
                      />
                    );
                  }}
                />
              ))}
            </div>

            {errors.contactBy && (
              <p className="text-red-500 text-sm">{errors.contactBy.message}</p>
            )}
          </div>

        </div>
      </Section>

      <Section id="session-detail" title="Session Detail">
        <label className="block text-sm font-medium text-gray-800 mb-3">
          How many sessions do you want to book?
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <SessionPackageRadio value={1} label="1 Session" duration="30 Minutes/Session" price="Rp. 5.000.000" selectedValue={sessionPackage} onChange={setSessionPackage} />
          <SessionPackageRadio value={5} label="5 Sessions" duration="30 Minutes/Session" price="Rp. 20.000.000" selectedValue={sessionPackage} onChange={setSessionPackage} />
          <SessionPackageRadio value={10} label="10 Sessions" duration="30 Minutes/Session" price="Rp. 40.000.000" selectedValue={sessionPackage} onChange={setSessionPackage} />
        </div>

        <div className="space-y-4 mb-8">
        {Array.from({ length: sessionPackage }, (_, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Session {i + 1}
              {i === 0 && <span className="text-red-500 ml-1">(*)</span>}
            </label>

            {i > 0 && (
              <div className="text-xs text-gray-500 italic">
                Optional
              </div>
            )}
            </div>

            {/* Date Picker */}
            <div className="md:col-span-1">
              <label className="block text-xs font-medium text-gray-500 mb-1">Date</label>
              <div
                className={`rounded-md transition duration-200 ${
                  dates[i] && isBlockedDate(dates[i])
                    ? "border-2 p-[1px]"
                    : "border border-gray-300"
                }`}
              >
                <DatePicker
                  selected={dates[i] || null}
                  onChange={(d) => {
                    const newDates = [...dates];
                    newDates[i] = d;
                    setDates(newDates);
                  }}
                  minDate={threeDaysLater}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="dd/mm/yyyy"
                  className="w-full px-4 py-2 rounded-md bg-white text-black focus:outline-none"
                />
              </div>
            </div>

           {/* Time Picker */}
            <div className="md:col-span-1">
              <label className="block text-xs font-medium text-gray-500 mb-1">Time</label>
              <select
                name={`appointment_time_${i}`}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-800 focus:border-green-800 transition bg-white text-black"
                value={appointmentTimes[i] || "09:00"}
                onChange={(e) => {
                  const newTimes = [...appointmentTimes];
                  newTimes[i] = e.target.value;
                  setAppointmentTimes(newTimes);
                }}
              >
               {/* Generate time options from 09:00 to 23:00, every 2 hours */}
                {Array.from({ length: 7 }, (v, k) => (k * 2) + 9).map((hour) => {
                  const time = `${String(hour).padStart(2, "0")}:00`;
                  return (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        ))}

        </div>

        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Please let us know your concern so we can assist you.
          </label>
          <textarea
            rows={4}
            className="w-full p-4 border border-gray-300 rounded-md focus:ring-green-800 focus:border-green-800 transition bg-white text-black"
            {...register("concern")}
          />
        </div>
      </Section>

      <div className="space-y-4 bg-green-50 p-6 rounded-lg border border-green-200 text-black">
        <h4 className="text-xl text-green-900">Safety guidelines</h4>
        <p className="text-sm text-gray-700">
          For your safety, do not continue the therapy if you are:
        </p>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          <li>Anyone with built-in functioning electrical devices (e.g. pacemakers, hearing aids, implanted drug pumps, etc.)</li>
          <li>Pregnant or breastfeeding women</li>
          <li>Active lesions preclude treatment</li>
          <li>Severe illness contraindicates service</li>
          <li>Children under 17 years old</li>
          <li>Persons over 150 kg body weight</li>
          <li>Prohibited for patients with electrical, magnetic, or mechanical implants</li>
          <li>Those suffering from epileptic seizures</li>
        </ul>

        <Controller
          name="safetyGuidelines"
          control={control}
          render={({ field }) => (
            <Checkbox
              label="I have read the safety guidelines and confirm that I do not have the conditions listed above."
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          )}
        />

        {errors.safetyGuidelines && (
          <p className="text-red-500 text-sm">{errors.safetyGuidelines.message}</p>
        )}
      </div>


      <div className="text-center">
        <button
          type="submit"
          className="font-semibold disabled:opacity-50 mt-6 bg-green-900 text-white px-6 py-2 hover:bg-green-800 transition rounded-xl"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
        {submissionStatus === 'error' && (
          <p className="text-red-500 text-sm mt-2">Something went wrong. Please try again.</p>
        )}
      </div>
    </form>
  );
};

export default BookingForm;
