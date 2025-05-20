
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

interface RestaurantTabsProps {
  description: string;
  type: string;
  location: string;
}

const RestaurantTabs = ({ description, type, location }: RestaurantTabsProps) => {
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
            <p className="text-gray-700">Lun-Dim: 12h00-15h00, 19h00-23h00</p>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="menu" className="space-y-4 mt-4">
        <h2 className="text-xl font-semibold">Notre carte</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-lg border-b pb-1">Entrées</h3>
            <ul className="mt-2 space-y-2">
              <li className="flex justify-between">
                <span>Salade César</span>
                <span>12€</span>
              </li>
              <li className="flex justify-between">
                <span>Carpaccio de bœuf</span>
                <span>14€</span>
              </li>
              <li className="flex justify-between">
                <span>Soupe du jour</span>
                <span>9€</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-lg border-b pb-1">Plats principaux</h3>
            <ul className="mt-2 space-y-2">
              <li className="flex justify-between">
                <span>Filet de bœuf, sauce au poivre</span>
                <span>28€</span>
              </li>
              <li className="flex justify-between">
                <span>Risotto aux champignons</span>
                <span>21€</span>
              </li>
              <li className="flex justify-between">
                <span>Poisson du jour</span>
                <span>24€</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-lg border-b pb-1">Desserts</h3>
            <ul className="mt-2 space-y-2">
              <li className="flex justify-between">
                <span>Tiramisu maison</span>
                <span>9€</span>
              </li>
              <li className="flex justify-between">
                <span>Crème brûlée</span>
                <span>8€</span>
              </li>
              <li className="flex justify-between">
                <span>Mousse au chocolat</span>
                <span>7€</span>
              </li>
            </ul>
          </div>
        </div>
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
