"use client";

import { useState } from "react";
import Image from "next/image";
import { UploadCloud, Loader2, X } from "lucide-react";

interface MultiImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  label?: string;
}

export default function MultiImageUpload({ value, onChange, label }: MultiImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const newUrls = [...value];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();

        if (data.url) {
          newUrls.push(data.url);
        } else {
          console.error(data.error || "Upload failed");
        }
      } catch (err) {
        console.error(err);
      }
    }

    onChange(newUrls);
    setIsUploading(false);
  };

  const removeImage = (indexToRemove: number) => {
    onChange(value.filter((_, i) => i !== indexToRemove));
  };

  return (
    <div className="w-full">
      {label && <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">{label}</label>}
      
      {/* Gallery Grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {value.map((url, i) => (
            <div key={i} className="relative aspect-square rounded overflow-hidden group border border-white/10">
              <Image src={url} alt={`Gallery image ${i + 1}`} fill className="object-cover" />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove Image"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload Zone */}
      <label className="flex flex-col items-center justify-center w-full py-8 border-2 border-dashed border-white/20 hover:border-accent bg-white/5 transition-colors cursor-pointer rounded">
        {isUploading ? (
          <div className="flex flex-col items-center gap-2 text-white/40">
            <Loader2 className="animate-spin" size={24} />
            <span className="text-sm">Uploading...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-white/40 group">
            <UploadCloud size={32} className="group-hover:text-accent transition-colors" />
            <span className="text-sm font-medium text-white/80">Add Photos</span>
            <span className="text-xs">Click or drag multiple photos</span>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </label>
    </div>
  );
}
