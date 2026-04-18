export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export const PROJECT_CATEGORIES = [
  "All",
  "Residential",
  "Commercial",
  "Interior",
  "Landscape",
] as const;

export const BUDGET_RANGES = [
  "Under $50,000",
  "$50,000 - $150,000",
  "$150,000 - $500,000",
  "$500,000 - $1,000,000",
  "Over $1,000,000",
] as const;

export const PROJECT_TYPES = [
  "Residential",
  "Commercial",
  "Interior Design",
  "Landscape",
  "Renovation",
  "Other",
] as const;
