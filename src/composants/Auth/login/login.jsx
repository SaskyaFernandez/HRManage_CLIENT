import React, { useState } from 'react';
import { login } from '../../../services/hrmanage.service.js';

const LoginComposant = () => {
    const [email, setEmail] = useState('fernandez@hrmange.com');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [showError, setShowError] = useState(false);

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
                await login(email, password);
                console.log('Connexion réussie');
                setError('');
                setShowError(false);
            }
        } catch (error) {
            console.error(error);
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

export default LoginComposant;
