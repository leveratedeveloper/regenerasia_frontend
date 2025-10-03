"use client";

import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Plus, Paperclip, Trash2 } from 'lucide-react';

const rfqSchema = z.object({
  productRequirement: z.string().optional(),
  installationSupport: z.boolean(),
  moreThanOneYearWarranty: z.boolean(),
  technicalTraining: z.boolean(),
  purpose: z.string().optional(),
  paymentTerms: z.string().optional(),
  additionalTerms: z.string().optional(),
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

export interface ProductItem {
    id: number;
    name: string;
    qty: number;
    budget: number;
    warranty: boolean;
    request: string;
    image: string;
  }

const initialProducts: ProductItem[] = [
  { id: 1, name: 'Regeneration machine', qty: 2, budget: 120000000, warranty: true, request: 'It has to consider allergic response of "illness type-A"', image: 'https://picsum.photos/seed/product1/64/64' },
  { id: 2, name: 'Regeneration machine', qty: 2, budget: 120000000, warranty: false, request: 'Insert request', image: 'https://picsum.photos/seed/product2/64/64' },
  { id: 3, name: 'Regeneration machine', qty: 2, budget: 120000000, warranty: true, request: 'Insert request', image: 'https://picsum.photos/seed/product3/64/64' },
];

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
    <h3 className="text-2xl font-serif text-brand-text border-b border-brand-border pb-3 mb-6">{title}</h3>
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
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

type RfqFormData = z.infer<typeof rfqSchema>;

const RfqForm: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>(initialProducts);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
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

  const contactBy = watch("contactBy");
  const installationSupport = watch("installationSupport");
  const moreThanOneYearWarranty = watch("moreThanOneYearWarranty");
  const technicalTraining = watch("technicalTraining");
  const sameAsShippingAddress = watch("sameAsShippingAddress");
  const confirmInformation = watch("confirmInformation");
  const agreeToCommunications = watch("agreeToCommunications");

  const onSubmit = async (data: RfqFormData) => {
    setSubmissionStatus('loading');
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log(data);
      setSubmissionStatus('success');
    } catch (error) {
      setSubmissionStatus('error');
    }
  };

  const addProduct = useCallback(() => {
    setProducts(prev => [
      ...prev,
      { id: Date.now(), name: 'New Item', qty: 1, budget: 0, warranty: false, request: '', image: `https://picsum.photos/seed/${Date.now()}/64/64` }
    ]);
  }, []);

  const removeProduct = useCallback((id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  }, []);

  const handleProductWarrantyChange = (productId: number) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === productId ? { ...p, warranty: !p.warranty } : p
      )
    );
  };

  if (submissionStatus === 'success') {
    return (
      <div className="text-center p-12">
        <h2 className="text-2xl font-bold mb-4">Thank you!</h2>
        <p>Your request for quotation has been submitted successfully.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
      <Section title="Product Detail">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Product Requirement</label>
          <textarea 
            rows={4}
            className="w-full p-4 border border-brand-border rounded-md focus:ring-brand-primary focus:border-brand-primary transition"
            defaultValue={"- Quality of the product has to met our global standard and fulfill ISO-900N\n- We need at least 1 year guarantee\n- Flexible price to negotiate"}
            {...register("productRequirement")}
          />
          <button type="button" className="inline-flex items-center space-x-2 px-4 py-2 border border-brand-primary text-brand-primary rounded-md hover:bg-brand-primary/10 transition">
            <Paperclip size={16} />
            <span>Attach Document</span>
          </button>
        </div>
      </Section>

      <Section title="Product List">
        <div className="space-y-4">
          {products.map(product => (
            <div key={product.id} className="grid grid-cols-1 md:grid-cols-[auto_1fr] lg:grid-cols-[auto_repeat(6,1fr)_auto] gap-4 items-center p-4 border border-brand-border rounded-lg">
              <img src={product.image} alt={product.name} className="w-16 h-16 rounded-md object-cover hidden lg:block" />
              <div className="md:col-span-2 lg:col-span-1">
                <label className="text-xs text-gray-500 md:hidden">Product</label>
                <input defaultValue={product.name} className="w-full p-2 border-b-2 border-transparent focus:border-brand-primary outline-none bg-transparent"/>
              </div>
              <div className="grid grid-cols-2 gap-4 md:col-span-4 lg:col-span-5">
                 <div className="col-span-1 lg:col-span-1">
                    <label className="text-xs text-gray-500">QTY</label>
                    <input type="number" defaultValue={product.qty} className="w-full p-2 border-b-2 border-transparent focus:border-brand-primary outline-none bg-transparent"/>
                 </div>
                 <div className="col-span-1 lg:col-span-2">
                    <label className="text-xs text-gray-500">Estimate Budget</label>
                    <div className="flex items-center">
                        <span className="text-gray-500 mr-2">IDR</span>
                        <input type="text" defaultValue={new Intl.NumberFormat('id-ID').format(product.budget)} className="w-full p-2 border-b-2 border-transparent focus:border-brand-primary outline-none bg-transparent"/>
                    </div>
                 </div>
                 <div className="col-span-2 lg:col-span-2">
                     <label className="text-xs text-gray-500">Specification request</label>
                     <input defaultValue={product.request} className="w-full p-2 border-b-2 border-transparent focus:border-brand-primary outline-none bg-transparent"/>
                 </div>
              </div>
              <div className="flex items-center justify-between md:col-span-full lg:col-auto lg:flex-col lg:items-center lg:space-y-2">
                 <div className="flex items-center space-x-2">
                    <label className="text-xs text-gray-500">Warranty</label>
                    <Checkbox label="" checked={product.warranty} onChange={() => handleProductWarrantyChange(product.id)}/>
                 </div>
                 <button type="button" onClick={() => removeProduct(product.id)} className="text-red-500 hover:text-red-700 transition">
                    <Trash2 size={20}/>
                </button>
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={addProduct} className="mt-6 inline-flex items-center space-x-2 px-4 py-2 border border-brand-primary text-brand-primary rounded-md hover:bg-brand-primary/10 transition">
          <Plus size={16} />
          <span>Add Item</span>
        </button>
      </Section>
      
      <Section title="Shipment Detail">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time & Date</label>
                <input type="date" className="w-full px-4 py-2 border border-brand-border rounded-md focus:ring-brand-primary focus:border-brand-primary transition" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Installation Requirement</label>
                <div className="space-y-2 mt-2">
                    <Checkbox label="I require installation support on-site" checked={installationSupport} {...register("installationSupport")}/>
                    <Checkbox label="I need more than 1 year warranty" checked={moreThanOneYearWarranty} {...register("moreThanOneYearWarranty")}/>
                    <Checkbox label="I need technical training for my staff" checked={technicalTraining} {...register("technicalTraining")}/>
                </div>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Additional terms</label>
                    <textarea rows={3} placeholder="Insert additional terms" className="w-full p-4 border border-brand-border rounded-md focus:ring-brand-primary focus:border-brand-primary transition" {...register("additionalTerms")} />
                    <button type="button" className="mt-2 inline-flex items-center space-x-2 px-4 py-2 border border-brand-primary text-brand-primary rounded-md hover:bg-brand-primary/10 transition">
                        <Paperclip size={16} />
                        <span>Attach Document</span>
                    </button>
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
                <InputField label="Email address" placeholder="Insert your business email" type="email" {...register("email")} />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                <div className="grid grid-cols-2 gap-4">
                    <SelectField label="Country" placeholder="Select country" options={["Indonesia", "Singapore", "Malaysia"]} {...register("country")} />
                    {errors.country && <p className="text-red-500 text-sm -mt-3"><span className='text-red-500'>{errors.country.message}</span></p>}
                    <SelectField label="City" placeholder="Select city" options={["Jakarta", "Surabaya", "Bandung"]} {...register("city")} />
                    {errors.city && <p className="text-red-500 text-sm -mt-3"><span className='text-red-500'>{errors.city.message}</span></p>}
                </div>
                <InputField label="Delivery address" placeholder="Insert address" {...register("deliveryAddress")} />
                {errors.deliveryAddress && <p className="text-red-500 text-sm">{errors.deliveryAddress.message}</p>}
                <InputField label="Postal code" placeholder="Insert postal code" {...register("postalCode")} />
                {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode.message}</p>}
                <Checkbox label="This address is same as shipping address" checked={sameAsShippingAddress} {...register("sameAsShippingAddress")} />
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
             <Checkbox label="I confirm that the information provided is a accurate and I am authorized to request a quotation on behalf of my company." checked={confirmInformation} {...register("confirmInformation")} />
             {errors.confirmInformation && <p className="text-red-500 text-sm">{errors.confirmInformation.message}</p>}
             <Checkbox label="I agree to receive communications (SMS, email) re booking confirmation & reminders." checked={agreeToCommunications} {...register("agreeToCommunications")} />
             {errors.agreeToCommunications && <p className="text-red-500 text-sm">{errors.agreeToCommunications.message}</p>}
             <button
                type="submit"
                className="font-semibold disabled:opacity-50 mt-6 bg-green-900 text-white px-6 py-2 hover:bg-green-800 transition"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
              {submissionStatus === 'error' && <p className="text-red-500 text-sm mt-2">Something went wrong. Please try again.</p>}
          </div>
      </Section>
    </form>
  );
};

export default RfqForm;
