import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

// Importando componentes
// Componentes
import Alerta from "../components/Alerta";

const ConfirmarCuenta = () => {
  // Leyendo el valor id que viene por URL
  const params = useParams();
  const { id } = params;

  // State para manejar algunos valores
  const [alerta, setAlerta] = useState({});
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);

  // Se ejecuta una sola vez cuando cargue el componente
  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `http://localhost:4000/api/usuarios/confirmar/${id}`;
        // Realizamos la petición get, indicamos la url
        const { data } = await axios.get(url);
        // Actualizamos el state alert con el valor que responde desde el backend cuando se confirma una cuenta
        setAlerta({
          msg: data.msg,
          error: false,
        });
        // Actualizamos el state cuentaConfirmada
        setCuentaConfirmada(true);
      } catch (error) {
        // Actualizamos el state alert con el error que responde desde el backend cuando falla alguna validación
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    confirmarCuenta();
  }, []);

  // Destructurando msg del objeto alerta
  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-5xl md:text-6xl capitalize">
        Confirma tu cuenta y comienza a crear tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>

      <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
        {
          // Si hay un mensaje, hay una alerta por ende llamamos el componente
          msg && <Alerta alerta={alerta} />
        }
        {
          // Si cuenta confirmada es true mostramos el link
          cuentaConfirmada && (
            <Link
              className="block text-center my-5 text-slate-500 uppercase text-sm"
              to="/"
            >
              Inicia Sesión
            </Link>
          )
        }
      </div>
    </>
  );
};

export default ConfirmarCuenta;
