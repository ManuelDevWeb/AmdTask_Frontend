import { Link } from "react-router-dom";

// Hooks
import { useProyectos } from "../hooks/useProyectos";
import { useAuth } from "../hooks/useAuth";
// Components
import Busqueda from "./Busqueda";

const Header = () => {
  // Destructurando los valores del contexto ProyectosContexto a traves del hook useProyectos
  const { handleBuscador, cerrarSesionProyectos } = useProyectos();

  // Destructurando los valores del contexto AuthContexto a traves del hook useAuth
  const { cerrarSesionAuth } = useAuth();

  // Funcion que se ejecuta al dar click en el boton cerrar sesion
  const handleCerrarSesion = () => {
    cerrarSesionProyectos();
    cerrarSesionAuth();
    // Remover token del local storage
    localStorage.removeItem("token");
  };

  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">
          UpTask
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <button
            type="button"
            className="font-bold uppercase"
            onClick={handleBuscador}
          >
            Buscar Proyecto
          </button>
          <Link to="/proyectos" className="font-bold uppercase">
            Proyectos
          </Link>
          <button
            type="button"
            className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold"
            onClick={handleCerrarSesion}
          >
            Cerrar Sesión
          </button>

          <Busqueda />
        </div>
      </div>
    </header>
  );
};

export default Header;
