
import BackButton from "@/components/common/BackButton";

const LoisirsHeader = () => {
  return (
    <>
      <BackButton backTo="/" />
      
      <h1 className="text-3xl md:text-4xl font-bold text-center text-creole-blue mb-8">
        Nos Activités de Loisirs
      </h1>
      
      <p className="text-lg text-center mb-12 max-w-3xl mx-auto">
        Découvrez notre sélection d'activités de loisirs authentiques aux Antilles.
        Inscrivez-vous et immergez-vous dans la culture créole à travers des expériences uniques.
      </p>
    </>
  );
};

export default LoisirsHeader;
