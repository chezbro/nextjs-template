import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import HeroCanvas from "@/components/HeroCanvas";
import heroMobile from "@/assets/hero-mobile.jpg";
import { ArrowRight } from "lucide-react";

import logoVoxo from "@/assets/logos/voxo.svg";
import logoSeer from "@/assets/logos/seer.svg";
import logoPerdiem from "@/assets/logos/perdiem.svg";
import logoOpenphone from "@/assets/logos/openphone.svg";

const clientLogos = [
  { src: logoVoxo, alt: "Voxo" },
  { src: logoSeer, alt: "Seer" },
  { src: logoPerdiem, alt: "Per Diem" },
  { src: logoOpenphone, alt: "OpenPhone" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* Desktop: Three.js */}
      <div className="absolute inset-0 hidden md:block">
        <HeroCanvas />
      </div>

      {/* Mobile: Hero Image */}
      <div className="absolute inset-0 md:hidden">
        <img
          src={heroMobile}
          alt="Sofrix hero visual"
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/80 px-4 py-1.5 backdrop-blur-sm"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              <span className="font-display text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                Now accepting new projects
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="mb-6 font-display text-5xl font-bold leading-[1.08] tracking-tight text-foreground md:text-7xl lg:text-[5.5rem]"
            >
              Artificial Intelligence{" "}
              <span className="text-gradient">+</span>
              <br />
              Engineering Excellence
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mb-10 max-w-lg text-lg leading-relaxed text-muted-foreground"
            >
              We build smarter software that creates stronger businesses. From AI automations to custom platforms — we bring your vision to life.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Button variant="hero" size="xl">
                Book a Consultation
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
              <Button variant="hero-outline" size="xl">
                View Our Work
              </Button>
            </motion.div>

            {/* Social proof line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mt-14 flex items-center gap-3"
            >
              <div className="flex -space-x-2">
                {clientLogos.map((logo, n) => (
                  <div
                    key={n}
                    className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-white p-1.5 shadow-sm"
                  >
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="h-full w-full object-contain"
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">50+ businesses</span> trust Sofrix for their technology needs
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-body text-xs uppercase tracking-widest text-muted-foreground">Scroll</span>
          <div className="h-8 w-[1px] animate-pulse bg-primary/40" />
        </div>
      </motion.div>
    </section>
  );
}
