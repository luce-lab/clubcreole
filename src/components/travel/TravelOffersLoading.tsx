
export const TravelOffersLoading = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Nos Offres de Voyage
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gray-200 h-48"></div>
                <div className="p-6 space-y-4">
                  <div className="bg-gray-200 h-6 rounded"></div>
                  <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="bg-gray-200 h-3 rounded w-1/2"></div>
                    <div className="bg-gray-200 h-3 rounded w-2/3"></div>
                  </div>
                  <div className="bg-gray-200 h-10 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
