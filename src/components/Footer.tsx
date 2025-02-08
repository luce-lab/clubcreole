
import { Mail, Phone, MapPin } from "lucide-react";
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
            <h3 className="text-xl font-bold mb-4">Vous n'êtes pas seul !</h3>
            <p className="text-gray-400">
              Le Club Créole est là pour vous accompagner dans vos loisirs et votre vie quotidienne aux Antilles.
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
