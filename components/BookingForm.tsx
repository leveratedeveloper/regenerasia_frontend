"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { postBooking } from "@/lib/api";
import { Section } from "@/components/SessionDetail";

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

type BookingFormData = z.infer<typeof bookingSchema>;

const Checkbox: React.FC<{
  label: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  value?: string;
}> = ({ label, checked, onChange, name, value }) => (
  <label className="flex items-center space-x-3 cursor-pointer">
    <input type="checkbox" name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
    <div
      className={`w-5 h-5 border-2 rounded flex-shrink-0 flex items-center justify-center transition-colors ${
        checked ? "bg-green-800 border-green-800" : "border-gray-300"
      }`}
    >
      {checked && (
        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
        </svg>
      )}
    </div>
    <span className="text-sm text-black">{label}</span>
  </label>
);

const InputField: React.FC<any> = ({ label, placeholder, type = "text", ...rest }) => (
  <div>
    <label className="block text-sm font-medium text-gray-800 mb-1">{label} <span className="text-red-500 ml-1">*</span></label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-800 focus:border-green-800 transition bg-white text-black"
      {...rest}
    />
  </div>
);

const DEFAULT_SAFETY_ITEMS: Array<{ item: string }> = [
  { item: "Anyone with built-in functioning electrical devices (e.g. pacemakers, hearing aids, implanted drug pumps, etc.)." },
  { item: "Pregnant or breastfeeding women." },
  { item: "Active lesions preclude treatment." },
  { item: "Severe illness contraindicates service." },
  { item: "Children under 17 years old." },
  { item: "Persons over 150 kg body weight." },
  { item: "Prohibited for patients with electrical, magnetic, or mechanical implants." },
  { item: "Those suffering from epileptic seizures." },
];

interface BookingFormProps {
  safetyTitle?: string;
  safetyLead?: string;
  safetyItems?: Array<{ item: string }>;
  safetyCheckboxLabel?: string;
  submitButtonText?: string;
}

const BookingForm: React.FC<BookingFormProps> = ({
  safetyTitle = "Safety guidelines",
  safetyLead = "For your safety, do not continue the therapy if you are:",
  safetyItems,
  safetyCheckboxLabel = "I have read the safety guidelines and confirm that I do not have the conditions listed above.",
  submitButtonText = "Submit",
}) => {
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
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

  const items = safetyItems && safetyItems.length > 0 ? safetyItems : DEFAULT_SAFETY_ITEMS;

  const onSubmit = async (data: BookingFormData) => {
    setSubmissionStatus("loading");
    const payload = {
      name:               data.fullName,
      email:              data.email,
      phone:              data.phone,
      contact_by:         data.contactBy || [],
      notes:              data.concern || "",
      safety_guidelines:  data.safetyGuidelines ? 1 : 0,
    };
    try {
      await postBooking(payload);
      sessionStorage.setItem("formSuccess", "true");
      sessionStorage.setItem("formType", "booking");
      router.push("/success");
      setSubmissionStatus("success");
    } catch (error) {
      console.error("Booking failed:", error);
      setSubmissionStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-12 bg-white text-black p-6 md:p-12 rounded-lg shadow-sm"
    >
      {/* Personal Detail */}
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
              {["whatsapp", "phone"].map((option) => (
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

      {/* Safety Guidelines */}
      <div className="space-y-4 bg-green-50 p-6 rounded-lg border border-green-200 text-black">
        <h4 className="text-xl text-green-900">{safetyTitle}</h4>
        <p className="text-sm text-gray-700">{safetyLead}</p>

        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          {items.map((it, i) => (
            <li key={i}>{it.item}</li>
          ))}
        </ul>

        <Controller
          name="safetyGuidelines"
          control={control}
          render={({ field }) => (
            <Checkbox
              label={safetyCheckboxLabel}
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          )}
        />
        {errors.safetyGuidelines && (
          <p className="text-red-500 text-sm">{errors.safetyGuidelines.message}</p>
        )}
      </div>

      {/* Submit */}
      <div className="text-center">
        <button
          type="submit"
          className="font-semibold disabled:opacity-50 mt-6 bg-green-900 text-white px-6 py-2 hover:bg-green-800 transition rounded-xl"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : submitButtonText}
        </button>
        {submissionStatus === "error" && (
          <p className="text-red-500 text-sm mt-2">Something went wrong. Please try again.</p>
        )}
      </div>
    </form>
  );
};

export default BookingForm;
