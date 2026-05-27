"use server";

import { prisma } from "@/lib/db";
import { projectSchema } from "@/lib/validations";
import { slugify } from "@/lib/utils";
import { auth } from "@/lib/auth";
import { revalidatePath, unstable_cache, revalidateTag } from "next/cache";

export async function getProjects(category?: string) {
  const cachedFn = unstable_cache(
    async (cat?: string) => {
      const where = cat && cat !== "All" ? { category: cat } : {};
      return prisma.project.findMany({
        where,
        orderBy: { createdAt: "desc" },
      });
    },
    [`projects-list-${category || "All"}`],
    { tags: ["projects"] }
  );
  return cachedFn(category);
}

export async function getFeaturedProjects() {
  const cachedFn = unstable_cache(
    async () => {
      return prisma.project.findMany({
        where: { featured: true },
        orderBy: { createdAt: "desc" },
        take: 3,
      });
    },
    ["featured-projects"],
    { tags: ["projects", "featured-projects"] }
  );
  return cachedFn();
}

export async function getProjectBySlug(slug: string) {
  const cachedFn = unstable_cache(
    async (projectSlug: string) => {
      return prisma.project.findUnique({
        where: { slug: projectSlug },
      });
    },
    [`project-detail-${slug}`],
    { tags: [`project-${slug}`, "projects"] }
  );
  return cachedFn(slug);
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

    // Invalidate Server Caches
    revalidateTag("projects", { expire: 0 });
    
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
    const project = await prisma.project.findUnique({ where: { id }, select: { slug: true } });
    await prisma.project.delete({ where: { id } });

    // Invalidate Server Caches
    revalidateTag("projects", { expire: 0 });
    if (project?.slug) {
      revalidateTag(`project-${project.slug}`, { expire: 0 });
    }

    revalidatePath("/projects");
    revalidatePath("/");
    revalidatePath("/admin/projects");
    return { success: true };
  } catch {
    return { error: "Failed to delete project." };
  }
}

export async function getProjectStats() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const total = await prisma.project.count();
  const featured = await prisma.project.count({ where: { featured: true } });
  return { total, featured };
}
