
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface AccommodationGalleryProps {
  images: string[];
  name: string;
}

export const AccommodationGallery = ({ images, name }: AccommodationGalleryProps) => {
  return (
    <div className="mb-8">
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="basis-full md:basis-1/2 lg:basis-1/3">
              <AspectRatio ratio={16 / 9}>
                <img 
                  src={image} 
                  alt={`${name} - photo ${index + 1}`}
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
