import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import FeaturesSection from "@/components/landing/FeaturesSection";
import Footer from "@/components/landing/Footer";
import HeroSection from "@/components/landing/HeroSection";
import UsingSteps from "@/components/landing/UsingSteps";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");

  return (
    <div className="bg-[#020817] text-white">
      <HeroSection />
      <UsingSteps />
      <FeaturesSection />
      <Footer />
    </div>
  );
}
