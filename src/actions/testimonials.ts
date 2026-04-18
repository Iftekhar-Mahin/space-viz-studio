"use server";

import { prisma } from "@/lib/db";

export async function getTestimonials() {
  return prisma.testimonial.findMany({
    where: { featured: true },
    orderBy: { createdAt: "desc" },
  });
}
