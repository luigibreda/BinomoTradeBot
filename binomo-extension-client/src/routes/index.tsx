import {
  createMemoryRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import { MirrorPage } from "../templates/MirrorPage";
import { Login } from "../templates/Login";
import { useAuth } from "../contexts/AuthContext";
import { Automatic } from "../templates/Automatic";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

const AuthRoute = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

const routes = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <MirrorPage />,
      },
    ],
  },
  {
    element: <AuthRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
];

const router = createMemoryRouter(routes, {
  initialEntries: ["/login", "/"],
  initialIndex: 1,
});

export const Router = () => {
  return <RouterProvider router={router} />;
};
