import React, { useState } from 'react';
import axios from 'axios';
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
        background: '#007bff', 
        color: 'white',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    }
};

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const toastId = toast.loading('Slanje reset link-a...'); 

        try {
            await axios.post('/forgot-password', { email });
            toast.success('Password reset link uspešno poslat!', {
                id: toastId, 
            });
        } catch (error) {
            toast.error('Greška u slanju password reset link-a.', {
                id: toastId, 
            });
        }
    };

    return (
        <div style={styles.container}>
            <Toaster position="top-center" reverseOrder={false} />
            <div style={styles.card}>
                <h2 style={styles.header}>Forgot Password</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        style={styles.input}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Unesi email"
                        required
                    />
                    <button type="submit" style={styles.button}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}>
                        Send Password Reset Link
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;