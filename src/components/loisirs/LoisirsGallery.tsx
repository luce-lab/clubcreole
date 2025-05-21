
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface LoisirsGalleryProps {
  mainImage: string;
  galleryImages?: string[];
  title: string;
}

const LoisirsGallery = ({ mainImage, galleryImages = [], title }: LoisirsGalleryProps) => {
  // Nous combinons l'image principale avec les images de la galerie
  const allImages = [mainImage, ...(galleryImages || [])].filter(Boolean);
  
  return (
    <div className="mb-8">
      <Carousel className="w-full">
        <CarouselContent>
          {allImages.map((image, index) => (
            <CarouselItem key={index} className="basis-full md:basis-1/2 lg:basis-1/3">
              <AspectRatio ratio={16 / 9}>
                <img 
                  src={image} 
                  alt={`${title} - photo ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center gap-2 mt-4">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
};

export default LoisirsGallery;
