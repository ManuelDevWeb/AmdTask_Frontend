import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

// Config
import { clienteAxios } from "../config/clienteAxios";

// Creando Contexto
const ProyectosContext = createContext();

// Provider que rodea toda la aplicación (Permite a los hijos tener acceso a la información)
const ProyectosProvider = ({ children }) => {
  // State que almacena los proyectos
  const [proyectos, setProyectos] = useState([]);
  // State que maneja la alerta
  const [alerta, setAlerta] = useState({});

  const navigate = useNavigate();

  // Función para enviar alerta al state alerta
  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);

    setTimeout(() => {
      setAlerta({});
    }, 5000);
  };

  // Función para crear el proyecto
  const submitProyecto = async (proyecto) => {
    try {
      // Obtener token del local storage
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      // Configuración bearer token
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        // Realizamos la petición post, indicamos la url y los datos a enviar
        const { data } = await clienteAxios.post(
          "/proyectos",
          proyecto,
          config
        );
        // console.log(data);
        // Actualizamos el state de alerta
        setAlerta({
          msg: "Proyecto creado correctamente",
          error: false,
        });
        // Redireccionamos a proyectos y reseteamos alerta
        setTimeout(() => {
          setAlerta({});
          navigate("/proyectos");
        }, 3000);
      } catch (error) {}
    } catch (error) {
      // Actualizamos el state de alerta con el error que responde desde el backend cuando falla alguna validación
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  // En value se almacena la información que estará disponible en todos los children
  return (
    <ProyectosContext.Provider
      value={{ proyectos, mostrarAlerta, alerta, submitProyecto }}
    >
      {children}
    </ProyectosContext.Provider>
  );
};

export { ProyectosProvider };

export default ProyectosContext;
