import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Save, Lock } from "lucide-react";

interface Partner {
  id: string;
  business_name: string;
  business_type: string | null;
  description: string | null;
  address: string | null;
  phone: string | null;
  email: string;
  contact_name: string;
  website: string | null;
  siret: string | null;
  opening_hours: string | null;
  status: string | null;
}

interface PartnerProfileFormProps {
  partner: Partner | null;
  onUpdate: () => void;
}

export const PartnerProfileForm = ({ partner, onUpdate }: PartnerProfileFormProps) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
    address: "",
    phone: "",
    website: "",
    opening_hours: ""
  });

  useEffect(() => {
    if (partner) {
      setFormData({
        description: partner.description || "",
        address: partner.address || "",
        phone: partner.phone || "",
        website: partner.website || "",
        opening_hours: partner.opening_hours || ""
      });
    }
  }, [partner]);

  const isApproved = partner?.status === 'approuve';

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    if (!partner) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('partners')
        .update({
          description: formData.description,
          address: formData.address,
          phone: formData.phone,
          website: formData.website || null,
          opening_hours: formData.opening_hours || null
        })
        .eq('id', partner.id);

      if (error) {
        console.error('Error updating partner:', error);
        toast({
          title: "Erreur",
          description: "Impossible de mettre à jour votre profil",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Profil mis à jour",
        description: "Vos modifications ont été enregistrées avec succès"
      });
      setIsEditing(false);
      onUpdate();
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue est survenue",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (!partner) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Mon Profil</CardTitle>
            <CardDescription>
              {isApproved
                ? "Gérez les informations de votre établissement"
                : "L'édition sera disponible après l'approbation de votre candidature"}
            </CardDescription>
          </div>
          {isApproved && !isEditing && (
            <Button onClick={() => setIsEditing(true)} variant="outline">
              Modifier
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {!isApproved && (
          <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg mb-4">
            <Lock className="h-5 w-5 text-gray-400" />
            <p className="text-sm text-gray-600">
              Cette section sera déverrouillée une fois votre candidature approuvée.
            </p>
          </div>
        )}

        <div className="space-y-4">
          {/* Read-only fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nom de l'entreprise</Label>
              <Input value={partner.business_name} disabled className="bg-gray-50" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={partner.email || ''} disabled className="bg-gray-50" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nom du contact</Label>
              <Input value={partner.contact_name || ''} disabled className="bg-gray-50" />
            </div>
            <div className="space-y-2">
              <Label>SIRET</Label>
              <Input value={partner.siret || 'Non renseigné'} disabled className="bg-gray-50" />
            </div>
          </div>

          {/* Editable fields */}
          <div className="pt-4 border-t">
            <h4 className="font-medium mb-4">Informations modifiables</h4>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  disabled={!isEditing}
                  className={!isEditing ? "bg-gray-50" : ""}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Site web</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="opening_hours">Horaires d'ouverture</Label>
                  <Input
                    id="opening_hours"
                    value={formData.opening_hours}
                    onChange={(e) => handleInputChange('opening_hours', e.target.value)}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                    placeholder="Ex: Lun-Ven 9h-18h"
                  />
                </div>
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="flex gap-2 pt-4">
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Enregistrer
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  // Reset form data
                  if (partner) {
                    setFormData({
                      description: partner.description || "",
                      address: partner.address || "",
                      phone: partner.phone || "",
                      website: partner.website || "",
                      opening_hours: partner.opening_hours || ""
                    });
                  }
                }}
                disabled={isSaving}
              >
                Annuler
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
