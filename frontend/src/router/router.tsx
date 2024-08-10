import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/main";
import ProtectedLayout from "../layout/protected";
import EmailStatusPage from "../pages/eStatus";
import Homepage from "../pages/home";

import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import Templates from "../pages/templates";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Homepage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },

      {
        path: "profile",
        element: <ProtectedLayout />,
        children: [
          {
            path: "",
            element: <Homepage />,
          },
          {
            path: "template",
            element: <Templates />,
          },
          {
            path: "email-status",
            element: <EmailStatusPage />,
          },
        ],
      },
    ],
  },
]);
