
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PromoCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  badge?: string;
  ctaText: string;
  onCtaClick: () => void;
}

const PromoCard = ({ 
  title, 
  description, 
  image, 
  badge, 
  ctaText, 
  onCtaClick 
}: PromoCardProps) => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg bg-white group">
      <div className="aspect-[16/9] overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        {badge && (
          <Badge className="mb-3 bg-creole-green text-white">
            {badge}
          </Badge>
        )}
        
        <h3 className="text-2xl font-bold mb-3 group-hover:text-creole-green transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-200 mb-4 line-clamp-2">
          {description}
        </p>
        
        <Button 
          onClick={onCtaClick}
          className="bg-creole-green hover:bg-creole-green/90 text-white font-semibold"
        >
          {ctaText}
        </Button>
      </div>
    </div>
  );
};

export default PromoCard;
