import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, PenTool, Hammer } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

export const metadata: Metadata = {
  title: "About | VIZs Studio",
  description:
    "Learn about VIZs' design philosophy, our collaborative approach, and why clients trust us with their most ambitious 3D, animation, and game art projects.",
};

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-primary pt-32 pb-20">
        <div className="container-custom text-center">
          <AnimatedSection>
            <div className="gold-line mx-auto mb-6" />
            <p className="text-accent uppercase tracking-[0.3em] text-sm font-semibold mb-4">
              Our Story
            </p>
            <h1 className="heading-xl text-white mb-4">
              About <span className="text-accent">VIZs</span> Studio
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              We believe in the power of visual storytelling, transforming concepts into photorealistic 3D environments, premium product animations, and stunning game art.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding bg-bg">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80"
                  alt="3D Visualization and Game Art design process"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-6">
                  <p className="font-heading text-lg text-primary italic">
                    &ldquo;CGI is not just about replicating reality, but about crafting spaces and objects that tell a captivating visual story.&rdquo;
                  </p>
                  <p className="text-accent text-sm mt-2 font-semibold">
                    — VIZs Studio
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div>
                <div className="gold-line mb-6" />
                <h2 className="heading-lg text-primary mb-6">
                  Design <span className="text-accent">Philosophy</span>
                </h2>
                <p className="text-body-lg mb-6">
                  At VIZs Studio, we approach every project as a unique creative challenge — not a template to fill. We believe the best digital art and visualization emerge from deep collaboration, precise modeling, and an unwavering commitment to realism, lighting, and detail.
                </p>
                <p className="text-body-lg mb-6">
                  Our creations are designed for maximum impact — whether it's an immersive game-ready environment, a stunning architectural visualization, or a high-end product animation. We merge technical precision with artistic direction.
                </p>
                <p className="text-body-lg">
                  Optimization is our core strength. Whether we are building low-poly props optimized for game engine performance or high-fidelity offline renders, we ensure optimal efficiency without compromising visual excellence.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-bg-warm">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="heading-lg text-primary mb-4">
                Our <span className="text-accent">Process</span>
              </h2>
              <p className="text-body-lg max-w-2xl mx-auto">
                We've refined our production pipeline to deliver high-quality, production-ready assets and animations on schedule.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Compass,
                step: "01",
                title: "Discover",
                desc: "We begin by understanding your artistic vision, technical specs, reference mood boards, and target platforms (such as Unreal Engine, Unity, or high-end web/video).",
              },
              {
                icon: PenTool,
                step: "02",
                title: "Design",
                desc: "From initial grayboxes and high-poly sculpts to photorealistic lighting setups and texture painting, we iterate dynamically with your input. You review models at key milestones.",
              },
              {
                icon: Hammer,
                step: "03",
                title: "Deliver",
                desc: "We deliver production-ready 3D assets, animations, and fully-lit environments, optimized and format-ready for immediate integration into your pipeline or presentation.",
              },
            ].map((item, i) => (
              <AnimatedSection key={item.step} delay={i * 0.15}>
                <div className="relative bg-white p-8 h-full group hover:shadow-xl transition-shadow duration-300">
                  <span className="absolute top-4 right-4 text-6xl font-heading font-bold text-bg-warm group-hover:text-accent/10 transition-colors">
                    {item.step}
                  </span>
                  <div className="w-14 h-14 bg-accent/10 flex items-center justify-center mb-6">
                    <item.icon className="text-accent" size={28} />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-primary mb-4">
                    {item.title}
                  </h3>
                  <p className="text-body text-sm">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="section-padding bg-primary">
        <div className="container-custom text-center">
          <AnimatedSection>
            <div className="gold-line mx-auto mb-6" />
            <h2 className="heading-lg text-white mb-6">
              Why Clients <span className="text-accent">Trust</span> Us
            </h2>
            <div className="max-w-3xl mx-auto space-y-6 text-white/70 text-lg leading-relaxed">
              <p>
                We've built a stellar reputation one project at a time, working with architects, game developers, product companies, and agencies worldwide. A significant portion of our projects comes from repeat clients or word-of-mouth recommendations.
              </p>
              <p>
                We are transparent about workflows, precise with polygon budgets and textures, and uncompromising about detail. When we commit to a deadline, we deliver.
              </p>
            </div>
            <div className="mt-10">
              <Link href="/contact" className="btn-primary">
                Let&apos;s Work Together <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
