
import { Control } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { SubscriptionFormValues } from "../types";

interface SubscriptionSelectProps {
  control: Control<SubscriptionFormValues>;
  isSubmitting: boolean;
}

export function SubscriptionSelect({ control, isSubmitting }: SubscriptionSelectProps) {
  return (
    <FormField
      control={control}
      name="abonnement"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Abonnement</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={isSubmitting}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un abonnement" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="Gratuit">Gratuit - 0€/an</SelectItem>
              <SelectItem value="Passionné">Passionné - 15€/an</SelectItem>
              <SelectItem value="Expert">Expert - 90€/an</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
