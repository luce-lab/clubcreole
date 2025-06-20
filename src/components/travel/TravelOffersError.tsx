
export const TravelOffersError = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Nos Offres de Voyage
        </h2>
        
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Erreur lors du chargement des offres de voyage
          </p>
          <p className="text-gray-400 mt-2">
            Veuillez réessayer plus tard
          </p>
        </div>
      </div>
    </section>
  );
};
