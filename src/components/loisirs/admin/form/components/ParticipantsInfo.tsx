
import { FormField } from "../FormField";

interface ParticipantsInfoProps {
  maxParticipants: number;
  currentParticipants: number;
  galleryImages: string;
  onMaxParticipantsChange: (value: number) => void;
  onCurrentParticipantsChange: (value: number) => void;
  onGalleryImagesChange: (value: string) => void;
}

export const ParticipantsInfo = ({
  maxParticipants,
  currentParticipants,
  galleryImages,
  onMaxParticipantsChange,
  onCurrentParticipantsChange,
  onGalleryImagesChange,
}: ParticipantsInfoProps) => {
  return (
    <>
      <FormField
        id="edit-galleryImages"
        label="URLs des images de la galerie (une URL par ligne)"
        value={galleryImages}
        onChange={(e) => onGalleryImagesChange(e.target.value)}
        isTextarea
        placeholder="https://exemple.com/image1.jpg&#10;https://exemple.com/image2.jpg&#10;https://exemple.com/image3.jpg"
      />

      <FormField
        id="edit-maxParticipants"
        label="Participants max"
        type="number"
        min={currentParticipants}
        value={maxParticipants}
        onChange={(e) => onMaxParticipantsChange(parseInt(e.target.value))}
        required
      />

      <FormField
        id="edit-currentParticipants"
        label="Inscrits actuels"
        type="number"
        min="0"
        max={maxParticipants}
        value={currentParticipants}
        onChange={(e) => onCurrentParticipantsChange(parseInt(e.target.value))}
        required
      />
    </>
  );
};
