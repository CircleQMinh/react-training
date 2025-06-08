import { Navigate, type RouteObject } from 'react-router';
import AdminPage from './AdminPage.tsx';
import PreviewPage from './Preview.tsx';
import ResultsPage from './Results.tsx';
import PreviewDetailPage from './PreviewDetail.tsx';

const adminRoutes: RouteObject[] = [
    {
        path: 'admin',
        element: <AdminPage/>,
        children: [
            { path: '', element: <Navigate to="list" replace/> },
            { path: 'preview', element: <PreviewPage/> },
            { path: 'results', element: <ResultsPage /> },
            { path: 'preview/:id', element: <PreviewDetailPage/> }
        ]
    }
]


export default adminRoutes;