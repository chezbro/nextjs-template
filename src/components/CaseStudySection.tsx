import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import parrotImg from "@/assets/cases/parrot.png";
import perdiemImg from "@/assets/cases/perdiem.png";
import voxoImg from "@/assets/cases/voxo.png";

const caseStudies = [
  {
    tag: "AI + Mobile",
    title: "Parrot AI — Top #100 on the App Store",
    description:
      "Make a celebrity say anything with AI-generated videos in seconds. We built the full-stack mobile app that hit the top 100 charts.",
    metric: "#100",
    metricLabel: "App Store",
    image: parrotImg,
  },
  {
    tag: "Software Dev",
    title: "Per Diem — YC-Backed Restaurant Platform",
    description:
      "White-label mobile ordering platform for restaurants, powered by Square POS integration. Built and shipped in under 30 days.",
    metric: "4 wk",
    metricLabel: "Time to Launch",
    image: perdiemImg,
  },
  {
    tag: "AI + E-Commerce",
    title: "Voxo — AI-Powered Shopping Experiences",
    description:
      "An AI-powered e-commerce platform delivering personalized shopping experiences and intelligent product recommendations.",
    metric: "3x",
    metricLabel: "Engagement",
    image: voxoImg,
  },
];

export default function CaseStudySection() {
  return (
    <section className="bg-background py-28" id="work">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex items-end justify-between"
        >
          <div className="max-w-xl">
            <p className="mb-3 font-display text-sm font-medium uppercase tracking-[0.2em] text-primary">
              Our Work
            </p>
            <h2 className="font-display text-4xl font-bold text-foreground md:text-5xl">
              Results that speak
            </h2>
          </div>
          <Button variant="ghost" className="hidden gap-2 md:flex">
            View all work <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {caseStudies.map((study, i) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="hover-lift group cursor-pointer overflow-hidden rounded-2xl border border-border/50 bg-card"
            >
              {/* Case study image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={study.image}
                  alt={study.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-end gap-2">
                  <span className="font-display text-3xl font-bold text-primary-foreground">
                    {study.metric}
                  </span>
                  <span className="mb-1 text-sm text-primary-foreground/70">
                    {study.metricLabel}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <span className="mb-3 inline-block rounded-lg bg-primary/10 px-3 py-1 font-display text-xs font-medium text-primary">
                  {study.tag}
                </span>
                <h3 className="mb-2 font-display text-lg font-semibold leading-snug text-foreground">
                  {study.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {study.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
