// Helpers
import { formatearFecha } from "../helpers/formatearFecha";
// Hooks
import { useProyectos } from "../hooks/useProyectos";
import { useAdmin } from "../hooks/useAdmin";

const Tarea = ({ tarea }) => {
  // Destructurando los parametros de tarea
  const { descripcion, nombre, prioridad, fechaEntrega, estado, _id } = tarea;

  // Destructurando los valores que retorna el contexto ProyectosContext por medio del hook useProyecto
  const { handleModalEditarTarea, handleModalEliminarTarea } = useProyectos();

  const admin = useAdmin();

  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div>
        <p className="text-xl">{nombre}</p>
        <p className="text-sm text-gray-500 uppercase">{descripcion}</p>
        <p className="text-sm capitalize">{formatearFecha(fechaEntrega)}</p>
        <p className="text-gray-600">Prioridad: {prioridad}</p>
      </div>
      <div className="flex gap-2">
        {
          // Validando que sea el admin
          admin && (
            <button
              className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
              onClick={() => handleModalEditarTarea(tarea)}
            >
              Editar
            </button>
          )
        }

        {estado ? (
          <button className="bg-sky-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">
            Completa
          </button>
        ) : (
          <button className="bg-gray-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">
            Incompleta
          </button>
        )}

        {
          // Validando que sea el admin
          admin && (
            <button
              className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
              onClick={() => handleModalEliminarTarea(tarea)}
            >
              Eliminar
            </button>
          )
        }
      </div>
    </div>
  );
};

export default Tarea;
