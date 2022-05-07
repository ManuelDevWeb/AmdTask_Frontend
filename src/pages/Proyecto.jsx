import { useEffect } from "react";
import { useParams } from "react-router-dom";

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
      <div>
        <h1 className="font-black text-4xl">{nombre}</h1>
      </div>
    )
  );
};

export default Proyecto;
