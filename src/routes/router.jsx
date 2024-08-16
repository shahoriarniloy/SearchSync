import {
  createBrowserRouter,
  Navigate,  // Import Navigate to handle redirection
} from "react-router-dom";
import Login from "../components/Login/Login";
import Register from "../components/Login/Register";
import RouteNotFound from "./RouteNotFound";
import Main from "../components/Main";
import Products from "../components/Products";


export const router = createBrowserRouter([
  {
      path: "/",
      element: <Main></Main>,
      errorElement: <RouteNotFound></RouteNotFound>,
      children: [
          
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
              element: <Products></Products>,
          },
      ]
  },
]);
