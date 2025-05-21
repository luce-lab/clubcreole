
import BackButton from "@/components/common/BackButton";

const RestaurantHeader = () => {
  return (
    <div className="mb-8">
      <BackButton backTo="/" />

      <h1 className="text-3xl font-bold text-creole-blue">Nos Restaurants Partenaires</h1>
      <p className="text-gray-600 mt-2">
        Découvrez les restaurants partenaires du Club Créole et profitez d'offres exclusives
      </p>
    </div>
  );
};

export default RestaurantHeader;
