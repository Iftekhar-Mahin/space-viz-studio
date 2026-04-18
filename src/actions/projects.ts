"use server";

import { prisma } from "@/lib/db";
import { projectSchema } from "@/lib/validations";
import { slugify } from "@/lib/utils";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getProjects(category?: string) {
  const where = category && category !== "All" ? { category } : {};
  return prisma.project.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
}

export async function getFeaturedProjects() {
  return prisma.project.findMany({
    where: { featured: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  });
}

export async function getProjectBySlug(slug: string) {
  return prisma.project.findUnique({
    where: { slug },
  });
}

export async function createProject(data: {
  name: string;
  location: string;
  category: string;
  problem: string;
  solution: string;
  outcome: string;
  heroImage: string;
  images?: string;
  beforeImage?: string;
  afterImage?: string;
  featured?: boolean;
  year: number;
}) {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  const parsed = projectSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
    const slug = slugify(parsed.data.name);
    await prisma.project.create({
      data: {
        ...parsed.data,
        slug,
        images: parsed.data.images || "[]",
        featured: parsed.data.featured ?? false,
      },
    });

    revalidatePath("/projects");
    revalidatePath("/");
    revalidatePath("/admin/projects");
    return { success: true };
  } catch {
    return { error: "Failed to create project." };
  }
}

export async function deleteProject(id: string) {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  try {
    await prisma.project.delete({ where: { id } });
    revalidatePath("/projects");
    revalidatePath("/");
    revalidatePath("/admin/projects");
    return { success: true };
  } catch {
    return { error: "Failed to delete project." };
  }
}

export async function getProjectStats() {
  const total = await prisma.project.count();
  const featured = await prisma.project.count({ where: { featured: true } });
  return { total, featured };
}
