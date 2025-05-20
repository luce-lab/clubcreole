
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader,
  CardTitle 
} from "@/components/ui/card";

interface UserDetailsProps {
  userId: string;
  onEdit: () => void;
}

export const UserDetails = ({ userId, onEdit }: UserDetailsProps) => {
  // Pour la démo, on utilise des données fictives
  // Dans un vrai cas d'usage, ces données viendraient d'un appel API
  const user = {
    id: userId,
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    phone: "+596 123 456 789",
    address: "123 Avenue des Cocotiers, Fort-de-France",
    registeredDate: "2024-01-10",
    lastLogin: "2025-05-15",
    subscription: {
      type: "Premium",
      status: "Actif",
      startDate: "2025-01-15",
      endDate: "2025-07-15",
      autoRenew: true,
      price: "15.99€/mois"
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold mb-1">{user.name}</h3>
          <p className="text-sm text-gray-500">Inscrit le {user.registeredDate}</p>
        </div>
        <Button onClick={onEdit}>Modifier l'utilisateur</Button>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Informations personnelles</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="font-medium text-sm text-gray-500">Email:</dt>
                <dd>{user.email}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-sm text-gray-500">Téléphone:</dt>
                <dd>{user.phone}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-sm text-gray-500">Adresse:</dt>
                <dd>{user.address}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-sm text-gray-500">Dernière connexion:</dt>
                <dd>{user.lastLogin}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Abonnement</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="font-medium text-sm text-gray-500">Type:</dt>
                <dd className="font-semibold text-blue-600">{user.subscription.type}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-sm text-gray-500">Statut:</dt>
                <dd>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {user.subscription.status}
                  </span>
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-sm text-gray-500">Date de début:</dt>
                <dd>{user.subscription.startDate}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-sm text-gray-500">Date de fin:</dt>
                <dd>{user.subscription.endDate}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-sm text-gray-500">Renouvellement auto:</dt>
                <dd>{user.subscription.autoRenew ? "Oui" : "Non"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-sm text-gray-500">Tarif:</dt>
                <dd>{user.subscription.price}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDetails;
