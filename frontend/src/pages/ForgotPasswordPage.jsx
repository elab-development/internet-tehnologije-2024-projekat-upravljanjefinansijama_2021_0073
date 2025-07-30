import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api'; 
import Input from '../components/common/Input'; 
import Button from '../components/common/Button'; 
import Card from '../components/common/Card'; 

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');
        try {
            await api.post('/forgot-password', { email });
            setMessage('Poslali smo vam link za resetovanje lozinke na email.');
        } catch (err) {
            setError('Došlo je do greške. Proverite da li je email ispravan.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <Card className="auth-form">
                <h2>Zaboravljena Lozinka</h2>
                <p>Unesite vaš email kako biste resetovali lozinku.</p>
                <form onSubmit={handleSubmit}>
                    {message && <p className="success-message">{message}</p>}
                    {error && <p className="error-message">{error}</p>}
                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Slanje...' : 'Pošalji link'}
                    </Button>
                </form>
                <p style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <Link to="/login">Nazad na prijavu</Link>
                </p>
            </Card>
        </div>
    );
};

export default ForgotPasswordPage;