import React, { useContext, useState } from 'react';
import { login } from '../../services/login.service.js';
import { useNavigate } from "react-router-dom";
import useLocalStorage from '../../hooks/useLocalStorage.js';
import { jwtDecode } from 'jwt-decode';
import usersController from '../../services/user.service.js';
import Context from '../../contexts/CurrentUserContext.jsx';

const LoginForm = () => {
    const [token, setToken] = useLocalStorage();
    const currentUserContext = useContext(Context)

    const [email, setEmail] = useState('fernandez@hrmange.com');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate()

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (email && password) {
                const response = await login(email, password); 
                console.log('Connexion réussie');
                setToken("token", response);
                setError('');
                setShowError(false);
                console.log('1');
                const decodedToken = jwtDecode(response);
                setToken("id", decodedToken.userId);
                console.log('1');
                const user = await usersController.getUserByEmail(response, email)
                currentUserContext.setUser(user)
                navigate('/dashboard');
            }
        } catch (error) {
            setError(error.response.data.error);
            setShowError(true);
        }
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email"> Email address</label>
                    <input type="text" name="email" id="email" value={email} onChange={handleEmailChange} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <div>
                        <input type={showPassword ? 'text' : 'password'} name="password" id="password" value={password} onChange={handlePasswordChange} />
                        <span id='showPassword' onClick={handleShowPassword}>{showPassword ? '🙉' : '🙈'}</span>
                    </div>
                        {showError && <span id='handleError'>{error}</span>}
                </div>
                <button type="submit" id='submit'>Sign In</button>
            </form>
        </div>
    );
};

export default LoginForm;
