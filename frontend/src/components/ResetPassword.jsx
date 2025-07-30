import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Pretpostavljam da koristite react-router

const ResetPassword = () => {
    const { token } = useParams(); // Dobijanje tokena iz URL-a
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/reset-password', {
                email,
                token,
                password,
                password_confirmation,
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error resetting password.');
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New Password"
                    required
                />
                <input
                    type="password"
                    value={password_confirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    placeholder="Confirm New Password"
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ResetPassword;