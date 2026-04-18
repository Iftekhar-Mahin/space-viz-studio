import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ProjectGrid from "@/components/projects/ProjectGrid";
import { getProjects } from "@/actions/projects";

export const metadata: Metadata = {
  title: "Our Projects | SPACE viz Studio",
  description:
    "Explore our portfolio of award-winning residential, commercial, and interior design projects. Each project showcases our problem-solving approach to architecture.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      {/* Page Header */}
      <section className="bg-primary pt-32 pb-20">
        <div className="container-custom text-center">
          <AnimatedSection>
            <div className="gold-line mx-auto mb-6" />
            <p className="text-accent uppercase tracking-[0.3em] text-sm font-semibold mb-4">
              Our Portfolio
            </p>
            <h1 className="heading-xl text-white mb-4">
              Our <span className="text-accent">Projects</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Every project begins with a problem worth solving. Browse our work to see
              how we transform challenges into architectural solutions.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding bg-bg">
        <div className="container-custom">
          <ProjectGrid projects={projects} />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-padding bg-bg-warm">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h2 className="heading-md text-primary mb-4">
              Have a Project in <span className="text-accent">Mind</span>?
            </h2>
            <p className="text-body-lg max-w-xl mx-auto mb-8">
              Let&apos;s discuss your vision. We&apos;d love to understand your goals
              and explore how we can bring them to life.
            </p>
            <Link href="/contact" className="btn-primary">
              Start Your Project <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
