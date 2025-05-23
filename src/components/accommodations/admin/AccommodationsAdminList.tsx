
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye, Building, MapPin, Users, Star } from "lucide-react";
import { Accommodation } from "@/components/accommodation/AccommodationTypes";
import { fetchAccommodations } from "@/services/accommodationService";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

interface AccommodationsAdminListProps {
  refreshTrigger: number;
  onEdit: (accommodation: Accommodation) => void;
  onDelete: (accommodation: Accommodation) => void;
}

export const AccommodationsAdminList = ({ 
  refreshTrigger, 
  onEdit, 
  onDelete 
}: AccommodationsAdminListProps) => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadAccommodations = async () => {
    try {
      setLoading(true);
      const data = await fetchAccommodations();
      setAccommodations(data);
    } catch (error) {
      console.error("Erreur lors du chargement des hébergements:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les hébergements",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAccommodations();
  }, [refreshTrigger]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-32 w-full mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (accommodations.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <Building className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            Aucun hébergement trouvé
          </h3>
          <p className="text-gray-500">
            Commencez par ajouter votre premier hébergement
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {accommodations.map((accommodation) => (
        <Card key={accommodation.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="relative">
            <img
              src={accommodation.image}
              alt={accommodation.name}
              className="w-full h-48 object-cover"
            />
            <Badge className="absolute top-2 left-2 bg-blue-600">
              {accommodation.type}
            </Badge>
          </div>
          
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{accommodation.name}</CardTitle>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              {accommodation.location}
            </div>
          </CardHeader>
          
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>{accommodation.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{accommodation.max_guests} personnes max</span>
              </div>
            </div>
            
            <div className="text-lg font-semibold text-blue-600">
              {accommodation.price}€ / nuit
            </div>
            
            <p className="text-sm text-gray-600 line-clamp-2">
              {accommodation.description}
            </p>
            
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(`/hebergements/${accommodation.id}`, '_blank')}
                className="flex-1"
              >
                <Eye className="h-4 w-4 mr-1" />
                Voir
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(accommodation)}
                className="flex-1"
              >
                <Edit className="h-4 w-4 mr-1" />
                Modifier
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(accommodation)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
