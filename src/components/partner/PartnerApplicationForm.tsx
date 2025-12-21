import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Eye, EyeOff, Loader2 } from "lucide-react";

interface FormData {
  business_name: string;
  contact_name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  business_type: string;
  description: string;
  location: string;
  website: string;
  siret: string;
  opening_hours: string;
}

interface FormErrors {
  [key: string]: string;
}

export const PartnerApplicationForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FormData>({
    business_name: "",
    contact_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    business_type: "",
    description: "",
    location: "",
    website: "",
    siret: "",
    opening_hours: ""
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Required fields
    if (!formData.business_name.trim()) {
      newErrors.business_name = "Le nom de l'entreprise est requis";
    }
    if (!formData.contact_name.trim()) {
      newErrors.contact_name = "Le nom du contact est requis";
    }
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
    }
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 8) {
      newErrors.password = "Le mot de passe doit contenir au moins 8 caractères";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "La confirmation du mot de passe est requise";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Le téléphone est requis";
    }
    if (!formData.business_type) {
      newErrors.business_type = "Le type d'activité est requis";
    }
    if (!formData.location.trim()) {
      newErrors.location = "L'adresse est requise";
    }
    if (!formData.description.trim()) {
      newErrors.description = "La description est requise";
    }

    // Optional field validation
    if (formData.siret && !/^\d{14}$/.test(formData.siret.replace(/\s/g, ''))) {
      newErrors.siret = "Le SIRET doit contenir 14 chiffres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Formulaire invalide",
        description: "Veuillez corriger les erreurs avant de soumettre",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Step 1: Create user account with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            email: formData.email,
            first_name: formData.contact_name.split(' ')[0] || formData.contact_name,
            last_name: formData.contact_name.split(' ').slice(1).join(' ') || '',
            phone: formData.phone,
            role: 'partner'
          }
        }
      });

      if (authError) {
        console.error('Auth signup error:', authError);
        if (authError.message.includes('already registered')) {
          toast({
            title: "Email déjà utilisé",
            description: "Un compte existe déjà avec cet email. Veuillez vous connecter ou utiliser un autre email.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Erreur de création de compte",
            description: authError.message,
            variant: "destructive"
          });
        }
        return;
      }

      if (!authData.user) {
        toast({
          title: "Erreur",
          description: "Impossible de créer le compte utilisateur",
          variant: "destructive"
        });
        return;
      }

      // Step 2: Update the profile with partner role
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ role: 'partner' })
        .eq('id', authData.user.id);

      if (profileError) {
        console.error('Profile update error:', profileError);
        // Continue anyway, the profile trigger should have created it
      }

      // Step 3: Insert partner record with user_id reference
      const { error: partnerError } = await supabase
        .from('partners')
        .insert({
          business_name: formData.business_name,
          business_type: formData.business_type,
          description: formData.description,
          address: formData.location,
          phone: formData.phone,
          email: formData.email,
          contact_name: formData.contact_name,
          website: formData.website || null,
          siret: formData.siret || null,
          opening_hours: formData.opening_hours || null,
          status: 'en_attente',
          user_id: authData.user.id,
          created_at: new Date().toISOString()
        });

      if (partnerError) {
        console.error('Partner application error:', partnerError);

        // Handle specific error codes
        if (partnerError.code === '23505') {
          if (partnerError.message.includes('partners_business_name_unique')) {
            toast({
              title: "Nom d'entreprise déjà utilisé",
              description: "Un partenaire avec ce nom d'entreprise existe déjà. Veuillez utiliser un nom différent.",
              variant: "destructive"
            });
          } else if (partnerError.message.includes('partners_email_unique')) {
            toast({
              title: "Email déjà utilisé",
              description: "Un partenaire avec cet email existe déjà.",
              variant: "destructive"
            });
          } else {
            toast({
              title: "Données en double",
              description: "Ces informations sont déjà enregistrées.",
              variant: "destructive"
            });
          }
        } else if (partnerError.code === '42501') {
          toast({
            title: "Erreur de permission",
            description: "Vous n'avez pas la permission de soumettre cette candidature. Veuillez réessayer.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Erreur d'inscription",
            description: partnerError.message || "Une erreur est survenue lors de l'inscription.",
            variant: "destructive"
          });
        }
        return;
      }

      // Success!
      toast({
        title: "Inscription réussie!",
        description: "Votre demande de partenariat a été envoyée. Un email de confirmation vous a été envoyé. Nous examinerons votre candidature dans les plus brefs délais."
      });

      // Reset form
      setFormData({
        business_name: "",
        contact_name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        business_type: "",
        description: "",
        location: "",
        website: "",
        siret: "",
        opening_hours: ""
      });
      setErrors({});

    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue est survenue. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderError = (field: string) => {
    if (errors[field]) {
      return <p className="text-sm text-red-500 mt-1">{errors[field]}</p>;
    }
    return null;
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
                Remplissez ce formulaire pour devenir partenaire Club Créole
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Business Information */}
                <div className="space-y-4">
                  <h3 className="font-medium text-lg border-b pb-2">Informations de l'entreprise</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="business_name">
                        Nom de l'entreprise <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="business_name"
                        value={formData.business_name}
                        onChange={(e) => handleInputChange('business_name', e.target.value)}
                        className={errors.business_name ? "border-red-500" : ""}
                      />
                      {renderError('business_name')}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="business_type">
                        Type d'activité <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.business_type}
                        onValueChange={(value) => handleInputChange('business_type', value)}
                      >
                        <SelectTrigger className={errors.business_type ? "border-red-500" : ""}>
                          <SelectValue placeholder="Sélectionnez votre type d'activité" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="restaurant">Restaurant</SelectItem>
                          <SelectItem value="activity">Activité de loisir</SelectItem>
                          <SelectItem value="car_rental">Location de voiture</SelectItem>
                          <SelectItem value="travel_agency">Agence de voyage</SelectItem>
                          <SelectItem value="accommodation">Hébergement</SelectItem>
                          <SelectItem value="other">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                      {renderError('business_type')}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="siret">SIRET (optionnel)</Label>
                      <Input
                        id="siret"
                        value={formData.siret}
                        onChange={(e) => handleInputChange('siret', e.target.value)}
                        placeholder="12345678901234"
                        className={errors.siret ? "border-red-500" : ""}
                      />
                      {renderError('siret')}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="opening_hours">Horaires d'ouverture (optionnel)</Label>
                      <Input
                        id="opening_hours"
                        value={formData.opening_hours}
                        onChange={(e) => handleInputChange('opening_hours', e.target.value)}
                        placeholder="Ex: Lun-Ven 9h-18h"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="font-medium text-lg border-b pb-2">Informations de contact</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact_name">
                        Nom du contact <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="contact_name"
                        value={formData.contact_name}
                        onChange={(e) => handleInputChange('contact_name', e.target.value)}
                        className={errors.contact_name ? "border-red-500" : ""}
                      />
                      {renderError('contact_name')}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {renderError('email')}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        Téléphone <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={errors.phone ? "border-red-500" : ""}
                      />
                      {renderError('phone')}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Site web (optionnel)</Label>
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

                {/* Account Creation */}
                <div className="space-y-4">
                  <h3 className="font-medium text-lg border-b pb-2">Création de votre compte</h3>
                  <p className="text-sm text-gray-500">
                    Un compte sera créé pour vous permettre de suivre votre candidature et gérer votre profil.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">
                        Mot de passe <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          className={errors.password ? "border-red-500 pr-10" : "pr-10"}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {renderError('password')}
                      <p className="text-xs text-gray-500">Minimum 8 caractères</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">
                        Confirmer le mot de passe <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          className={errors.confirmPassword ? "border-red-500 pr-10" : "pr-10"}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {renderError('confirmPassword')}
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <Label htmlFor="location">
                    Adresse <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className={errors.location ? "border-red-500" : ""}
                    placeholder="Adresse complète de votre établissement"
                  />
                  {renderError('location')}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">
                    Description de votre activité <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className={errors.description ? "border-red-500" : ""}
                    placeholder="Décrivez votre activité, vos services et ce qui vous rend unique..."
                    rows={4}
                  />
                  {renderError('description')}
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    "Envoyer ma candidature"
                  )}
                </Button>

                <p className="text-xs text-center text-gray-500">
                  En soumettant ce formulaire, vous acceptez nos conditions d'utilisation et notre politique de confidentialité.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
