import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award, Building2, Users, Sparkles } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Counter from "@/components/ui/Counter";
import { getFeaturedProjects } from "@/actions/projects";

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/commercial_building.jpeg"
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
              Premium 3D & Game Art Studio
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <h1 className="heading-xl max-w-5xl mx-auto mb-6">
              Bringing Your Imagination to Life With{" "}
              <span className="text-accent italic">Stunning 3D Visuals</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              We are a state-of-the-art 3D studio specializing in high-fidelity architectural visualization, product animation, immersive environment design, and game-ready assets.
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Counter end={15} suffix="+" label="Years Experience" />
            <Counter end={120} suffix="+" label="Projects Completed" />
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: "Artistic Excellence",
                desc: "We merge cutting-edge rendering technologies with meticulous art direction to deliver visuals that wow audiences.",
              },
              {
                icon: Users,
                title: "Collaborative Pipeline",
                desc: "You are involved at every milestone, from initial greybox blockouts to material bakes and final lighting.",
              },
              {
                icon: Award,
                title: "Engine-Ready Optimization",
                desc: "All game art is fully optimized with clean topology, custom PBR textures, and low-poly limits ready for Unreal & Unity.",
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



      {/* ===== SERVICES SHOWCASE ===== */}
      <section className="section-padding bg-primary">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-12">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="heading-lg text-white mb-4">
                Our <span className="text-accent">Services</span>
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                We provide premium 3D design, animation, and production-ready game art tailored to elevate your projects.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Interior Design",
                image: "/images/modern_house.jpeg",
                desc: "Bespoke interior visualization, spatial planning, and high-fidelity rendering.",
              },
              {
                title: "Exterior Design",
                image: "/images/commercial_building.jpeg",
                desc: "Stunning building facades, structural landscaping, and outdoor architectural design.",
              },
              {
                title: "3D Visualization",
                image: "/images/night_view.jpeg",
                desc: "Photorealistic 3D renders, CGI productions, and hyper-realistic mockups.",
              },
              {
                title: "Architectural Visualization",
                image: "/images/modern_house.jpeg",
                desc: "High-end cinematic rendering of residential, commercial, and urban designs.",
              },
              {
                title: "Animation",
                image: "/images/night_view.jpeg",
                desc: "Cinematic flythroughs, walkthrough animations, and dynamic motion transitions.",
              },
              {
                title: "Product Modeling & Animation",
                image: "/images/commercial_building.jpeg",
                desc: "Studio-grade product rendering, explosive views, and high-impact 3D commercial animations.",
              },
              {
                title: "Game Environment Design",
                image: "/images/night_view.jpeg",
                desc: "3D environment design, game ready modeling, texturing, lighting, and stage layout.",
              },
              {
                title: "Game Prop Modeling",
                image: "/images/modern_house.jpeg",
                desc: "Game ready props modeling and texturing with custom PBR materials.",
              },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <div className="relative aspect-[4/3] overflow-hidden group cursor-pointer">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors duration-300" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                    <h3 className="font-heading text-xl text-white font-bold mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white/60 text-xs leading-relaxed max-w-[90%]">{item.desc}</p>
                    <Link
                      href="/projects"
                      className="mt-4 text-accent text-xs font-semibold uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                    >
                      Explore Portfolio →
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
