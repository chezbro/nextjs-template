import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LogoCarousel from "@/components/LogoCarousel";
import ServicesSection from "@/components/ServicesSection";
import CaseStudySection from "@/components/CaseStudySection";
import AboutSection from "@/components/AboutSection";
import CTASection from "@/components/CTASection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <LogoCarousel />
      <ServicesSection />
      <CaseStudySection />
      <AboutSection />
      <CTASection />
      <FooterSection />
    </div>
  );
};

export default Index;
