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
    location: "",
    website: ""
  });

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('partners')
        .insert({
          business_name: formData.business_name,
          business_type: formData.business_type,
          description: formData.description,
          address: formData.location,
          phone: formData.phone,
          website: formData.website,
          status: 'en_attente',
          created_at: new Date().toISOString()
        });

      if (error) {
        if (error.code === '23505' && error.message.includes('partners_business_name_unique')) {
          toast({
            title: "Erreur d'inscription",
            description: "Un partenaire avec ce nom d'entreprise existe déjà. Veuillez utiliser un nom différent.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Erreur d'inscription",
            description: "Une erreur est survenue lors de l'inscription. Veuillez réessayer.",
            variant: "destructive"
          });
        }
        return;
      }

      toast({
        title: "Inscription réussie",
        description: "Votre demande de partenariat a été envoyée avec succès. Nous vous contacterons bientôt."
      });
      
      // Reset form
      setFormData({
        business_name: "",
        contact_name: "",
        email: "",
        phone: "",
        business_type: "",
        description: "",
        location: "",
        website: ""
      });

    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur inattendue est survenue. Veuillez réessayer.",
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
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="business_name">Nom de l'entreprise</Label>
                      <Input
                        id="business_name"
                        value={formData.business_name}
                        onChange={(e) => handleInputChange('business_name', e.target.value)}
                        required
                      />
                    </div>
                  
                    <div className="space-y-2">
                      <Label htmlFor="business_type">Type d'activité</Label>
                      <Select
                        value={formData.business_type}
                        onValueChange={(value) => handleInputChange('business_type', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez votre type d'activité" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="restaurant">Restaurant</SelectItem>
                          <SelectItem value="activity">Activité de loisir</SelectItem>
                          <SelectItem value="car_rental">Location de voiture</SelectItem>
                          <SelectItem value="travel_agency">Agence de voyage</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact_name">Nom du contact</Label>
                      <Input
                        id="contact_name"
                        value={formData.contact_name}
                        onChange={(e) => handleInputChange('contact_name', e.target.value)}
                        required
                      />
                    </div>
                  
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                      />
                    </div>
                  
                    <div className="space-y-2">
                      <Label htmlFor="website">Site web</Label>
                      <Input
                        id="website"
                        type="url"
                        value={formData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        placeholder="https://www.example.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Adresse</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description de votre activité</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Envoi en cours..." : "Envoyer la demande"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

