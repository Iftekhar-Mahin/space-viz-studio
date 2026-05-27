"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin") || pathname === "/login") {
    return null;
  }

  return (
    <footer className="bg-dark text-white">
      {/* CTA Banner */}
      <div className="section-padding bg-primary">
        <div className="container-custom text-center">
          <h2 className="heading-lg text-white mb-4">
            Ready to Build Something{" "}
            <span className="text-accent">Extraordinary</span>?
          </h2>
          <p className="text-body-lg text-white/60 max-w-2xl mx-auto mb-8">
            Every great building starts with a conversation. Let&apos;s discuss
            your vision and explore the possibilities together.
          </p>
          <Link href="/contact" className="btn-primary text-sm">
            Get a Free Consultation <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Footer Content */}
      <div className="section-padding !py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4 group">
                <Logo className="w-10 h-10" />
                <div className="flex flex-col leading-none">
                  <span className="text-white font-heading text-lg tracking-widest font-bold">
                    VIZ<span className="text-accent">s</span>
                  </span>
                  <span className="text-white/50 text-[0.6rem] tracking-[0.3em] uppercase">
                    Studio
                  </span>
                </div>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">
                Premium 3D visualization, animation, and game art studio. Creating immersive and functional digital spaces.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-accent uppercase tracking-widest text-xs font-body font-semibold mb-4">
                Navigation
              </h4>
              <div className="flex flex-col gap-3">
                {["Home", "Projects", "About", "Contact"].map((link) => (
                  <Link
                    key={link}
                    href={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                    className="text-white/50 hover:text-accent text-sm transition-colors"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-accent uppercase tracking-widest text-xs font-body font-semibold mb-4">
                Services
              </h4>
              <div className="flex flex-col gap-3">
                {[
                  "Interior Design",
                  "Exterior Design",
                  "3D Visualization",
                  "Architectural Visualization",
                  "Animation",
                  "Product Modeling & Animation",
                  "Game Environment & Props",
                ].map((service) => (
                  <span key={service} className="text-white/50 text-sm">
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-accent uppercase tracking-widest text-xs font-body font-semibold mb-4">
                Get in Touch
              </h4>
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:spaceviz.studio@gmail.com"
                  className="flex items-center gap-2 text-white/50 hover:text-accent text-sm transition-colors"
                >
                  <Mail size={14} className="shrink-0" /> spaceviz.studio@gmail.com
                </a>
                <a
                  href="tel:+8801768582654"
                  className="flex items-center gap-2 text-white/50 hover:text-accent text-sm transition-colors"
                >
                  <Phone size={14} className="shrink-0" /> 01768-582654
                </a>
                <a
                  href="https://m.me/spaceviz.studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/50 hover:text-accent text-sm transition-colors"
                >
                  <MessageCircle size={14} className="shrink-0" /> VIZs Studio
                </a>
                <span className="flex items-start gap-2 text-white/50 text-sm">
                  <MapPin size={14} className="shrink-0 mt-1" /> 
                  <span>41/12/B, Moulovi Salek Road, Notun Rasta, Zigatola, Dhanmondi, Dhaka, Bangladesh, 1209</span>
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/30 text-xs">
              © {new Date().getFullYear()} VIZs Studio. All rights reserved.
            </p>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service"].map((link) => (
                <span key={link} className="text-white/30 hover:text-white/50 text-xs cursor-pointer transition-colors">
                  {link}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
