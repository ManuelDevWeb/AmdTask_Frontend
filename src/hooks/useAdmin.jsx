// Hooks
import { useProyectos } from "./useProyectos";
import { useAuth } from "./useAuth";

const useAdmin = () => {
  // Destructurando los valores que retorna el contexto ProyectosContext por medio del hook useProyecto
  const { proyecto } = useProyectos();
  // Destructurando los valores que retorna el contexto AuthContext por medio del hook useAuth
  const { auth } = useAuth();

  // Validamos si el creador del proyecto es la persona que esta logeada
  return proyecto.creador === auth._id;
};

export { useAdmin };
