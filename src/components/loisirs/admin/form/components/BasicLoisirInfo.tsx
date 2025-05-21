
import { FormField } from "../FormField";

interface BasicLoisirInfoProps {
  title: string;
  description: string;
  location: string;
  image: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onImageChange: (value: string) => void;
}

export const BasicLoisirInfo = ({
  title,
  description,
  location,
  image,
  onTitleChange,
  onDescriptionChange,
  onLocationChange,
  onImageChange,
}: BasicLoisirInfoProps) => {
  return (
    <>
      <FormField
        id="edit-title"
        label="Titre"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        required
      />

      <FormField
        id="edit-description"
        label="Description"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        required
        isTextarea
      />

      <FormField
        id="edit-location"
        label="Lieu"
        value={location}
        onChange={(e) => onLocationChange(e.target.value)}
        required
      />

      <FormField
        id="edit-image"
        label="URL Image principale"
        value={image}
        onChange={(e) => onImageChange(e.target.value)}
        required
      />
    </>
  );
};
