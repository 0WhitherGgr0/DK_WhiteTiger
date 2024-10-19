import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Root from "./routes/root";
import ErrorPage from "./routes/error-page";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./routes/login";
import Dashboard from "./routes/dashboard";
import Panel from "./routes/panel";
import Ordenes from "./routes/ordenes";
import Flotas from "./routes/flotas";
import Rutas from "./routes/rutas";
import Vehiculos from "./routes/vehiculos";
import Conductores from "./routes/conductores";
import RutasVista from "./routes/rutasVista";

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
                index:true,
                element: <Vehiculos/>
              },
              {
                path: "/dashboard/flotas/conductores",
                element: <Conductores/>
              },
              {
                path: "/dashboard/flotas/rutas",
                element: <RutasVista/>
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
