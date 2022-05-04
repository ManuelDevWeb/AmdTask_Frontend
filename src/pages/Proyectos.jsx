// Hooks
import { useProyectos } from "../hooks/useProyectos";

const Proyectos = () => {
  // Destructurando los valores que retorna el contexto AuthContext por medio del hook useAuth
  const { proyectos } = useProyectos();

  return (
    <>
      <h1 className="text-4xl font-black">Proyectos</h1>

      <div></div>
    </>
  );
};

export default Proyectos;
