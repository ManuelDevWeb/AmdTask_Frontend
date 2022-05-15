import { useEffect } from "react";
import { useParams } from "react-router-dom";

// Hooks
import { useProyectos } from "../hooks/useProyectos";
// Componentes
import FormularioColaborador from "../components/FormularioColaborador";

const NuevoColaborador = () => {
  // Leyendo el valor id que viene por UL
  const params = useParams();
  const { id } = params;

  // Destructurando los valores que retorna el contexto ProyectosProvider por medio del hook useProyects
  const { obtenerProyecto, proyecto, cargando } = useProyectos();

  // UseEffect que se ejecuta una sola vez
  useEffect(() => {
    obtenerProyecto(id);
  }, []);

  if (cargando) return "Cargando...";

  return (
    <>
      <h1 className="text-4xl font-black">
        Añadir Colaborador(a) al Proyecto: {proyecto.nombre}{" "}
      </h1>
      <div className="mt-10 flex justify-center">
        <FormularioColaborador />
      </div>
    </>
  );
};

export default NuevoColaborador;
