import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact | SPACE viz Studio",
  description:
    "Get a free consultation for your architecture project. Tell us about your vision and we'll respond within 24 hours.",
};

export default function ContactPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-primary pt-32 pb-20">
        <div className="container-custom text-center">
          <AnimatedSection>
            <div className="gold-line mx-auto mb-6" />
            <p className="text-accent uppercase tracking-[0.3em] text-sm font-semibold mb-4">
              Let&apos;s Connect
            </p>
            <h1 className="heading-xl text-white mb-4">
              Get a Free <span className="text-accent">Consultation</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Every great building starts with a conversation. Tell us about your
              project and we&apos;ll get back to you within 24 hours.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-bg">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info Sidebar */}
            <div className="lg:col-span-1">
              <AnimatedSection>
                <div className="space-y-8">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-primary mb-6">
                      Get in Touch
                    </h3>
                    <div className="space-y-5">
                      {[
                        {
                          icon: Mail,
                          label: "Email Us",
                          value: "spaceviz.studio@gmail.com",
                          href: "mailto:spaceviz.studio@gmail.com",
                        },
                        {
                          icon: Phone,
                          label: "Call Us",
                          value: "01768-582654",
                          href: "tel:+8801768582654",
                        },
                        {
                          icon: MapPin,
                          label: "Visit Us",
                          value: "41/12/B, Moulovi Salek Road, Notun Rasta, Zigatola, Dhanmondi, Dhaka 1209",
                          href: null,
                        },
                        {
                          icon: Clock,
                          label: "Office Hours",
                          value: "Mon–Fri: 9AM – 6PM EST",
                          href: null,
                        },
                      ].map((item) => (
                        <div key={item.label} className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                            <item.icon className="text-accent" size={18} />
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-widest text-text-light mb-1">
                              {item.label}
                            </p>
                            {item.href ? (
                              <a
                                href={item.href}
                                className="text-primary font-medium hover:text-accent transition-colors"
                              >
                                {item.value}
                              </a>
                            ) : (
                              <p className="text-primary font-medium">
                                {item.value}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* WhatsApp Button */}
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs uppercase tracking-widest text-text-light mb-3">
                      Quick Connect
                    </p>
                    <a
                      href="https://wa.me/8801768582654?text=Hi%20SPACE%20viz%20Studio%2C%20I%27m%20interested%20in%20discussing%20a%20project."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-[#25D366] text-white px-5 py-3 hover:bg-[#128C7E] transition-colors w-full justify-center font-semibold text-sm"
                    >
                      <MessageCircle size={18} />
                      Chat on WhatsApp
                    </a>
                  </div>

                  {/* Map placeholder */}
                  <div className="relative aspect-square bg-bg-warm border border-border overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="text-accent mx-auto mb-2" size={32} />
                        <p className="text-sm text-text-light font-medium">
                          Dhanmondi
                        </p>
                        <p className="text-xs text-text-light">
                          Dhaka, Bangladesh
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <AnimatedSection delay={0.15}>
                <div className="bg-white p-8 md:p-10 shadow-sm border border-border">
                  <h3 className="font-heading text-2xl font-bold text-primary mb-2">
                    Start Your Project
                  </h3>
                  <p className="text-body mb-8">
                    Fill out the form below and we&apos;ll respond with a
                    personalized consultation plan within 24 hours.
                  </p>
                  <ContactForm />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
