import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

// Config
import { clienteAxios } from "../config/clienteAxios";

// Creando Contexto
const AuthContext = createContext();

// Provider que rodea toda la aplicación (Permite a los hijos tener acceso a la información)
const AuthProvider = ({ children }) => {
  // State que almacena la autenticación de los usuarios
  const [auth, setAuth] = useState({});
  // State que maneja cargando
  const [cargando, setCargando] = useState(true);

  const navigate = useNavigate();

  // UseEffect que se ejecuta una sola vez y comprueba si hay un token
  useEffect(() => {
    const autenticarUsuario = async () => {
      // Leyendo el token del localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        setCargando(false);
        return;
      }

      // Configuración bearer token
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      // Intentar autenticar el usuario via JWT
      try {
        const { data } = await clienteAxios.get("/usuarios/perfil", config);
        // console.log(data);
        // Actualizamos el state de auth (Está en el context de AuthProvider)
        setAuth(data);
        // Redireccionamos a proyectos (Siempre y cuando este autenticado)
        navigate("/proyectos");
      } catch (error) {
        setAuth({});
      }
      setCargando(false);
    };
    autenticarUsuario();
  }, []);

  // En value se almacena la información que estará disponible en todos los children
  return (
    <AuthContext.Provider value={{ auth, setAuth, cargando }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
