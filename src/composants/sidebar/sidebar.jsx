import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { tokenAtom } from '../../atoms/token.atom';

const Sidebar = () => {
    const [token, setToken] = useRecoilState(tokenAtom);
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