// Importando Outlet para poder inyectar el contenido de los componentes hijos del grupo de rutas <AuthLayout />
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex justify-center items-center">
      <main className="container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center">
        <div className="md:w-2/3 lg:w-2/5">
          {/* Contenido rutas hijas */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
