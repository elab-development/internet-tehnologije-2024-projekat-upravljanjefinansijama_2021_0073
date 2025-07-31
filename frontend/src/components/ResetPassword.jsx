import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(to right, #e0f7fa, #b2ebf2)',
    },
    card: {
        background: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        textAlign: 'center',
        width: '100%',
        maxWidth: '400px',
    },
    header: {
        marginBottom: '30px',
        color: '#00796b',
        fontSize: '28px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    input: {
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #b0bec5',
        fontSize: '16px',
    },
    button: {
        padding: '12px',
        borderRadius: '8px',
        border: 'none',
        background: '#28a745', 
        color: 'white',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    }
};


const ResetPassword = () => {
    const { token } = useParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== password_confirmation) {
            toast.error("Passwords do not match.");
            return;
        }

        const toastId = toast.loading('Resetovanje lozinke...');

        try {
            const response = await axios.post('/reset-password', {
                token,
                email,
                password,
                password_confirmation
            });
            toast.success(response.data.message || 'Lozinka uspesno resetovana!', { id: toastId });
            setTimeout(() => {
                navigate('/authentification'); 
            }, 2000);
        } catch (error) {
            toast.error(error.response?.data?.message || "Greska u resetovanju lozinke.", { id: toastId });
        }
    };

    return (
        <div style={styles.container}>
            <Toaster position="top-center" reverseOrder={false} />
            <div style={styles.card}>
                <h2 style={styles.header}>Reset Password</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        style={styles.input}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Unesi email"
                        required
                    />
                    <input
                        style={styles.input}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nova lozinka"
                        required
                    />
                    <input
                        style={styles.input}
                        type="password"
                        value={password_confirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        placeholder="Potvrdi novu lozinku"
                        required
                    />
                    <button type="submit" style={styles.button}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#218838'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#28a745'}>
                        Resetuj Lozinku
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;