import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

// Cliente Socket.io
import io from "socket.io-client";

// Hooks
import { useProyectos } from "../hooks/useProyectos";
import { useAdmin } from "../hooks/useAdmin";
// Components
import ModalFormularioTarea from "../components/ModalFormularioTarea";
import Tarea from "../components/Tarea";
import ModalEliminarTarea from "../components/ModalEliminarTarea";
import Colaborador from "../components/Colaborador";
import ModalEliminarColaborador from "../components/ModalEliminarColaborador";

let socket;

const Proyecto = () => {
  // Leyendo el valor id que viene por URL
  const params = useParams();
  const { id } = params;

  // Destructurando los valores que retorna el contexto ProyectosContext por medio del hook useProyecto
  const {
    obtenerProyecto,
    proyecto,
    cargando,
    handleModalTarea,
    alerta,
    submitTareasProyecto,
    eliminarTareaProyecto,
    actualizarTareaProyecto,
    cambiarEstadoTarea,
  } = useProyectos();

  const admin = useAdmin();

  // Destructurando los valores datos del proyecto
  const { nombre } = proyecto;

  // console.log(proyecto);
  // console.log(admin)

  // Se ejecuta una sola vez cuando cargue el componente
  useEffect(() => {
    obtenerProyecto(id);
  }, []);

  // useEffect para conectarnos a socket.io. Se ejecuta una sola vez para entrar al room
  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
    // Enviando eventos desde el frontend hacia el backend
    socket.emit("abrir proyecto", id);
  }, []);

  // useEffect que se deja sin dependencias para que corra todo el tiempo
  useEffect(() => {
    // Recibiendo datos de respuesta desde el backend
    socket.on("tarea agregada", (tareaNueva) => {
      if (tareaNueva.proyecto === proyecto._id) {
        submitTareasProyecto(tareaNueva);
      }
    });

    // Recibiendo datos de respuesta desde el backend
    socket.on("tarea eliminada", (tareaEliminada) => {
      if (tareaEliminada.proyecto === proyecto._id) {
        eliminarTareaProyecto(tareaEliminada);
      }
    });

    // Recibiendo datos de respuesta desde el backend
    socket.on("tarea actualizada", (tareaActualizada) => {
      if (tareaActualizada.proyecto._id === proyecto._id) {
        actualizarTareaProyecto(tareaActualizada);
      }
    });

    // Recibiendo datos de respuesta desde el backend
    socket.on("nuevo estado", (nuevoEstadoTarea) => {
      if (nuevoEstadoTarea.proyecto._id === proyecto._id) {
        cambiarEstadoTarea(nuevoEstadoTarea);
      }
    });
  });

  // Destruturando msg de alerta
  const { msg } = alerta;

  // Si está cargando mostramos spiner
  if (cargando) return "Cargando...";

  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-black text-4xl">{nombre}</h1>

        {
          // Validando que sea el admin
          admin && (
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

              <Link
                to={`/proyectos/editar/${id}`}
                className="uppercase font-bold"
              >
                Editar
              </Link>
            </div>
          )
        }
      </div>

      {admin && (
        <button
          type="button"
          className="text-sm px-5 py-3 mt-5 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center flex gap-2 items-center justify-center"
          // Se ejecuta al dar click en el boton
          onClick={handleModalTarea}
        >
          {/* 
            Icono Agregar (Extraido desde https://heroicons.com/) 
            Podemos cambiar las clases que queramos por las de tailwind
          */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
              clipRule="evenodd"
            />
          </svg>
          Nueva Tarea
        </button>
      )}

      {/* Tareas  */}
      <p className="font-bold text-xl mt-10">Tareas del Proyecto</p>

      <div className="bg-white shadow mt-10 rounded-lg">
        {
          /* Validando que el proyecto tenga tareas */
          proyecto.tareas?.length ? (
            proyecto.tareas?.map((tarea) => (
              <Tarea key={tarea._id} tarea={tarea} />
            ))
          ) : (
            <p className="text-center my-5 p-10">
              No hay tareas en este proyecto
            </p>
          )
        }
      </div>

      {
        // Validando que sea el admin
        /* Colaboradores */
        admin && (
          <>
            <div className="flex items-center justify-between mt-10">
              <p className="font-bold text-xl">Colaboradores</p>
              <Link
                to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
                className="text-gray-400 uppercase font-bold hover:text-black"
              >
                Añadir
              </Link>
            </div>

            <div className="bg-white shadow mt-10 rounded-lg">
              {
                /* Validando que el proyecto tenga colaboradores */
                proyecto.colaboradores?.length ? (
                  proyecto.colaboradores?.map((colaborador) => (
                    <Colaborador
                      key={colaborador._id}
                      colaborador={colaborador}
                    />
                  ))
                ) : (
                  <p className="text-center my-5 p-10">
                    No hay colaboradores en este proyecto
                  </p>
                )
              }
            </div>
          </>
        )
      }

      <ModalFormularioTarea />
      <ModalEliminarTarea />
      <ModalEliminarColaborador />
    </>
  );
};

export default Proyecto;
