
import React from "react";

interface RestaurantGalleryProps {
  mainImage: string;
  photos: string[];
  restaurantName: string;
}

const RestaurantGallery = ({ mainImage, photos, restaurantName }: RestaurantGalleryProps) => {
  console.log("Gallery images:", { mainImage, additionalPhotos: photos });
  
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2">
        <img 
          src={mainImage} 
          alt={restaurantName} 
          className="w-full h-80 object-cover rounded-lg"
        />
      </div>
      {photos.map((photo, index) => (
        <div key={index} className="col-span-1">
          <img 
            src={photo} 
            alt={`${restaurantName} - Photo ${index + 2}`} 
            className="w-full h-40 object-cover rounded-lg"
          />
        </div>
      ))}
    </div>
  );
};

export default RestaurantGallery;
