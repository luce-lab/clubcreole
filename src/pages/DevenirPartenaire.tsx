
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PartnerHero } from "@/components/partner/PartnerHero";
import { PartnerAdvantages } from "@/components/partner/PartnerAdvantages";
import { PartnerApplicationForm } from "@/components/partner/PartnerApplicationForm";
import { PartnerNavigation } from "@/components/partner/PartnerNavigation";

const DevenirPartenaire = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PartnerNavigation />
      
      <main className="flex-1">
        <PartnerHero />
        <PartnerAdvantages />
        <PartnerApplicationForm />
      </main>
      
      <Footer />
    </div>
  );
};

export default DevenirPartenaire;
