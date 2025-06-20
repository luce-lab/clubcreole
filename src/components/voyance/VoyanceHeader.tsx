
import { Eye, Star, Users, Shield } from "lucide-react";

const VoyanceHeader = () => {
  return (
    <div className="text-center mb-12">
      <div className="flex justify-center mb-6">
        <div className="bg-purple-100 p-4 rounded-full">
          <Eye className="h-12 w-12 text-purple-600" />
        </div>
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Voyance & Spiritualité
      </h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
        Découvrez nos médiums expérimentés pour des consultations personnalisées. 
        Trouvez les réponses à vos questions sur l'amour, le travail, et votre avenir.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-center space-x-3 bg-white p-4 rounded-lg shadow-sm">
          <Star className="h-6 w-6 text-yellow-500" />
          <span className="text-gray-700 font-medium">Médiums certifiés</span>
        </div>
        <div className="flex items-center justify-center space-x-3 bg-white p-4 rounded-lg shadow-sm">
          <Users className="h-6 w-6 text-blue-500" />
          <span className="text-gray-700 font-medium">Consultations personnalisées</span>
        </div>
        <div className="flex items-center justify-center space-x-3 bg-white p-4 rounded-lg shadow-sm">
          <Shield className="h-6 w-6 text-green-500" />
          <span className="text-gray-700 font-medium">Confidentialité garantie</span>
        </div>
      </div>
    </div>
  );
};

export default VoyanceHeader;
