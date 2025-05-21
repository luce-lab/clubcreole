
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ReservationContactInfoProps {
  name: string;
  email: string;
  phone: string;
  notes: string;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;
  setNotes: (notes: string) => void;
}

export const ReservationContactInfo = ({
  name,
  email,
  phone,
  notes,
  setName,
  setEmail,
  setPhone,
  setNotes
}: ReservationContactInfoProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg mb-2">Vos coordonnées</h3>
      
      <div className="space-y-2">
        <Label htmlFor="name">Nom et prénom *</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Votre nom complet"
          required
          className="border-gray-300 focus-visible:ring-emerald-700"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="votre@email.com"
          required
          className="border-gray-300 focus-visible:ring-emerald-700"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Téléphone *</Label>
        <Input
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="06 XX XX XX XX"
          required
          className="border-gray-300 focus-visible:ring-emerald-700"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="notes">Demandes spéciales</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Allergie, occasion spéciale, etc."
          className="resize-none border-gray-300 focus-visible:ring-emerald-700"
          rows={3}
        />
      </div>
    </div>
  );
};
