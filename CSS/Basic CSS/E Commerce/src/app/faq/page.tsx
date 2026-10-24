'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, HelpCircle, Truck, ShieldCheck, Banknote, RotateCcw } from 'lucide-react';

const FAQS = [
  {
    category: 'Delivery & Shipping in Sri Lanka',
    icon: Truck,
    questions: [
      {
        q: 'How long does delivery take across Sri Lanka?',
        a: 'Orders in the Colombo District (Colombo 01 - 15 and suburbs) are delivered within 1 to 2 business days. For outstation districts (Kandy, Galle, Kurunegala, Jaffna, etc.), delivery typically takes 2 to 4 business days via our courier network.',
      },
      {
        q: 'What are the delivery charges for different districts?',
        a: 'Colombo District delivery is Rs. 350. Greater Western Province (Gampaha, Kalutara) is Rs. 450. Outstation delivery ranges between Rs. 550 and Rs. 750 depending on the province. Orders with a subtotal above Rs. 25,000 qualify for 100% FREE Island-wide Delivery!',
      },
      {
        q: 'Can the courier call me before delivering?',
        a: 'Yes! The dispatch courier agent will always telephone your provided Sri Lankan mobile phone number before arriving at your address to ensure you are available.',
      },
    ],
  },
  {
    category: 'Payment & Cash on Delivery (COD)',
    icon: Banknote,
    questions: [
      {
        q: 'How does Cash on Delivery (COD) work at NEXORA STORE?',
        a: 'When your parcel arrives, you pay the exact cash amount printed on the official invoice directly to the delivery agent. You can inspect the outer packaging and security seal before handing over cash.',
      },
      {
        q: 'What currency are your prices listed in?',
        a: 'All prices on NEXORA STORE are strictly listed in Sri Lankan Rupees (LKR / Rs.) inclusive of applicable local taxes.',
      },
      {
        q: 'Are online credit/debit card payments supported?',
        a: 'We have structured our checkout with PayHere Sri Lanka payment architecture. When live merchant keys are connected by the store operator, Visa, Mastercard, Genie, and FriMi payments will activate seamlessly.',
      },
    ],
  },
  {
    category: 'Authenticity & TRCSL Approval',
    icon: ShieldCheck,
    questions: [
      {
        q: 'Are your smartphones and wireless devices TRCSL approved?',
        a: 'Yes, 100%. All cellular devices, 5G smartphones, and wireless radios sold by NEXORA STORE are TRCSL approved for Sri Lanka and carry legitimate serial verification numbers with authorized national distributor warranties.',
      },
      {
        q: 'How do I claim product warranty?',
        a: 'Your invoice serves as your proof of purchase. Simply bring your invoice or order number to our Colombo 03 showroom or any authorized brand service partner (Singer, Abans, Sony LK, Apple Authorized Service Providers) across Sri Lanka.',
      },
    ],
  },
  {
    category: 'Returns & Replacements',
    icon: RotateCcw,
    questions: [
      {
        q: 'What is your return and exchange policy?',
        a: 'We offer a 7-day hassle-free replacement warranty for defective or courier-damaged items. Please contact our Colombo support hotline within 7 days of receiving your package to initiate a free exchange.',
      },
    ],
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    '0-0': true,
    '1-0': true,
  });

  const toggle = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-electric-50 text-electric-600 flex items-center justify-center mx-auto shadow-sm">
            <HelpCircle className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-electric-600">
            Frequently Asked Questions
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-navy-900 tracking-tight">
            Help & Delivery Guidelines
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Everything you need to know about purchasing, shipping, and warranties in Sri Lanka.
          </p>
        </div>

        <div className="space-y-8">
          {FAQS.map((category, catIdx) => {
            const Icon = category.icon;
            return (
              <div key={catIdx} className="bg-white rounded-3xl border border-slate-200/90 shadow-subtle p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-navy-900">
                    <Icon className="w-4 h-4 text-electric-600" />
                  </div>
                  <h2 className="font-extrabold text-base text-navy-900">
                    {category.category}
                  </h2>
                </div>

                <div className="divide-y divide-slate-100">
                  {category.questions.map((faq, qIdx) => {
                    const id = `${catIdx}-${qIdx}`;
                    const isOpen = Boolean(openItems[id]);

                    return (
                      <div key={qIdx} className="py-3.5 first:pt-1 last:pb-1">
                        <button
                          onClick={() => toggle(id)}
                          className="w-full flex items-center justify-between text-left text-xs sm:text-sm font-bold text-navy-900 hover:text-electric-600 transition-colors gap-4"
                        >
                          <span>{faq.q}</span>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${
                              isOpen ? 'rotate-180 text-electric-600' : ''
                            }`}
                          />
                        </button>

                        {isOpen && (
                          <div className="mt-2.5 text-xs text-slate-600 leading-relaxed pl-1 animate-in fade-in">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Still have questions? */}
        <div className="mt-12 bg-navy-950 text-white rounded-3xl p-8 text-center space-y-4 border border-navy-800">
          <h3 className="text-xl font-bold">Still have questions?</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Our Colombo customer support team is available Monday through Saturday to answer any inquiries.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="bg-electric-600 hover:bg-electric-500 text-white font-bold text-xs px-6 py-3 rounded-full transition-colors shadow-electric"
            >
              Contact Customer Care
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
