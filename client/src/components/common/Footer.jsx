/**
 * ============================================================================
 * FOOTER COMPONENT (components/common/Footer.jsx)
 * ============================================================================
 * Purpose:
 *   Desktop & mobile footer providing fintech trust signals, RBI partner
 *   disclaimers, category shortcuts, and links.
 * ============================================================================
 */

import React from 'react';
import { ShieldCheck, Zap, Award, HelpCircle } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full bg-slate-900 text-slate-400 border-t border-slate-800 pt-12 pb-16 md:pb-12 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust & Fintech Signals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-10 border-b border-slate-800">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-900/50 border border-brand-700/50 flex items-center justify-center text-brand-400 flex-shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-base">Instant Credit Approval</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Paperless approval in under 60 seconds with zero manual documentation.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/50 border border-emerald-700/50 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-base">0% No-Cost EMI</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Subsidized interest plans on top electronics from verified brand partners.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-950/50 border border-blue-700/50 flex items-center justify-center text-blue-400 flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-base">100% RBI Regulated</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Financing facilitated through licensed NBFC and scheduled banking partners.
              </p>
            </div>
          </div>
        </div>

        {/* Brand & Regulatory Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold text-xs">
              1Fi
            </div>
            <span className="font-semibold text-white">1Fi Technologies Pvt. Ltd.</span>
            <span className="text-slate-500">| SDE Intern Assignment Demonstration</span>
          </div>

          <p className="text-slate-500 text-center md:text-right max-w-lg">
            Loans are offered by RBI-approved NBFC partners. Approval is subject to credit policy and KYC verification.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
