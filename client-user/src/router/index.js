import { createBrowserRouter } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import HomePage from '../views/HomePage';
import MovieDetail from '../views/MovieDetail';

const router = createBrowserRouter([
    {
        element: <PageLayout />,
        children: [
            {
                path: '/',
                element: <HomePage />
            },
            {
                path: '/movies/:id',
                element: <MovieDetail />
            }
        ]
    }
]);

export default router;