
import BackButton from "@/components/common/BackButton";

const NightlifePageHeader = () => {
  return (
    <>
      <BackButton backTo="/" />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#9b87f5]">Soirées & Vie Nocturne</h1>
        <p className="text-gray-600 mt-2">
          Découvrez les meilleures soirées et établissements nocturnes partenaires du Club Créole
        </p>
      </div>
    </>
  );
};

export default NightlifePageHeader;
