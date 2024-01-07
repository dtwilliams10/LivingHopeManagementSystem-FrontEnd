import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import ErrorPage from "../../features/Errors/Error";
import Home from "../../features/Home/Home";
import PersonalDevelopment from "../../features/Personal Development/PersonalDevelopment";
import SystemReportDashboard from "../../features/System Reports/dashboard/SystemReportDashboard";
import SystemReportForm from "../../features/System Reports/form/SystemReportForm";
import Login from "../../features/Users/Login";
import VerifyEmail from "../../features/Users/VerifyEmail";
import App from "../layout/App";
import SystemStatus from "../../features/System Status/SystemStatus";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "login", element: <Login /> },
      { path: "home", element: <Home /> },
      { path: "systemreports", element: <SystemReportDashboard /> },
      {
        path: "createSystemReport",
        element: <SystemReportForm key="create" />,
      },
      { path: "systemreport/:id", element: <SystemReportForm key="manage" /> },
      { path: "personaldevelopment", element: <PersonalDevelopment /> },
      { path: "accounts/verify-email", element: <VerifyEmail /> },
      { path: "/:id", element: <SystemReportForm key="manage" /> },
      { path: "/status", element: <SystemStatus /> },
      { path: "/not-found", element: <ErrorPage /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
