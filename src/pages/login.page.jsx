import React from 'react';
import LoginForm from '../composants/login/login';
import useLocalStorage from '../hooks/useLocalStorage';
import { Navigate } from 'react-router-dom';
const Login = () => {
    const [getToken, _] = useLocalStorage()

    if (getToken("token")) {
        return <Navigate to='/holidays' />;
    }
    return (
        <div className='loginParent'>
            <div>
                <div className='signIn'>
                    <p>Welcome!!</p>
                    <h1 className='title'>Please Sign In</h1>
                </div>
                <LoginForm />
            </div>
            <div>
                <img src="/loginImage.jpeg" alt="image" />
            </div>
        </div>
    )
}
export default Login;