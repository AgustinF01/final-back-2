import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';

const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/api/auth/reset-password/${token}`, { password });
            setMessage('Contraseña actualizada correctamente');
        } catch (error) {
            setMessage(error.response?.data?.error || 'Error al actualizar');
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Restablecer Contraseña</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Nueva Contraseña"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                    Actualizar
                </Button>
                {message && <Typography color="error">{message}</Typography>}
            </form>
        </Container>
    );
};

export default ResetPassword;