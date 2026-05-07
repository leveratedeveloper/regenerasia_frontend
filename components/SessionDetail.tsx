"use client";

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UseFormRegister } from "react-hook-form";

export const Section: React.FC<{
  id?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}> = ({ id, title, children, className }) => (
  <div id={id} className={`p-8 border border-gray-200 rounded-lg bg-white text-black ${className ?? ""}`}>
    <h3 className="text-2xl text-black mb-6">{title}</h3>
    {children}
  </div>
);

export const SessionPackageRadio: React.FC<{
  value: number;
  label: string;
  duration: string;
  price: string;
  selectedValue: number;
  onChange: (value: number) => void;
}> = ({ value, label, duration, price, selectedValue, onChange }) => (
  <label
    className={`p-4 rounded-lg text-center cursor-pointer transition-all duration-200 bg-white text-black ${
      selectedValue === value
        ? "border-2 border-green-800 bg-green-50 shadow-md"
        : "border border-gray-300 hover:border-green-800/60"
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
    <div className="text-sm text-gray-600">{price}</div>
  </label>
);

interface SessionDetailProps {
  sessionPackage: number;
  setSessionPackage: (value: number) => void;
  dates: (Date | null)[];
  setDates: (dates: (Date | null)[]) => void;
  appointmentTimes: string[];
  setAppointmentTimes: (times: string[]) => void;
  threeDaysLater: Date;
  isBlockedDate: (d: Date | null) => boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
}

export default function SessionDetail({
  sessionPackage,
  setSessionPackage,
  dates,
  setDates,
  appointmentTimes,
  setAppointmentTimes,
  threeDaysLater,
  isBlockedDate,
  register,
}: SessionDetailProps) {
  return (
    <Section id="session-detail" title="Session Detail">
      <label className="block text-sm font-medium text-gray-800 mb-3">
        How many sessions do you want to book?
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <SessionPackageRadio
          value={1}
          label="1 Session"
          duration="30 Minutes/Session"
          price="Rp. 5.000.000"
          selectedValue={sessionPackage}
          onChange={setSessionPackage}
        />
        <SessionPackageRadio
          value={5}
          label="5 Sessions"
          duration="30 Minutes/Session"
          price="Rp. 20.000.000"
          selectedValue={sessionPackage}
          onChange={setSessionPackage}
        />
        <SessionPackageRadio
          value={10}
          label="10 Sessions"
          duration="30 Minutes/Session"
          price="Rp. 40.000.000"
          selectedValue={sessionPackage}
          onChange={setSessionPackage}
        />
      </div>

      <div className="space-y-4 mb-8">
        {Array.from({ length: sessionPackage }, (_, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Session {i + 1}
                {i === 0 && <span className="text-red-500 ml-1">(*)</span>}
              </label>
              {i > 0 && (
                <div className="text-xs text-gray-500 italic">Optional</div>
              )}
            </div>

            <div className="md:col-span-1">
              <label className="block text-xs font-medium text-gray-500 mb-1">Date</label>
              <div
                className={`rounded-md transition duration-200 ${
                  dates[i] && isBlockedDate(dates[i])
                    ? "border-2 p-[1px]"
                    : "border border-gray-300"
                }`}
              >
                <DatePicker
                  selected={dates[i] || null}
                  onChange={(d) => {
                    const newDates = [...dates];
                    newDates[i] = d;
                    setDates(newDates);
                  }}
                  minDate={threeDaysLater}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="dd/mm/yyyy"
                  className="w-full px-4 py-2 rounded-md bg-white text-black focus:outline-none"
                />
              </div>
            </div>

            <div className="md:col-span-1">
              <label className="block text-xs font-medium text-gray-500 mb-1">Time</label>
              <select
                name={`appointment_time_${i}`}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-800 focus:border-green-800 transition bg-white text-black"
                value={appointmentTimes[i] || "09:00"}
                onChange={(e) => {
                  const newTimes = [...appointmentTimes];
                  newTimes[i] = e.target.value;
                  setAppointmentTimes(newTimes);
                }}
              >
                {Array.from({ length: 7 }, (_, k) => k * 2 + 9).map((hour) => {
                  const time = `${String(hour).padStart(2, "0")}:00`;
                  return (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  );
                })}
              </select>
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
          {...register("concern")}
        />
      </div>
    </Section>
  );
}
