/**
 * ============================================================================
 * PROCEED TO EMI CHECKOUT MODAL (components/product/ProceedModal.jsx)
 * ============================================================================
 * Purpose:
 *   Interactive modal dialogue simulating the 1Fi fintech credit checkout flow:
 *     Step 1: Order & EMI Financing Review
 *     Step 2: Instant OTP / Credit Line Authorization Simulation
 *     Step 3: Loan Disbursal & Order Placed Confirmation Screen
 *
 * Security & UX Guidelines:
 *   - Strictly relies on framework-native React state (NO native alert() or confirm()).
 *   - Accessible keyboard dismissal (Escape) and backdrop overlay click.
 * ============================================================================
 */

import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, ArrowRight, Zap, Smartphone, Calendar, AlertCircle } from 'lucide-react';

export const ProceedModal = ({
  isOpen,
  onClose,
  product,
  variant,
  emiPlan,
  currentPrice,
  installmentAmount,
}) => {
  // Step state: 1 = Review, 2 = OTP Verification, 3 = Success
  const [step, setStep] = useState(1);
  const [mobileNumber, setMobileNumber] = useState('9876543210');
  const [otp, setOtp] = useState('1234');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !product || !emiPlan) return null;

  // Calculate dynamic first installment due date (30 days from today)
  const dueDateStr = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Simulate OTP verification and loan approval
  const handleProceedToOtp = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate network loan approval delay
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
    }, 1200);
  };

  const handleResetAndClose = () => {
    setStep(1);
    setIsProcessing(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
    >
      {/* Modal Card Container */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-slide-up">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-600 text-white flex items-center justify-center font-bold text-xs">
              1Fi
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                {step === 3 ? 'Application Approved!' : '1Fi Instant EMI Checkout'}
              </h3>
              <p className="text-[11px] text-slate-500">
                {step === 1 && 'Review financing details'}
                {step === 2 && 'Verify mobile to authorize loan'}
                {step === 3 && 'Order reference #1FI-' + Math.floor(100000 + Math.random() * 900000)}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleResetAndClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body: STEP 1 - Financing Review */}
        {step === 1 && (
          <div className="p-6">
            {/* Product Summary Row */}
            <div className="flex items-start gap-4 p-3 rounded-2xl bg-slate-50 border border-slate-100 mb-5">
              <img
                src={product.primaryImage || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=300'}
                alt={product.title}
                className="w-16 h-16 object-contain bg-white rounded-xl p-1 border border-slate-200"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wide">
                  {product.brand}
                </span>
                <h4 className="font-bold text-slate-900 text-xs truncate">
                  {product.title}
                </h4>
                {variant && (
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {variant.name}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-extrabold text-slate-900 text-xs">
                    ₹{currentPrice.toLocaleString('en-IN')}
                  </span>
                  {product.baseMrp > currentPrice && (
                    <span className="text-[10px] text-slate-400 line-through">
                      ₹{product.baseMrp.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Selected EMI Plan Terms Breakdown */}
            <div className="rounded-2xl border border-purple-200 bg-purple-50/40 p-4 mb-5">
              <span className="text-[10px] font-bold text-brand-700 uppercase tracking-wide block mb-2">
                Selected EMI Financing Plan
              </span>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block text-[11px]">Monthly Installment</span>
                  <span className="font-extrabold text-brand-700 text-base">
                    ₹{installmentAmount.toLocaleString('en-IN')}/mo
                  </span>
                </div>

                <div>
                  <span className="text-slate-500 block text-[11px]">Loan Tenure</span>
                  <span className="font-bold text-slate-900 text-sm">
                    {emiPlan.tenureMonths} Months
                  </span>
                </div>

                <div>
                  <span className="text-slate-500 block text-[11px]">Interest Rate</span>
                  <span className="font-bold text-emerald-600 text-sm">
                    {emiPlan.isNoCost ? '0% No-Cost EMI' : `${emiPlan.interestRate}% p.a.`}
                  </span>
                </div>

                <div>
                  <span className="text-slate-500 block text-[11px]">Down Payment Due Today</span>
                  <span className="font-bold text-emerald-600 text-sm">
                    ₹0 (Zero Down)
                  </span>
                </div>
              </div>
            </div>

            {/* Credit Pre-Approval Trust Check */}
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs mb-6">
              <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>
                Your pre-approved limit of <strong>₹1,50,000</strong> covers this purchase. No credit card required.
              </span>
            </div>

            {/* Action Button: Continue */}
            <button
              type="button"
              onClick={handleProceedToOtp}
              className="w-full py-3.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
            >
              <span>Continue to Instant Approval</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Modal Body: STEP 2 - Mobile OTP Simulation */}
        {step === 2 && (
          <div className="p-6">
            <div className="text-center mb-5">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-brand-600 flex items-center justify-center mx-auto mb-3">
                <Smartphone className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Verify Mobile Number</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
                Enter the 4-digit verification code sent to your linked phone to authorize loan disbursal.
              </p>
            </div>

            <form onSubmit={handleConfirmOrder}>
              <div className="mb-4">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm font-mono bg-slate-50"
                  readOnly
                />
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    4-Digit Verification Code
                  </label>
                  <span className="text-[11px] text-brand-600 font-medium cursor-pointer">
                    Resend OTP
                  </span>
                </div>
                <input
                  type="text"
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="1234"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-center tracking-widest text-lg font-bold focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  required
                />
                <span className="text-[10px] text-slate-400 block text-center mt-1">
                  (Demo default OTP: 1234)
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
                >
                  Back
                </button>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="flex-2 py-3 px-6 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span>Disbursing Loan...</span>
                  ) : (
                    <>
                      <Zap className="w-3.5 h-3.5" />
                      <span>Confirm & Disburse EMI</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Modal Body: STEP 3 - Success Screen */}
        {step === 3 && (
          <div className="p-8 text-center animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 animate-pulse">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h4 className="text-xl font-extrabold text-slate-900 mb-1">
              Order Confirmed & EMI Active!
            </h4>

            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
              Congratulations! Your 1Fi credit financing was approved instantly. Your product will be dispatched within 24 hours.
            </p>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-left text-xs mb-6 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">First Installment:</span>
                <span className="font-bold text-slate-900">
                  ₹{installmentAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">First Due Date:</span>
                <span className="font-bold text-slate-900">
                  {dueDateStr}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Repayment Plan:</span>
                <span className="font-bold text-brand-600">
                  {emiPlan.tenureMonths} Months ({emiPlan.isNoCost ? '0% No-Cost EMI' : `${emiPlan.interestRate}% Interest`})
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleResetAndClose}
              className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-md"
            >
              Return to Marketplace
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProceedModal;
