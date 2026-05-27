"use server";

import { prisma } from "@/lib/db";
import { contactFormSchema } from "@/lib/validations";
import { rateLimit } from "@/lib/rate-limit";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import nodemailer from "nodemailer";

export async function submitContactForm(formData: {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
  website?: string;
  turnstileToken?: string;
}) {
  // 1. Honeypot check (visual hidden spam trigger)
  if (formData.website) {
    console.warn("[SPAM TRIGGERED] Honeypot field filled by bot.");
    return { success: true, message: "Thank you! We'll be in touch within 24 hours." }; // Silent pass
  }

  // 2. Cloudflare Turnstile CAPTCHA verification (Optional plug-in)
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret && formData.turnstileToken) {
    try {
      const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${encodeURIComponent(turnstileSecret)}&response=${encodeURIComponent(formData.turnstileToken)}`,
      });
      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        return { error: "Security verification failed. Please try again." };
      }
    } catch (err) {
      console.error("[TURNSTILE ERROR] Failed verifying token:", err);
    }
  }

  // 3. IP-based Rate limiting (prevents email changing exploit)
  const reqHeaders = await headers();
  const rawIp = reqHeaders.get("x-forwarded-for") || reqHeaders.get("x-real-ip") || "127.0.0.1";
  const ip = rawIp.split(",")[0].trim();
  
  const { success } = rateLimit(`contact-${ip}`, 3, 60000);
  if (!success) {
    return { error: "Too many submissions. Please try again in a minute." };
  }

  // 4. Input Validation
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

    console.log(`[LEAD CREATED] New lead ID: ${lead.id}`);

    // 5. Fail-Safe Nodemailer notifications
    const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, EMAIL_TO } = process.env;
    if (EMAIL_HOST && EMAIL_USER && EMAIL_PASS && EMAIL_TO) {
      try {
        const transporter = nodemailer.createTransport({
          host: EMAIL_HOST,
          port: parseInt(EMAIL_PORT || "587"),
          secure: EMAIL_PORT === "465",
          auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS,
          },
        });

        await transporter.sendMail({
          from: `"VIZs Portfolio" <${EMAIL_USER}>`,
          to: EMAIL_TO,
          subject: `New VIZs Project Lead: ${parsed.data.name}`,
          text: `New lead from: ${parsed.data.name} (${parsed.data.email})\nProject Type: ${parsed.data.projectType}\nBudget: ${parsed.data.budget}\nMessage:\n${parsed.data.message}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
              <h2 style="color: #ea580c; border-bottom: 2px solid #ea580c; padding-bottom: 10px;">New VIZs Project Inquiry</h2>
              <p><strong>Name:</strong> ${parsed.data.name}</p>
              <p><strong>Email:</strong> <a href="mailto:${parsed.data.email}">${parsed.data.email}</a></p>
              <p><strong>Project Type:</strong> ${parsed.data.projectType}</p>
              <p><strong>Budget Range:</strong> ${parsed.data.budget}</p>
              <p><strong>Message:</strong></p>
              <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #ea580c; white-space: pre-wrap;">${parsed.data.message}</div>
            </div>
          `,
        });
        console.log(`[EMAIL SUCCESS] Nodemailer sent notification email for lead ${lead.id}`);
      } catch (mailError) {
        console.error(`[EMAIL ERROR] Gracefully caught Nodemailer failure for lead ${lead.id}:`, mailError);
      }
    } else {
      console.log(`[EMAIL WARNING] Nodemailer config is incomplete. Skipping email dispatch.`);
    }

    return { success: true, message: "Thank you! We'll be in touch within 24 hours." };
  } catch (dbError) {
    console.error("[DATABASE ERROR] Failed creating lead:", dbError);
    return { error: "Something went wrong. Please try again." };
  }
}

export async function getLeads(filter?: string) {
  // Authorization Check
  const session = await auth();
  if (!session) throw new Error("Unauthorized access to leads.");

  const where = filter && filter !== "all" ? { tag: filter } : {};
  return prisma.lead.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
}

export async function markLeadRead(id: string) {
  // Authorization Check
  const session = await auth();
  if (!session) throw new Error("Unauthorized action.");

  return prisma.lead.update({
    where: { id },
    data: { read: true },
  });
}

export async function getLeadStats() {
  // Authorization Check
  const session = await auth();
  if (!session) throw new Error("Unauthorized query.");

  const total = await prisma.lead.count();
  const unread = await prisma.lead.count({ where: { read: false } });
  return { total, unread };
}
