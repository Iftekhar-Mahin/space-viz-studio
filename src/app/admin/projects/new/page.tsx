"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema, type ProjectFormData } from "@/lib/validations";
import { createProject } from "@/actions/projects";
import { ArrowLeft, Save, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function NewProjectPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      featured: false,
      year: new Date().getFullYear(),
    },
  });

  const onSubmit = async (data: ProjectFormData) => {
    setStatus("loading");
    const result = await createProject(data);

    if (result.success) {
      setStatus("success");
      setMessage("Project created successfully!");
      setTimeout(() => router.push("/admin/projects"), 1500);
    } else {
      setStatus("error");
      setMessage(result.error || "Failed to create project.");
    }
  };

  const inputClasses =
    "w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-accent transition-colors text-sm";
  const labelClasses =
    "block text-white/60 text-xs uppercase tracking-widest mb-2";

  return (
    <div>
      <Link
        href="/admin/projects"
        className="inline-flex items-center gap-2 text-white/40 hover:text-accent text-sm mb-6 transition-colors"
      >
        <ArrowLeft size={14} /> Back to Projects
      </Link>

      <h1 className="font-heading text-3xl text-white font-bold mb-8">
        Add New Project
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-dark-surface border border-white/10 rounded p-8 space-y-6 max-w-3xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClasses}>Project Name *</label>
            <input
              type="text"
              placeholder="e.g. Coastal Serenity Villa"
              className={inputClasses}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className={labelClasses}>Location *</label>
            <input
              type="text"
              placeholder="e.g. Malibu, California"
              className={inputClasses}
              {...register("location")}
            />
            {errors.location && (
              <p className="text-red-400 text-xs mt-1">{errors.location.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className={labelClasses}>Category *</label>
            <select className={inputClasses} {...register("category")}>
              <option value="">Select category</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Interior">Interior</option>
              <option value="Landscape">Landscape</option>
            </select>
            {errors.category && (
              <p className="text-red-400 text-xs mt-1">{errors.category.message}</p>
            )}
          </div>
          <div>
            <label className={labelClasses}>Year *</label>
            <input
              type="number"
              className={inputClasses}
              {...register("year", { valueAsNumber: true })}
            />
            {errors.year && (
              <p className="text-red-400 text-xs mt-1">{errors.year.message}</p>
            )}
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-5 h-5 accent-accent"
                {...register("featured")}
              />
              <span className="text-white/60 text-sm">Featured Project</span>
            </label>
          </div>
        </div>

        <div>
          <label className={labelClasses}>Hero Image URL *</label>
          <input
            type="url"
            placeholder="https://images.unsplash.com/..."
            className={inputClasses}
            {...register("heroImage")}
          />
          {errors.heroImage && (
            <p className="text-red-400 text-xs mt-1">{errors.heroImage.message}</p>
          )}
        </div>

        <div>
          <label className={labelClasses}>Client Need / Problem *</label>
          <textarea
            rows={3}
            placeholder="What challenge did the client face?"
            className={`${inputClasses} resize-none`}
            {...register("problem")}
          />
          {errors.problem && (
            <p className="text-red-400 text-xs mt-1">{errors.problem.message}</p>
          )}
        </div>

        <div>
          <label className={labelClasses}>Design Approach / Solution *</label>
          <textarea
            rows={3}
            placeholder="How did you solve it?"
            className={`${inputClasses} resize-none`}
            {...register("solution")}
          />
          {errors.solution && (
            <p className="text-red-400 text-xs mt-1">{errors.solution.message}</p>
          )}
        </div>

        <div>
          <label className={labelClasses}>Outcome / Result *</label>
          <textarea
            rows={3}
            placeholder="What was the final result?"
            className={`${inputClasses} resize-none`}
            {...register("outcome")}
          />
          {errors.outcome && (
            <p className="text-red-400 text-xs mt-1">{errors.outcome.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClasses}>Before Image URL (optional)</label>
            <input
              type="url"
              placeholder="https://..."
              className={inputClasses}
              {...register("beforeImage")}
            />
          </div>
          <div>
            <label className={labelClasses}>After Image URL (optional)</label>
            <input
              type="url"
              placeholder="https://..."
              className={inputClasses}
              {...register("afterImage")}
            />
          </div>
        </div>

        {/* Status */}
        {status === "success" && (
          <div className="flex items-center gap-2 text-green-400 bg-green-400/10 p-4 text-sm">
            <CheckCircle size={16} /> {message}
          </div>
        )}
        {status === "error" && (
          <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-4 text-sm">
            <AlertCircle size={16} /> {message}
          </div>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary disabled:opacity-50"
        >
          {status === "loading" ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Saving...
            </>
          ) : (
            <>
              <Save size={16} /> Create Project
            </>
          )}
        </button>
      </form>
    </div>
  );
}
