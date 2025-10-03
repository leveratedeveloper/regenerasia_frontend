"use client";

import React, { useState, useCallback } from 'react';
import { Plus, Paperclip, Trash2 } from 'lucide-react';

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

const Checkbox: React.FC<{ label: string; checked: boolean; onChange: (checked: boolean) => void; }> = ({ label, checked, onChange }) => (
  <label className="flex items-center space-x-3 cursor-pointer">
    <div className={`w-5 h-5 border-2 rounded flex-shrink-0 flex items-center justify-center transition-colors ${checked ? 'bg-brand-primary border-brand-primary' : 'border-gray-300'}`}>
      {checked && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
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

const InputField: React.FC<{ label: string; placeholder: string; type?: string; containerClassName?: string }> = ({ label, placeholder, type = "text", containerClassName = "" }) => (
  <div className={containerClassName}>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input type={type} placeholder={placeholder} className="w-full px-4 py-2 border border-brand-border rounded-md focus:ring-brand-primary focus:border-brand-primary transition" />
  </div>
);

const SelectField: React.FC<{ label: string; placeholder: string; options: string[]; containerClassName?: string }> = ({ label, placeholder, options, containerClassName = "" }) => (
  <div className={containerClassName}>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select className="w-full px-4 py-2 border border-brand-border rounded-md focus:ring-brand-primary focus:border-brand-primary transition bg-white appearance-none">
      <option value="">{placeholder}</option>
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);


const RfqForm: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>(initialProducts);

  const addProduct = useCallback(() => {
    setProducts(prev => [
      ...prev,
      { id: Date.now(), name: 'New Item', qty: 1, budget: 0, warranty: false, request: '', image: `https://picsum.photos/seed/${Date.now()}/64/64` }
    ]);
  }, []);

  const removeProduct = useCallback((id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  }, []);

  return (
    <div className="space-y-12">
      <Section title="Product Detail">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Product Requirement</label>
          <textarea 
            rows={4}
            className="w-full p-4 border border-brand-border rounded-md focus:ring-brand-primary focus:border-brand-primary transition"
            defaultValue={"- Quality of the product has to met our global standard and fulfill ISO-900N\n- We need at least 1 year guarantee\n- Flexible price to negotiate"}
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
                    <Checkbox label="" checked={product.warranty} onChange={() => {}}/>
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
                    <Checkbox label="I require installation support on-site" checked={true} onChange={()=>{}}/>
                    <Checkbox label="I need more than 1 year warranty" checked={false} onChange={()=>{}}/>
                    <Checkbox label="I need technical training for my staff" checked={true} onChange={()=>{}}/>
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
                        <label className="flex items-center"><input type="radio" name="purpose" className="h-4 w-4 text-brand-primary focus:ring-brand-primary" defaultChecked/> <span className="ml-2 text-sm">Operational resupply</span></label>
                        <label className="flex items-center"><input type="radio" name="purpose" className="h-4 w-4 text-brand-primary focus:ring-brand-primary"/> <span className="ml-2 text-sm">Upgrading existing equipment</span></label>
                        <label className="flex items-center"><input type="radio" name="purpose" className="h-4 w-4 text-brand-primary focus:ring-brand-primary"/> <span className="ml-2 text-sm">Other</span></label>
                    </div>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Terms</label>
                    <input placeholder="Insert payment terms" className="w-full px-4 py-2 border border-brand-border rounded-md focus:ring-brand-primary focus:border-brand-primary transition" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Additional terms</label>
                    <textarea rows={3} placeholder="Insert additional terms" className="w-full p-4 border border-brand-border rounded-md focus:ring-brand-primary focus:border-brand-primary transition" />
                    <button type="button" className="mt-2 inline-flex items-center space-x-2 px-4 py-2 border border-brand-primary text-brand-primary rounded-md hover:bg-brand-primary/10 transition">
                        <Paperclip size={16} />
                        <span>Attach Document</span>
                    </button>
                </div>
            </div>
            <div className="space-y-4">
                <h4 className="text-lg font-semibold">Contact Detail</h4>
                <InputField label="Your full name" placeholder="Insert your full name" />
                <InputField label="Company/organization" placeholder="Insert your job title" />
                <SelectField label="Position/job title" placeholder="Insert your job title" options={["Manager", "Director", "Specialist"]} />
                <InputField label="Email address" placeholder="Insert your business email" type="email" />
                <div className="grid grid-cols-2 gap-4">
                    <SelectField label="Country" placeholder="Select country" options={["Indonesia", "Singapore", "Malaysia"]} />
                    <SelectField label="City" placeholder="Select city" options={["Jakarta", "Surabaya", "Bandung"]} />
                </div>
                <InputField label="Delivery address" placeholder="Insert address" />
                <InputField label="Postal code" placeholder="Insert postal code" />
                <Checkbox label="This address is same as shipping address" checked={false} onChange={()=>{}} />
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">I want to be contacted by</label>
                    <div className="flex space-x-6">
                       <Checkbox label="Whatsapp" checked={false} onChange={()=>{}}/>
                       <Checkbox label="Email" checked={true} onChange={()=>{}}/>
                       <Checkbox label="Phone" checked={false} onChange={()=>{}}/>
                    </div>
                </div>
            </div>
        </div>
      </Section>
      
      <Section title="Terms & Agreement">
          <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
             <Checkbox label="I confirm that the information provided is accurate and I am authorized to request a quotation on behalf of my company." checked={true} onChange={()=>{}}/>
             <Checkbox label="I agree to receive communications (SMS, email) re booking confirmation & reminders." checked={true} onChange={()=>{}}/>
             <button type="submit" className="mt-4 w-full md:w-auto px-10 py-3 bg-brand-primary text-white rounded-md hover:bg-opacity-90 transition font-semibold">
                Submit
             </button>
          </div>
      </Section>
    </div>
  );
};

export default RfqForm;
