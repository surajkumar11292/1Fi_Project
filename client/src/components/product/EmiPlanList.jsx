/**
 * ============================================================================
 * EMI PLAN LIST & SELECTOR (components/product/EmiPlanList.jsx)
 * ============================================================================
 * Purpose:
 *   Core fintech component for the 1Fi Marketplace product detail experience.
 *   Displays available EMI repayment tenures (3, 6, 9, 12, 24 months),
 *   recalculates monthly installments dynamically based on the selected variant,
 *   highlights 0% No-Cost subsidies and cashback perks, and allows user selection.
 * ============================================================================
 */

import React from 'react';
import { Percent, Gift, CheckCircle2, ShieldCheck, Zap, Info } from 'lucide-react';

export const EmiPlanList = ({
  emiPlans = [],
  selectedPlan,
  onSelectPlan,
  currentPrice = 0,
}) => {
  if (!emiPlans || emiPlans.length === 0) return null;

  return (
    <div className="mb-8">
      {/* Header & Section Title */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <span>Select Repayment Plan</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-brand-700">
              1Fi Credit Line
            </span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Choose your preferred monthly installment tenure.
          </p>
        </div>

        <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
          <Percent className="w-3 h-3 text-emerald-600" />
          <span>0% Interest Available</span>
        </div>
      </div>

      {/* Grid of Selectable EMI Plan Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {emiPlans.map((plan) => {
          const isSelected = selectedPlan && selectedPlan.tenureMonths === plan.tenureMonths;

          // Compute dynamic installment for the current active variant price
          let dynamicInstallment = plan.monthlyInstallment;
          if (currentPrice > 0) {
            if (plan.isNoCost || plan.interestRate === 0) {
              dynamicInstallment = Math.round(currentPrice / plan.tenureMonths);
            } else {
              const r = plan.interestRate / 12 / 100;
              const f = Math.pow(1 + r, plan.tenureMonths);
              dynamicInstallment = Math.round((currentPrice * r * f) / (f - 1));
            }
          }

          return (
            <div
              key={plan.tenureMonths}
              onClick={() => onSelectPlan({ ...plan, computedInstallment: dynamicInstallment })}
              className={`cursor-pointer rounded-2xl p-4 border transition-all relative flex flex-col justify-between ${
                isSelected
                  ? 'border-brand-600 bg-purple-50/40 ring-2 ring-brand-500/20 shadow-md'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              {/* Badge Overlays (No-Cost EMI or Cashback) */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-slate-900">
                  {plan.tenureMonths} Months
                </span>

                {plan.isNoCost ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    <Percent className="w-2.5 h-2.5" />
                    0% No-Cost EMI
                  </span>
                ) : (
                  <span className="text-[11px] font-medium text-slate-500">
                    {plan.interestRate}% p.a.
                  </span>
                )}
              </div>

              {/* Monthly Installment Amount */}
              <div className="flex items-baseline gap-1 my-1">
                <span className="text-lg font-extrabold text-slate-900">
                  ₹{dynamicInstallment.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-slate-500 font-medium">/month</span>
              </div>

              {/* Perks & Cashback Indicator */}
              <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">
                  {plan.processingFee === 0 ? '₹0 Processing Fee' : `₹${plan.processingFee} Fee`}
                </span>

                {plan.cashbackAmount > 0 && (
                  <span className="flex items-center gap-1 font-semibold text-brand-700 bg-brand-50 px-1.5 py-0.5 rounded-md">
                    <Gift className="w-3 h-3 text-brand-600" />
                    ₹{plan.cashbackAmount} Cashback
                  </span>
                )}
              </div>

              {/* Selected Check Indicator */}
              {isSelected && (
                <div className="absolute top-2 right-2 text-brand-600">
                  <CheckCircle2 className="w-4 h-4 fill-brand-600 text-white" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Plan Summary Breakdown Banner */}
      {selectedPlan && (
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/90 text-xs">
          <div className="flex items-center gap-2 text-slate-800 font-bold mb-2">
            <Info className="w-4 h-4 text-brand-600" />
            <span>Financing Breakdown ({selectedPlan.tenureMonths} Months Plan)</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-600 pt-1">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">Monthly Due</span>
              <span className="font-bold text-slate-900 text-sm">
                ₹{(
                  selectedPlan.computedInstallment ||
                  (selectedPlan.isNoCost
                    ? Math.round(currentPrice / selectedPlan.tenureMonths)
                    : selectedPlan.monthlyInstallment)
                ).toLocaleString('en-IN')}
              </span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 block uppercase">Down Payment</span>
              <span className="font-bold text-emerald-600 text-sm">₹0 (Zero Down)</span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 block uppercase">Interest Rate</span>
              <span className="font-bold text-slate-900 text-sm">
                {selectedPlan.isNoCost ? '0% (Subsidized)' : `${selectedPlan.interestRate}% p.a.`}
              </span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 block uppercase">Processing Fee</span>
              <span className="font-bold text-slate-900 text-sm">
                {selectedPlan.processingFee === 0 ? '₹0 Free' : `₹${selectedPlan.processingFee}`}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmiPlanList;
