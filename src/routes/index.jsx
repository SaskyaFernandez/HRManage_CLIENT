
import App from "../App";
import PrivateRoute from "../containers/routing/private-route.jsx";
import Dashboard from "../pages/dashboard.page.jsx";
import Holidays from "../pages/holidays.page.jsx";
import Login from "../pages/login.page.jsx";
import Profil from "../pages/profil.page.jsx";

export const routes = [
    {
        path: '/',
        element: <App />,
        children: [{
            path: 'login',
            element: <Login />
        },
        {
            path: 'holidays',
            element: (
                <PrivateRoute element={<Holidays />} />
            )
        },
        {
            path: 'dashboard',
            element: (
                <PrivateRoute element={<Dashboard />} />
            )
        },
        {
            path: 'profil',
            element: (
                <PrivateRoute element={<Profil />} />
            )
        },
        ]

    }
];