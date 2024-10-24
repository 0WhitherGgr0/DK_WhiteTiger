import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Root from "./routes/root";
import ErrorPage from "./routes/error-page";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./routes/login";
import Dashboard from "./routes/dashboard/dashboard";
import Panel from "./routes/dashboard/panel/panel";
import Ordenes from "./routes/dashboard/ordenes/ordenes"
import Flotas from "./routes/dashboard/flotas/flotas";
import Rutas from "./routes/dashboard/rutas/rutas"
import Vehiculos from "./routes/dashboard/flotas/vehiculos";
import Conductores from "./routes/dashboard/flotas/conductores";
import RutasVista from "./routes/dashboard/flotas/rutasVista"
import FormVehiculo from "./routes/dashboard/flotas/formVehiculo";

import { action as vehicleCreate } from "./routes/dashboard/flotas/formVehiculo";
import { loadVehicles } from "./routes/dashboard/flotas/vehiculos";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Login />
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: <Panel/>
          },
          {
            path: "/dashboard/ordenes",
            element: <Ordenes/>
          },
          {
            path: "/dashboard/flotas",
            element: <Flotas/>,
            children: [
              {
                path: "/dashboard/flotas/vehiculos",
                element: <Vehiculos/>,
                loader: loadVehicles
              },
              {
                path: "/dashboard/flotas/conductores",
                element: <Conductores/>
              },
              {
                path: "/dashboard/flotas/rutas",
                element: <RutasVista/>
              },
              {
                path: "/dashboard/flotas/vehiculos/nuevoVehiculo",
                element: <FormVehiculo/>,
                action: vehicleCreate
              }
            ]
          },
          {
            path: "/dashboard/rutas",
            element: <Rutas/>
          }
        ]
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
