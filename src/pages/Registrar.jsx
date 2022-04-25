import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Importando componentes
// Components
import Alerta from "../components/Alerta";

const Registrar = () => {
  // State para manejar los campos del formulario
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  // Función donde validamos el formulario y enviamos petición
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validando que no esten vacios
    if ([nombre, email, password, repetirPassword].includes("")) {
      // Actualizamos el state de alerta
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    // Validando que password y repetirPassword sean iguales
    if (password !== repetirPassword) {
      // Actualizamos el state de alerta
      setAlerta({
        msg: "Los password no son iguales",
        error: true,
      });
      return;
    }

    // Validando que password sea mayor a 6 caracteres
    if (password.length < 6) {
      // Actualizamos el state de alerta
      setAlerta({
        msg: "El password es muy corto, agrega mínimo 6 caracteres",
        error: true,
      });
    }

    setAlerta({});

    // Crear el usuario en la API
    try {
      // Realizamos la petición post, indicamos la url y los datos a enviar
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/usuarios`,
        {
          nombre,
          password,
          email,
        }
      );
      // Actualizamos el state alert con el valor que responde desde el backend cuando se crea un usuario
      setAlerta({
        msg: data.msg,
        error: false,
      });
      // Reseteamos el valor de los campso
      setNombre("");
      setEmail("");
      setPassword("");
      setRepetirPassword("");
    } catch (error) {
      // Actualizamos el state alert con el error que responde desde el backend cuando falla alguna validación
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
        Crea tu cuenta y administra tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>

      {
        // Si hay un mensaje, hay una alerta por ende llamamos el componente
        msg && <Alerta alerta={alerta} />
      }

      <form
        className="my-10 bg-white shadow rounded-lg p-10"
        // Se ejecuta la función handleSubmit cuando el usuario envía el formulario
        onSubmit={handleSubmit}
      >
        {/* Nombre */}
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="nombre"
          >
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="Tu Nombre"
            className="w-full mt-2 p-3 border rounded-xl bg-gray-50  focus:outline-sky-700"
            // El value del input es el valor del state de nombre
            value={nombre}
            // Actualiza el state de nombre cada que cambia el input
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

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

        {/* Password */}
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="w-full mt-2 mb-5 p-3 border rounded-xl bg-gray-50  focus:outline-sky-700"
            // El value del input es el valor del state de password
            value={password}
            // Actualiza el state de password cada que cambia el input
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password2"
          >
            Repetir Password
          </label>
          <input
            id="password2"
            type="password"
            placeholder="Repetir tu Password"
            className="w-full mt-2 mb-5 p-3 border rounded-xl bg-gray-50  focus:outline-sky-700"
            // El value del input es el valor del state de repetirPassword
            value={repetirPassword}
            // Actualiza el state de repetirPassword cada que cambia el input
            onChange={(e) => setRepetirPassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Crear Cuenta"
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
          to="/olvide-password"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          Olvide Mi Password
        </Link>
      </nav>
    </>
  );
};

export default Registrar;
