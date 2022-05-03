import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

// Importando componentes
// Components
import Alerta from "../components/Alerta";
// Config
import { clienteAxios } from "../config/clienteAxios";

const NuevoPassword = () => {
  // Leyendo el valor token que viene por URL
  const params = useParams();
  const { token } = params;

  // State para manejar algunos valores
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);

  // Se ejecuta una sola vez cuando cargue el componente
  useEffect(() => {
    const comprobarToken = async () => {
      try {
        const url = `/usuarios/recuperar-password/${token}`;
        // Realizamos la petición get, indicamos la url
        await clienteAxios.get(url);
        // Actualizamos el state passwordReestablecida
        setTokenValido(true);
      } catch (error) {
        // Actualizamos el state alert con el valor que responde desde el backend cuando se hace la petición
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    comprobarToken();
  }, []);

  // Función donde validamos la contraseña y enviamos petición
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validando que password no este vacio
    if (password === "") {
      // Actualizamos el state de alerta
      setAlerta({
        msg: "El campo password no puede estar vacío",
        error: true,
      });
      return;
    }

    // Validando que password sea mayor a 6
    if (password.length < 6) {
      // Actualizamos el state de alerta
      setAlerta({
        msg: "El password es muy corto, agrega mínimo 6 caracteres",
        error: true,
      });
      return;
    }

    // Actualizando la contraseña en la API
    try {
      // Realizamos la petición post, indicamos la url y los datos a enviar
      const { data } = await clienteAxios.post(
        `/usuarios/recuperar-password/${token}`,
        {
          password,
        }
      );
      // Actualizamos el state alert con el valor que responde desde el backend cuando se crea un usuario
      setAlerta({
        msg: data.msg,
        error: false,
      });
      setPassword("");
      setPasswordModificado(true);
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
        Reestablece tu password y no pierdas tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>

      {
        // Si hay un mensaje, hay una alerta por ende llamamos el componente
        msg && <Alerta alerta={alerta} />
      }

      {
        // Si token valido es true mostramos el formulario
        tokenValido && (
          <form
            className="my-10 bg-white shadow rounded-lg p-10"
            // Se ejecuta la función handleSubmit cuando el usuario envía el formulario
            onSubmit={handleSubmit}
          >
            {/* Password */}
            <div className="my-5">
              <label
                className="uppercase text-gray-600 block text-xl font-bold"
                htmlFor="password"
              >
                Nuevo Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Escribe tu Nuevo Password"
                className="w-full mt-2 p-3 border rounded-xl bg-gray-50  focus:outline-sky-700"
                // El value del input es el valor del state de password
                value={password}
                // Actualiza el state de password cada que cambia el input
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <input
              type="submit"
              value="Guardar Nuevo Password"
              className="w-full bg-sky-700 py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
            />
          </form>
        )
      }

      {
        // Si password modificado es true mostramos el link
        passwordModificado && (
          <Link
            className="block text-center my-5 text-slate-500 uppercase text-sm"
            to="/"
          >
            Inicia Sesión
          </Link>
        )
      }
    </>
  );
};

export default NuevoPassword;
