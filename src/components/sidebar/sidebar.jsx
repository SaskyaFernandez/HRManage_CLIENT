import { NavLink } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaCarSide } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";
import { useContext } from 'react';
import Context from '../../contexts/CurrentUserContext';

const Sidebar = () => {
    const currentUserContext = useContext(Context);

    const handleLogout = () => {
        localStorage.clear();
    }

    return (
        <div className="sidebar">
            <div className="profil">
                {currentUserContext.user.image ? (
                    <img src={currentUserContext.user.image} alt="image profile" />
                ) : (
                    <img src="/loginImage.jpeg" alt="image profile" />
                )}
                {currentUserContext.user && (
                    <div>
                        {currentUserContext.user.firstname && currentUserContext.user.lastname  ? (
                            <p className='firstname'>{currentUserContext.user.firstname} {currentUserContext.user.lastname} </p>
                        ) : (
                            <p>Name</p>
                        )}
                        {currentUserContext.user.role && (
                            <p className='role'>{currentUserContext.user.role.map(role => role.name)}</p>
                        )}
                        <NavLink className="logout" to="/login" onClick={handleLogout}>
                            <IoMdLogOut /> Logout
                        </NavLink>
                    </div>
                )}
            </div>
            <div className='mainMenu'>
                <p>Main Menu</p>
                <NavLink className={({ isActive }) => (isActive ? 'navbar__link active' : 'navbar__link')} to="/dashboard">
                    <LuLayoutDashboard /> Dashboard
                </NavLink>
                <NavLink className={({ isActive }) => (isActive ? 'navbar__link active' : 'navbar__link')} to="/holidays">
                    <FaCarSide /> Holidays
                </NavLink>
                <NavLink className={({ isActive }) => (isActive ? 'navbar__link active' : 'navbar__link')} to="/profil">
                    <CgProfile /> Profil
                </NavLink>
            </div>

        </div>
    );
};

export default Sidebar;
