import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import appRoutes from "./AppRoutes.tsx";
import { AuthenticatedProvider } from './shared/Authenticated.tsx';

const router = createBrowserRouter(appRoutes);

const App: React.FC = () => (
    <AuthenticatedProvider>
    <RouterProvider router={router}/>
    </AuthenticatedProvider>
);

export default App;