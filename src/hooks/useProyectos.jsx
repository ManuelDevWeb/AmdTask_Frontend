// Lo único que hace el hook el usar el contexto y retornar los values

import { useContext } from "react";
// Context
import ProyectosContext from "../context/ProyectosProvider";

const useProyectos = () => {
  // Accediendo a la información del Context
  return useContext(ProyectosContext);
};

export { useProyectos };
