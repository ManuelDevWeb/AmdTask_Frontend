import { useEffect } from "react";
import { useParams } from "react-router-dom";

// Hooks
import { useProyectos } from "../hooks/useProyectos";
// Componentes
import FormularioProyecto from "./FormularioProyecto";

const EditarProyecto = () => {
  // Leyendo el valor id que viene por URL
  const params = useParams();
  const { id } = params;

  // Destructurando los valores que retorna el contexto ProyectosContext por medio del hook useProyecto
  const { obtenerProyecto, proyecto, cargando, eliminarProyecto } =
    useProyectos();

  // Se ejecuta una sola vez cuando cargue el componente
  useEffect(() => {
    obtenerProyecto(id);
  }, []);

  // Destructurando los valores datos del proyecto
  const { nombre } = proyecto;

  // Función que se ejecuta al hacer click en el button Eliminar
  const handleClick = () => {
    if (confirm("¿Deseas eliminar este proyecto?")) {
      eliminarProyecto(id);
    }
  };

  if (cargando) return "Cargando...";

  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-black text-4xl">{nombre}</h1>

        <div className="flex items-center gap-2 text-gray-400 hover:text-black">
          {/* 
            Icono Eliminar (Extraido desde https://heroicons.com/) 
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          <button className="uppercase font-bold" onClick={handleClick}>
            Eliminar
          </button>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <FormularioProyecto />
      </div>
    </>
  );
};

export default EditarProyecto;
