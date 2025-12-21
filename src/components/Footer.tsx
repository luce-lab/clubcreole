
import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Newsletter } from "./Newsletter";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Club Créole</h3>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Morne Vergain Raizet - 97139 Abymes
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                0590 28 27 52
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                clubcreoles01@gmail.com
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Liens utiles</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/devenir-partenaire" className="hover:text-white transition-colors">
                  Devenir partenaire
                </Link>
              </li>
              <li>
                <Link to="/offers" className="hover:text-white transition-colors">
                  Nos offres
                </Link>
              </li>
            </ul>
            <p className="text-gray-400 mt-4 text-sm">
              Le Club Créole vous accompagne dans vos loisirs aux Antilles.
            </p>
          </div>
          <div>
            <Newsletter variant="footer" />
          </div>
        </div>
      </div>
    </footer>
  );
};
