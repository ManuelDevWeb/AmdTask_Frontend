// Importando funciones para manejo de rutas
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Importando componentes
// Layouts
import AuthLayout from "./layouts/AuthLayout";
// Pages
import Login from "./pages/Login";
import Registrar from "./pages/Registrar";
import OlvidePassword from "./pages/OlvidePassword";
import NuevoPassword from "./pages/NuevoPassword";
import ConfirmarCuenta from "./pages/ConfirmarCuenta";

function App() {
  return (
    <BrowserRouter>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
