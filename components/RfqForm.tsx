"use client";

import React, { useState,useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Paperclip } from 'lucide-react';
import { postRfq } from "@/lib/api";
import { useRouter } from 'next/navigation'; // <-- 1. IMPORT ROUTER

// --- ZOD SCHEMA (Unchanged) ---
const rfqSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required" }),
  company: z.string().optional(),
  position: z.string().min(1, { message: "Position is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  country: z.string().optional(),
  city: z.string().min(1, { message: "City is required" }),
  businessSegment: z.string().min(1, { message: "Business segment is required" }),
  note: z.string().optional(),
  sameAsShippingAddress: z.boolean(),
  contactBy: z.array(z.string()).min(1, { message: "Please select a contact method" }),
  installationSupport: z.boolean(),
  moreThanOneYearWarranty: z.boolean(),
  technicalTraining: z.boolean(),
  purpose: z.string().optional(),
  paymentTerms: z.string().optional(),
  confirmInformation: z.boolean().refine((val) => val === true, {
    message: "You must confirm the information is accurate",
  }),
  agreeToCommunications: z.boolean().refine((val) => val === true, {
    message: "You must agree to receive communications",
  }),
});

// --- INTERFACES & MOCK COMPONENTS (Unchanged) ---
export interface ProductItem {
  id: number;
  name: string;
  qty: number;
  basePrice: number;
  budget: number;
  warranty: boolean;
  request: string;
  image: string;
  selected: boolean;
}

const Checkbox: React.FC<any> = ({ label, checked, onChange, name, value, ...rest }) => (
  <label className="flex items-center space-x-3 cursor-pointer">
    <input
      type="checkbox"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      className="sr-only"
      {...rest}
    />
    <div
      className={`w-5 h-5 border-2 rounded flex-shrink-0 flex items-center justify-center transition-colors ${
        checked
          ? "bg-brand-primary border-brand-primary"
          : "border-gray-300"
      }`}
    >
      {checked && (
        <svg
          className="w-3 h-3 text-dark"
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
    <span className="text-sm">{label}</span>
  </label>
);

const Section: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
  <div className={`mb-10 ${className}`}>
    <h3 className="text-2xl text-brand-text pb-3 mb-6">{title}</h3>
    {children}
  </div>
);

const InputField: React.FC<any> = ({ label, placeholder, type = "text", required, containerClassName = "", ...rest }) => (
  <div className={containerClassName}>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input type={type} placeholder={placeholder} className="w-full px-4 py-2 border border-brand-border rounded-md focus:ring-brand-primary focus:border-brand-primary transition" {...rest} />
  </div>
);

const Textarea: React.FC<any> = ({
    label,
    placeholder,
    containerClassName = "",
    required,
    ...rest
  }) => (
    <div className={containerClassName}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-brand-border rounded-md focus:ring-brand-primary focus:border-brand-primary transition h-28"
        {...rest}
      ></textarea>
    </div>
  );

const SelectField: React.FC<any> = ({ label, placeholder, options, required, containerClassName = "", ...rest }) => (
  <div className={containerClassName}>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select className="w-full px-4 py-2 border border-brand-border rounded-md focus:ring-brand-primary focus:border-brand-primary transition bg-white appearance-none" {...rest}>
      <option value="">{placeholder}</option>
      {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

// --- TYPES & INITIAL DATA (Unchanged) ---
type RfqFormData = z.infer<typeof rfqSchema>;
 const initialProducts: ProductItem[] = [
    {
      id: 1,
      name: "Human Regenerator Power Jet",
      qty: 1,
      basePrice: 4600000000,
      budget: 4600000000,
      warranty: true,
      request: 'It has to consider allergic response of "illness type-A"',
      image: "/image/machine.jpg",
      selected: false,
    },
  ];

  

interface RfqFormProps {
  partnershipTitle?: string;
  partnershipQuote?: string;
  partnershipBullets?: Array<{ text: string }>;
  productImage1?: string;
  productImage2?: string;
  productDimension?: string;
  submitButtonText?: string;
  termsConfirmLabel?: string;
  termsCommsLabel?: string;
  footerText?: string;
}

// --- MAIN RFQ FORM COMPONENT ---
const RfqForm: React.FC<RfqFormProps> = ({
  partnershipTitle,
  partnershipQuote,
  partnershipBullets,
  productImage1,
  productImage2,
  productDimension,
  submitButtonText,
  termsConfirmLabel,
  termsCommsLabel,
  footerText,
}) => {
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [products, setProducts] = useState<ProductItem[]>(initialProducts);
  const [selectedDateShipment, setSelectedDate] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<RfqFormData>({
    resolver: zodResolver(rfqSchema),
    defaultValues: {
        installationSupport: true,
        moreThanOneYearWarranty: false,
        technicalTraining: true,
        sameAsShippingAddress: false,
        contactBy: ["email"],
        confirmInformation: true,
        agreeToCommunications: true,
    },
  });
 
  // Watch values for controlled checkboxes (unchanged)
  const contactBy = watch("contactBy");
  const confirmInformation = watch("confirmInformation");
  const agreeToCommunications = watch("agreeToCommunications");
  const router = useRouter();

  const onSubmit = async (data: RfqFormData) => {
    setSubmissionStatus('loading');

    const selectedProductsList = products
      .filter(p => p.selected)
      .map(p => ({ name: p.name, qty: p.qty, budget: p.budget, warranty: p.warranty, request: p.request }));

    const formData = new FormData();
    formData.append('full_name', data.fullName);
    formData.append('company', data.company ?? '');
    formData.append('position', data.position);
    formData.append('email', data.email);
    formData.append('country', data.country ?? '');
    formData.append('city', data.city);
    formData.append('delivery_address', data.businessSegment);
    formData.append('note', data.note ?? '');
    formData.append('same_as_shipping_address', data.sameAsShippingAddress ? '1' : '0');
    formData.append('contact_by', JSON.stringify(data.contactBy));
    formData.append('delivery_required_date', selectedDateShipment);
    formData.append('installation_support', data.installationSupport ? '1' : '0');
    formData.append('more_than_one_year_warranty', data.moreThanOneYearWarranty ? '1' : '0');
    formData.append('technical_training', data.technicalTraining ? '1' : '0');
    formData.append('purpose', data.purpose ?? '');
    formData.append('payment_terms', data.paymentTerms ?? '');
    formData.append('products', JSON.stringify(selectedProductsList));
    formData.append('confirm_information', data.confirmInformation ? '1' : '0');
    formData.append('agree_to_communications', data.agreeToCommunications ? '1' : '0');
    if (file) formData.append('attachment', file);

    try {
      await postRfq(formData);
      sessionStorage.setItem("formSuccess", "true");
      sessionStorage.setItem("formType", "rfq");
      router.push("/success");
      setSubmissionStatus("success");
    } catch (error) {
      console.error("RFQ submission failed:", error);
      setSubmissionStatus("error");
    }
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };


  const formatIDR = (value: number) =>
    isNaN(value) ? "0" : new Intl.NumberFormat("id-ID").format(value);

  const desktopImages = [
    productImage1 ?? '/image/bussines/desktop_photo/1.png',
    productImage2 ?? '/image/bussines/desktop_photo/2.png',
  ].filter(Boolean) as string[];

  const dimension      = productDimension   ?? "250CM X 235CM X 130CM";
  const pTitle         = partnershipTitle   ?? "Partnership opportunities . Indonesia's first CAP+ provider";
  const pQuote         = partnershipQuote   ?? '"The state-of-the-art non-invasive regenerative technology. Now, in Indonesia" in your business.';
  const pBullets       = (Array.isArray(partnershipBullets) && partnershipBullets.length > 0)
    ? partnershipBullets
    : [
        { text: "A new treatment category. Be the first-mover to partner with Regenerasia." },
        { text: "Zero recovery time for patients means higher treatment throughput and lower scheduling friction." },
        { text: "The treatment your guests have been flying to Europe for. A genuine differentiator for your clientele." },
        { text: "Fill in the form and our Business Development team will respond within one business day with a tailored proposal for your business." },
      ];
  const btnText        = submitButtonText   ?? "Request a partnership proposal";
  const confirmLabel   = termsConfirmLabel  ?? "I confirm that the information provided is accurate and I am authorized to request a quotation.";
  const commsLabel     = termsCommsLabel    ?? "I agree to receive communications (SMS, Email, Whatsapp) regarding booking confirmation and reminders.";
  const footer         = footerText         ?? "© 2026 Human Regenerator • Future of Wellness";
  // --- JSX (Unchanged) ---
  return (
    <div className="min-h-screen bg-white">
    {/* Container with relative/flex structure for sticky behavior */}
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row items-start gap-12"
    >
      
      {/* ============================================================
          LEFT SECTION: STICKY IMAGES (Visible on Desktop)
          ============================================================ */}
     <div className="w-full lg:w-[55%] xl:w-[50%] lg:sticky lg:top-24 flex flex-col gap-8">
        <Section title="" className="lg:border-none">
          {/* On Mobile: Single stacked image or vertical list as requested */}
          <div className="space-y-2">
            {desktopImages.map((src, index) => (
              <div key={index} className="overflow-hidden rounded-xl shadow-lg group">
                <img 
                  src={src} 
                  alt={`Product view ${index + 1}`} 
                  className="w-full  aspect-[4/3] md:aspect-video  object-cover transform group-hover:scale-105 transition duration-500"
                />
              </div>
            ))}
          </div>
          
          {/* Dimension Info (Always attached to images on desktop side) */}
          <div className="mt-2 pt-2 border-t border-gray-100 hidden lg:block">
            <p className="font-bold text-gray-800 text-sm">
              DIMENSION: <span className="text-blue-600 font-mono">{dimension}</span>
            </p>
          </div>
        </Section>
      </div>

      {/* ============================================================
          RIGHT SECTION: SCROLLABLE FORM & CONTENT
          ============================================================ */}
      <div className="w-full lg:w-[45%] xl:w-[50%] space-y-14">
        
        {/* 1. PRODUCT DESCRIPTION SECTION */}
        <div className="text-left animate-in fade-in duration-700">
          <h2 className="text-1xl md:text-2xl font-bold font-alta mb-6 leading-tight text-gray-900">
            {pTitle}
          </h2>

          <p className="text-xl mb-8 text-gray-600 font-hevaltica leading-relaxed border-l-4 border-green-800 pl-4">
            {pQuote}
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 font-hevaltica gap-x-8 gap-y-3 list-disc list-inside text-gray-700 mb-8">
            {pBullets.map((b, i) => (
              <li key={i}>{b.text}</li>
            ))}
          </ul>
        </div>

        {/* 2. BUYER DETAIL SECTION */}
        <Section title="Detail Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LEFT COLUMN FIELDS */}
            <div className="space-y-6">
              <InputField
                label="Your full name"
                placeholder="Insert your full name"
                required
                {...register("fullName", { required: "Full name is required" })}
              />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}

              <SelectField
                label="Position / Job title"
                placeholder="Select job title"
                required
                options={["Manager", "Director", "Specialist", "Owner"]}
                {...register("position", { required: "Position is required" })}
              />
              {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position.message}</p>}

              <InputField
                label="Email address"
                placeholder="Insert your business email"
                type="email"
                required
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}

              <InputField
                label={<>Country <span className="text-gray-400 font-normal">(Optional)</span></>}
                placeholder="Select country"
                {...register("country")}
              />

              <InputField
                label="City"
                placeholder="Select city"
                required
                {...register("city", { required: "City is required" })}
              />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
            </div>

            {/* RIGHT COLUMN FIELDS */}
            <div className="space-y-6">
              <SelectField
                label="Business Segment "
                placeholder="Select business segment"
                required
                options={["Hotel", "Spa", "Clinic", "Resort", "Other"]}
                {...register("businessSegment", { required: "Business segment is required" })}
              />
              {errors.businessSegment && <p className="text-red-500 text-xs mt-1">{errors.businessSegment.message}</p>}

              
              <div className="pt-2">
                <label className="block text-sm font-semibold text-gray-800 mb-4">
                  Preferred Contact Method
                </label>
                <div className="flex flex-wrap gap-x-6 gap-y-4">
                  <Checkbox
                    label="Whatsapp"
                    value="whatsapp"
                    checked={contactBy?.includes("whatsapp")}
                    {...register("contactBy", { required: "Select at least one method" })}
                  />
                  <Checkbox
                    label="Email"
                    value="email"
                    checked={contactBy?.includes("email")}
                    {...register("contactBy")}
                  />
                  <Checkbox
                    label="Phone Call"
                    value="phone"
                    checked={contactBy?.includes("phone")}
                    {...register("contactBy")}
                  />
                </div>
                {errors.contactBy && <p className="text-red-500 text-xs mt-2">{errors.contactBy.message}</p>}
              </div>
            </div>
          </div>
        </Section>

        {/* 3. TERMS & AGREEMENT SECTION */}
        <Section title="Terms & Agreement">
          <div className="space-y-6 bg-gray-50 p-8 rounded-2xl border border-gray-100">
            <Checkbox
              label={confirmLabel}
              checked={confirmInformation}
              {...register("confirmInformation", { required: "Must confirm information" })}
            />
            {errors.confirmInformation && <p className="text-red-500 text-xs mt-1">{errors.confirmInformation.message}</p>}

            <Checkbox
              label={commsLabel}
              checked={agreeToCommunications}
              {...register("agreeToCommunications", { required: "Must agree to communications" })}
            />
            {errors.agreeToCommunications && <p className="text-red-500 text-xs mt-1">{errors.agreeToCommunications.message}</p>}

            <div className="pt-6">
              <button
                type="submit"
                className="w-full md:w-auto font-bold uppercase tracking-widest disabled:opacity-50 bg-green-900 text-white px-10 py-2 hover:bg-black transition-all duration-300 rounded-lg shadow-xl hover:shadow-2xl active:scale-95"
                disabled={isSubmitting || submissionStatus === "loading"}
              >
                {submissionStatus === "loading" ? "Processing..." : btnText}
              </button>

              {submissionStatus === "success" && (
                <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
                  Thank you! Your inquiry has been submitted successfully.
                </div>
              )}
              
              {submissionStatus === "error" && (
                <p className="text-red-600 text-sm mt-4 font-medium italic">Something went wrong. Please try again or contact support.</p>
              )}
            </div>
          </div>
        </Section>

        {/* Footer Decoration */}
        <div className="pt-12 pb-6 text-center text-xs text-gray-400 uppercase tracking-widest">
          {footer}
        </div>
      </div>
    </form>
  </div>
  );
};

export default RfqForm;