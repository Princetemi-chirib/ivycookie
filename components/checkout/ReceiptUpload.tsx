// components/checkout/ReceiptUpload.tsx
'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { UploadCloud, X, FileImage } from 'lucide-react';

type ReceiptUploadProps = {
  file: File | null;
  onChange: (file: File | null) => void;
  error?: string;
};

export default function ReceiptUpload({ file, onChange, error }: ReceiptUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = (selected: File | null) => {
    onChange(selected);
    if (selected && selected.type.startsWith('image/')) {
      setPreview(URL.createObjectURL(selected));
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="rounded-2xl border border-primary-100 p-6">
      <h2 className="font-heading text-lg font-semibold text-gray-900">Upload Payment Receipt</h2>
      <p className="mt-1 text-sm text-gray-500">
        Screenshot or photo of your transfer confirmation (JPG, PNG, or PDF — max 5MB).
      </p>

      <input
        ref={inputRef}
        type="file"
        accept="image/*,application/pdf"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
      />

      {!file ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-4 flex w-full flex-col items-center gap-2 rounded-xl border-2 border-dashed border-primary-200 py-8 text-primary-500 transition hover:border-primary-400 hover:bg-primary-50"
        >
          <UploadCloud size={28} />
          <span className="text-sm font-medium">Tap to upload receipt</span>
        </button>
      ) : (
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-primary-200 bg-primary-50/60 p-3">
          {preview ? (
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
              <Image src={preview} alt="Receipt preview" fill className="object-cover" sizes="56px" />
            </div>
          ) : (
            <FileImage size={32} className="shrink-0 text-primary-400" />
          )}
          <span className="flex-1 truncate text-sm text-gray-700">{file.name}</span>
          <button
            type="button"
            onClick={() => handleFile(null)}
            className="shrink-0 rounded-full p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500"
            aria-label="Remove file"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
    </div>
  );
}