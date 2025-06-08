import { Navigate } from "react-router-dom";
import pageRoutes from './pages/PagesRoutes.tsx';
import authRoutes from './auth/AuthRoutes.tsx';
import type { RouteObject } from "react-router";
import NotFound from './404.tsx';


const appRoutes: RouteObject[] = [
    ...authRoutes,
    ...pageRoutes,
    {
        path: '/',
        element: <Navigate to="/pages" replace />
    },
    {
        path: '*',
        element: <NotFound />
    }
];

export default appRoutes;