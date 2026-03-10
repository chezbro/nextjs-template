import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import sofrixLogo from "@/assets/sofrix-logo.svg";

const offices = [
  {
    city: "New York",
    address: "123 Innovation Ave, NY 10001",
    phone: "+1 (212) 555-0100",
  },
  {
    city: "San Francisco",
    address: "456 Tech Blvd, CA 94105",
    phone: "+1 (415) 555-0200",
  },
  {
    city: "London",
    address: "78 Digital Lane, EC2A 4NE",
    phone: "+44 20 7946 0300",
  },
];

const footerLinks = {
  Services: [
    { label: "AI Automations", href: "#ai-automations" },
    { label: "GBP Optimization", href: "#gbp-optimization" },
    { label: "Software Development", href: "#software-development" },
  ],
  Company: [
    { label: "About Us", href: "#about" },
    { label: "Our Work", href: "#work" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

export default function FooterSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Derive a subject similar to the Next.js contact page
    const subjectBase =
      formData.service === "ai"
        ? "AI Automations Inquiry"
        : formData.service === "gbp"
          ? "GBP Optimization Inquiry"
          : formData.service === "dev"
            ? "Software Development Inquiry"
            : "General Project Inquiry";

    const subject = formData.company
      ? `${subjectBase} - ${formData.company}`
      : subjectBase;

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject,
          message: formData.message,
        }),
      });

      let data: any = null;
      const contentType = response.headers.get("content-type") || "";

      if (contentType.includes("application/json")) {
        try {
          data = await response.json();
        } catch {
          // Ignore JSON parse errors – backend might return empty body
        }
      }

      if (!response.ok) {
        throw new Error(
          (data && data.message) ||
            `Failed to send message (status ${response.status})`,
        );
      }

      toast({
        title: "Message sent!",
        description: "Your message has been sent successfully.",
      });

      setFormData({
        name: "",
        email: "",
        company: "",
        service: "",
        message: "",
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An unexpected error occurred";

      toast({
        title: "Something went wrong",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="contact" className="bg-black text-primary-foreground">
      {/* Contact Section */}
      <div className="bg-black text-primary-foreground">
        <div className="container mx-auto px-6 py-24">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="mb-3 font-display text-sm font-medium uppercase tracking-[0.2em] text-primary">
                Start a Project
              </p>
              <h2 className="mb-3 font-display text-3xl font-bold md:text-4xl">
                Let's build something great
              </h2>
              <p className="mb-8 text-primary-foreground/50">
                Tell us about your project and we'll get back to you within 24
                hours with a game plan.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    maxLength={100}
                    className="rounded-xl border-primary-foreground/10 bg-primary-foreground/5 text-primary-foreground placeholder:text-primary-foreground/30 focus:border-primary"
                  />
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    maxLength={255}
                    className="rounded-xl border-primary-foreground/10 bg-primary-foreground/5 text-primary-foreground placeholder:text-primary-foreground/30 focus:border-primary"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    placeholder="Company name"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    maxLength={100}
                    className="rounded-xl border-primary-foreground/10 bg-primary-foreground/5 text-primary-foreground placeholder:text-primary-foreground/30 focus:border-primary"
                  />
                  <Select
                    value={formData.service}
                    onValueChange={(v) =>
                      setFormData({ ...formData, service: v })
                    }
                  >
                    <SelectTrigger className="rounded-xl border-primary-foreground/10 bg-primary-foreground/5 text-primary-foreground data-[placeholder]:text-primary-foreground/30">
                      <SelectValue placeholder="Service needed" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ai">AI Automations</SelectItem>
                      <SelectItem value="gbp">GBP Optimization</SelectItem>
                      <SelectItem value="dev">Software Development</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Textarea
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  maxLength={1000}
                  rows={5}
                  className="rounded-xl border-primary-foreground/10 bg-primary-foreground/5 text-primary-foreground placeholder:text-primary-foreground/30 focus:border-primary"
                />
                <Button
                  variant="hero"
                  size="lg"
                  type="submit"
                  className="w-full sm:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </motion.div>

            {/* Office Locations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-5">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">General inquiries</p>
                    <a
                      href="mailto:info@sofrix.com"
                      className="text-sm text-primary hover:underline"
                    >
                      info@sofrix.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-5">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Visit us</p>
                    <p className="text-sm text-primary-foreground/70">
                      2219 Main St. Santa Monica, CA 90405
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer links */}
      <div className="border-t border-primary-foreground/10 bg-black text-primary-foreground">
        <div className="container mx-auto px-6 py-16">
          <div className="grid gap-12 md:grid-cols-5">
            {/* Brand column */}
            <div className="md:col-span-2">
              <img
                src={sofrixLogo}
                alt="Sofrix"
                className="mb-4 h-6 brightness-0 invert"
              />
              <p className="mb-6 max-w-xs text-sm leading-relaxed text-primary-foreground/40">
                We're a software development company that believes smarter
                software creates stronger businesses.
              </p>
              <div className="flex gap-4">
                {[
                  {
                    label: "LinkedIn",
                    href: "https://www.linkedin.com/company/sofrix",
                  },
                  {
                    label: "Email",
                    href: "mailto:eric.chesbrough@sofrix.com",
                  },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary-foreground/10 text-xs text-primary-foreground/40 transition-colors hover:border-primary hover:text-primary"
                  >
                    {social.label[0]}
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="mb-4 font-display text-sm font-semibold text-primary-foreground/60">
                  {category}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-primary-foreground/40 transition-colors hover:text-primary"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/5 pt-8 sm:flex-row">
            <p className="text-xs text-primary-foreground/30">
              © 2026 Sofrix. All rights reserved.
            </p>
            <a
              href="https://www.sofrix.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-primary-foreground/30 transition-colors hover:text-primary"
            >
              sofrix.com <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
