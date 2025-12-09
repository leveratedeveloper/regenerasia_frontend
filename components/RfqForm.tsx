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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
      <Section title="Product">
        {/* 📱 Mobile Slider */}
        <div className="md:hidden">
            {/* ... Swiper component untuk mobile ... */}
             <Swiper spaceBetween={10} slidesPerView={1} loop={true}>
                {mobileImages.map((src, index) => (
                    <SwiperSlide key={`mob-${index}`}>
                        <img 
                            src={src} 
                            alt={`Mobile Product ${index + 1}`} 
                            className="w-full h-auto object-cover rounded-lg"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>

        {/* 🖥️ Desktop Slider */}
        <div className="hidden md:block">
            {/* ... Swiper component untuk desktop ... */}
             <Swiper spaceBetween={20} slidesPerView={2} loop={false}>
                {desktopImages.map((src, index) => (
                    <SwiperSlide key={`desk-${index}`}>
                        <img 
                            src={src} 
                            alt={`Desktop Product ${index + 1}`} 
                            className="w-full h-64 object-cover rounded-lg"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>

        {/* =======================
            2. PRODUCT DESCRIPTION/WORDING SECTION (Diperbarui dengan Rata Kiri)
        ======================== */}
        <div className="mt-8 p-4 border-t border-gray-200 text-left">
            <h2 className="text-2xl font-bold font-alta mb-4">
                Establish New Era With The Unique Human Regenerator POWER.JET
            </h2>
            
            <p className="text-lg mb-6 text-gray-700 font-hevaltica leading-relaxed">
                You will be completely in cold atmospheric plasma and fell into a meditative state. 
            </p>

            {/* Daftar Manfaat dalam bentuk bullet point rata kiri */}
            <ul className="grid grid-cols-2 font-hevaltica gap-x-6 gap-y-1 list-disc list-inside text-gray-700 mb-3">
                <li>Enjoy Regenerative time-out for your body and mind</li>
                <li>Preventive body prophylaxis</li>
                <li>Rehabilitation Bodyvitalization Celenergization</li>
                <li>Ultimate Anti-ageing Universal Regeneration</li>
                <li>Improved Quality Of Life</li>
                <li>Stress-neutralising</li>
                <li>Therapy-combining</li>
                <li>Post-therapeutic Andmanym</li>
            </ul>

            {/* Dimensi tetap di bawah */}
            <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="font-bold text-gray-800">
                    Dimension: <span className="text-blue-600">250cm x 235cm x 130cm</span>
                </p>
            </div>
            
        </div>
      </Section>
      
      <Section title="Buyer Detail">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT COLUMN */}
        <div className="space-y-4">

          <InputField
            label="Your full name"
            placeholder="Insert your full name"
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName.message}</p>
          )}

          <SelectField
            label="Position/job title"
            placeholder="Insert your job title"
            options={["Manager", "Director", "Specialist"]}
            {...register("position")}
          />
          {errors.position && (
            <p className="text-red-500 text-sm">{errors.position.message}</p>
          )}

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
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <InputField
            label={
              <>
                Country <span className="text-gray-400 text-sm">(optional)</span>
              </>
            }
            placeholder="Select country"
            {...register("country")}
          />

          <InputField
            label="City"
            placeholder="Select city"
            {...register("city")}
          />
          {errors.city && (
            <p className="text-red-500 text-sm">{errors.city.message}</p>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-4">
          <InputField
            label="Delivery address"
            placeholder="Insert address"
            {...register("deliveryAddress")}
          />
          {errors.deliveryAddress && (
            <p className="text-red-500 text-sm">
              {errors.deliveryAddress.message}
            </p>
          )}

          <Textarea
            label="Note"
            placeholder="Write your note here..."
            {...register("note")}
          />
          {errors.note && (
            <p className="text-red-500 text-sm">{errors.note.message}</p>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              I want to be contacted by
            </label>

            <div className="flex space-x-6">
              <Checkbox
                label="Whatsapp"
                value="whatsapp"
                checked={contactBy?.includes("whatsapp")}
                {...register("contactBy")}
              />
              <Checkbox
                label="Email"
                value="email"
                checked={contactBy?.includes("email")}
                {...register("contactBy")}
              />
              <Checkbox
                label="Phone"
                value="phone"
                checked={contactBy?.includes("phone")}
                {...register("contactBy")}
              />
            </div>

            {errors.contactBy && (
              <p className="text-red-500 text-sm">
                {errors.contactBy.message}
              </p>
            )}
          </div>
        </div>
      </div>

      </Section>
      
      <Section title="Terms & Agreement">
        <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
          <Checkbox
            label="I confirm that the information provided is accurate and I am authorized to request a quotation."
            checked={confirmInformation}
            {...register("confirmInformation")}
          />
          {errors.confirmInformation && <p className="text-red-500 text-sm">{errors.confirmInformation.message}</p>}

          <Checkbox
            label="I agree to receive communications (SMS, Email, Whatsapp) re booking confirmation & reminders."
            checked={agreeToCommunications}
            {...register("agreeToCommunications")}
          />
          {errors.agreeToCommunications && <p className="text-red-500 text-sm">{errors.agreeToCommunications.message}</p>}

          <button
            type="submit"
            className="font-semibold disabled:opacity-50 mt-6 bg-green-900 text-white px-6 py-2 hover:bg-green-800 transition rounded-md"
            disabled={isSubmitting || submissionStatus === "loading"}
          >
            {submissionStatus === "loading" ? "Submitting..." : "Submit"}
          </button>

          {submissionStatus === "error" && (
            <p className="text-red-500 text-sm mt-2">Something went wrong. Please try again.</p>
          )}
        </div>
      </Section>
    </form>
  );
};

export default RfqForm;