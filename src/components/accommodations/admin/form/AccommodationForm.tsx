
import { Accommodation } from "@/components/accommodation/AccommodationTypes";
import { useAccommodationForm } from "./hooks/useAccommodationForm";
import { BasicInfoFields } from "./components/BasicInfoFields";
import { CapacityFields } from "./components/CapacityFields";
import { MediaFields } from "./components/MediaFields";
import { FormActions } from "./components/FormActions";

interface AccommodationFormProps {
  accommodation?: Accommodation;
  onSuccess: () => void;
  onCancel: () => void;
}

export const AccommodationForm = ({ accommodation, onSuccess, onCancel }: AccommodationFormProps) => {
  const {
    formData,
    isSubmitting,
    handleSubmit,
    handleInputChange,
    handleDiscountChange,
  } = useAccommodationForm({ accommodation, onSuccess });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <BasicInfoFields
        formData={formData}
        onInputChange={handleInputChange}
        onDiscountChange={handleDiscountChange}
      />

      <CapacityFields
        formData={formData}
        onInputChange={handleInputChange}
      />

      <MediaFields
        formData={formData}
        onInputChange={handleInputChange}
      />

      <FormActions
        accommodation={accommodation}
        isSubmitting={isSubmitting}
        onCancel={onCancel}
      />
    </form>
  );
};
