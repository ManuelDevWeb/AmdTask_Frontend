// Importando funciones para manejo de rutas
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Importando componentes
// Layouts
import AuthLayout from "./layouts/AuthLayout";
import { RutaProtegida } from "./layouts/RutaProtegida";
// Pages
import Login from "./pages/Login";
import Registrar from "./pages/Registrar";
import OlvidePassword from "./pages/OlvidePassword";
import NuevoPassword from "./pages/NuevoPassword";
import ConfirmarCuenta from "./pages/ConfirmarCuenta";
import { Proyectos } from "./pages/Proyectos";
// Context
import { AuthProvider } from "./context/AuthProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* Grupo de rutas */}
        <Routes>
          {/* Grupo de rutas públicas */}
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="registrar" element={<Registrar />} />
            <Route path="olvide-password" element={<OlvidePassword />} />
            <Route path="olvide-password/:token" element={<NuevoPassword />} />
            <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
          </Route>

          {/* Grupo de rutas privadas */}
          <Route path="/proyectos" element={<RutaProtegida />}>
            <Route index element={<Proyectos />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
