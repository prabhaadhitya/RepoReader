import FeaturesSection from "@/components/landing/FeaturesSection";
import Footer from "@/components/landing/Footer";
import HeroSection from "@/components/landing/HeroSection";
import UsingSteps from "@/components/landing/UsingSteps";


export default function Home() {
  return (
    <div className="bg-[#020817] text-white">
      <HeroSection />
      <UsingSteps />
      <FeaturesSection />
      <Footer />
    </div>
  );
}
