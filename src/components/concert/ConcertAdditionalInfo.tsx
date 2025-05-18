
const ConcertAdditionalInfo: React.FC = () => {
  return (
    <div className="bg-gray-50 rounded-lg p-6 mt-8">
      <h2 className="text-xl font-bold text-purple-600 mb-4">Informations complémentaires</h2>
      <ul className="space-y-3">
        <li className="flex space-x-2">
          <span className="text-purple-600">•</span>
          <span>Ouverture des portes 1h avant le début du concert</span>
        </li>
        <li className="flex space-x-2">
          <span className="text-purple-600">•</span>
          <span>Pièce d'identité obligatoire pour accéder à l'événement</span>
        </li>
        <li className="flex space-x-2">
          <span className="text-purple-600">•</span>
          <span>Service de navette disponible depuis le centre-ville</span>
        </li>
        <li className="flex space-x-2">
          <span className="text-purple-600">•</span>
          <span>Pas de remboursement possible sauf annulation de l'événement</span>
        </li>
      </ul>
    </div>
  );
};

export default ConcertAdditionalInfo;
