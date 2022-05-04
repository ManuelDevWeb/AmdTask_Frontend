// Importando Outlet para poder inyectar el contenido de los componentes hijos del grupo de rutas <RutaProtegida />
import { Outlet, Navigate } from "react-router-dom";

// Hooks
import { useAuth } from "../hooks/useAuth";

// Components
import Proyectos from "../pages/Proyectos";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const RutaProtegida = () => {
  // Destructurando los valores que retorna el contexto AuthContext por medio del hook useAuth
  const { auth, cargando } = useAuth();

  // Si cargando es true, mostramos spinner de cargando...
  if (cargando) return "Cargando...";

  return (
    <>
      {
        /* Si el usuario no está autenticado lo redireccionamos al login */
        auth._id ? (
          <div className="bg-gray-100">
            <Header />
            <div className="md:flex md:min-h-screen">
              <Sidebar />
              <main className="flex-1 p-10">
                {/* Contenido rutas hijas */}
                <Outlet />
              </main>
            </div>
          </div>
        ) : (
          <Navigate to="/" />
        )
      }
    </>
  );
};

export default RutaProtegida;
