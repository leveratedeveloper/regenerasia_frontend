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
  installationSupport: z.boolean(),
  moreThanOneYearWarranty: z.boolean(),
  technicalTraining: z.boolean(),
  purpose: z.string().optional(),
  paymentTerms: z.string().optional(),
  fullName: z.string().min(1, { message: "Full name is required" }),
  company: z.string().min(1, { message: "Company is required" }),
  position: z.string().min(1, { message: "Position is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  country: z.string().min(1, { message: "Country is required" }),
  city: z.string().min(1, { message: "City is required" }),
  deliveryAddress: z.string().min(1, { message: "Delivery address is required" }),
  postalCode: z.string().min(1, { message: "Postal code is required" }),
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
      company: data.company,
      position: data.position,
      country: data.country,
      city: data.city,
      deliveryAddress: data.deliveryAddress,
      postalCode: data.postalCode,
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

  // --- JSX (Unchanged) ---
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
      <Section title="Product List">
        <div className="space-y-4">
        <div className="p-6 space-y-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-4 border rounded-2xl shadow-sm bg-white"
          >
            <div className="flex items-center space-x-4 lg:col-span-1">
              <input
                type="checkbox"
                checked={product.selected}
                onChange={() =>
                  setProducts((prev) =>
                    prev.map((p) =>
                      p.id === product.id ? { ...p, selected: !p.selected } : p
                    )
                  )
                }
                className="w-5 h-5 accent-brand-primary cursor-pointer"
              />
              <img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
              <div>
                <h3 className="font-semibold text-gray-800">{product.name}</h3>
                <p className="text-xs text-gray-500">Warranty: {product.warranty ? "Yes" : "No"}</p>
              </div>
            </div>

            {/* QTY */}
            <div className="col-span-1 flex flex-col justify-center">
              <label className="text-xs text-gray-500 mb-1">QTY</label>
              <div className="flex items-center border-b-2 border-transparent focus-within:border-brand-primary transition">
                <button
                  type="button"
                  onClick={() =>
                    setProducts((prev) =>
                      prev.map((p) =>
                        p.id === product.id && p.qty > 1
                          ? { ...p, qty: p.qty - 1, budget: (p.qty - 1) * p.basePrice }
                          : p
                      )
                    )
                  }
                  className="px-2 text-gray-500 hover:text-brand-primary"
                >
                  −
                </button>
                <input
                  type="number"
                  value={product.qty}
                  onChange={(e) => {
                    const newQty = Math.max(1, Number(e.target.value) || 1);
                    setProducts((prev) =>
                      prev.map((p) =>
                        p.id === product.id
                          ? { ...p, qty: newQty, budget: newQty * p.basePrice }
                          : p
                      )
                    );
                  }}
                  className="w-12 text-center outline-none bg-transparent"
                />
                <button
                  type="button"
                  onClick={() =>
                    setProducts((prev) =>
                      prev.map((p) =>
                        p.id === product.id
                          ? { ...p, qty: p.qty + 1, budget: (p.qty + 1) * p.basePrice }
                          : p
                      )
                    )
                  }
                  className="px-2 text-gray-500 hover:text-brand-primary"
                >
                  +
                </button>
              </div>
            </div>

            {/* 💰 Budget */}
            <div className="col-span-1 lg:col-span-2 flex flex-col justify-center">
              <label className="text-xs text-gray-500 mb-1">Estimate Budget</label>
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">IDR</span>
                <input
                  type="text"
                  value={formatIDR(product.budget)}
                  readOnly
                  className="w-full p-2 border-b-2 border-transparent focus:border-brand-primary outline-none bg-transparent font-medium text-gray-800"
                />
              </div>
            </div>
          </div>
        ))}
      {/* 🧾 Total Budget Summary */}
    </div>
        </div>
      </Section>
      
      <Section title="Include Detail">
        <div className="space-y-2 text-gray-800">
          <div>
            <h3 className="font-semibold text-brand-primary mb-2">Include:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Goods installation</li>
              <li>3 Years Warranty</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-brand-primary mb-2">Exclude:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Country Customs & Tax</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Buyer Detail">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Purpose of purchase</label>
                    <div className="space-y-2">
                        <label className="flex items-center"><input type="radio" value="operational_resupply" {...register("purpose")} className="h-4 w-4 text-brand-primary focus:ring-brand-primary" defaultChecked/> <span className="ml-2 text-sm">Operational resupply</span></label>
                        <label className="flex items-center"><input type="radio" value="upgrading" {...register("purpose")} className="h-4 w-4 text-brand-primary focus:ring-brand-primary"/> <span className="ml-2 text-sm">Upgrading existing equipment</span></label>
                        <label className="flex items-center"><input type="radio" value="other" {...register("purpose")} className="h-4 w-4 text-brand-primary focus:ring-brand-primary"/> <span className="ml-2 text-sm">Other</span></label>
                    </div>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Terms</label>
                    <input placeholder="Insert payment terms" className="w-full px-4 py-2 border border-brand-border rounded-md focus:ring-brand-primary focus:border-brand-primary transition" {...register("paymentTerms")} />
                </div>
                <div>
                <label htmlFor="file-upload" className="mt-2 inline-flex items-center space-x-2 px-4 py-2 border border-brand-primary text-brand-primary rounded-md hover:bg-brand-primary/10 transition cursor-pointer">
                    <Paperclip size={16} />
                    <span>{fileName ?? 'Upload File '}</span>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
            </div>
            <div className="space-y-4">
                <h4 className="text-lg font-semibold">Contact Detail</h4>
                <InputField label="Your full name" placeholder="Insert your full name" {...register("fullName")} />
                {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}

                <InputField label="Company/organization" placeholder="Insert your job title" {...register("company")} />
                {errors.company && <p className="text-red-500 text-sm">{errors.company.message}</p>}

                <SelectField label="Position/job title" placeholder="Insert your job title" options={["Manager", "Director", "Specialist"]} {...register("position")} />
                {errors.position && <p className="text-red-500 text-sm">{errors.position.message}</p>}

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
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                <div className="grid grid-cols-2 gap-4">
                    <InputField label="Country" placeholder="Select country"  {...register("country")} />
                    {errors.country && <p className="text-red-500 text-sm -mt-3"><span className='text-red-500'>{errors.country.message}</span></p>}
                    <InputField label="City" placeholder="Select city" {...register("city")} />
                    {errors.city && <p className="text-red-500 text-sm -mt-3"><span className='text-red-500'>{errors.city.message}</span></p>}
                </div>
                <InputField label="Delivery address" placeholder="Insert address" {...register("deliveryAddress")} />
                {errors.deliveryAddress && <p className="text-red-500 text-sm">{errors.deliveryAddress.message}</p>}

                <InputField label="Postal code" placeholder="Insert postal code"  type="number" {...register("postalCode")} />
                {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode.message}</p>}

                {/* <Checkbox label="This address is same as shipping address" checked={sameAsShippingAddress} {...register("sameAsShippingAddress")} /> */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">I want to be contacted by</label>
                    <div className="flex space-x-6">
                       <Checkbox label="Whatsapp" value="whatsapp" checked={contactBy?.includes("whatsapp")} {...register("contactBy")} />
                       <Checkbox label="Email" value="email" checked={contactBy?.includes("email")} {...register("contactBy")} />
                       <Checkbox label="Phone" value="phone" checked={contactBy?.includes("phone")} {...register("contactBy")} />
                    </div>
                    {errors.contactBy && <p className="text-red-500 text-sm">{errors.contactBy.message}</p>}
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