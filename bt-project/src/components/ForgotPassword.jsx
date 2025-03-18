import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:5000/api/auth/forgot-password', // ← URL completa
                { email },
                { withCredentials: true }
            );
            setMessage(response.data.success ? 'Correo enviado' : 'Error');
        } catch (error) {
            setMessage(
                error.response?.data?.details ||
                'Error de conexión con el servidor'
            );
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Recuperar Contraseña</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    margin="normal"
                    sx={{ background: 'white' }}
                />
                <Button type="submit" variant="contained" color="primary">
                    Enviar Correo
                </Button>
                {message && <Typography color="error">{message}</Typography>}
            </form>
        </Container>
    );
};

export default ForgotPassword;