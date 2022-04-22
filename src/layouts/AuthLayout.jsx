// Importando Outlet para poder inyectar el contenido de los componentes hijos del grupo de rutas <AuthLayout />
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <h1>AuthLayout</h1>

      {/* Contenido rutas hijas */}
      <Outlet />
    </>
  );
};

export default AuthLayout;
