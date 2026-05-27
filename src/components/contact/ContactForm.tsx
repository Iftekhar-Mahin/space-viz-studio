"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";
import { submitContactForm } from "@/actions/contact";
import { PROJECT_TYPES, BUDGET_RANGES } from "@/lib/utils";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      projectType: "",
      budget: "",
      message: "",
      website: "",
      turnstileToken: "",
    }
  });

  // Dynamically load Cloudflare Turnstile if site key is configured
  useEffect(() => {
    if (!siteKey) return;

    // Define turnstile callback
    (window as any).onTurnstileLoad = () => {
      if ((window as any).turnstile) {
        try {
          (window as any).turnstile.render("#turnstile-container", {
            sitekey: siteKey,
            callback: (token: string) => {
              setTurnstileToken(token);
            },
            "expired-callback": () => {
              setTurnstileToken("");
            },
            "error-callback": () => {
              setTurnstileToken("");
            }
          });
        } catch (err) {
          console.error("Turnstile render error:", err);
        }
      }
    };

    // Append script
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      // Clean up script
      document.body.removeChild(script);
      delete (window as any).onTurnstileLoad;
      // Reset Turnstile state in global
      if ((window as any).turnstile) {
        try {
          (window as any).turnstile.remove();
        } catch {}
      }
    };
  }, [siteKey]);

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    
    // Inject Turnstile token into payload
    const result = await submitContactForm({
      ...data,
      turnstileToken,
    });

    if (result.success) {
      setStatus("success");
      setMessage(result.message || "Sent successfully!");
      reset();
      setTurnstileToken("");
      // Reset Turnstile widget UI if active
      if ((window as any).turnstile) {
        try {
          (window as any).turnstile.reset();
        } catch {}
      }
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
      {/* Honeypot field (hidden from users, auto-filled by bots) */}
      <div className="absolute opacity-0 -z-50 pointer-events-none w-0 h-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          placeholder="Leave this blank if you are human"
          {...register("website")}
        />
      </div>

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
            type="type" // intentionally type="text" or "email" but type="email" is safe
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

      {/* Cloudflare Turnstile Container */}
      {siteKey && (
        <div className="flex justify-start my-4">
          <div id="turnstile-container"></div>
        </div>
      )}

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
