"use client";

import React, { useState } from 'react';

const Checkbox: React.FC<{ label: string; checked: boolean; onChange: (checked: boolean) => void; }> = ({ label, checked, onChange }) => (
  <label className="flex items-center space-x-3 cursor-pointer">
    <div className={`w-5 h-5 border-2 rounded flex-shrink-0 flex items-center justify-center transition-colors ${checked ? 'bg-brand-primary border-brand-primary' : 'border-gray-300'}`}>
      {checked && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
    </div>
    <span className="text-sm">{label}</span>
  </label>
);

const Section: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
  <div className={`p-8 border border-brand-border rounded-lg ${className}`}>
    <h3 className="text-2xl font-serif text-brand-text mb-6">{title}</h3>
    {children}
  </div>
);

const InputField: React.FC<{ label: string; placeholder: string; type?: string; containerClassName?: string }> = ({ label, placeholder, type = "text", containerClassName = "" }) => (
  <div className={containerClassName}>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input type={type} placeholder={placeholder} className="w-full px-4 py-2 border border-brand-border rounded-md focus:ring-brand-primary focus:border-brand-primary transition" />
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
    className={`p-4 border-2 rounded-lg text-center cursor-pointer transition-all duration-200 ${
      selectedValue === value ? 'border-brand-primary bg-brand-primary/5 shadow-lg' : 'border-brand-border hover:border-brand-primary/50'
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
    <div className="text-sm text-gray-500">{duration}</div>
  </label>
);

const BookingForm: React.FC = () => {
  const [sessionPackage, setSessionPackage] = useState<number>(5);

  return (
    <div className="space-y-12">
      <Section title="Personal Detail">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 md:col-span-2">
                <InputField label="Your full name" placeholder="Insert your full name" />
                <InputField label="Email address" placeholder="Insert your business email" type="email" />
                <InputField label="Phone number" placeholder="+62 | 8123412345" type="tel" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">I want to be contacted by</label>
                <div className="flex space-x-6">
                    <Checkbox label="Whatsapp" checked={true} onChange={() => {}} />
                    <Checkbox label="Email" checked={true} onChange={() => {}} />
                    <Checkbox label="Phone" checked={false} onChange={() => {}} />
                </div>
            </div>
        </div>
      </Section>
      
      <Section title="Session Detail">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">How many session do you want to book?</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <SessionPackageRadio value={1} label="1 Session" duration="30 Minutes/Session" selectedValue={sessionPackage} onChange={setSessionPackage} />
                <SessionPackageRadio value={5} label="5 Session" duration="30 Minutes/Session" selectedValue={sessionPackage} onChange={setSessionPackage} />
                <SessionPackageRadio value={10} label="10 Session" duration="30 Minutes/Session" selectedValue={sessionPackage} onChange={setSessionPackage} />
            </div>

            <div className="space-y-4 mb-8">
                {Array.from({ length: sessionPackage }, (_, i) => (
                    <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Session {i + 1}</label>
                        </div>
                         <div className="md:col-span-1">
                            <label className="block text-xs font-medium text-gray-500 mb-1">Date</label>
                            <input type="date" className="w-full px-4 py-2 border border-brand-border rounded-md focus:ring-brand-primary focus:border-brand-primary transition" />
                        </div>
                         <div className="md:col-span-1">
                             <label className="block text-xs font-medium text-gray-500 mb-1">Time</label>
                            <input type="time" className="w-full px-4 py-2 border border-brand-border rounded-md focus:ring-brand-primary focus:border-brand-primary transition" />
                        </div>
                    </div>
                ))}
            </div>

            <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">What you want to be treated?</label>
                 <textarea 
                    rows={4}
                    className="w-full p-4 border border-brand-border rounded-md focus:ring-brand-primary focus:border-brand-primary transition"
                    placeholder="Hi, I have knee inflamation so I want..."
                  />
            </div>
        </div>
      </Section>

      <div className="space-y-4 bg-green-50/50 p-6 rounded-lg border border-green-200">
         <h4 className="text-xl font-serif text-brand-primary">Safety guidelines</h4>
         <p className="text-sm text-gray-600">For your safety, do not continue the therapy if you are:</p>
         <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>Anyone with built-in functioning electrical devices (e.g. pacemakers, hearing aids, implanted drug pumps, etc.)</li>
            <li>Pregnant or breast feeding women</li>
            <li>Children under the age of 12 years old</li>
            <li>Persons over 150 kg body weight</li>
            <li>Suffers with epileptic seizures</li>
         </ul>
         <Checkbox label="I have read the safety guidelines and confirm that I do not have the condition listed above." checked={true} onChange={()=>{}}/>
      </div>

      <div className="text-center">
        <button type="submit" className="w-full md:w-auto px-12 py-3 bg-brand-primary text-white rounded-md hover:bg-opacity-90 transition font-semibold">
            Submit
        </button>
      </div>
    </div>
  );
};

export default BookingForm;
