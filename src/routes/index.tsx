import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// layouts
import DashboardLayout from "../layouts/dashboard";

// config
import { DEFAULT_PATH } from "../config";
import LoadingScreen from "../components/LoadingScreen";
import AuthLayout from "../layouts/auth";

const Loadable =
  (Component: React.ElementType) => (props: JSX.IntrinsicAttributes) => {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <Component {...props} />
      </Suspense>
    );
  };

export default function Router() {
  return useRoutes([
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "new-password", element: <NewPassword /> },
      ],
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: "app", element: <GeneralApp /> },

        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

const GeneralApp = Loadable(
  lazy(
    () => import("../pages/dashboard/GeneralApp")
  ) as unknown as React.ElementType
);
const Settings = Loadable(
  lazy(
    () => import("../pages/dashboard/Settings")
  ) as unknown as React.ElementType
);
const Login = Loadable(
  lazy(() => import("../pages/auth/Login")) as unknown as React.ElementType
);
const Register = Loadable(
  lazy(() => import("../pages/auth/Register")) as unknown as React.ElementType
);
const ResetPassword = Loadable(
  lazy(
    () => import("../pages/auth/ResetPassword")
  ) as unknown as React.ElementType
);
const NewPassword = Loadable(
  lazy(
    () => import("../pages/auth/NewPassword")
  ) as unknown as React.ElementType
);

const Page404 = Loadable(
  lazy(() => import("../pages/Page404")) as unknown as React.ElementType
);
