
import CarRentalHeader from "@/components/car-rental/CarRentalHeader";
import CarRentalCard from "@/components/car-rental/CarRentalCard";
import ReviewCarousel from "@/components/car-rental/ReviewCarousel";
import MembershipBenefits from "@/components/car-rental/MembershipBenefits";
import { carRentals, clientReviews } from "@/components/car-rental/carRentalData";

const CarRentalActivity = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <CarRentalHeader />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {carRentals.map((rental) => (
          <CarRentalCard key={rental.id} rental={rental} />
        ))}
      </div>
      
      <ReviewCarousel reviews={clientReviews} />
      
      <MembershipBenefits />
    </div>
  );
};

export default CarRentalActivity;
