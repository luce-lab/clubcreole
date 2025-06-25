
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Handshake, Star, Users, TrendingUp } from "lucide-react";

const DevenirPartenaire = () => {
  const { toast } = useToast();
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
    
    // Ici on pourrait ajouter la logique pour envoyer les données
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
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-creole-green to-green-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Devenez Partenaire Club Créole
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Rejoignez notre réseau de partenaires et développez votre activité en Martinique
              </p>
              <div className="flex justify-center">
                <Handshake className="h-16 w-16 opacity-80" />
              </div>
            </div>
          </div>
        </section>

        {/* Avantages Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                Pourquoi devenir partenaire ?
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="text-center">
                  <CardHeader>
                    <Users className="h-12 w-12 text-creole-green mx-auto mb-4" />
                    <CardTitle>Visibilité accrue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Accédez à notre large base de membres et augmentez votre visibilité sur le marché martiniquais.
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <TrendingUp className="h-12 w-12 text-creole-green mx-auto mb-4" />
                    <CardTitle>Croissance garantie</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Bénéficiez de notre réseau établi pour développer votre chiffre d'affaires.
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <Star className="h-12 w-12 text-creole-green mx-auto mb-4" />
                    <CardTitle>Support dédié</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Notre équipe vous accompagne dans la mise en place et la gestion de votre partenariat.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Formulaire de candidature */}
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
                      <Select onValueChange={(value) => handleInputChange("business_type", value)}>
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
                    >
                      Envoyer ma candidature
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default DevenirPartenaire;
