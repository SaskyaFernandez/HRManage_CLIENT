import { NavLink } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import { LuLayoutDashboard } from "react-icons/lu";
import { FaCarSide } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";
const Sidebar = () => {
    const [_, setToken] = useLocalStorage();

    const handleLogout = () => {
        localStorage.clear();
    }
    return (
        <div className="sidebar">
            <h2>NAME</h2>
            <div>
                <p>Main Menu</p>
                <NavLink
                    exact
                    activeClassName="navbar__link--active"
                    className="navbar__link"
                    to="/dashboard">
                    <LuLayoutDashboard /> Dashboard 
                </NavLink>
                <NavLink
                    activeClassName="navbar__link--active"
                    className="navbar__link"
                    to="/holidays">
                    <FaCarSide /> Holidays
                </NavLink>
                <NavLink
                    activeClassName="navbar__link--active"
                    className="navbar__link"
                    to="/profil">
                    <FaCarSide /> Profil
                </NavLink>
                <NavLink
                    activeClassName="navbar__link--active"
                    className="navbar__link"
                    to="/login"
                >
                    <a type='button' onClick={handleLogout}>
                       <IoMdLogOut /> Logout
                    </a>
                </NavLink>
            </div>
        </div>
    );
};
export default Sidebar