
import React from "react";

interface RestaurantSidebarProps {
  offer: string;
}

const RestaurantSidebar = ({ offer }: RestaurantSidebarProps) => {
  return (
    <div>
      {/* Offre Club Créole */}
      <div className="mt-6 bg-green-50 p-4 rounded-lg border border-green-100">
        <h3 className="font-semibold text-creole-green">Offre Club Créole</h3>
        <p className="mt-2 text-sm">{offer}</p>
      </div>
      
      {/* Informations pratiques */}
      <div className="mt-6">
        <h3 className="font-semibold">Informations pratiques</h3>
        <ul className="mt-2 space-y-2 text-sm text-gray-700">
          <li>Accepte les réservations</li>
          <li>Terrasse disponible</li>
          <li>Accessible aux personnes à mobilité réduite</li>
          <li>Paiement par carte accepté</li>
        </ul>
      </div>
    </div>
  );
};

export default RestaurantSidebar;
