import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Clear existing data
  await prisma.lead.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();

  // Create admin user
  const hashedPassword = await hash("admin123", 12);
  await prisma.user.create({
    data: {
      email: "admin@spaceviz.studio",
      password: hashedPassword,
      name: "Admin",
    },
  });
  console.log("✓ Admin user created (admin@spaceviz.studio / admin123)");

  // Create projects
  const projects = [
    {
      slug: "coastal-serenity-villa",
      name: "Coastal Serenity Villa",
      location: "Malibu, California",
      category: "Residential",
      problem: "The clients wanted a home that felt immersed in the coastal landscape while maintaining privacy from the public beach below. They needed open, airy spaces for entertaining but also intimate areas for family life.",
      solution: "We designed a cascading three-level structure that follows the natural cliff contour. Floor-to-ceiling glass walls on the ocean side create an uninterrupted connection to the Pacific, while solid concrete walls on the road side ensure complete privacy. A cantilevered infinity pool visually merges with the horizon.",
      outcome: "The villa became a landmark of modern coastal architecture, featured in Architectural Digest. The clients report feeling 'on vacation every single day.' Energy costs are 40% below comparable homes thanks to passive solar design and cross-ventilation.",
      heroImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=80",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      ]),
      beforeImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80",
      afterImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
      featured: true,
      year: 2024,
    },
    {
      slug: "nexus-corporate-tower",
      name: "Nexus Corporate Tower",
      location: "Downtown Chicago",
      category: "Commercial",
      problem: "A Fortune 500 tech company needed a new headquarters that would attract top talent, reflect their innovative culture, and achieve LEED Platinum certification. The tight urban lot presented significant structural challenges.",
      solution: "We created a 42-story glass tower with a distinctive twisted form that rotates 90 degrees from base to top. Each floor plate shifts slightly, creating dynamic views and reducing wind loads by 24%. The ground level features a public winter garden connecting to the existing transit hub.",
      outcome: "The tower achieved LEED Platinum and became the most energy-efficient building of its class in Chicago. Employee satisfaction surveys showed a 35% improvement in workplace satisfaction. The building won the AIA National Honor Award.",
      heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
        "https://images.unsplash.com/photo-1554435493-93422e8220c8?w=1200&q=80",
      ]),
      featured: true,
      year: 2023,
    },
    {
      slug: "urban-loft-revival",
      name: "Urban Loft Revival",
      location: "Brooklyn, New York",
      category: "Interior",
      problem: "A young creative couple purchased a raw 3,200 sq ft former warehouse space. The challenge was transforming the industrial shell into a warm, functional home while preserving the building's authentic character — exposed brick, timber beams, and oversized factory windows.",
      solution: "We designed an open-concept layout using custom steel-and-glass partitions that define spaces without blocking light. A floating mezzanine adds a private bedroom suite above the living area. Warm walnut cabinetry and polished concrete floors create a dialogue between old and new.",
      outcome: "The loft was featured in Dwell Magazine and became a model for adaptive reuse in the neighborhood. The couple loves how the space adapts — from intimate dinners to hosting 50-person gallery openings. Property value increased by 180%.",
      heroImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      ]),
      featured: true,
      year: 2024,
    },
    {
      slug: "alpine-mountain-retreat",
      name: "Alpine Mountain Retreat",
      location: "Aspen, Colorado",
      category: "Residential",
      problem: "A family wanted a year-round mountain retreat that would serve as a gathering place for three generations. The steep, wooded 5-acre site at 8,500 feet elevation posed structural and environmental challenges, including heavy snow loads and strict view corridor regulations.",
      solution: "We designed a series of connected pavilions that step down the mountainside, each angled to capture specific views of the Elk Mountains. Heavy timber construction uses locally-sourced beetle-kill pine. A central great hall with a 30-foot stone fireplace anchors the compound. Radiant floor heating throughout.",
      outcome: "The retreat comfortably hosts 20 family members across four bedroom suites and a bunkhouse. It withstood record snowfall in its first winter without issue. The family reports it has become the center of their family life, hosting holidays and summer gatherings alike.",
      heroImage: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1600&q=80",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&q=80",
        "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1200&q=80",
      ]),
      featured: false,
      year: 2022,
    },
    {
      slug: "horizon-boutique-hotel",
      name: "Horizon Boutique Hotel",
      location: "Tulum, Mexico",
      category: "Commercial",
      problem: "An independent hotelier envisioned a 24-room boutique property that would redefine luxury hospitality in the Riviera Maya. The beachfront site came with strict environmental regulations protecting the local mangrove ecosystem and sea turtle nesting grounds.",
      solution: "We elevated the entire structure on slender concrete pilotis, preserving natural water flow and turtle access beneath. Each room is a private pavilion with retractable glass walls opening to the Caribbean. We used local chukum plaster, reclaimed hardwoods, and cenote-inspired water features throughout.",
      outcome: "The hotel became the #1 rated property in Tulum on Condé Nast Traveler within its first year. It achieved full occupancy within six months of opening. The environmental approach earned recognition from the Mexican Green Building Council.",
      heroImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600&q=80",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80",
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=80",
      ]),
      featured: false,
      year: 2023,
    },
    {
      slug: "harmony-cultural-center",
      name: "Harmony Cultural Center",
      location: "Austin, Texas",
      category: "Commercial",
      problem: "The city commissioned a multi-use cultural center that needed to serve as a public library, community theater, and art gallery — all under one roof. The building had to become a civic landmark while remaining welcoming and accessible to all residents.",
      solution: "We designed a flowing, organic form inspired by the Texas Hill Country landscape. A grand timber-vaulted reading hall forms the heart, flanked by flexible gallery wings and a 400-seat theater. A rooftop sculpture garden offers panoramic city views. Perforated metal screens filter harsh Texas sunlight into dappled interior light.",
      outcome: "In its first year, the center welcomed over 500,000 visitors — triple the projection. It hosts 200+ community events annually. The building won the AIA Texas Design Award and has become the most photographed building in Austin.",
      heroImage: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1600&q=80",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&q=80",
        "https://images.unsplash.com/photo-1545893835-abaa50cbe628?w=1200&q=80",
      ]),
      featured: false,
      year: 2024,
    },
  ];

  for (const project of projects) {
    await prisma.project.create({ data: project });
  }
  console.log(`✓ ${projects.length} projects created`);

  // Create testimonials
  const testimonials = [
    {
      name: "Sarah & Michael Chen",
      role: "Homeowners, Malibu",
      content: "SPACE viz Studio didn't just design our home — they understood how we wanted to live. Every morning we wake up to the Pacific Ocean framed perfectly through our bedroom window. It's been three years and we still can't believe this is our life.",
      rating: 5,
      featured: true,
    },
    {
      name: "David Thornton",
      role: "CEO, Nexus Technologies",
      content: "Our new headquarters has become our most powerful recruiting tool. The building itself tells the story of our company — innovative, forward-thinking, and deeply committed to sustainability. The team at SPACE viz Studio delivered beyond our most ambitious expectations.",
      rating: 5,
      featured: true,
    },
    {
      name: "Elena Rodriguez",
      role: "Director, Austin Cultural Foundation",
      content: "The Harmony Cultural Center has transformed our community. SPACE viz Studio created a space that genuinely belongs to everyone — from children at story hour to jazz musicians performing on Friday nights. This building has a soul.",
      rating: 5,
      featured: true,
    },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({ data: testimonial });
  }
  console.log(`✓ ${testimonials.length} testimonials created`);

  // Create sample leads
  await prisma.lead.create({
    data: {
      name: "James Wilson",
      email: "james@example.com",
      projectType: "Residential",
      budget: "$500,000 - $1,000,000",
      message: "We're looking to build a modern farmhouse on our 10-acre property in the Hudson Valley. We want something that respects the landscape but feels contemporary.",
      tag: "residential",
      read: false,
    },
  });
  await prisma.lead.create({
    data: {
      name: "Tech Innovations Inc",
      email: "facilities@techinnovations.com",
      projectType: "Commercial",
      budget: "Over $1,000,000",
      message: "We need to design a new 50,000 sq ft campus for our growing team. Sustainability and employee wellness are our top priorities.",
      tag: "commercial",
      read: true,
    },
  });
  console.log("✓ 2 sample leads created");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
