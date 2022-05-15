import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Hooks
import { useProyectos } from "../hooks/useProyectos";
// Componentes
import Alerta from "./Alerta";

const FormularioProyecto = () => {
  // State para manejar los campos del formulario
  const [existId, setExistId] = useState(null);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescription] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState("");
  const [cliente, setCliente] = useState("");

  // Leyendo el valor id que viene por URL
  const params = useParams();
  const { id } = params;

  // Destructurando los valores que retorna el contexto ProyectosProvider por medio del hook useProyects
  const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyectos();

  // Se ejecuta cuando cambie params
  useEffect(() => {
    // Si existe id en el params actualizamos los state de los campos del formulario
    // No es necesario obtener de nuevo el proyecto, puesto en el componente EditarProyecto ya se obtuvo y llamamos este componente
    if (id) {
      setExistId(proyecto._id);
      setNombre(proyecto.nombre);
      setDescription(proyecto.descripcion);
      setFechaEntrega(proyecto.fechaEntrega?.split("T")[0]);
      setCliente(proyecto.cliente);
    }
  }, [params]);

  // Función donde validamos el formulario y enviamos petición
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validando que no esten vacios
    if ([nombre, descripcion, fechaEntrega, cliente].includes("")) {
      // Actualizamos el state de alerta
      mostrarAlerta({
        msg: "Todos los campos son obligatorios...",
        error: true,
      });
      return;
    }

    // Pasar datos a la función submitProyecto del provider (En el provider es asincrona)
    await submitProyecto({
      existId,
      nombre,
      descripcion,
      fechaEntrega,
      cliente,
    });

    // Reseteamos formulario
    setExistId(null);
    setNombre("");
    setCliente("");
    setDescription("");
    setFechaEntrega("");
  };

  // Destructurando msg de alerta
  const { msg } = alerta;

  return (
    <form
      className="bg-white py-10 px-5 md:w-3/4 lg:w-1/2 rounded-lg shadow"
      // Se ejecuta la función habdleSubmit cuando el usuario envía el formulario
      onSubmit={handleSubmit}
    >
      {
        // Si hay un mensaje, hay una alerta por ende llamamos el componente
        msg && <Alerta alerta={alerta} />
      }

      {/* Nombre */}
      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="nombre"
        >
          Nombre Proyecto
        </label>
        <input
          id="nombre"
          type="text"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-sky-700"
          placeholder="Nombre del Proyecto"
          // El value del input es el valor del state de nombre
          value={nombre}
          // Actualiza el state de nombre cada que cambia el input
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      {/* Descripcion */}
      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="descripcion"
        >
          Descripción
        </label>
        <textarea
          id="descripcion"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-sky-700"
          placeholder="Descripción del Proyecto"
          // El value del textarea es el valor del state descripcion
          value={descripcion}
          // Actualiza el state de descripcion cada que cambia el textarea
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      {/* Fecha Entrega */}
      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="fecha-entrega"
        >
          Fecha entrega
        </label>
        <input
          id="fecha-entrega"
          type="date"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-sky-700"
          // El value del input es el valor del state de fechaEntrega
          value={fechaEntrega}
          // Actualiza el state de fechaEntrega cada que cambia el input
          onChange={(e) => setFechaEntrega(e.target.value)}
        />
      </div>

      {/* Cliente */}
      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="cliente"
        >
          Nombre del Cliente
        </label>
        <input
          id="cliente"
          type="text"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-sky-700"
          placeholder="Nombre del Cliente"
          // El value del input es el valor del state de cliente
          value={cliente}
          // Actualiza el state de cliente cada que cambia el input
          onChange={(e) => setCliente(e.target.value)}
        />
      </div>

      <input
        type="submit"
        value={existId ? "Actualizar Proyecto" : "Crear Proyecto"}
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
      />
    </form>
  );
};

export default FormularioProyecto;
