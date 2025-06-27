import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";

interface MenuItem {
  name: string;
  price: number;
}

interface MenuCategory {
  name: string;
  items: MenuItem[];
}

interface OpeningHours {
  ouverture: string;
  fermeture: string;
  soir_ouverture?: string;
  soir_fermeture?: string;
}

interface RestaurantTabsProps {
  description: string;
  type: string;
  location: string;
  restaurantId: number;
}

const RestaurantTabs = ({ description, type, location, restaurantId }: RestaurantTabsProps) => {
  const [menus, setMenus] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [openingHours, setOpeningHours] = useState<Record<string, OpeningHours>>({});

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const { data, error } = await supabase
          .from('restaurants')
          .select('menus, opening_hours')
          .eq('id', restaurantId)
          .single();

        if (error) {
          console.error('Erreur lors du chargement des menus:', error);
          setMenus([]);
          return;
        }

        if (!data || typeof data !== "object") {
          setMenus([]);
          return;
        }

        // Safely handle menus data
        if (data.menus && Array.isArray(data.menus)) {
          setMenus(data.menus as MenuCategory[]);
        } else {
          setMenus([]);
        }

        // Safely handle opening hours data
        if (data.opening_hours && typeof data.opening_hours === "object") {
          setOpeningHours(data.opening_hours as Record<string, OpeningHours>);
        }
      } catch (err) {
        console.error('Erreur:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, [restaurantId]);

  return (
    <Tabs defaultValue="about" className="w-full">
      <TabsList className="w-full justify-start">
        <TabsTrigger value="about">À propos</TabsTrigger>
        <TabsTrigger value="menu">Menu</TabsTrigger>
        <TabsTrigger value="reviews">Avis</TabsTrigger>
      </TabsList>
      <TabsContent value="about" className="space-y-4 mt-4">
        <h2 className="text-xl font-semibold">Description</h2>
        <p className="text-gray-700">{description}</p>
        
        <Separator className="my-4" />
        
        <h2 className="text-xl font-semibold">Informations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium">Type de cuisine</h3>
            <p className="text-gray-700">{type}</p>
          </div>
          <div>
            <h3 className="font-medium">Prix moyen</h3>
            <p className="text-gray-700">25€ - 45€ par personne</p>
          </div>
          <div>
            <h3 className="font-medium">Adresse</h3>
            <p className="text-gray-700">{location}</p>
          </div>
          <div>
            <h3 className="font-medium">Horaires</h3>
            {Object.keys(openingHours).length > 0 && (
              <div className="space-y-1">
                {Object.entries(openingHours).map(([jour, horaires]) => (
                  <div key={jour} className="text-sm">
                    <strong>{jour}:</strong> {horaires.ouverture} - {horaires.fermeture}
                    {horaires.soir_ouverture && (
                      <> / {horaires.soir_ouverture} - {horaires.soir_fermeture}</>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </TabsContent>
      <TabsContent value="menu" className="space-y-4 mt-4">
        <h2 className="text-xl font-semibold">Notre carte</h2>
        {loading ? (
          <p>Chargement du menu...</p>
        ) : menus.length > 0 ? (
          <div className="space-y-6">
            {menus.map((category, categoryIndex) => (
              <div key={`${category.name}-${categoryIndex}`}>
                <h3 className="font-medium text-lg border-b pb-1">{category.name}</h3>
                <ul className="mt-2 space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li key={`${category.name}-${item.name}-${itemIndex}`} className="flex justify-between">
                      <span>{item.name}</span>
                      <span>{item.price}€</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Aucun menu disponible pour le moment.</p>
        )}
      </TabsContent>
      <TabsContent value="reviews" className="space-y-4 mt-4">
        <h2 className="text-xl font-semibold">Avis des clients</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-creole-green/20 flex items-center justify-center">
                  <span className="font-semibold">ML</span>
                </div>
                <span className="font-medium">Marie L.</span>
              </div>
              <div className="flex text-yellow-500">
                <span>★★★★★</span>
              </div>
            </div>
            <p className="mt-2 text-gray-700">
              Excellente cuisine et service impeccable! Les plats sont savoureux et la présentation est soignée.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-creole-green/20 flex items-center justify-center">
                  <span className="font-semibold">PT</span>
                </div>
                <span className="font-medium">Pierre T.</span>
              </div>
              <div className="flex text-yellow-500">
                <span>★★★★☆</span>
              </div>
            </div>
            <p className="mt-2 text-gray-700">
              Très bon restaurant avec une ambiance chaleureuse. Le service était un peu lent mais la qualité de la nourriture compense largement.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-creole-green/20 flex items-center justify-center">
                  <span className="font-semibold">SB</span>
                </div>
                <span className="font-medium">Sophie B.</span>
              </div>
              <div className="flex text-yellow-500">
                <span>★★★★★</span>
              </div>
            </div>
            <p className="mt-2 text-gray-700">
              Une découverte gourmande! Les saveurs sont authentiques et les produits de qualité. Je reviendrai.
            </p>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default RestaurantTabs;
