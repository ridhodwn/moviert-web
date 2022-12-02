import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

export default function PageLayout() {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
}