
import App from "../App";
import Login from "../pages/login.page.jsx";

export const routes = [
    {
        path: '/',
        element: <App />,
        children: [ {
                path: 'login',
                element: <Login />
            },
        ]
        
    }
];