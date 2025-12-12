
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AccommodationSearch } from "@/components/accommodation/AccommodationSearch";
import { AccommodationGridInfinite } from "@/components/accommodation/AccommodationGridInfinite";
import { AccommodationAdvantages } from "@/components/accommodation/AccommodationAdvantages";
import { MembershipCard } from "@/components/accommodation/MembershipCard";
import { AccommodationLoading } from "@/components/accommodation/AccommodationLoading";
import { AccommodationError } from "@/components/accommodation/AccommodationError";
import { AccommodationEmptyState } from "@/components/accommodation/AccommodationEmptyState";
import { useInfiniteAccommodations } from "@/hooks/useInfiniteAccommodations";
import { useDebounce } from "@/hooks/useDebounce";
import SEO from "@/components/SEO";
import { generateBaseURL } from "@/utils/seoHelpers";

const AccommodationActivity = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState<string>("");
  const [partnerOnly, setPartnerOnly] = useState(false);

  // Debounce la recherche pour éviter trop d'appels API
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const {
    accommodations,
    loading,
    error,
    hasMore,
    totalCount,
    reset,
    isLoadingMore
  } = useInfiniteAccommodations({
    initialLimit: 12,
    threshold: 200,
    searchQuery: debouncedSearchTerm,
    priceFilter: priceFilter,
    partnerOnly: partnerOnly
  });

  const hasResults = accommodations.length > 0;

  if (loading) {
    return <AccommodationLoading />;
  }

  if (error && !hasResults) {
    return <AccommodationError error={error} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <SEO
        title="Hébergements en Guadeloupe - Hôtels, Villas et Bungalows | Club Créole"
        description="Trouvez et réservez votre hébergement idéal en Guadeloupe. Hôtels, villas, bungalows avec vue mer. Réservation en ligne simple et sécurisée."
        keywords="hébergements Guadeloupe, hôtels Guadeloupe, villas Guadeloupe, bungalows, réservation hébergement, vue mer"
        canonical={`${generateBaseURL()}/hebergements`}
        ogTitle="Hébergements en Guadeloupe - Réservation en ligne"
        ogDescription="Trouvez et réservez votre hébergement idéal en Guadeloupe avec Club Créole."
        ogImage={`${generateBaseURL()}/og-image.png`}
      />
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à l'accueil
        </Button>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-creole-blue">Hébergements en Guadeloupe</h1>
        <p className="text-gray-600 mt-2">
          Découvrez notre sélection d'hébergements pour un séjour inoubliable. Villas, hôtels, bungalows et plus encore!
        </p>
      </div>

      <AccommodationSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
        partnerOnly={partnerOnly}
        onPartnerFilterChange={setPartnerOnly}
      />

      {hasResults ? (
        <AccommodationGridInfinite 
          accommodations={accommodations}
          isLoadingMore={isLoadingMore}
          hasMore={hasMore}
          error={error}
        />
      ) : (
        <AccommodationEmptyState />
      )}

      <MembershipCard />

      <AccommodationAdvantages />
    </div>
  );
};

export default AccommodationActivity;
