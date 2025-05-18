import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AccommodationHeader } from "@/components/accommodation/AccommodationHeader";
import { AccommodationGallery } from "@/components/accommodation/AccommodationGallery";
import { AccommodationInfo } from "@/components/accommodation/AccommodationInfo";
import { AccommodationAmenities } from "@/components/accommodation/AccommodationAmenities";
import { AccommodationRules } from "@/components/accommodation/AccommodationRules";
import { AccommodationFAQ } from "@/components/accommodation/AccommodationFAQ";
import { ReservationCard } from "@/components/accommodation/ReservationCard";
import { Accommodation } from "@/components/accommodation/AccommodationTypes";

// Liste temporaire des hébergements (idéalement, cela viendrait d'une API ou d'une base de données)
const accommodations = [
  {
    id: 1,
    name: "Villa Paradis",
    type: "Villa",
    location: "Basse-Terre",
    price: 120,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    galleryImages: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1543968332-f99478b1ebdc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1501117716987-c8c394bb29df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1549638441-b787d2e11f14?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
    ],
    features: ["WiFi", "TV", "Cuisine", "Parking", "Climatisation", "Piscine"],
    description: "Magnifique villa avec vue sur la mer, parfaite pour des vacances en famille ou entre amis. Située à seulement 5 minutes à pied de la plage, cette villa spacieuse offre tout le confort nécessaire pour un séjour inoubliable.",
    rooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    amenities: [
      { name: "WiFi gratuit", available: true },
      { name: "Petit-déjeuner inclus", available: true },
      { name: "Piscine privée", available: true },
      { name: "Vue sur la mer", available: true },
      { name: "Service de ménage", available: true },
      { name: "Animaux acceptés", available: false },
      { name: "Parking gratuit", available: true },
      { name: "Climatisation", available: true }
    ],
    rules: [
      "Check-in: 15h00",
      "Check-out: 11h00",
      "Interdiction de fumer",
      "Pas de fêtes ou événements"
    ]
  },
  {
    id: 2,
    name: "Hôtel Tropical",
    type: "Hôtel",
    location: "Grande-Terre",
    price: 85,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    galleryImages: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590073844006-33379778ae09?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
    ],
    features: ["WiFi", "TV", "Restaurant", "Parking", "Climatisation", "Piscine"],
    description: "Hôtel confortable et élégant situé à quelques pas de la plage. Profitez de nos installations modernes et d'un service de qualité pour un séjour relaxant dans un cadre idyllique.",
    rooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    amenities: [
      { name: "WiFi gratuit", available: true },
      { name: "Petit-déjeuner inclus", available: true },
      { name: "Piscine", available: true },
      { name: "Vue sur la mer", available: true },
      { name: "Service de ménage", available: true },
      { name: "Animaux acceptés", available: false },
      { name: "Parking gratuit", available: true },
      { name: "Climatisation", available: true }
    ],
    rules: [
      "Check-in: 14h00",
      "Check-out: 11h00",
      "Interdiction de fumer dans les chambres",
      "Petit-déjeuner servi de 7h à 10h"
    ]
  },
  // ... Les autres hébergements restent identiques
];

const AccommodationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [accommodation, setAccommodation] = useState<Accommodation | null>(null);

  useEffect(() => {
    // Simuler une récupération de données
    const accommodationId = parseInt(id || "0");
    const foundAccommodation = accommodations.find(acc => acc.id === accommodationId);
    
    if (foundAccommodation) {
      setAccommodation(foundAccommodation);
    } else {
      navigate("/hebergements");
    }
  }, [id, navigate]);

  // Si aucun hébergement n'est trouvé
  if (!accommodation) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="flex justify-center items-center h-full">
            <p className="text-xl text-gray-500">Chargement en cours...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <AccommodationHeader 
          name={accommodation.name}
          location={accommodation.location}
          rating={accommodation.rating}
        />

        <AccommodationGallery 
          images={accommodation.galleryImages}
          name={accommodation.name}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-8">
            <AccommodationInfo 
              description={accommodation.description}
              maxGuests={accommodation.maxGuests}
              rooms={accommodation.rooms}
              bathrooms={accommodation.bathrooms}
            />

            <AccommodationAmenities 
              amenities={accommodation.amenities}
            />

            <AccommodationRules 
              rules={accommodation.rules}
            />

            <AccommodationFAQ 
              amenities={accommodation.amenities}
            />
          </div>

          {/* Colonne de réservation */}
          <div className="lg:col-span-1">
            <ReservationCard 
              price={accommodation.price}
              maxGuests={accommodation.maxGuests}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AccommodationDetail;
