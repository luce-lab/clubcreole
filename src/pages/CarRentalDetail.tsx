
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { carRentals } from "@/components/car-rental/carRentalData";
import BackButton from "@/components/common/BackButton";
import RentalDetailHeader from "@/components/car-rental/RentalDetailHeader";
import RentalDescription from "@/components/car-rental/RentalDescription";
import RentalModels from "@/components/car-rental/RentalModels";
import RentalReservationForm from "@/components/car-rental/RentalReservationForm";

const CarRentalDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const carRental = carRentals.find(car => car.id === Number(id));

  if (!carRental) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Location non trouvée</h2>
        <Button onClick={() => navigate("/location")}>Retour aux locations</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton backTo="/location" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Images & Description */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Image */}
          <div className="rounded-lg overflow-hidden shadow-lg h-80">
            <img 
              src={carRental.image} 
              alt={carRental.name}
              className="w-full h-full object-cover" 
            />
          </div>

          {/* Description */}
          <RentalDescription rental={carRental} />

          {/* Available Models */}
          <RentalModels 
            models={carRental.models} 
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
          />
        </div>

        {/* Right column - Reservation Form */}
        <div>
          <RentalReservationForm 
            rentalName={carRental.name}
            selectedModel={selectedModel}
            models={carRental.models}
          />
        </div>
      </div>
    </div>
  );
};

export default CarRentalDetail;
