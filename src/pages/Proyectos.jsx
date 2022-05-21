import { useEffect } from "react";

// Hooks
import { useProyectos } from "../hooks/useProyectos";
// Componentes
import PreviewProyecto from "../components/PreviewProyecto";
import Alerta from "../components/Alerta";

const Proyectos = () => {
  // Destructurando los valores que retorna el contexto AuthContext por medio del hook useAuth
  const { proyectos, alerta } = useProyectos();

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-4xl font-black">Proyectos</h1>

      {msg && <Alerta alerta={alerta} />}

      <div className="bg-white shadow mt-10 rounded-lg">
        {
          // Si hay proyectos, los mostramos
          proyectos.length ? (
            proyectos.map((proyecto) => (
              <PreviewProyecto key={proyecto._id} proyecto={proyecto} />
            ))
          ) : (
            <p className="text-center text-gray-600 uppercase p-5">
              No hay proyectos aún
            </p>
          )
        }
      </div>
    </>
  );
};

export default Proyectos;
