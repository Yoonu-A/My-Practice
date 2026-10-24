'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function ContactPage() {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }

    setSubmitted(true);
    showToast('Inquiry sent! A NEXORA representative in Colombo will contact you shortly.', 'success');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-electric-600 block mb-1">
            Colombo Headquarters & Support
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-navy-900 tracking-tight">
            We&apos;re Here to Assist You
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            Have questions about island-wide delivery schedules, product warranties, or bulk corporate purchases? Get in touch with our team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Details & Info Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-subtle p-6 sm:p-8 space-y-6">
              <h2 className="font-extrabold text-base text-navy-900 border-b border-slate-100 pb-3">
                Colombo Showroom & Hub
              </h2>

              <div className="space-y-4 text-xs text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-electric-50 text-electric-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-navy-900 block text-sm">Flagship Showroom</strong>
                    <p className="mt-0.5 leading-relaxed">
                      No. 45, Galle Road, Colombo 03, Western Province, Sri Lanka.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-navy-900 block text-sm">Customer Care Hotlines</strong>
                    <p className="mt-0.5">+94 11 234 5678 (Colombo General)</p>
                    <p className="mt-0.5">+94 77 123 4567 (Mobile / WhatsApp Support)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-navy-900 block text-sm">Email Inquiries</strong>
                    <p className="mt-0.5">support@nexorastore.lk</p>
                    <p className="mt-0.5">orders@nexorastore.lk</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-navy-900 block text-sm">Operating Hours</strong>
                    <p className="mt-0.5">Monday – Saturday: 9:00 AM – 7:00 PM</p>
                    <p className="mt-0.5">Sunday & Poya Holidays: 10:00 AM – 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Island-wide logistics card */}
            <div className="bg-navy-900 text-white rounded-3xl p-6 border border-navy-800 shadow-premium space-y-3">
              <div className="flex items-center gap-2 text-electric-400 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Sri Lanka Delivery Guarantee</span>
              </div>
              <h3 className="font-extrabold text-base">Direct Doorstep Dispatch</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We coordinate dispatch directly from our central Colombo warehouse with professional courier services ensuring safe arrival in all 25 districts.
              </p>
            </div>
          </div>

          {/* Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-subtle p-6 sm:p-10">
              <h2 className="text-xl font-black text-navy-900 mb-1">
                Send Us a Message
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                Fill in the form below and our Colombo team will respond within 24 hours.
              </p>

              {submitted ? (
                <div className="p-8 text-center bg-emerald-50 border border-emerald-200 rounded-2xl space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="font-bold text-base text-emerald-900">Message Received</h3>
                  <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                    Thank you, {name}. A customer care specialist has been assigned to your ticket.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="mt-2 text-xs font-bold text-emerald-800 underline"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Kasun Perera"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-navy-900 outline-none focus:border-electric-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="kasun@example.lk"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-navy-900 outline-none focus:border-electric-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Contact Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="077 123 4567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-navy-900 outline-none focus:border-electric-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Inquiry Topic
                      </label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-navy-900 outline-none focus:border-electric-500 cursor-pointer"
                      >
                        <option value="general">General Store Inquiry</option>
                        <option value="delivery">Cash on Delivery & Shipping Schedule</option>
                        <option value="warranty">TRCSL Approval & Brand Warranty</option>
                        <option value="bulk">Corporate / Bulk Wholesale Orders</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Please write your questions or order references here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-navy-900 outline-none focus:border-electric-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 bg-navy-900 hover:bg-electric-600 text-white font-bold py-3.5 px-8 rounded-xl text-xs sm:text-sm transition-all shadow-md"
                  >
                    <span>Submit Inquiry</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
