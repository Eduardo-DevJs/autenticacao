import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login";
import Cadastro from "./pages/Cadastro/Cadastro";

export const router = createBrowserRouter ([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/cadastro",
    element: <Cadastro />
  }
])