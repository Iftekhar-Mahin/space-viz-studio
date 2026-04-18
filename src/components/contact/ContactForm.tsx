"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";
import { submitContactForm } from "@/actions/contact";
import { PROJECT_TYPES, BUDGET_RANGES } from "@/lib/utils";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    const result = await submitContactForm(data);

    if (result.success) {
      setStatus("success");
      setMessage(result.message || "Sent successfully!");
      reset();
      setTimeout(() => setStatus("idle"), 5000);
    } else {
      setStatus("error");
      setMessage(result.error || "Something went wrong.");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const inputClasses =
    "w-full px-4 py-3.5 bg-white border border-border rounded-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-colors text-sm font-body placeholder:text-text-light/50";
  const labelClasses =
    "block text-xs uppercase tracking-widest text-text font-semibold mb-2";
  const errorClasses = "text-red-500 text-xs mt-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" id="contact-form">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="John Smith"
            className={inputClasses}
            {...register("name")}
          />
          {errors.name && (
            <p className={errorClasses}>{errors.name.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="john@example.com"
            className={inputClasses}
            {...register("email")}
          />
          {errors.email && (
            <p className={errorClasses}>{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="projectType" className={labelClasses}>
            Project Type
          </label>
          <select
            id="projectType"
            className={inputClasses}
            {...register("projectType")}
          >
            <option value="">Select project type</option>
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.projectType && (
            <p className={errorClasses}>{errors.projectType.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="budget" className={labelClasses}>
            Budget Range
          </label>
          <select
            id="budget"
            className={inputClasses}
            {...register("budget")}
          >
            <option value="">Select budget range</option>
            {BUDGET_RANGES.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
          {errors.budget && (
            <p className={errorClasses}>{errors.budget.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClasses}>
          Tell Us About Your Vision
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Describe your project, goals, and any specific requirements..."
          className={`${inputClasses} resize-none`}
          {...register("message")}
        />
        {errors.message && (
          <p className={errorClasses}>{errors.message.message}</p>
        )}
      </div>

      {/* Status Messages */}
      {status === "success" && (
        <div className="flex items-center gap-2 text-green-600 bg-green-50 p-4 text-sm">
          <CheckCircle size={18} />
          {message}
        </div>
      )}
      {status === "error" && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 text-sm">
          <AlertCircle size={18} />
          {message}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send size={16} />
            Get a Free Consultation
          </>
        )}
      </button>
    </form>
  );
}
