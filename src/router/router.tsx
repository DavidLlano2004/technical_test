import { createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "../ErrorPage";
import { LayoutWeb } from "../product/layout/LayoutWeb";
import { Home } from "../product/pages/Home";
import { paths } from "./paths";
import { Contracts } from "../product/pages/Contracts";

export const router = createBrowserRouter([
  {
    path: paths.layout,
    element: <LayoutWeb />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: paths.home,
        element: <Home />,
      },
      {
        path: paths.contracts,
        element: <Contracts />,
      },
    ],
  },
  {},
]);
