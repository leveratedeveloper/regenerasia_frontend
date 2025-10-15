"use client";

import React, { useState } from 'react';
import { useForm,Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const bookingSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  contactBy: z.array(z.string()).min(1, { message: "Please select a contact method" }),
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

const Section: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
  <div className={`p-8 border border-gray-200 rounded-lg bg-white text-black ${className}`}>
    <h3 className="text-2xl font-serif text-black mb-6">{title}</h3>
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
  selectedValue: number;
  onChange: (value: number) => void;
}> = ({ value, label, duration, selectedValue, onChange }) => (
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
  </label>
);

type BookingFormData = z.infer<typeof bookingSchema>;

const BookingForm: React.FC = () => {
  const [sessionPackage, setSessionPackage] = useState<number>(1);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [date, setDate] = useState<Date | null>(null);

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

  const contactBy = watch("contactBy");
  const safetyGuidelines = watch("safetyGuidelines");

  const onSubmit = async (data: BookingFormData) => {
    setSubmissionStatus('loading');
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // simulate API
      console.log(data);
      setSubmissionStatus('success');
    } catch {
      setSubmissionStatus('error');
    }
  };

  if (submissionStatus === 'success') {
    return (
      <div className="text-center p-12 bg-white text-black">
        <h2 className="text-2xl font-bold mb-4">Thank you!</h2>
        <p>Your booking has been submitted successfully.</p>
      </div>
    );
  }

  const today = new Date();
  const threeDaysLater = new Date();
  threeDaysLater.setDate(today.getDate() + 3);

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
            <label className="block text-sm font-medium text-gray-800 mb-2">I want to be contacted by</label>
            <div className="flex space-x-6">
              <Checkbox label="Whatsapp" value="whatsapp" checked={!!contactBy?.includes("whatsapp")} {...register("contactBy")} />
              <Checkbox label="Email" value="email" checked={!!contactBy?.includes("email")} {...register("contactBy")} />
              <Checkbox label="Phone" value="phone" checked={!!contactBy?.includes("phone")} {...register("contactBy")} />
            </div>
            {errors.contactBy && <p className="text-red-500 text-sm">{errors.contactBy.message}</p>}
          </div>
        </div>
      </Section>

      <Section title="Session Detail">
        <label className="block text-sm font-medium text-gray-800 mb-3">
          How many sessions do you want to book?
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <SessionPackageRadio value={1} label="1 Session" duration="30 Minutes/Session" selectedValue={sessionPackage} onChange={setSessionPackage} />
          <SessionPackageRadio value={5} label="5 Sessions" duration="30 Minutes/Session" selectedValue={sessionPackage} onChange={setSessionPackage} />
          <SessionPackageRadio value={10} label="10 Sessions" duration="30 Minutes/Session" selectedValue={sessionPackage} onChange={setSessionPackage} />
        </div>

        <div className="space-y-4 mb-8">
          {Array.from({ length: sessionPackage }, (_, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-800 mb-1">Session {i + 1}</label>
              </div>

              <div className="md:col-span-1">
                <label className="block text-xs font-medium text-gray-500 mb-1">Date</label>
                <div
                  className={`rounded-md transition duration-200 ${
                    isBlockedDate(date) ? "border-2 border-red-500 p-[1px]" : "border border-gray-300"
                  }`}
                >
                  <DatePicker
                    selected={date}
                    onChange={(d) => setDate(d)}
                    minDate={threeDaysLater}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="dd/mm/yyyy"
                    className="w-full px-4 py-2 rounded-md bg-white text-black focus:outline-none"
                    dayClassName={(d: Date) =>
                      blockedDates.includes(d.toDateString())
                        ? "bg-red-100 text-red-600 font-semibold rounded-full"
                        : ""
                    }
                  />
                </div>
              </div>

              <div className="md:col-span-1">
                <label className="block text-xs font-medium text-gray-500 mb-1">Time</label>
                <input
                  type="time"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-800 focus:border-green-800 transition bg-white text-black"
                />
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
          />
        </div>
      </Section>

      <div className="space-y-4 bg-green-50 p-6 rounded-lg border border-green-200 text-black">
        <h4 className="text-xl font-serif text-green-900">Safety guidelines</h4>
        <p className="text-sm text-gray-700">
          For your safety, do not continue the therapy if you are:
        </p>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          <li>Anyone with built-in functioning electrical devices (e.g. pacemakers, hearing aids, implanted drug pumps, etc.)</li>
          <li>Pregnant or breastfeeding women</li>
          <li>Children under 12 years old</li>
          <li>Persons over 150 kg body weight</li>
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
          className="font-semibold disabled:opacity-50 mt-6 bg-green-900 text-white px-6 py-2 hover:bg-green-800 transition"
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
