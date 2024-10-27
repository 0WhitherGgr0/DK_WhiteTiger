import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AuthProvider } from './context/AuthContext';  
import Root from "./routes/root";
import ErrorPage from "./routes/error-page";
import Login from "./routes/login";
import Dashboard from "./routes/dashboard/dashboard";
import Panel from "./routes/dashboard/panel/panel";
import Ordenes from "./routes/dashboard/ordenes/ordenes";
import Flotas from "./routes/dashboard/flotas/flotas";
import Rutas from "./routes/dashboard/rutas/rutas";
import Vehiculos from "./routes/dashboard/flotas/vehiculos";
import Conductores from "./routes/dashboard/flotas/conductores";
import RutasVista from "./routes/dashboard/flotas/rutasVista";
import FormVehiculo from "./routes/dashboard/flotas/formVehiculo";
import PrivateRoute from "./routes/PrivateRoute";
import { action as vehicleCreate } from "./routes/dashboard/flotas/formVehiculo";
import RoleRoute from "./routes/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,  
    errorElement: <ErrorPage />
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Panel/>
      },
      {
        path: "/dashboard/ordenes",
        element: (
          <PrivateRoute allowedRoles={['admin', 'conductor']}>
            <Ordenes />
          </PrivateRoute>
        )
      },
      {
        path: "/dashboard/flotas",
        element: (
          <PrivateRoute allowedRoles={['admin']}>
            <Flotas />
          </PrivateRoute>
        ),
        children: [
          {
            path: "/dashboard/flotas/vehiculos",
            element: (
              <PrivateRoute allowedRoles={['admin']}>
                <Vehiculos />
              </PrivateRoute>
            )
          },
          {
            path: "/dashboard/flotas/conductores",
            element: (
              <PrivateRoute allowedRoles={['admin']}>
                <Conductores />
              </PrivateRoute>
            )
          },
          {
            path: "/dashboard/flotas/rutas",
            element: (
              <PrivateRoute allowedRoles={['admin']}>
                <RutasVista />
              </PrivateRoute>
            )
          },
          {
            path: "/dashboard/flotas/vehiculos/nuevoVehiculo",
            element: (
              <PrivateRoute allowedRoles={['admin']}>
                <FormVehiculo />
              </PrivateRoute>
            ),
            action: vehicleCreate
          }
        ]
      },
      {
        path: "/dashboard/rutas",
        element: (
          <PrivateRoute allowedRoles={['admin', 'conductor']}>
            <Rutas />
          </PrivateRoute>
        )
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
