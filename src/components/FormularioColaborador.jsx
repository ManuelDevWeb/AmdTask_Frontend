import { useState } from "react";

// Hooks
import { useProyectos } from "../hooks/useProyectos";
// Componentes
import Alerta from "./Alerta";

const FormularioColaborador = () => {
  // State para manejar los campos del formulario
  const [email, setEmail] = useState("");

  // Destructurando los valores que retorna el contexto ProyectosProvider por medio del hook useProyects
  const { mostrarAlerta, alerta, submitColaborador, cargando } = useProyectos();

  // Función donde validamos el formulario y enviamos petición
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validando que no esten vacios
    if (email === "") {
      // Actualizamos el state de alerta
      mostrarAlerta({
        msg: "El Email es Obligatorio",
        error: true,
      });
      return;
    }

    // Pasar datos a la funcion submitColaborador del provider (En el provider es asincrona)
    submitColaborador(email);
  };

  // Destructurando msg de alerta
  const { msg } = alerta;

  // if (cargando) return "Cargando...";

  return (
    <form
      className="bg-white py-10 px-5 w-full md:w-3/4 lg:w-1/2 rounded-lg shadow"
      // Se ejecuta la función habdleSubmit cuando el usuario envía el formulario
      onSubmit={handleSubmit}
    >
      {
        // Si hay un mensaje, hay una alerta por ende llamamos el componente
        msg && <Alerta alerta={alerta} />
      }

      {/* Email */}
      <div className="mb-5">
        <label
          htmlFor="email"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Email Colaborador
        </label>
        <input
          type="email"
          id="email"
          placeholder="Email del Usuario"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-sky-700"
          // El value del input es el valor del state de email
          value={email}
          // Actualiza el state de email cada que cambia el input
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <input
        type="submit"
        value={"Buscar Colaborador"}
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
      />
    </form>
  );
};

export default FormularioColaborador;
