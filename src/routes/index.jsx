
import App from "../App";
import PrivateRoute from "../containers/routing/private-route.jsx";
import Holidays from "../pages/holidays.page.jsx";
import Login from "../pages/login.page.jsx";

export const routes = [
    {
        path: '/',
        element: <App />,
        children: [ {
            path: 'login',
            element: <Login />
        },
        {
            path: 'holidays',
            element: (
                <PrivateRoute element={<Holidays />} />
            )
        },
        ]
        
    }
];