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
  // State que maneja el proyecto actual
  const [proyecto, setProyecto] = useState({});
  // State que manaje cargando
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();

  // UseEffect que se ejecuta una sola vez
  useEffect(() => {
    const obtenerProyectos = async () => {
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
          // Realizamos la petición get, indicamos la url
          const { data } = await clienteAxios.get("/proyectos", config);
          // Actualizamos el state de proyectos
          setProyectos(data);
        } catch (error) {}
      } catch (error) {
        console.log(error);
      }
    };
    obtenerProyectos();
  }, []);

  // Función para enviar alerta al state alerta
  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);

    setTimeout(() => {
      setAlerta({});
    }, 5000);
  };

  // Función para crear el proyecto o editarlo según sea el caso
  const submitProyecto = async (proyecto) => {
    if (proyecto.existId) {
      await editarProyecto(proyecto);
    } else {
      await nuevoProyecto(proyecto);
    }
  };

  // Editar proyecto
  const editarProyecto = async (proyecto) => {
    try {
      // Obtener token del local storage (Es poco probable que no haya token porque si está en esta página ya está autenticado)
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
        // Realizamos la petición put (Debemos enviar objeto completo), indicamos la url y los datos a enviar
        const { data } = await clienteAxios.put(
          `/proyectos/${proyecto.existId}`,
          proyecto,
          config
        );
        // Actualizar el state de proyectos
        const proyectosActualizados = proyectos.map((proyectoState) =>
          proyectoState._id === data._id ? data : proyectoState
        );
        // console.log(proyectosActualizados);
        setProyectos(proyectosActualizados);

        // Actualizar el state de alerta
        setAlerta({
          msg: "Proyecto Actualizado correctamente",
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

  // Crear proyecto
  const nuevoProyecto = async (proyecto) => {
    try {
      // Obtener token del local storage (Es poco probable que no haya token porque si está en esta página ya está autenticado)
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
        // Actualizamos el state de proyectos
        setProyectos([...proyectos, data]);
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

  // Función para obtener proyecto
  const obtenerProyecto = async (id) => {
    setCargando(true);
    try {
      // Obtener token del local storage (Es poco probable que no haya token porque si está en esta página ya está autenticado)
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

      // Realizamos la petición get, indicamos la url y los parámetros a enviar
      const { data } = await clienteAxios.get(`/proyectos/${id}`, config);
      // console.log(data);
      // Actualizamos el state proyecto
      setProyecto(data);
    } catch (error) {
      console.log(error);
    }
    setCargando(false);
  };

  // En value se almacena la información que estará disponible en todos los children
  return (
    <ProyectosContext.Provider
      value={{
        proyectos,
        mostrarAlerta,
        alerta,
        submitProyecto,
        obtenerProyecto,
        proyecto,
        cargando,
      }}
    >
      {children}
    </ProyectosContext.Provider>
  );
};

export { ProyectosProvider };

export default ProyectosContext;
