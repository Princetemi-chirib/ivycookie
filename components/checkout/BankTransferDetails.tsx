// components/checkout/BankTransferDetails.tsx
'use client';

import { useState } from 'react';
import { Copy, Check, Landmark } from 'lucide-react';

const BANK_DETAILS = {
  bankName: 'Moniepoint MFB',
  accountNumber: '4005722890',
  accountName: 'IVYCOOKIECARE NG',
};

export default function BankTransferDetails() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(BANK_DETAILS.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-primary-100 p-6">
      <div className="flex items-center gap-2">
        <Landmark size={18} className="text-primary-600" />
        <h2 className="font-heading text-lg font-semibold text-gray-900">Bank Transfer Details</h2>
      </div>

      <p className="mt-2 text-sm text-gray-500">
        Transfer the exact order total to the account below, then upload your receipt to complete your order.
      </p>

      <div className="mt-4 space-y-3 rounded-xl bg-primary-50/60 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Bank Name</p>
            <p className="text-sm font-semibold text-gray-900">{BANK_DETAILS.bankName}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Account Number</p>
            <p className="font-mono text-base font-semibold tracking-wide text-primary-600">
              {BANK_DETAILS.accountNumber}
            </p>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-primary-600 shadow-sm ring-1 ring-primary-200 hover:bg-primary-50"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Account Name</p>
          <p className="text-sm font-semibold text-gray-900">{BANK_DETAILS.accountName}</p>
        </div>
      </div>
    </div>
  );
}