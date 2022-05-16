// Hooks
import { useProyectos } from "../hooks/useProyectos";

const Colaborador = ({ colaborador }) => {
  // Destructurando los parametros de colaborador
  const { nombre, email } = colaborador;

  // Destructurando los valores que retorna el contexto ProyectosContexto por medio del hook useProyectos
  const { handleModalEliminarColaborador } = useProyectos();

  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div>
        <p>{nombre} </p>
        <p className="text-sm text-gray-700">{email}</p>
      </div>
      <div>
        <button
          type="button"
          className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
          onClick={() => handleModalEliminarColaborador(colaborador)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Colaborador;
