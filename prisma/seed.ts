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
      slug: "lost-ruins-temple-level",
      name: "The Lost Ruins - Game Environment",
      location: "Unreal Engine 5",
      category: "Game Art",
      problem: "We were tasked with designing a fully optimized, immersive 3D jungle temple environment for a next-gen action-adventure game. It needed high-fidelity lighting and high-performance assets running at 60fps on console.",
      solution: "We designed a modular temple kit with custom trim sheets, sculpted high-poly mossy stone structures in ZBrush, and baked them onto game-ready low-poly meshes. We used Nanite and Lumen in Unreal Engine 5 for dynamic global illumination.",
      outcome: "A stunning, game-ready environment with an average of 90fps. Features dense foliage, cascading waterfalls, and atmospheric fog, fully optimized with a custom master material system.",
      heroImage: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1600&q=80",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200&q=80",
        "https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?w=1200&q=80",
      ]),
      beforeImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80",
      afterImage: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200&q=80",
      featured: true,
      year: 2025,
    },
    {
      slug: "cyberpunk-gaming-lounge",
      name: "Cyberpunk Gaming Lounge",
      location: "3D Blender & Cycles",
      category: "Interior Design",
      problem: "A high-end client wanted a conceptual visualization of an ultra-modern cyberpunk-themed private gaming lounge and streaming studio, filled with custom neon accents and industrial materials.",
      solution: "We modeled bespoke ergonomic furniture, custom streaming rigs, and a signature hexagonal LED ceiling. Materials were crafted with detailed roughness and metallic maps to catch the contrasting magenta and cyan neon glow.",
      outcome: "A breathtaking hyper-realistic interior render featured in several design blogs, showcasing advanced emissive lighting, reflection pools, and photorealistic leather and carbon fiber textures.",
      heroImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      ]),
      featured: true,
      year: 2024,
    },
    {
      slug: "holographic-smartwatch-commercial",
      name: "Holographic Smartwatch Rendering",
      location: "Product Visualization",
      category: "Product Design",
      problem: "An upcoming tech startup needed high-end 3D product renders and an explosive-view animation of their new smartwatch for a crowdfunding campaign launch.",
      solution: "We modeled the watch down to the microchip level using CAD data. Using Octane Render, we set up studio-grade three-point lighting and generated close-up macro shots highlighting the brushed titanium frame and custom watch face glass.",
      outcome: "The crowdfunding campaign reached its goal within 2 hours of launch. The client cited the photorealistic 3D renders as the main factor in building backer confidence.",
      heroImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1600&q=80",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&q=80",
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80",
      ]),
      featured: true,
      year: 2025,
    },
    {
      slug: "brutalist-desert-villa",
      name: "Brutalist Desert Villa",
      location: "Malibu, California",
      category: "Exterior Design",
      problem: "We wanted to create a portfolio masterpiece showcasing a monolithic brutalist concrete structure set in a harsh desert landscape, playing with stark light, shadows, and natural rock integration.",
      solution: "We integrated a two-story raw-board concrete villa directly into scanned Megascans rock formations. We simulated realistic desert noon lighting with strong shadows and natural warm dust particles using Corona Renderer.",
      outcome: "A stunning photorealistic set of exterior views that look completely indistinguishable from real photography, winning several CGI community choice awards.",
      heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      ]),
      featured: false,
      year: 2024,
    },
    {
      slug: "fantasy-weapons-pack",
      name: "Fantasy Weapons Prop Pack",
      location: "Game Ready Assets",
      category: "Game Art",
      problem: "We designed a pack of game-ready medieval fantasy weapons, optimized for performance and styled with hand-painted yet PBR-compatible textures.",
      solution: "We modeled high-poly weapons, baked normal maps, and textured them in Substance Painter using a stylized PBR approach with hand-painted wood grains, metal scratches, and runic emissive glows.",
      outcome: "A collection of 10 fully optimized game-ready props (swords, shields, axes) under 2,000 polygons each, ready for seamless integration into Unity or Unreal Engine.",
      heroImage: "https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?w=1600&q=80",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?w=1200&q=80",
      ]),
      featured: false,
      year: 2025,
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
      content: "VIZs Studio created the most stunning 3D exterior and interior visualizations for our custom villa. We could see exactly how natural light would flood the space before construction even began. Truly breathtaking work.",
      rating: 5,
      featured: true,
    },
    {
      name: "David Thornton",
      role: "Art Director, CyberVerse Games",
      content: "We partnered with VIZs Studio for our main level environments and prop designs. Their speed, optimization, and attention to detail were incredible. Our game ready assets look fantastic and run perfectly at 60fps.",
      rating: 5,
      featured: true,
    },
    {
      name: "Elena Rodriguez",
      role: "Marketing Director, Aura Smart Wearables",
      content: "The product rendering and exploded-view animations VIZs Studio produced for our launch campaign were spectacular. They completely captured the premium design of our smartwatch, driving record-breaking sales.",
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
