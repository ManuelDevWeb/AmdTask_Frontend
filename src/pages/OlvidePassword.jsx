import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Importando componentes
// Componentes
import Alerta from "../components/Alerta";
// Config
import { clienteAxios } from "../config/clienteAxios";

const OlvidePassword = () => {
  // State para manejar algunos valores
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});

  // Función donde validamos formulario y enviamos petición
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validando que no este vacio
    if (email === "" || email.length < 6) {
      // Actualizamos el state de alerta
      setAlerta({
        msg: "El campo email es obligatorio",
        error: true,
      });
      return;
    }

    // Enviar el email desde la API
    try {
      // Realizamos la petición post, indicamos la url y los datos a enviar
      const { data } = await clienteAxios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/recuperar-password`,
        {
          email,
        }
      );
      // Actualizamos el state alert con el valor que responde desde el backend cuando se hace la petición
      setAlerta({
        msg: data.msg,
        error: false,
      });
      // Reseteamos el valor del campo
      setEmail("");
    } catch (error) {
      // Actualizamos el state alert con el valor que responde desde el backend cuando se hace la petición
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  // Destructurando msg del objeto alerta
  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-5xl md:text-6xl capitalize">
        Recupera tu acceso y no pierdas tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>

      {
        // Si hay un mensaje, hay una alerta por ende llamamos componente
        msg && <Alerta alerta={alerta} />
      }

      <form
        className="my-10 bg-white shadow rounded-lg p-10"
        // Se ejecuta la función handleSubmit cuando el usuario envía el formulario
        onSubmit={handleSubmit}
      >
        {/* Email */}
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full mt-2 p-3 border rounded-xl bg-gray-50  focus:outline-sky-700"
            // El value del input es el valor del state de email
            value={email}
            // Actualiza el state de email cada que cambia el input
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Enviar Instrucciones"
          className="w-full bg-sky-700 py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          to="/"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          ¿Ya tienes una cuenta? Inicia sesión
        </Link>
        <Link
          to="/registrar"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          ¿No tienes una cuenta? Regístrate
        </Link>
      </nav>
    </>
  );
};

export default OlvidePassword;
