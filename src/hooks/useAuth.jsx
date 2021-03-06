// Lo único que hace el hook el usar el contexto y retornar los values

import { useContext } from "react";
// Context
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
  // Accediendo a la información del Context
  return useContext(AuthContext);
};

export { useAuth };
