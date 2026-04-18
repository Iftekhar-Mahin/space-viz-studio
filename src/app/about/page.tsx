import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, PenTool, Hammer } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

export const metadata: Metadata = {
  title: "About | SPACE viz Studio",
  description:
    "Learn about SPACE viz Studio's design philosophy, our collaborative approach, and why clients trust us with their most ambitious projects.",
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
              About <span className="text-accent">SPACE viz</span> Studio
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              We believe architecture has the power to transform not just spaces,
              but the lives of the people who inhabit them.
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
                  alt="Architectural blueprints and design process"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-6">
                  <p className="font-heading text-lg text-primary italic">
                    &ldquo;Architecture should speak of its time and place, but
                    yearn for timelessness.&rdquo;
                  </p>
                  <p className="text-accent text-sm mt-2 font-semibold">
                    — Frank Gehry
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
                  At SPACE viz Studio, we approach every project as a unique
                  problem to solve — not a template to fill. We believe the best
                  architecture emerges from deep listening, rigorous analysis, and
                  an unwavering commitment to both beauty and function.
                </p>
                <p className="text-body-lg mb-6">
                  Our designs are rooted in context — responding to landscape,
                  climate, culture, and the specific human needs of each client.
                  We reject the notion that form and function are at odds; in our
                  work, they are inseparable.
                </p>
                <p className="text-body-lg">
                  Sustainability isn&apos;t a checkbox for us — it&apos;s a
                  foundational principle. Every material choice, every
                  orientation decision, every system we specify is evaluated
                  through the lens of environmental responsibility.
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
                We&apos;ve refined our approach over 15 years and 120+ projects.
                It&apos;s designed to minimize surprises and maximize results.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Compass,
                step: "01",
                title: "Discover",
                desc: "We begin with deep listening. Understanding your vision, needs, constraints, and aspirations through intensive workshops and site analysis. This phase defines everything that follows.",
              },
              {
                icon: PenTool,
                step: "02",
                title: "Design",
                desc: "From concept sketches to detailed 3D visualizations, we iterate rapidly with your input. You see and experience the space before a single brick is laid. No surprises, only refinement.",
              },
              {
                icon: Hammer,
                step: "03",
                title: "Deliver",
                desc: "We manage construction with meticulous attention to detail, ensuring the built result matches (or exceeds) the design vision. Quality control is obsessive, timelines are respected.",
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
                Over 15 years, we&apos;ve built our reputation one relationship
                at a time. 70% of our projects come from repeat clients or
                referrals — the strongest endorsement any firm can receive.
              </p>
              <p>
                We are transparent about budgets, honest about timelines, and
                uncompromising about quality. When we say a project will be done
                right, it will be done right.
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
