import { Link } from "react-router-dom";

// Hooks
import { useAuth } from "../hooks/useAuth";

const PreviewProyecto = ({ proyecto }) => {
  // Destructurando datos de proyecto
  const { nombre, _id, cliente, creador } = proyecto;

  // Destructurando los valores que retorna el contexto AuthContext por medio del hook useAuth
  const { auth } = useAuth();

  return (
    <div className="border-b p-5 flex flex-col md:flex-row justify-between">
      <div className="flex items-center gap-2">
        <p className="flex-1">
          {nombre}{" "}
          <span className="text-sm text-gray-500 uppercase"> {cliente}</span>
        </p>

        {auth._id !== creador && (
          <p className="px-3 py-1 text-xs rounded-lg text-white bg-green-500 font-bold uppercase">
            Colaborador
          </p>
        )}
      </div>

      {/* to={`${_id}`} */}
      <Link
        to={`/proyectos/${_id}`}
        className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold"
      >
        Ver Proyecto
      </Link>
    </div>
  );
};

export default PreviewProyecto;
