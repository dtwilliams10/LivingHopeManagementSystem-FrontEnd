import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import ErrorPage from "../../features/errors/Error";
import Home from "../../features/home/Home";
import PersonalDevelopment from "../../features/personalDevelopment/PersonalDevelopment";
import SystemReportDashboard from "../../features/systemreports/dashboard/SystemReportDashboard";
import SystemReportForm from "../../features/systemreports/form/SystemReportForm";
import Login from "../../features/users/Login";
import Registration from "../../features/users/Register";
import VerifyEmail from "../../features/users/VerifyEmail";
import App from "../layout/App";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "login", element: <Login /> },
      { path: "home", element: <Home /> },
      { path: "systemreport", element: <SystemReportDashboard /> },
      {
        path: "createSystemReport",
        element: <SystemReportForm key="create" />,
      },
      { path: "systemreport/:id", element: <SystemReportForm key="manage" /> },
      { path: "personaldevelopment", element: <PersonalDevelopment /> },
      { path: "register", element: <Registration /> },
      { path: "accounts/verify-email", element: <VerifyEmail /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
