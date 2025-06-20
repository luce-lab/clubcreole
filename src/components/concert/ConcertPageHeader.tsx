
interface ConcertPageHeaderProps {
  title: string;
  description: string;
}

const ConcertPageHeader: React.FC<ConcertPageHeaderProps> = ({ title, description }) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-creole-blue">{title}</h1>
      <p className="text-gray-600 mt-2">
        {description}
      </p>
    </div>
  );
};

export default ConcertPageHeader;
