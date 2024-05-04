import { Navigate } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage.js';

const PrivateRoute = ({ element }) => {
    const [getToken, _] = useLocalStorage()

    if (!getToken("token")) {
        return <Navigate to='/login' />;
    }

    return element;
}

export default PrivateRoute;