"use client";

import { useState } from "react";
import Image from "next/image";
import { UploadCloud, Loader2, X } from "lucide-react";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.url) {
        onChange(data.url);
      } else {
        alert(data.error || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full">
      {label && <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">{label}</label>}
      {value ? (
        <div className="relative aspect-video rounded overflow-hidden group border border-white/10">
          <Image src={value} alt="Uploaded preview" fill className="object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            title="Remove Image"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full aspect-video md:aspect-[21/9] border-2 border-dashed border-white/20 hover:border-accent bg-white/5 transition-colors cursor-pointer rounded">
          {isUploading ? (
            <div className="flex flex-col items-center gap-2 text-white/40">
              <Loader2 className="animate-spin" size={24} />
              <span className="text-sm">Uploading...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-white/40 group">
              <UploadCloud size={32} className="group-hover:text-accent transition-colors" />
              <span className="text-sm">Click or drag photo to upload</span>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </label>
      )}
    </div>
  );
}
