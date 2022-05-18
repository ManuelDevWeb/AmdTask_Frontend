import { Link } from "react-router-dom";

// Hooks
import { useAuth } from "../hooks/useAuth";

const Sidebar = () => {
  // Destructurando los valores que retorna el contexto AuthContext por medio del hook useAuth
  const { auth } = useAuth();

  return (
    <aside className="md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10">
      <p className="text-xl font-bold">Hola: {auth.nombre} </p>
      <Link
        to="/proyectos/crear-proyecto"
        className="w-full block bg-sky-600 p-3 text-white uppercase font-bold mt-5 text-center rounded-lg"
      >
        Nuevo Proyecto
      </Link>
    </aside>
  );
};

export default Sidebar;
