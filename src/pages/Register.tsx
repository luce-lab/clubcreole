
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Rediriger vers la page de login avec l'onglet d'inscription actif
    navigate("/login", { state: { activeTab: "register" } });
  }, [navigate]);

  return null; // Ce composant ne rend rien, il redirige simplement
};

export default Register;
