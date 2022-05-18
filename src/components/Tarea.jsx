// Helpers
import { formatearFecha } from "../helpers/formatearFecha";
// Hooks
import { useProyectos } from "../hooks/useProyectos";
import { useAdmin } from "../hooks/useAdmin";

const Tarea = ({ tarea }) => {
  // Destructurando los parametros de tarea
  const { descripcion, nombre, prioridad, fechaEntrega, estado, _id } = tarea;

  // Destructurando los valores que retorna el contexto ProyectosContext por medio del hook useProyecto
  const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } =
    useProyectos();

  const admin = useAdmin();

  // console.log(tarea);

  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div className="flex flex-col items-start">
        <p className="text-xl">{nombre}</p>
        <p className="text-sm text-gray-500 uppercase">{descripcion}</p>
        <p className="text-sm capitalize">{formatearFecha(fechaEntrega)}</p>
        <p className="text-gray-600">Prioridad: {prioridad}</p>
        {estado && (
          <p className="text-xs bg-green-600 uppercase p-1 rounded-lg text-white">
            Completada por:{tarea.completado.nombre}{" "}
          </p>
        )}
      </div>
      <div className="flex flex-col lg:flex-row gap-2">
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

        <button
          className={`${
            estado ? "bg-sky-600" : "bg-gray-600"
          }  px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
          onClick={() => completarTarea(_id)}
        >
          {estado ? "Completa" : "Incompleta"}
        </button>

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
