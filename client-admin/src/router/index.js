import { createBrowserRouter } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import AddPage from '../views/AddPage';
import MoviesPage from '../views/MoviesPage';
import GenresPage from '../views/GenresPage';
import EditGenrePage from '../views/EditGenrePage';
import LoginPage from '../views/LoginPage';
import RegisterPage from '../views/RegisterPage';
import PrivateRoute from '../components/PrivateRoute';
import EditPage from '../views/EditPage';

const router = createBrowserRouter([
    {
        element: <PageLayout />,
        children: [
            {
                element: <PrivateRoute />,
                children: [
                    {
                        path: 'add',
                        element: <AddPage />
                    },
                    {
                        path: '/',
                        element: <MoviesPage />
                    },
                    {
                        path: 'genres',
                        element: <GenresPage />
                    },
                    {
                        path: 'register',
                        element: <RegisterPage />
                    },
                    {
                        path: 'edit/:id',
                        element: <EditPage />
                    },
                    ,
                    {
                        path: 'genres/update/:id',
                        element: <EditGenrePage />
                    },
                ]
            },
            {
                path: 'login',
                element: <LoginPage />
            }
        ]
    }
]);

export default router;