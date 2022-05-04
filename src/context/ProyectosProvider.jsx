import { useState, useEffect, createContext } from "react";

// Config
import { clienteAxios } from "../config/clienteAxios";

// Creando Contexto
const ProyectosContext = createContext();

// Provider que rodea toda la aplicación (Permite a los hijos tener acceso a la información)
const ProyectosProvider = ({ children }) => {
  // State que almacena los proyectos
  const [proyectos, setProyectos] = useState([]);

  // En value se almacena la información que estará disponible en todos los children
  return (
    <ProyectosContext.Provider value={{ proyectos }}>
      {children}
    </ProyectosContext.Provider>
  );
};

export { ProyectosProvider };

export default ProyectosContext;
