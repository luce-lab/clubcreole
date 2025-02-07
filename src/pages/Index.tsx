
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Activities } from "@/components/Activities";
import { Advantages } from "@/components/Advantages";
import { Pricing } from "@/components/Pricing";
import { ClubCyclone } from "@/components/ClubCyclone";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <Hero />
        <Activities />
        <Advantages />
        <Pricing />
        <ClubCyclone />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
