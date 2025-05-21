
import BackButton from "@/components/common/BackButton";

interface ConcertPageHeaderProps {
  title: string;
  description: string;
}

const ConcertPageHeader: React.FC<ConcertPageHeaderProps> = ({ title, description }) => {
  return (
    <>
      <BackButton backTo="/" />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-creole-blue">{title}</h1>
        <p className="text-gray-600 mt-2">
          {description}
        </p>
      </div>
    </>
  );
};

export default ConcertPageHeader;
