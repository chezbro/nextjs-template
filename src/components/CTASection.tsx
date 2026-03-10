import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="bg-black py-28">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-zinc-900 to-zinc-950 px-8 py-20 text-center text-primary-foreground shadow-[0_0_80px_rgba(0,0,0,0.85)] md:px-16"
        >
          {/* Background decorations */}
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative z-10">
            <p className="mb-4 font-display text-sm font-medium uppercase tracking-[0.2em] text-primary">
              Ready to Start?
            </p>
            <h2 className="mx-auto mb-6 max-w-2xl font-display text-3xl font-bold md:text-5xl">
              Ready to transform your business?
            </h2>
            <p className="mx-auto mb-10 max-w-lg text-base text-primary-foreground/50">
              Let's discuss how our software development and AI solutions can
              help you achieve your technology goals.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://calendly.com/sofrix"
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="hero" size="xl">
                  Get in Touch <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
