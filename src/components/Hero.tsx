export const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-creole-green/10 to-creole-blue/10 py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-creole-green mb-6">
          Bienvenue au Club Créole
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8">
          Et de votre Vie Quotidienne !
        </p>
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg fade-in">
          <p className="text-gray-700 text-lg">
            Le Club Créole est un réseau de 50 entreprises touristiques et de loisirs à votre service pour le meilleur des Antilles
          </p>
        </div>
      </div>
    </section>
  );
};