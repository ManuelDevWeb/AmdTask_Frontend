// Importando Outlet para poder inyectar el contenido de los componentes hijos del grupo de rutas <RutaProtegida />
import { Outlet, Navigate } from "react-router-dom";

// Hooks
import { useAuth } from "../hooks/useAuth";

// Components
import { Proyectos } from "../pages/Proyectos";

const RutaProtegida = () => {
  // Destructurando los valores que retorna el contexto AuthContext por medio del hook useAuth
  const { auth, cargando } = useAuth();

  // Si cargando es true, mostramos spinner de cargando...
  if (cargando) return "Cargando...";

  return (
    <>
      {
        /* Si el usuario no está autenticado lo redireccionamos al login */
        auth._id ? <Proyectos /> : <Navigate to="/" />
      }
    </>
  );
};

export { RutaProtegida };
