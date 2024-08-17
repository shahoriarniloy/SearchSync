import {
  createBrowserRouter,
  Navigate,  // Import Navigate to handle redirection
} from "react-router-dom";
import Login from "../components/Login/Login";
import Register from "../components/Login/Register";
import RouteNotFound from "./RouteNotFound";
import Main from "../components/Main";
import Products from "../components/Products";
import PrivateRoutes from "./PrivateRoutes";


export const router = createBrowserRouter([
  {
      path: "/",
      element: <Main></Main>,
      errorElement: <RouteNotFound></RouteNotFound>,
      children: [
          {
              path: "/",
              element: <PrivateRoutes><Products></Products></PrivateRoutes>,  
          },
          {
              path: "/login",
              element: <Login></Login>,
          },
          {
              path: "/signup",
              element: <Register></Register>,
          },
          {
              path: "/products",
              element: <PrivateRoutes><Products></Products></PrivateRoutes>,
          },
      ]
  },
]);
