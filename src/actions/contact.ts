"use server";

import { prisma } from "@/lib/db";
import { contactFormSchema } from "@/lib/validations";
import { rateLimit } from "@/lib/rate-limit";

export async function submitContactForm(formData: {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}) {
  // Rate limiting
  const { success } = rateLimit(formData.email, 3, 60000);
  if (!success) {
    return { error: "Too many submissions. Please try again in a minute." };
  }

  // Validate
  const parsed = contactFormSchema.safeParse(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
    const lead = await prisma.lead.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        projectType: parsed.data.projectType,
        budget: parsed.data.budget,
        message: parsed.data.message,
        tag: parsed.data.projectType.toLowerCase(),
      },
    });

    // Log email notification (in production, use nodemailer)
    console.log(`[EMAIL] New lead from ${lead.name} (${lead.email})`);
    console.log(`[EMAIL] Project: ${lead.projectType}, Budget: ${lead.budget}`);

    return { success: true, message: "Thank you! We'll be in touch within 24 hours." };
  } catch {
    return { error: "Something went wrong. Please try again." };
  }
}

export async function getLeads(filter?: string) {
  const where = filter && filter !== "all" ? { tag: filter } : {};
  return prisma.lead.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
}

export async function markLeadRead(id: string) {
  return prisma.lead.update({
    where: { id },
    data: { read: true },
  });
}

export async function getLeadStats() {
  const total = await prisma.lead.count();
  const unread = await prisma.lead.count({ where: { read: false } });
  return { total, unread };
}
