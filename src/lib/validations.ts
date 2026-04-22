import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  projectType: z.string().min(1, "Please select a project type"),
  budget: z.string().min(1, "Please select a budget range"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const projectSchema = z.object({
  name: z.string().min(2, "Project name is required"),
  location: z.string().min(2, "Location is required"),
  category: z.string().min(1, "Category is required"),
  problem: z.string().min(10, "Client need description is required"),
  solution: z.string().min(10, "Design approach is required"),
  outcome: z.string().min(10, "Result description is required"),
  heroImage: z.string().min(1, "Please provide a hero image"),
  images: z.string().optional(),
  beforeImage: z.string().optional(),
  afterImage: z.string().optional(),
  featured: z.boolean().optional(),
  year: z.number().min(2000).max(2030),
});

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(4, "Password is required"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type ProjectFormData = z.infer<typeof projectSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
