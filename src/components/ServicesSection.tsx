import { motion } from "framer-motion";
import { Bot, MapPin, Code2, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import serviceAi from "@/assets/service-ai.jpg";
import serviceGbp from "@/assets/service-gbp.jpg";
import serviceDev from "@/assets/service-dev.jpg";

const services = [
  {
    icon: Bot,
    id: "ai-automations",
    title: "AI Automations",
    subtitle: "Work smarter, not harder",
    description:
      "We build intelligent automation systems that eliminate repetitive tasks, reduce human error, and unlock new revenue streams — from AI chatbots and document processing to predictive analytics pipelines.",
    features: [
      "Custom AI chatbots & virtual assistants",
      "Automated data extraction & processing",
      "Predictive analytics & forecasting",
      "Workflow automation & integration",
      "Natural language processing solutions",
    ],
    image: serviceAi,
    reversed: false,
  },
  {
    icon: MapPin,
    id: "gbp-optimization",
    title: "GBP Optimization & Ranking",
    subtitle: "Dominate local search",
    description:
      "Our proven Google Business Profile optimization strategy puts your business at the top of local search results. We combine technical SEO, review management, and content strategy to drive real foot traffic to your door.",
    features: [
      "Google Business Profile audit & optimization",
      "Local SEO & citation building",
      "Review generation & reputation management",
      "Local content strategy & geo-targeting",
      "Competitor analysis & ranking tracking",
    ],
    image: serviceGbp,
    reversed: true,
  },
  {
    icon: Code2,
    id: "software-development",
    title: "Software Development",
    subtitle: "Built for scale, shipped fast",
    description:
      "From concept to launch, we design and engineer custom web and mobile applications with clean architecture, modern tech stacks, and pixel-perfect UIs. Our senior-level developers ship production-grade software in weeks, not months.",
    features: [
      "Custom web & mobile applications",
      "API design & microservices architecture",
      "E-commerce & POS integrations",
      "Cloud infrastructure & DevOps",
      "UI/UX design & prototyping",
    ],
    image: serviceDev,
    reversed: false,
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-background" id="services">
      {/* Overview header */}
      <div className="border-b border-border/50 py-28">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="mb-3 font-display text-sm font-medium uppercase tracking-[0.2em] text-primary">
              What We Do
            </p>
            <h2 className="mb-6 font-display text-4xl font-bold text-foreground md:text-5xl">
              Services built for growth
            </h2>
            <p className="mx-auto max-w-xl text-lg leading-relaxed text-muted-foreground">
              We combine AI expertise, local marketing mastery, and engineering excellence to help businesses scale smarter and faster.
            </p>
          </motion.div>

          {/* Quick nav cards */}
          <div className="mt-16 grid gap-4 md:grid-cols-3">
            {services.map((service, i) => (
              <motion.a
                key={service.id}
                href={`#${service.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="hover-lift group flex items-center gap-4 rounded-2xl border border-border/50 bg-card p-6 transition-colors hover:border-primary/20"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <service.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-base font-semibold text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{service.subtitle}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Individual service sections */}
      {services.map((service, i) => (
        <div
          key={service.id}
          id={service.id}
          className={`border-b border-border/50 py-24 ${
            i % 2 === 1 ? "bg-secondary/20" : "bg-background"
          }`}
        >
          <div className="container mx-auto px-6">
            <div
              className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
                service.reversed ? "lg:grid-flow-dense" : ""
              }`}
            >
              {/* Text content */}
              <motion.div
                initial={{ opacity: 0, x: service.reversed ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={service.reversed ? "lg:col-start-2" : ""}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <service.icon className="h-5 w-5" />
                  </div>
                  <p className="font-display text-sm font-medium uppercase tracking-[0.15em] text-primary">
                    {service.subtitle}
                  </p>
                </div>

                <h3 className="mb-5 font-display text-3xl font-bold text-foreground md:text-4xl">
                  {service.title}
                </h3>
                <p className="mb-8 text-base leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                <ul className="mb-8 space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span className="text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button variant="hero" size="lg">
                  Learn More
                </Button>
              </motion.div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: service.reversed ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className={`overflow-hidden rounded-2xl ${
                  service.reversed ? "lg:col-start-1 lg:row-start-1" : ""
                }`}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="aspect-[4/3] w-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
