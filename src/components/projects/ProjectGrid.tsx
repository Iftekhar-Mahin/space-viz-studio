"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, ArrowUpRight } from "lucide-react";

interface Project {
  id: string;
  slug: string;
  name: string;
  location: string;
  category: string;
  heroImage: string;
  year: number;
}

const categories = ["All", "Residential", "Commercial", "Interior", "Landscape"];

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div>
      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 text-xs uppercase tracking-widest font-semibold transition-all duration-300 ${
              activeCategory === cat
                ? "bg-accent text-white"
                : "bg-bg-warm text-text-light hover:text-accent"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            layout
          >
            <Link
              href={`/projects/${project.slug}`}
              className="group block relative overflow-hidden card-hover"
            >
              <div className="relative aspect-[4/3] image-reveal">
                <Image
                  src={project.heroImage}
                  alt={project.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                <div className="absolute top-4 left-4">
                  <span className="bg-accent/90 text-white text-[0.65rem] uppercase tracking-widest px-3 py-1 font-semibold">
                    {project.category}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-heading text-xl text-white font-bold mb-1 group-hover:text-accent transition-colors">
                    {project.name}
                  </h3>
                  <div className="flex items-center gap-1 text-white/60 text-sm">
                    <MapPin size={13} />
                    {project.location}
                  </div>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="w-10 h-10 bg-accent flex items-center justify-center">
                    <ArrowUpRight size={18} className="text-white" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-text-light">
          <p className="text-lg">No projects found in this category yet.</p>
        </div>
      )}
    </div>
  );
}
