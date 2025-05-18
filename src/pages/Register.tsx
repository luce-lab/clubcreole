
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Register = () => {
  // Au lieu d'utiliser useNavigate, utilisons le composant Navigate de react-router-dom
  return <Navigate to="/login" state={{ activeTab: "register" }} replace />;
};

export default Register;
