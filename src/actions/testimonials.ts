"use server";

import { prisma } from "@/lib/db";
import { unstable_cache } from "next/cache";

export async function getTestimonials() {
  const cachedFn = unstable_cache(
    async () => {
      return prisma.testimonial.findMany({
        where: { featured: true },
        orderBy: { createdAt: "desc" },
      });
    },
    ["testimonials-list"],
    { tags: ["testimonials"] }
  );
  return cachedFn();
}
