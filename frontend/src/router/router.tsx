import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/main";
import Homepage from "../pages/home";

import ProtectedLayout from "../layout/protected";
import BulkUploadPage from "../pages/bulkUpload";
import EMailStatusPage from "../pages/eStatus";
import LoginPage from "../pages/login";
import ProfilePage from "../pages/profile";
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
      // File Upload Page
      {
        path: "profile/template/:templateId",
        element: (
          <ProtectedLayout>
            <BulkUploadPage />
          </ProtectedLayout>
        ),
      },
      // Protected Routes
      {
        path: "profile",
        element: (
          <ProtectedLayout>
            <ProfilePage />
          </ProtectedLayout>
        ),
        children: [
          {
            path: "template",
            element: <Templates />,
          },

          {
            path: "email-status",
            element: <EMailStatusPage />,
          },
        ],
      },
    ],
  },
]);
