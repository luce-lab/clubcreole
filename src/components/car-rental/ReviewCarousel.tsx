
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Quote, MapPin, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { ClientReview } from "./CarRentalTypes";

interface ReviewCarouselProps {
  reviews: ClientReview[];
}

const ReviewCarousel = ({ reviews }: ReviewCarouselProps) => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const nextReview = () => {
    setCurrentReviewIndex((prevIndex) => 
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevReview = () => {
    setCurrentReviewIndex((prevIndex) => 
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-creole-blue mb-8 text-center">Avis de nos Clients</h2>
      
      <div className="relative bg-gray-50 rounded-lg shadow-md p-6 md:p-10 max-w-4xl mx-auto">
        <div className="absolute top-6 right-6 text-creole-green opacity-30">
          <Quote className="w-16 h-16" />
        </div>
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="flex-shrink-0">
            <img 
              src={reviews[currentReviewIndex].avatar} 
              alt={reviews[currentReviewIndex].name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" 
            />
          </div>
          
          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold">{reviews[currentReviewIndex].name}</h3>
                <p className="text-gray-600 text-sm flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {reviews[currentReviewIndex].location}
                </p>
              </div>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < reviews[currentReviewIndex].rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} 
                  />
                ))}
              </div>
            </div>
            
            <p className="text-gray-700 italic mb-4">"{reviews[currentReviewIndex].comment}"</p>
            
            <div className="flex justify-between items-center">
              <Badge variant="outline" className="bg-creole-green/10 text-creole-green">
                {reviews[currentReviewIndex].rentalCompany}
              </Badge>
              <p className="text-gray-500 text-sm">{reviews[currentReviewIndex].date}</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-8 gap-3">
          <Button 
            variant="outline" 
            size="icon"
            className="rounded-full border-creole-green text-creole-green hover:bg-creole-green/10 hover:text-creole-green"
            onClick={prevReview}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-1">
            {reviews.map((_, index) => (
              <div 
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentReviewIndex ? "bg-creole-green scale-125" : "bg-gray-300"
                }`}
                onClick={() => setCurrentReviewIndex(index)}
              ></div>
            ))}
          </div>
          <Button 
            variant="outline" 
            size="icon"
            className="rounded-full border-creole-green text-creole-green hover:bg-creole-green/10 hover:text-creole-green"
            onClick={nextReview}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCarousel;
