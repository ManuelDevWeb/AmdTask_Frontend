import axios from "axios";
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
  // State que maneja el modal formulario tarea
  const [modalFormularioTarea, setModalFormularioTarea] = useState(false);
  // State que maneja la tarea
  const [tarea, setTarea] = useState({});
  // State que maneja el modal eliminar tarea
  const [modalEliminarTarea, setModalEliminarTarea] = useState(false);
  // State que maneja el colaborador
  const [colaborador, setColaborador] = useState({});
  // State que maneja el modal eliminar colaborador
  const [modalEliminarColaborador, setModalEliminarColaborador] =
    useState(false);

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
      setAlerta({});
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
    setCargando(false);
  };

  // Función para eliminar proyecto
  const eliminarProyecto = async (id) => {
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

      // Realizamos la petición delete, indicamos la url y el id
      const { data } = await clienteAxios.delete(`/proyectos/${id}`, config);
      // Actualizamos el state de alerta
      setAlerta({
        msg: data.msg,
        error: false,
      });
      // Actualizamos el state de proyectos
      const proyectosActualizados = proyectos.filter(
        (proyectoState) => proyectoState._id !== id
      );
      setProyectos(proyectosActualizados);
      // Redireccionamos a proyectos y reseteamos alerta
      setTimeout(() => {
        setAlerta({});
        navigate("/proyectos");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  // Función para cambiar el valor de modalFormularioTarea
  const handleModalTarea = () => {
    setModalFormularioTarea(!modalFormularioTarea);
    setTarea({});
  };

  // Función para crear tarea o editarla segun sea el caso
  const submitTarea = async (tarea) => {
    if (tarea?.existId) {
      await editarTarea(tarea);
    } else {
      await crearTarea(tarea);
    }
  };

  // Editar tarea
  const editarTarea = async (tarea) => {
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

      console.log(tarea);

      // Realizamos la peticion put, indicamos la url y los datos a enviar
      const { data } = await clienteAxios.put(
        `/tareas/${tarea.existId}`,
        tarea,
        config
      );
      console.log(data);
      // Agregando la tarea al state y actualizar el state de proyecto
      const proyectoActualizado = { ...proyecto };
      proyectoActualizado.tareas = proyectoActualizado.tareas.map(
        (tareaState) => (tareaState._id === data._id ? data : tareaState)
      );
      setProyecto(proyectoActualizado);
      // Actualizar el state de alerta
      setAlerta({});
      setModalFormularioTarea(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Crear tarea
  const crearTarea = async (tarea) => {
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

      // Realizamos la peticion post, idicamos la url y los datos a enviar
      const { data } = await clienteAxios.post("/tareas", tarea, config);
      // console.log(data);
      // Agregando la tarea al state y actualizar el state de proyecto
      const proyectoActualizado = { ...proyecto };
      proyectoActualizado.tareas = [...proyecto.tareas, data];
      setProyecto(proyectoActualizado);
      setAlerta({});
      setModalFormularioTarea(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Función para actualizar el state de tarea
  const handleModalEditarTarea = async (tarea) => {
    setTarea(tarea);
    setModalFormularioTarea(true);
  };

  // Función para cambiar el valor de modalEliminarTarea y actualizar el state de tarea
  const handleModalEliminarTarea = (tarea) => {
    setTarea(tarea);
    setModalEliminarTarea(!modalEliminarTarea);
  };

  // Función para eliminar tarea
  const eliminarTarea = async (tarea) => {
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

      // Realizamos la petición delete, indicamos la url y el id
      const { data } = await clienteAxios.delete(
        `/tareas/${tarea._id}`,
        config
      );
      // Actualizar state de alerta
      setAlerta({
        msg: data.msg,
        error: false,
      });
      // Eliminando la tarea y actualizando el state de proyecto
      const proyectoActualizado = { ...proyecto };
      proyectoActualizado.tareas = proyectoActualizado.tareas.filter(
        (tareaState) => tareaState._id !== tarea._id
      );
      setProyecto(proyectoActualizado);
      setModalEliminarTarea(false);
      setTarea({});
      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  // Función para buscar colaborador
  const submitColaborador = async (email) => {
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

      // Realizamos la petición post, indicamos la url y los parámetros a enviar
      const { data } = await clienteAxios.post(
        "/proyectos/colaboradores",
        { email },
        config
      );
      // Actualizamos el state de colaborador
      setColaborador(data);
      setAlerta({});
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 3000);
    }
    setCargando(false);
  };

  // Funcion para agregar colaborador
  const agregarColaborador = async (email) => {
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

      // Realizamos la petición post, indicamos la url y los parámetros a enviar
      const { data } = await clienteAxios.post(
        `/proyectos/colaboradores/${proyecto._id}`,
        email,
        config
      );
      // console.log(data);
      setAlerta({
        msg: data.msg,
        error: false,
      });
      setColaborador({});
      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 3000);
    }
  };

  // Funcion para cambiar el valor de modalEliminarColaborador y actualiazr el state de colaborador
  const handleModalEliminarColaborador = async (colaborador) => {
    setModalEliminarColaborador(!modalEliminarColaborador);
    setColaborador(colaborador);
  };

  // Funcion para eliminar colaborador
  const eliminarColaborador = async () => {
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

      // Realizamos la petición post, indicamos la url y los parámetros a enviar
      const { data } = await clienteAxios.post(
        `/proyectos/eliminar-colaborador/${proyecto._id}`,
        { id: colaborador._id },
        config
      );

      // Actualizamos el state del proyecto
      const proyectoActualizado = { ...proyecto };
      // console.log(proyectoActualizado);
      proyectoActualizado.colaboradores =
        proyectoActualizado.colaboradores.filter(
          (colaboradorState) => colaboradorState._id !== colaborador._id
        );
      //
      setProyecto(proyectoActualizado);
      setAlerta({
        msg: data.msg,
        error: false,
      });
      setColaborador({});
      setModalEliminarColaborador(false);
      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 3000);
    }
  };

  // Funcion para cambiar el estado de una tarea
  const completarTarea = async (id) => {
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

      // Realizamos la petición post, indicamos la url y los parámetros a enviar
      const { data } = await clienteAxios.post(
        `/tareas/estado/${id}`,
        {},
        config
      );
      // Actualizamos el state de proyecto
      const proyectoActualizado = { ...proyecto };
      proyectoActualizado.tareas = proyectoActualizado.tareas.map(
        (tareaState) => (tareaState._id === data._id ? data : tareaState)
      );
      setProyecto(proyectoActualizado);
      setTarea({});
      setAlerta({});
    } catch (error) {
      console.log(error);
    }
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
        eliminarProyecto,
        proyecto,
        cargando,
        modalFormularioTarea,
        handleModalTarea,
        submitTarea,
        handleModalEditarTarea,
        tarea,
        modalEliminarTarea,
        handleModalEliminarTarea,
        eliminarTarea,
        submitColaborador,
        colaborador,
        agregarColaborador,
        handleModalEliminarColaborador,
        modalEliminarColaborador,
        eliminarColaborador,
        completarTarea,
      }}
    >
      {children}
    </ProyectosContext.Provider>
  );
};

export { ProyectosProvider };

export default ProyectosContext;
