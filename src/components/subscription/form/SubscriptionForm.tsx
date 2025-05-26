
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { useSubscriptionForm } from "./hooks/useSubscriptionForm";
import { PersonalInfoFields } from "./components/PersonalInfoFields";
import { SubscriptionSelect } from "./components/SubscriptionSelect";
import { SubscriptionFormProps } from "./types";

export function SubscriptionForm({ onSuccess }: SubscriptionFormProps) {
  const { form, onSubmit, isSubmitting } = useSubscriptionForm(onSuccess);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <PersonalInfoFields control={form.control} isSubmitting={isSubmitting} />
        <SubscriptionSelect control={form.control} isSubmitting={isSubmitting} />
        
        <Button 
          type="submit" 
          className="w-full bg-creole-green hover:bg-creole-green/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Traitement en cours...
            </>
          ) : "S'abonner"}
        </Button>
      </form>
    </Form>
  );
}
