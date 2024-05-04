import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';

const Sidebar = () => {
    const [_, setToken] = useLocalStorage();
    const navigate = useNavigate();

    const handleLogout = (e) => {
        setToken(null);
        navigate('/login');
    }
    return (
        <div className="sidebar">
            <ul>
                <li>Dashboard</li>
                <li>Profil</li>
                <li>Parameters</li>
                <li> <button type='button' onClick={handleLogout}>Logout</button></li>
            </ul>
        </div>
    );
};
export default Sidebar