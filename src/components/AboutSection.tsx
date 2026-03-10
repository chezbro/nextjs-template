import { motion } from "framer-motion";
import { Shield, Zap, Users, Award } from "lucide-react";
import sofrixLogo from "@/assets/sofrix-logo.svg";

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "15+", label: "Countries Served" },
  { value: "5+", label: "Years of Excellence" },
];

const values = [
  {
    icon: Shield,
    title: "Strategic Partnership",
    description: "We work as an extension of your team, aligning our expertise with your business goals.",
  },
  {
    icon: Zap,
    title: "Accelerated Delivery",
    description: "Streamlined processes and senior talent bring your ideas to market faster.",
  },
  {
    icon: Users,
    title: "Scalable Resources",
    description: "Scale our services up or down to match your evolving needs.",
  },
  {
    icon: Award,
    title: "Technical Excellence",
    description: "Industry best practices ensuring clean, maintainable code that scales.",
  },
];

export default function AboutSection() {
  return (
    <section className="bg-secondary/20 py-28" id="about">
      <div className="container mx-auto px-6">
        <div className="grid items-start gap-16 lg:grid-cols-2">
          {/* Left: About text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-3 font-display text-sm font-medium uppercase tracking-[0.2em] text-primary">
              About Sofrix
            </p>
            <h2 className="mb-6 font-display text-4xl font-bold text-foreground md:text-5xl">
              Senior-level engineering, startup speed
            </h2>
            <p className="mb-6 text-base leading-relaxed text-muted-foreground">
              We're Sofrix — a software development company that believes smarter software creates stronger businesses. We leverage rockstar engineers and cutting-edge AI to transform business operations and drive sustainable growth.
            </p>
            <p className="mb-10 text-base leading-relaxed text-muted-foreground">
              Our global team of senior engineers delivers premium development capabilities with the agility of a startup. Whether you need a full product build or specialized expertise, we scale to match your vision.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="text-center"
                >
                  <p className="font-display text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Values grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="hover-lift rounded-2xl border border-border/50 bg-card p-6"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <value.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 font-display text-base font-semibold text-foreground">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
