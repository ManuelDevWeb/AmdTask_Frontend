import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

// Importando componentes
// Components
import Alerta from "../components/Alerta";

const NuevoPassword = () => {
  // Leyendo el valor token que viene por URL
  const params = useParams();
  const { token } = params;

  // State para manejar algunos valores
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);

  // Se ejecuta una sola vez cuando cargue el componente
  useEffect(() => {
    const comprobarToken = async () => {
      try {
        const url = `http://localhost:4000/api/usuarios/recuperar-password/${token}`;
        // Realizamos la petición get, indicamos la url
        await axios.get(url);
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
          <form className="my-10 bg-white shadow rounded-lg p-10">
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
    </>
  );
};

export default NuevoPassword;
