import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award, Building2, Users, Sparkles } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Counter from "@/components/ui/Counter";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import { getFeaturedProjects } from "@/actions/projects";
import { getTestimonials } from "@/actions/testimonials";

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();
  const testimonials = await getTestimonials();

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
            alt="Modern architectural masterpiece"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        </div>

        <div className="relative z-10 container-custom text-center text-white pt-20">
          <AnimatedSection>
            <div className="gold-line mx-auto mb-8" />
            <p className="text-accent uppercase tracking-[0.3em] text-sm font-semibold mb-6">
              Award-Winning Architecture Studio
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <h1 className="heading-xl max-w-5xl mx-auto mb-6">
              Designing Modern, Functional Spaces That{" "}
              <span className="text-accent italic">Actually Work</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              We don&apos;t just design buildings — we solve problems through architecture.
              Every space we create is engineered for how people actually live, work, and thrive.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.45}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/projects" className="btn-primary">
                View Projects <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="btn-outline">
                Start a Project
              </Link>
            </div>
          </AnimatedSection>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <div className="w-[1px] h-16 bg-gradient-to-b from-accent to-transparent mx-auto" />
          </div>
        </div>
      </section>

      {/* ===== TRUST STATS BAR ===== */}
      <section className="bg-primary py-16 relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvZz48L3N2Zz4=')] opacity-50" />
        <div className="container-custom relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Counter end={15} suffix="+" label="Years Experience" />
            <Counter end={120} suffix="+" label="Projects Completed" />
            <Counter end={8} label="Design Awards" />
            <Counter end={98} suffix="%" label="Client Satisfaction" />
          </div>
        </div>
      </section>

      {/* ===== FEATURED PROJECTS ===== */}
      <section className="section-padding bg-bg">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="heading-lg text-primary mb-4">
                Featured <span className="text-accent">Projects</span>
              </h2>
              <p className="text-body-lg max-w-2xl mx-auto">
                Each project tells a story of collaboration, innovation, and
                transformative design. Here are some of our proudest achievements.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project, i) => (
              <AnimatedSection key={project.id} delay={i * 0.15}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group block relative overflow-hidden card-hover"
                >
                  <div className="relative aspect-[3/4] image-reveal">
                    <Image
                      src={project.heroImage}
                      alt={project.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="text-accent text-xs uppercase tracking-widest font-semibold">
                        {project.category} • {project.year}
                      </span>
                      <h3 className="font-heading text-2xl text-white font-bold mt-2 mb-1 group-hover:text-accent transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-white/60 text-sm">{project.location}</p>
                      <div className="mt-4 flex items-center gap-2 text-accent text-sm font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        View Project <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection>
            <div className="text-center mt-12">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-accent hover:text-accent-dark font-semibold uppercase tracking-widest text-sm transition-colors"
              >
                View All Projects <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="section-padding bg-bg-warm">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="heading-lg text-primary mb-4">
                Why Clients <span className="text-accent">Choose Us</span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Building2,
                title: "Problem-First Design",
                desc: "We start with your challenges, not our aesthetics. Every design decision solves a real problem.",
              },
              {
                icon: Award,
                title: "Award-Winning Work",
                desc: "8 national design awards and recognition from Architectural Digest, Dwell, and more.",
              },
              {
                icon: Users,
                title: "Collaborative Process",
                desc: "You're involved at every stage. We believe great architecture comes from great partnerships.",
              },
              {
                icon: Sparkles,
                title: "Sustainable by Default",
                desc: "Every project incorporates sustainable principles. Multiple LEED Platinum certifications.",
              },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <div className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-6 border border-accent/30 flex items-center justify-center">
                    <item.icon className="text-accent" size={28} />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-primary mb-3">
                    {item.title}
                  </h3>
                  <p className="text-body text-sm">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section-padding bg-bg">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-12">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="heading-lg text-primary mb-4">
                What Our Clients <span className="text-accent">Say</span>
              </h2>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <TestimonialsCarousel testimonials={testimonials} />
          </AnimatedSection>
        </div>
      </section>

      {/* ===== PROJECT TYPES ===== */}
      <section className="section-padding bg-primary">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-12">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="heading-lg text-white mb-4">
                What We <span className="text-accent">Design</span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Residential",
                image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
                desc: "Custom homes, villas, and residential developments",
              },
              {
                title: "Commercial",
                image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
                desc: "Offices, retail spaces, and hospitality venues",
              },
              {
                title: "Interior",
                image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
                desc: "Full interior transformations and adaptive reuse",
              },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.15}>
                <div className="relative aspect-[4/3] overflow-hidden group cursor-pointer">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors duration-300" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                    <h3 className="font-heading text-2xl text-white font-bold mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white/60 text-sm">{item.desc}</p>
                    <Link
                      href="/projects"
                      className="mt-4 text-accent text-sm font-semibold uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                    >
                      Explore →
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
