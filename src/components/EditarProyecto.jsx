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
  const { obtenerProyecto, proyecto, cargando } = useProyectos();

  // Se ejecuta una sola vez cuando cargue el componente
  useEffect(() => {
    obtenerProyecto(id);
  }, []);

  // Destructurando los valores datos del proyecto
  const { nombre } = proyecto;

  if (cargando) return "Cargando...";

  return (
    <>
      <h1 className="font-black text-4xl">{nombre}</h1>
      <div className="mt-10 flex justify-center">
        <FormularioProyecto />
      </div>
    </>
  );
};

export default EditarProyecto;
