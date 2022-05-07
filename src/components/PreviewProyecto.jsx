import { Link } from "react-router-dom";

const PreviewProyecto = ({ proyecto }) => {
  // Destructurando datos de proyecto
  const { nombre, _id, cliente } = proyecto;

  return (
    <div className="border-b p-5 flex">
      <p className="flex-1">
        {nombre}{" "}
        <span className="text-sm text-gray-500 uppercase"> {cliente}</span>
      </p>
      {/* to={`${_id}`} */}
      <Link
        to={`/proyectos/${_id}`}
        className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold"
      >
        Ver Proyecto
      </Link>
    </div>
  );
};

export default PreviewProyecto;
