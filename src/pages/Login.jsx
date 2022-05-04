import { useState } from "react";
import { Link } from "react-router-dom";

// Importando componentes
// Componentes
import Alerta from "../components/Alerta";
// Config
import { clienteAxios } from "../config/clienteAxios";
// Hooks
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  // State para manejar algunos valores
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  // Destructurando los valores que retorna el contexto AuthContext por medio del hook useAuth
  const { setAuth } = useAuth();

  // Función donde validamos email, password y enviamos petición
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validando que email y password no esten vacios
    if ([email, password].includes("")) {
      // Actualizamos el state de alerta
      setAlerta({
        msg: "Todos los campos son obligatorios 😅",
        error: true,
      });
      return;
    }

    // Logeandonos
    try {
      // Realizamos la petición post, indicamos la url y los datos a enviar
      const { data } = await clienteAxios.post("/usuarios/login", {
        email,
        password,
      });
      setAlerta({});
      console.log(data);
      // Almacenamos jwtToken en el local storage
      localStorage.setItem("token", data.jwtToken);
      // Actualizamos el state de auth (Está en el context de AuthProvider)
      setAuth(data);
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
        Inicia sesión y administra tus{" "}
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
            // El value del input es el valor del state email
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
            // El value del input es el valor del state password
            value={password}
            // Actualiza el state de password cada que cambia el input
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Iniciar Sesión"
          className="w-full bg-sky-700 py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          to="/registrar"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          ¿No tienes una cuenta? Regístrate
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

export default Login;
