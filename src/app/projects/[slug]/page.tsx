import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Calendar, Tag, ArrowLeft } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import BeforeAfterSlider from "@/components/projects/BeforeAfterSlider";
import { getProjectBySlug, getProjects } from "@/actions/projects";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.name} | SPACE viz Studio`,
    description: project.outcome,
  };
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const images: string[] = JSON.parse(project.images || "[]");

  return (
    <>
      {/* Hero Image */}
      <section className="relative h-[70vh] min-h-[500px]">
        <Image
          src={project.heroImage}
          alt={project.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="container-custom">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-white/60 hover:text-accent text-sm mb-6 transition-colors"
            >
              <ArrowLeft size={14} /> Back to Projects
            </Link>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="bg-accent/90 text-white text-xs uppercase tracking-widest px-3 py-1 font-semibold">
                {project.category}
              </span>
            </div>
            <h1 className="heading-xl text-white mb-4">{project.name}</h1>
            <div className="flex flex-wrap items-center gap-6 text-white/60 text-sm">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} /> {project.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} /> {project.year}
              </span>
              <span className="flex items-center gap-1.5">
                <Tag size={14} /> {project.category}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Project Story */}
      <section className="section-padding bg-bg">
        <div className="container-custom max-w-4xl">
          {/* Problem */}
          <AnimatedSection>
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-4">
                <div className="gold-line" />
                <span className="text-accent uppercase tracking-widest text-xs font-semibold">
                  The Challenge
                </span>
              </div>
              <h2 className="heading-md text-primary mb-4">Client Need</h2>
              <p className="text-body-lg leading-relaxed">{project.problem}</p>
            </div>
          </AnimatedSection>

          {/* Solution */}
          <AnimatedSection delay={0.15}>
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-4">
                <div className="gold-line" />
                <span className="text-accent uppercase tracking-widest text-xs font-semibold">
                  Our Approach
                </span>
              </div>
              <h2 className="heading-md text-primary mb-4">Design Solution</h2>
              <p className="text-body-lg leading-relaxed">{project.solution}</p>
            </div>
          </AnimatedSection>

          {/* Outcome */}
          <AnimatedSection delay={0.3}>
            <div className="mb-16 p-8 bg-primary text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="gold-line" />
                <span className="text-accent uppercase tracking-widest text-xs font-semibold">
                  The Result
                </span>
              </div>
              <h2 className="heading-md text-white mb-4 font-heading">Outcome</h2>
              <p className="text-white/70 text-lg leading-relaxed">
                {project.outcome}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Image Gallery */}
      {images.length > 0 && (
        <section className="section-padding bg-bg-warm !pt-0">
          <div className="container-custom">
            <AnimatedSection>
              <div className="text-center mb-12">
                <div className="gold-line mx-auto mb-6" />
                <h2 className="heading-md text-primary">Project Gallery</h2>
              </div>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {images.map((img, i) => (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <div className="relative aspect-[16/10] overflow-hidden image-reveal">
                    <Image
                      src={img}
                      alt={`${project.name} - Image ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Before/After Slider */}
      {project.beforeImage && project.afterImage && (
        <section className="section-padding bg-bg">
          <div className="container-custom max-w-4xl">
            <AnimatedSection>
              <div className="text-center mb-12">
                <div className="gold-line mx-auto mb-6" />
                <h2 className="heading-md text-primary mb-4">
                  Before & <span className="text-accent">After</span>
                </h2>
                <p className="text-body">
                  Drag the slider to see the transformation
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <BeforeAfterSlider
                beforeImage={project.beforeImage}
                afterImage={project.afterImage}
              />
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="section-padding bg-bg-warm">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h2 className="heading-md text-primary mb-4">
              Want Something <span className="text-accent">Similar</span>?
            </h2>
            <p className="text-body-lg max-w-xl mx-auto mb-8">
              Every great space starts with a conversation. Tell us about
              your vision and we&apos;ll make it a reality.
            </p>
            <Link href="/contact" className="btn-primary">
              Start a Similar Project <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
