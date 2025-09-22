"use client";

import React, { useState, useCallback, useEffect } from 'react';
import SuccessStep from './SuccessStep';
import type { FormData, Session, SessionCount } from '../types';
import { Check } from 'lucide-react';

const CustomCheckbox: React.FC<{ label: string; checked: boolean; onChange: () => void; }> = ({ label, checked, onChange }) => (
  <label className="flex items-center space-x-2 cursor-pointer text-sm text-brand-dark">
    <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} />
    <div className="w-5 h-5 border border-brand-border flex items-center justify-center transition-colors peer-checked:bg-brand-green peer-checked:border-brand-green">
      {checked && <Check size={16} className="text-white" />}
    </div>
    <span>{label}</span>
  </label>
);

const sessionOptions: { count: SessionCount; label: string; duration: string }[] = [
  { count: 1, label: '1 Session', duration: '30 Minutes/Session' },
  { count: 5, label: '5 Session', duration: '30 Minutes/Session' },
  { count: 10, label: '10 Session', duration: '30 Minutes/Session' },
];

const initialFormData: FormData = {
  fullName: '',
  email: '',
  phone: '',
  contactBy: {
    whatsapp: false,
    email: false,
    phone: false,
  },
  sessionCount: 5,
  sessions: Array(5).fill({ date: '', time: '' }),
  treatmentInfo: '',
  agreedToSafety: false,
};

const BookingForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState({ fullName: '', email: '', phone: '', contactBy: '', agreedToSafety: '' });

  const updateData = useCallback((fields: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...fields }));
  }, []);
  
  useEffect(() => {
    const currentSessions = formData.sessions;
    const newCount = formData.sessionCount;
    const currentCount = currentSessions.length;

    if (newCount === currentCount) return;

    if (newCount > currentCount) {
      const additionalSessions = Array(newCount - currentCount).fill({ date: '', time: '' });
      updateData({ sessions: [...currentSessions, ...additionalSessions] });
    } else {
      updateData({ sessions: currentSessions.slice(0, newCount) });
    }
  }, [formData.sessionCount, formData.sessions, updateData]);

  const nextStep = () => setStep(prev => (prev < 2 ? prev + 1 : prev));
  
  const resetForm = () => {
    setStep(1);
    setFormData(initialFormData);
    setErrors({ fullName: '', email: '', phone: '', contactBy: '', agreedToSafety: '' });
  };
  
  const validate = () => {
    const newErrors = { fullName: '', email: '', phone: '', contactBy: '', agreedToSafety: '' };
    let isValid = true;
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
      isValid = false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address.";
        isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
      isValid = false;
    }

    if (!formData.contactBy.whatsapp && !formData.contactBy.email && !formData.contactBy.phone) {
        newErrors.contactBy = "Please select a contact method.";
        isValid = false;
    }

    if (!formData.agreedToSafety) {
        newErrors.agreedToSafety = "You must agree to the safety guidelines to proceed.";
        isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log("Form Submitted:", formData);
      nextStep();
    }
  };

  const handleContactByChange = (method: 'whatsapp' | 'email' | 'phone') => {
    updateData({
      contactBy: {
        ...formData.contactBy,
        [method]: !formData.contactBy[method],
      },
    });
  };

  const handleSessionDateTimeChange = (index: number, field: 'date' | 'time', value: string) => {
    const updatedSessions = [...formData.sessions];
    updatedSessions[index] = { ...updatedSessions[index], [field]: value };
    updateData({ sessions: updatedSessions });
  };

  const renderStepContent = () => {
    if (step === 2) {
      return <SuccessStep resetForm={resetForm} />;
    }

    return (
      <div className="space-y-8 animate-fade-in">
        {/* Personal Identity Part */}
        <div>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-brand-dark font-serif">Personal Identity</h2>
          </div>
          <div className="border border-brand-border p-6 sm:p-8 space-y-6 mt-8">
            <h3 className="text-lg font-medium text-brand-dark">Contact Detail</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-xs text-brand-gray mb-1">Your full name</label>
                <input
                  id="fullName" type="text" placeholder="Insert your full name"
                  value={formData.fullName} onChange={(e) => updateData({ fullName: e.target.value })}
                  className={`w-full px-3 py-2 text-sm bg-white border ${errors.fullName ? 'border-red-500' : 'border-brand-border'} focus:outline-none focus:ring-1 focus:ring-brand-green`}
                />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-xs text-brand-gray mb-1">Email address</label>
                <input
                  id="email" type="email" placeholder="Insert your business email"
                  value={formData.email} onChange={(e) => updateData({ email: e.target.value })}
                  className={`w-full px-3 py-2 text-sm bg-white border ${errors.email ? 'border-red-500' : 'border-brand-border'} focus:outline-none focus:ring-1 focus:ring-brand-green`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="block text-xs text-brand-gray mb-1">Phone number</label>
                <input
                  id="phone" type="tel" placeholder="+62 | 8123412345"
                  value={formData.phone} onChange={(e) => updateData({ phone: e.target.value })}
                  className={`w-full px-3 py-2 text-sm bg-white border ${errors.phone ? 'border-red-500' : 'border-brand-border'} focus:outline-none focus:ring-1 focus:ring-brand-green`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-brand-dark mb-3">I want to be contacted by</h4>
              <div className="flex items-center space-x-6">
                <CustomCheckbox label="Whatsapp" checked={formData.contactBy.whatsapp} onChange={() => handleContactByChange('whatsapp')} />
                <CustomCheckbox label="Email" checked={formData.contactBy.email} onChange={() => handleContactByChange('email')} />
                <CustomCheckbox label="Phone" checked={formData.contactBy.phone} onChange={() => handleContactByChange('phone')} />
              </div>
              {errors.contactBy && <p className="text-red-500 text-xs mt-2">{errors.contactBy}</p>}
            </div>
          </div>
        </div>
        
        {/* Session Detail Part */}
        <div>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-brand-dark font-serif">Session Detail</h2>
          </div>
          <div className="border border-brand-border p-6 sm:p-8 space-y-6 mt-8">
            <h3 className="text-lg font-medium text-brand-dark">Session Detail</h3>
            <div>
              <label className="block text-sm font-medium text-brand-dark mb-2">How many session do you want to book?</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {sessionOptions.map(option => (
                  <label key={option.count} className={`p-4 border text-center cursor-pointer transition-colors ${formData.sessionCount === option.count ? 'border-brand-green ring-1 ring-brand-green' : 'border-brand-border'}`}>
                    <input type="radio" name="sessionCount" value={option.count} checked={formData.sessionCount === option.count} onChange={() => updateData({ sessionCount: option.count })} className="sr-only" />
                    <span className="font-semibold text-brand-dark block text-sm">{option.label}</span>
                    <span className="text-xs text-brand-gray">{option.duration}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {formData.sessions.map((_, index) => (
                <div key={index} className="space-y-2">
                  <label className="block text-sm font-semibold text-brand-dark">Session {index + 1}</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-brand-gray">Date</label>
                      <input type="date" onChange={(e) => handleSessionDateTimeChange(index, 'date', e.target.value)} className="w-full px-3 py-2 text-sm bg-white border border-brand-border focus:outline-none focus:ring-1 focus:ring-brand-green" />
                    </div>
                    <div>
                      <label className="text-xs text-brand-gray">Time</label>
                      <input type="time" onChange={(e) => handleSessionDateTimeChange(index, 'time', e.target.value)} className="w-full px-3 py-2 text-sm bg-white border border-brand-border focus:outline-none focus:ring-1 focus:ring-brand-green" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <label htmlFor="treatmentInfo" className="block text-sm font-medium text-brand-dark mb-2">What you want to be treated?</label>
              <textarea 
                id="treatmentInfo" placeholder="Hi, I have knee inflamation so I want..."
                value={formData.treatmentInfo} onChange={(e) => updateData({ treatmentInfo: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white border border-brand-border focus:outline-none focus:ring-1 focus:ring-brand-green"
              />
            </div>
          </div>
        </div>

        {/* Safety Guidelines */}
        <div className="border border-brand-border p-6 sm:p-8 space-y-4">
          <h3 className="text-lg font-medium text-brand-dark">Safety guidelines</h3>
          <p className="text-sm text-brand-gray">For your safety, please confirm the things if you are:</p>
          <ul className="list-disc list-inside text-sm text-brand-gray space-y-1">
            <li>Anyone with built-in functioning electrical devices (e.g. pacemakers, hearing aids, implanted drug pumps, etc.)</li>
            <li>Pregnant or breast feeding woman</li>
            <li>Children and infants under 7 years old</li>
            <li>Persons over 130 kg body weight</li>
            <li>Persons with mental disorders</li>
          </ul>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input type="checkbox" checked={formData.agreedToSafety} onChange={(e) => updateData({ agreedToSafety: e.target.checked })} className="sr-only peer" />
            <div className="w-5 h-5 border border-brand-border flex items-center justify-center transition-colors peer-checked:bg-brand-green peer-checked:border-brand-green">
              {formData.agreedToSafety && <Check size={16} className="text-white" />}
            </div>
            <span className="text-sm text-brand-dark">I have read the safety guidelines and confirm that I do not have the condition listed above.</span>
          </label>
          {errors.agreedToSafety && <p className="text-red-500 text-xs mt-2">{errors.agreedToSafety}</p>}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-brand-green text-white px-8 py-2 text-sm font-medium hover:bg-opacity-90 transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-3xl space-y-8">
      {step < 2 && (
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-brand-dark font-serif">
          Book a Session
        </h1>
      )}

      <div className="bg-white p-4 sm:p-8">
        {renderStepContent()}
      </div>
    </div>
  );
};

export default BookingForm;
