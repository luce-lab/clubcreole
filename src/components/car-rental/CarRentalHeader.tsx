
import BackButton from "@/components/common/BackButton";

const CarRentalHeader = () => {
  return (
    <>
      <BackButton backTo="/" />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-creole-blue">Location de Voitures</h1>
        <p className="text-gray-600 mt-2">
          Découvrez nos partenaires de location de voitures et profitez d'offres exclusives avec votre abonnement Club Créole
        </p>
      </div>
    </>
  );
};

export default CarRentalHeader;
