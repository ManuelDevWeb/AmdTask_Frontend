import { useEffect } from "react";
import { useParams } from "react-router-dom";

// Hooks
import { useProyectos } from "../hooks/useProyectos";
// Componentes
import FormularioColaborador from "../components/FormularioColaborador";
import Alerta from "../components/Alerta";

const NuevoColaborador = () => {
  // Leyendo el valor id que viene por UL
  const params = useParams();
  const { id } = params;

  // Destructurando los valores que retorna el contexto ProyectosProvider por medio del hook useProyects
  const {
    obtenerProyecto,
    proyecto,
    cargando,
    colaborador,
    agregarColaborador,
    alerta,
  } = useProyectos();

  // UseEffect que se ejecuta una sola vez
  useEffect(() => {
    obtenerProyecto(id);
  }, []);

  if (!proyecto?._id)
    return (
      <div className="flex justify-center">
        <div className="w-full md:w-1/3 lg:w-1/4">
          <Alerta alerta={alerta} />
        </div>
      </div>
    );

  return (
    <>
      <h1 className="text-4xl font-black">
        Añadir Colaborador(a) al Proyecto: {proyecto.nombre}{" "}
      </h1>

      <div className="mt-10 flex justify-center">
        <FormularioColaborador />
      </div>

      {cargando ? (
        <p className="text-center">Cargando...</p>
      ) : (
        colaborador?._id && (
          <div className="flex justify-center mt-10">
            <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow w-full">
              <h2 className="text-center mb-10 text-2xl font-bold">
                Resultado
              </h2>

              <div className="flex justify-between items-center">
                <p>{colaborador.nombre}</p>

                <button
                  type="button"
                  className="bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm"
                  onClick={() =>
                    agregarColaborador({ email: colaborador.email })
                  }
                >
                  Agregar al Proyecto
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default NuevoColaborador;
