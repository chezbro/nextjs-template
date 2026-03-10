import logoVoxo from "@/assets/logos/voxo.svg";
import logoSeer from "@/assets/logos/seer.svg";
import logoPerdiem from "@/assets/logos/perdiem.svg";
import logoOpenphone from "@/assets/logos/openphone.svg";
import logoLaligne from "@/assets/logos/laligne.svg";
import logoCrowdbotics from "@/assets/logos/crowdbotics.svg";
import logoExpensify from "@/assets/logos/expensify.svg";
import logoLitcheck from "@/assets/logos/litcheck.webp";

const logos = [
  { src: logoVoxo, alt: "Voxo" },
  { src: logoSeer, alt: "Seer" },
  { src: logoPerdiem, alt: "Per Diem" },
  { src: logoOpenphone, alt: "OpenPhone" },
  { src: logoLaligne, alt: "La Ligne" },
  { src: logoCrowdbotics, alt: "Crowdbotics" },
  { src: logoExpensify, alt: "Expensify" },
  { src: logoLitcheck, alt: "LitCheck" },
];

export default function LogoCarousel() {
  return (
    <section className="overflow-hidden border-y border-border/50 bg-secondary/30 py-12">
      <div className="container mx-auto mb-8 px-6">
        <p className="text-center font-display text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Companies we've worked with
        </p>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-secondary/60 to-transparent" />
        <div className="absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-secondary/60 to-transparent" />
        <div className="flex animate-slide-logos items-center gap-20">
          {[...logos, ...logos].map((logo, i) => (
            <div
              key={i}
              className="flex h-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/95 px-6 shadow-sm shadow-black/20 border border-black/5"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-8 w-auto max-w-[120px] object-contain opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
