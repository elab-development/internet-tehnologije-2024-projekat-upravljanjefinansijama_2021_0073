import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        token: searchParams.get('token') || '',
        email: searchParams.get('email') || '',
        password: '',
        password_confirmation: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.password_confirmation) {
            setError('Lozinke se ne poklapaju.');
            return;
        }
        setLoading(true);
        setMessage('');
        setError('');
        try {
            await api.post('/reset-password', formData);
            setMessage('Lozinka je uspešno promenjena! Možete se prijaviti.');
            setTimeout(() => navigate('/login'), 3000); // Preusmeri na login nakon 3 sekunde
        } catch (err) {
            setError('Link za resetovanje nije ispravan ili je istekao.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <Card className="auth-form">
                <h2>Resetovanje Lozinke</h2>
                <form onSubmit={handleSubmit}>
                    {message && <p className="success-message">{message}</p>}
                    {error && <p className="error-message">{error}</p>}
                    <Input
                        label="Nova lozinka"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Potvrdi novu lozinku"
                        name="password_confirmation"
                        type="password"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        required
                    />
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Čuvanje...' : 'Resetuj Lozinku'}
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default ResetPasswordPage;