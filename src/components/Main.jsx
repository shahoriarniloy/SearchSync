import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';
import '../App.css'

const Main = () => {
    const location = useLocation();
    const noHeaderFooter = location.pathname.includes('login')|| location.pathname.includes('register');
    return (
        <div className='roboto-regular'>
            
            <Navbar></Navbar>
            <Outlet></Outlet>
            {noHeaderFooter||<Footer></Footer>}
        </div>
    );
};

export default Main;