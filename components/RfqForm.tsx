"use client";

import React, { useState,useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Paperclip } from 'lucide-react';
import { postRfq } from "@/lib/api";
import { useRouter } from 'next/navigation'; // <-- 1. IMPORT ROUTER
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles (sesuai dokumentasi library yang Anda pakai)
import 'swiper/css';

// --- ZOD SCHEMA (Unchanged) ---
const rfqSchema = z.object({
  installationSupport: z.boolean(),
  moreThanOneYearWarranty: z.boolean(),
  technicalTraining: z.boolean(),
  purpose: z.string().optional(),
  paymentTerms: z.string().optional(),
  fullName: z.string().min(1, { message: "Full name is required" }),
  company: z.string().min(1, { message: "Company is required" }),
  position: z.string().min(1, { message: "Position is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  country: z.string().optional(),
  city: z.string().min(1, { message: "City is required" }),
  deliveryAddress: z.string().min(1, { message: "Delivery address is required" }),
  note: z.string().optional(),
  sameAsShippingAddress: z.boolean(),
  contactBy: z.array(z.string()).min(1, { message: "Please select a contact method" }),
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
    <h3 className="text-2xl text-brand-text border-b border-brand-border pb-3 mb-6">{title}</h3>
    {children}
  </div>
);

const InputField: React.FC<any> = ({ label, placeholder, type = "text", containerClassName = "", ...rest }) => (
  <div className={containerClassName}>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input type={type} placeholder={placeholder} className="w-full px-4 py-2 border border-brand-border rounded-md focus:ring-brand-primary focus:border-brand-primary transition" {...rest} />
  </div>
);

const Textarea: React.FC<any> = ({
    label,
    placeholder,
    containerClassName = "",
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

const SelectField: React.FC<any> = ({ label, placeholder, options, containerClassName = "", ...rest }) => (
  <div className={containerClassName}>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
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

  

// --- MAIN RFQ FORM COMPONENT ---
const RfqForm: React.FC = () => {
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [products, setProducts] = useState<ProductItem[]>(initialProducts);
  const [selectedDateShipment, setSelectedDate] = useState<string>("");
  const [fileName, setFileName] = useState<string | null>(null);
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

  // --- 3. CORRECTED ONSUBMIT FUNCTION ---
  const onSubmit = async (data: RfqFormData) => {
    setSubmissionStatus('loading');

    // 1. Get the selected products *inside* the submit handler
    // This version includes all relevant product details.
    const selectedProductsList = products
      .filter(p => p.selected)
      .map(product => ({
        id: product.id,
        name: product.name,
        qty: product.qty,
        budget: product.budget,
        warranty: product.warranty,
        request: product.request,
      }));

    // 2. Prepare the *complete* payload
    const payload = {
      fullName: data.fullName,
      email: data.email,
      position: data.position,
      country: data.country,
      city: data.city,
      deliveryAddress: data.deliveryAddress,
      note: data.note,
      sameAsShippingAddress: data.sameAsShippingAddress,
      contactBy: data.contactBy,
      attachment: fileName,
      // Shipment Details
      delivery_required_date: selectedDateShipment, // From local state
      installationSupport: data.installationSupport,
      moreThanOneYearWarranty: data.moreThanOneYearWarranty,
      technicalTraining: data.technicalTraining,
      // Purchase Details
      purpose: data.purpose,
      paymentTerms: data.paymentTerms,
      // Product List
      products: selectedProductsList, // Use the list defined above
      // Terms & Agreement
      confirmInformation: data.confirmInformation,
      agreeToCommunications: data.agreeToCommunications,
    };
    
    try {
      // 4. Send the *correct* payload to the backend
      console.log("ini payload",payload)
      const result = await postRfq({
        ...payload,
        attachment: file,
      });

      if (result.status === "success") {
        console.log("✅ RFQ submitted successfully:", result.data);
        // Redirect to success page (router is now defined)
        sessionStorage.setItem("formSuccess", "true");
        // Redirect to success page
        router.push("/success");
        setSubmissionStatus("success");
      } else {
        console.warn("⚠️ RFQ submission failed:", result.message);
        setSubmissionStatus("error");
      }
    } catch (error) {
      console.error("❌ An error occurred during submission:", error);
      setSubmissionStatus("error");
    }
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFile(file)
      console.log("📁 File selected:", file.name);
    }
  };


  const formatIDR = (value: number) =>
    isNaN(value) ? "0" : new Intl.NumberFormat("id-ID").format(value);

  // Daftar gambar Anda
  const mobileImages = [
    '/image/bussines/mobile_photo/1.png',
    '/image/bussines/mobile_photo/2.png',
    // '/image/bussines/mobile_photo/3.jpg',
    // '/image/bussines/mobile_photo/4.jpg',
  ];

  const desktopImages = [
    '/image/bussines/desktop_photo/1.png',
    '/image/bussines/desktop_photo/2.png',
    // '/image/bussines/desktop_photo/3.jpg',
  ];
  // --- JSX (Unchanged) ---
  return (
    <div className="min-h-screen bg-white">
    {/* Container with relative/flex structure for sticky behavior */}
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row items-start gap-12"
    >
      
      {/* ============================================================
          LEFT SECTION: STICKY IMAGES (Visible on Desktop)
          ============================================================ */}
      <div className="w-full lg:w-1/2 lg:sticky lg:top-26 flex flex-col gap-6">
        <Section title="Product Gallery" className="lg:border-none">
          {/* On Mobile: Single stacked image or vertical list as requested */}
          <div className="space-y-2">
            {desktopImages.map((src, index) => (
              <div key={index} className="overflow-hidden rounded-xl shadow-lg group">
                <img 
                  src={src} 
                  alt={`Product view ${index + 1}`} 
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition duration-500"
                />
              </div>
            ))}
          </div>
          
          {/* Dimension Info (Always attached to images on desktop side) */}
          <div className="mt-2 pt-2 border-t border-gray-100 hidden lg:block">
            <p className="font-bold text-gray-800 text-sm">
              DIMENSION: <span className="text-blue-600 font-mono">250CM X 235CM X 130CM</span>
            </p>
          </div>
        </Section>
      </div>

      {/* ============================================================
          RIGHT SECTION: SCROLLABLE FORM & CONTENT
          ============================================================ */}
      <div className="w-full lg:w-1/2 space-y-16">
        
        {/* 1. PRODUCT DESCRIPTION SECTION */}
        <div className="text-left animate-in fade-in duration-700">
          <h2 className="text-1xl md:text-2xl font-bold font-alta mb-6 leading-tight text-gray-900">
            Establish New Era With The Unique Human Regenerator POWER.JET
          </h2>
          
          <p className="text-xl mb-8 text-gray-600 font-hevaltica leading-relaxed border-l-4 border-green-800 pl-4">
            You will be completely immersed in cold atmospheric plasma and enter a profound meditative state of recovery.
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 font-hevaltica gap-x-8 gap-y-3 list-disc list-inside text-gray-700 mb-8">
            <li>Regenerative time-out</li>
            <li>Body prophylaxis</li>
            <li>Rehabilitation</li>
            <li>Body vitalization</li>
            <li>Cell energization</li>
            <li>Ultimate anti-ageing</li>
            <li>Universal regeneration</li>
            <li>Improved quality of life</li>
            <li>Stress-neutralising</li>
            <li>Therapy-combining</li>
            <li>Post-therapeutic</li>
            <li>And many more</li>
          </ul>
        </div>

        {/* 2. BUYER DETAIL SECTION */}
        <Section title="Buyer Detail">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LEFT COLUMN FIELDS */}
            <div className="space-y-6">
              <InputField
                label="Your full name"
                placeholder="Insert your full name"
                {...register("fullName", { required: "Full name is required" })}
              />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}

              <SelectField
                label="Position / Job title"
                placeholder="Select job title"
                options={["Manager", "Director", "Specialist", "Owner"]}
                {...register("position", { required: "Position is required" })}
              />
              {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position.message}</p>}

              <InputField
                label="Email address"
                placeholder="Insert your business email"
                type="email"
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
                {...register("city", { required: "City is required" })}
              />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
            </div>

            {/* RIGHT COLUMN FIELDS */}
            <div className="space-y-6">
              <InputField
                label="Delivery address"
                placeholder="Insert detailed address"
                {...register("deliveryAddress", { required: "Delivery address is required" })}
              />
              {errors.deliveryAddress && <p className="text-red-500 text-xs mt-1">{errors.deliveryAddress.message}</p>}

              <Textarea
                label="Note / Special Requests"
                placeholder="Write your note here..."
                {...register("note")}
              />

              <div className="pt-2">
                <label className="block text-sm font-semibold text-gray-800 mb-4">
                  Preferred Contact Method
                </label>
                <div className="flex flex-wrap gap-x-6 gap-y-4">
                  <Checkbox
                    label="Whatsapp"
                    value="whatsapp"
                    {...register("contactBy", { required: "Select at least one method" })}
                  />
                  <Checkbox
                    label="Email"
                    value="email"
                    {...register("contactBy")}
                  />
                  <Checkbox
                    label="Phone Call"
                    value="phone"
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
              label="I confirm that the information provided is accurate and I am authorized to request a quotation."
              {...register("confirmInformation", { required: "Must confirm information" })}
            />
            {errors.confirmInformation && <p className="text-red-500 text-xs mt-1">{errors.confirmInformation.message}</p>}

            <Checkbox
              label="I agree to receive communications (SMS, Email, Whatsapp) regarding booking confirmation and reminders."
              {...register("agreeToCommunications", { required: "Must agree to communications" })}
            />
            {errors.agreeToCommunications && <p className="text-red-500 text-xs mt-1">{errors.agreeToCommunications.message}</p>}

            <div className="pt-6">
              <button
                type="submit"
                className="w-full md:w-auto font-bold uppercase tracking-widest disabled:opacity-50 bg-green-900 text-white px-10 py-2 hover:bg-black transition-all duration-300 rounded-lg shadow-xl hover:shadow-2xl active:scale-95"
                disabled={isSubmitting || submissionStatus === "loading"}
              >
                {submissionStatus === "loading" ? "Processing..." : "Submit"}
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
          © 2024 Human Regenerator • Future of Wellness
        </div>
      </div>
    </form>
  </div>
  );
};

export default RfqForm;