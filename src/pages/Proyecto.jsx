import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

// Hooks
import { useProyectos } from "../hooks/useProyectos";

const Proyecto = () => {
  // Leyendo el valor id que viene por URL
  const params = useParams();
  const { id } = params;

  // Destructurando los valores que retorna el contexto ProyectosContext por medio del hook useProyecto
  const { obtenerProyecto, proyecto, cargando } = useProyectos();

  // Destructurando los valores datos del proyecto
  const { nombre } = proyecto;

  // Se ejecuta una sola vez cuando cargue el componente
  useEffect(() => {
    obtenerProyecto(id);
  }, []);

  return (
    // Si está cargando mostramos spiner
    cargando ? (
      "cargando..."
    ) : (
      <div className="flex justify-between">
        <h1 className="font-black text-4xl">{nombre}</h1>

        <div className="flex items-center gap-2 text-gray-400 hover:text-black">
          {/* 
            Icono Editar (Extraido desde https://heroicons.com/) 
            Podemos cambiar las clases que queramos por las de tailwind
          */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>

          <Link to={`/proyectos/editar/${id}`} className="uppercase font-bold">
            Editar
          </Link>
        </div>
      </div>
    )
  );
};

export default Proyecto;
