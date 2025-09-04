import { createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "../ErrorPage";
import { LayoutWeb } from "../product/layout/LayoutWeb";
import { Home } from "../product/pages/Home";
import { paths } from "./paths";

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
    ],
  },
  {},
]);
