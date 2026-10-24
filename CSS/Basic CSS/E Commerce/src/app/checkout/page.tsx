'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Info,
  MapPin,
  Lock,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { formatLKR, validatePromoCode } from '@/lib/utils';
import { SRI_LANKA_DISTRICTS, SRI_LANKA_PROVINCES, getDeliveryFeeForDistrict, FREE_DELIVERY_THRESHOLD } from '@/lib/sriLankaData';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, clearCart, totalItems } = useCart();
  const { user } = useAuth();
  const { showToast } = useToast();

  // Sri Lanka Shipping Form
  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [streetAddress, setStreetAddress] = useState(user?.address || '');
  const [city, setCity] = useState(user?.city || '');
  const [district, setDistrict] = useState(user?.district || 'Colombo');
  const [province, setProvince] = useState('Western Province');
  const [postalCode, setPostalCode] = useState('00100');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'payhere_card'>('cod');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Automatically update province and estimated postal code when district changes
  useEffect(() => {
    const found = SRI_LANKA_DISTRICTS.find((d) => d.name === district);
    if (found) {
      setProvince(found.province);
      if (!postalCode || postalCode === '00100') {
        setPostalCode(found.postalCodeExample);
      }
    }
  }, [district]);

  // Sync user profile if available
  useEffect(() => {
    if (user) {
      if (!fullName) setFullName(user.name);
      if (!email) setEmail(user.email);
      if (user.phone && !phone) setPhone(user.phone);
      if (user.address && !streetAddress) setStreetAddress(user.address);
      if (user.city && !city) setCity(user.city);
      if (user.district) setDistrict(user.district);
    }
  }, [user]);

  // Delivery fee calculation
  const deliveryFee = getDeliveryFeeForDistrict(district, subtotal);
  const total = Math.max(0, subtotal + deliveryFee - discount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const res = validatePromoCode(promoCode, subtotal);
    if (res.valid) {
      setDiscount(res.discount);
      showToast(res.message, 'success');
    } else {
      setDiscount(0);
      showToast(res.message, 'error');
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (cart.length === 0) {
      showToast('Your cart is empty', 'error');
      router.push('/products');
      return;
    }

    if (!fullName || !email || !phone || !streetAddress || !city || !district) {
      setErrorMessage('Please complete all required delivery details.');
      showToast('Please fill all required shipping fields', 'error');
      return;
    }

    // Never simulate successful fake payment if online card gateway is chosen without credentials
    if (paymentMethod === 'payhere_card') {
      showToast('Online Card / PayHere gateway requires merchant activation keys. Please select Cash on Delivery (COD) to place your order.', 'info');
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        fullName,
        email,
        phone,
        streetAddress,
        city,
        district,
        province,
        postalCode,
        deliveryNotes,
        paymentMethod,
        promoCode: promoCode || undefined,
        items: cart.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          selectedColor: item.selectedColor,
          selectedSize: item.selectedSize,
        })),
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to place order');
      }

      // Order created successfully in real database
      clearCart();
      showToast('Order confirmed! We are preparing your shipment.', 'success');
      router.push(`/order-confirmation/${data.order.id}`);
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
      showToast(err.message || 'Error processing order', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="bg-slate-50 min-h-screen py-16 flex items-center justify-center">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center max-w-md w-full shadow-subtle space-y-4">
          <h2 className="text-xl font-bold text-navy-900">Your cart is empty</h2>
          <p className="text-xs text-slate-500">Add products before proceeding to checkout.</p>
          <Link
            href="/products"
            className="inline-block bg-navy-900 text-white font-bold px-6 py-2.5 rounded-full text-xs"
          >
            Go to Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-navy-900 tracking-tight">
            Checkout & Delivery
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Complete your Sri Lankan address details to confirm your order with Cash on Delivery.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 flex items-center gap-3 text-red-700 text-xs sm:text-sm font-semibold">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Form: Delivery & Payment (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Delivery Details */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-subtle p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                <MapPin className="w-5 h-5 text-electric-600" />
                <h2 className="text-base font-extrabold text-navy-900">
                  1. Sri Lankan Delivery Address
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kasun Perera"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
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
                    placeholder="e.g. kasun@example.lk"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-navy-900 outline-none focus:border-electric-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Mobile Phone Number (For Courier Call) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 077 123 4567 or +94 77 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-navy-900 outline-none focus:border-electric-500"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    The delivery courier will call this number prior to arrival at your doorstep.
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Street Address / House No. / Apartment <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. No. 24/B, Galle Road, Bambalapitiya"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-navy-900 outline-none focus:border-electric-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    City / Town <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Colombo 04 / Kandy"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-navy-900 outline-none focus:border-electric-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    District <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-navy-900 outline-none focus:border-electric-500 cursor-pointer"
                  >
                    {SRI_LANKA_DISTRICTS.map((d) => (
                      <option key={d.name} value={d.name}>
                        {d.name} ({d.province.replace(' Province', '')})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Province
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={province}
                    className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-600 outline-none cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 00400"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-navy-900 outline-none focus:border-electric-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Delivery Instructions / Landmark (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Near supermarket, deliver after 2 PM..."
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-navy-900 outline-none focus:border-electric-500 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-subtle p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                <Banknote className="w-5 h-5 text-emerald-600" />
                <h2 className="text-base font-extrabold text-navy-900">
                  2. Payment Method
                </h2>
              </div>

              <div className="space-y-3">
                {/* Cash on Delivery option (Primary) */}
                <label
                  onClick={() => setPaymentMethod('cod')}
                  className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'border-emerald-500 bg-emerald-50/30'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-1 w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-sm text-navy-900 flex items-center gap-1.5">
                        Cash on Delivery (COD)
                        <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Recommended
                        </span>
                      </span>
                      <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    </div>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Pay cash in Sri Lankan Rupees directly to our courier agent when your package is delivered to your doorstep. Inspect package contents before paying.
                    </p>
                  </div>
                </label>

                {/* Online Payment Structure (PayHere / Card Ready) */}
                <label
                  onClick={() => setPaymentMethod('payhere_card')}
                  className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                    paymentMethod === 'payhere_card'
                      ? 'border-electric-500 bg-electric-50/30'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'payhere_card'}
                    onChange={() => setPaymentMethod('payhere_card')}
                    className="mt-1 w-4 h-4 text-electric-600 focus:ring-electric-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-sm text-navy-900 flex items-center gap-1.5">
                        Online Card Payment (PayHere Sri Lanka)
                      </span>
                      <CreditCard className="w-5 h-5 text-electric-600" />
                    </div>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Visa, Mastercard, FriMi, and Genie integration structure.
                    </p>

                    {paymentMethod === 'payhere_card' && (
                      <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 space-y-1">
                        <div className="font-bold flex items-center gap-1">
                          <Info className="w-4 h-4 text-amber-600" />
                          <span>Merchant Key Integration Architecture</span>
                        </div>
                        <p className="text-[11px] leading-relaxed">
                          PayHere gateway architecture is prepared in the backend. As per safety guidelines, simulated fake card approvals are blocked without verified merchant credentials. Please choose <strong>Cash on Delivery (COD)</strong> to place and confirm your order right now.
                        </p>
                      </div>
                    )}
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Summary: Items & Total (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-subtle p-6 sm:p-8 space-y-6 sticky top-28">
              <h2 className="font-extrabold text-lg text-navy-900 border-b border-slate-100 pb-3">
                Order Review ({totalItems} items)
              </h2>

              {/* Items List preview */}
              <div className="max-h-60 overflow-y-auto space-y-3 divide-y divide-slate-100 pr-1">
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                    className="pt-3 first:pt-0 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded-xl border border-slate-200 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-bold text-navy-900 truncate">{item.product.name}</p>
                        <p className="text-slate-400 text-[11px]">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold text-navy-900 shrink-0">
                      {formatLKR(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Promo code */}
              <div className="pt-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code (e.g. NEXORA10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono uppercase outline-none focus:border-electric-500"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="bg-navy-900 hover:bg-electric-600 text-white font-bold text-xs px-3 py-2 rounded-xl transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Price Calculation breakdown */}
              <div className="space-y-2.5 pt-3 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-navy-900">{formatLKR(subtotal)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery ({district} District)</span>
                  <span className="font-bold text-navy-900">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600">FREE</span>
                    ) : (
                      formatLKR(deliveryFee)
                    )}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount</span>
                    <span>-{formatLKR(discount)}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
                  <span className="font-extrabold text-sm text-navy-900">Total (LKR)</span>
                  <span className="font-black text-2xl text-navy-900">
                    {formatLKR(total)}
                  </span>
                </div>
              </div>

              {/* Place Order Button */}
              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-navy-900 hover:bg-electric-600 text-white font-extrabold py-4 px-6 rounded-2xl text-sm transition-all shadow-md hover:shadow-electric active:scale-98 disabled:opacity-50"
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    {isSubmitting ? 'Confirming Order...' : `Confirm Order with ${paymentMethod === 'cod' ? 'Cash on Delivery' : 'Card'}`}
                  </span>
                </button>

                <p className="text-[11px] text-slate-500 text-center leading-relaxed">
                  By placing your order, you agree to NEXORA STORE terms of service and delivery policy. You will receive an instant order receipt and tracking reference.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
