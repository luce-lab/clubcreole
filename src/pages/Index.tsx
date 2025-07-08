
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PromoCarousel } from "@/components/promo";
import Activities from "@/components/Activities";
import { Advantages } from "@/components/Advantages";
import { Pricing } from "@/components/Pricing";
import { ClientReviews } from "@/components/ClientReviews";
import { ClubCyclone } from "@/components/ClubCyclone";
import { Footer } from "@/components/Footer";
import SEO from "@/components/SEO";
import { generateOrganizationSchema, generateBaseURL } from "@/utils/seoHelpers";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Club Créole - Activités, Restaurants et Hébergements en Guadeloupe"
        description="Découvrez et réservez les meilleures activités, restaurants et hébergements en Guadeloupe. Plongée, randonnée, concerts, location de voitures et plus encore avec Club Créole."
        keywords="Guadeloupe, activités, restaurants, hébergements, réservation, plongée, randonnée, concerts, location voiture, voyages, loisirs"
        canonical={generateBaseURL()}
        ogImage={`${generateBaseURL()}/og-image.png`}
        structuredData={generateOrganizationSchema()}
      />
      <Header />
      <main>
        <Hero />
        <PromoCarousel />
        <Activities />
        <Advantages />
        <ClientReviews />
        <Pricing />
        <ClubCyclone />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
