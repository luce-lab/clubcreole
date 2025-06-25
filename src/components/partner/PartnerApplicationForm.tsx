import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";



export const PartnerApplicationForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    business_name: "",
    contact_name: "",
    email: "",
    phone: "",
    business_type: "",
    description: "",
    location: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Insérer les données dans la table partners avec le statut "en_attente"
      const { error } = await supabase
        .from('partners')
        .insert({
          business_name: formData.business_name,
          business_type: formData.business_type,
          description: formData.description,
          address: formData.location,
          phone: formData.phone,
          status: 'en_attente',
          created_at: new Date().toISOString()
        });

      if (error) {
        console.error('Erreur lors de la soumission:', error);
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite lors de l'envoi de votre candidature. Veuillez réessayer.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Demande envoyée !",
        description: "Nous vous contacterons sous peu pour discuter de votre partenariat.",
      });
      
      // Reset du formulaire
      setFormData({
        business_name: "",
        contact_name: "",
        email: "",
        phone: "",
        business_type: "",
        description: "",
        location: ""
      });

    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'envoi de votre candidature. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Formulaire de candidature
              </CardTitle>
              <p className="text-center text-gray-600">
                Remplissez ce formulaire pour nous faire part de votre intérêt
              </p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="business_name">Nom de l'entreprise *</Label>
                    <Input
                      id="business_name"
                      value={formData.business_name}
                      onChange={(e) => handleInputChange("business_name", e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="contact_name">Nom du contact *</Label>
                    <Input
                      id="contact_name"
                      value={formData.contact_name}
                      onChange={(e) => handleInputChange("contact_name", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="business_type">Type d'activité *</Label>
                  <Select onValueChange={(value) => handleInputChange("business_type", value)} value={formData.business_type}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez votre secteur d'activité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="car_rental">Location de voitures</SelectItem>
                      <SelectItem value="accommodation">Hébergement</SelectItem>
                      <SelectItem value="restaurant">Restauration</SelectItem>
                      <SelectItem value="leisure">Loisirs</SelectItem>
                      <SelectItem value="diving">Plongée</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="location">Localisation</Label>
                  <Input
                    id="location"
                    placeholder="Ville, commune..."
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description de votre activité *</Label>
                  <Textarea
                    id="description"
                    placeholder="Décrivez brièvement votre activité et ce que vous proposez..."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    required
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-creole-green hover:bg-creole-green/90"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Envoi en cours..." : "Envoyer ma candidature"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

