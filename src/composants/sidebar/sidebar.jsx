import { NavLink, useNavigate } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import { LuLayoutDashboard } from "react-icons/lu";
import { FaCarSide } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";
const Sidebar = () => {
    const [_, setToken] = useLocalStorage();
    const navigate = useNavigate();

    const handleLogout = () => {
        setToken('token','');
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
                    to="/login">
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