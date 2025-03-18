import React, { useState, useEffect, useNavigate } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Link,
    Divider,
    InputAdornment,
    IconButton
} from '@mui/material';
import { Google as GoogleIcon, Visibility, VisibilityOff } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordErrors, setPasswordErrors] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        specialChar: false
    });
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [availability, setAvailability] = useState({
        emailAvailable: true,
        nombreAvailable: true
    });

    // Función para validar la contraseña en tiempo real
    const validatePassword = (password) => {
        const newErrors = {
            length: password.length >= 6,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };
        setPasswordErrors(newErrors);
        return Object.values(newErrors).every(v => v);
    };

    // Verificar disponibilidad en tiempo real
    useEffect(() => {
        const checkEmailAvailability = async () => {
            if (formData.email) {
                try {
                    const response = await axios.get('http://localhost:5000/api/auth/check-availability', {
                        params: { email: formData.email }
                    });
                    setAvailability(prev => ({ ...prev, emailAvailable: !response.data.exists }));
                } catch (error) {
                    console.error('Error verificando email:', error);
                }
            }
        };

        const timer = setTimeout(checkEmailAvailability, 500);
        return () => clearTimeout(timer);
    }, [formData.email]);

    useEffect(() => {
        const checkNombreAvailability = async () => {
            if (formData.nombre) {
                try {
                    const response = await axios.get('http://localhost:5000/api/auth/check-availability', {
                        params: { nombre: formData.nombre }
                    });
                    setAvailability(prev => ({ ...prev, nombreAvailable: !response.data.exists }));
                } catch (error) {
                    console.error('Error verificando nombre:', error);
                }
            }
        };

        const timer = setTimeout(checkNombreAvailability, 500);
        return () => clearTimeout(timer);
    }, [formData.nombre]);

    // Efecto para validar al cambiar la contraseña
    useEffect(() => {
        if (formData.password) validatePassword(formData.password);
    }, [formData.password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        } else if (formData.password.length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:5000/api/auth/registro',
                {
                    nombre: formData.nombre,
                    email: formData.email,
                    password: formData.password
                },
                { withCredentials: true }
            );

            if (response.data.success) {
                alert('Registro exitoso');
                navigate('/');
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error en el registro:', error);
            alert('Error en el registro');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Box sx={{
            maxWidth: '400px',
            mx: 'auto',
            mt: 8,
            p: 4,
            boxShadow: 3,
            borderRadius: 2,
            background: 'white',
        }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 4, color: 'black' }}>
                Crear cuenta
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Nombre completo"
                    name="nombre"
                    variant="outlined"
                    margin="normal"
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                    error={!availability.nombreAvailable}
                    helperText={!availability.nombreAvailable && 'Este nombre ya está registrado'}
                />

                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    variant="outlined"
                    margin="normal"
                    required
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!availability.emailAvailable}
                    helperText={!availability.emailAvailable && 'Este email ya está registrado'}
                />

                <TextField
                    fullWidth
                    label="Contraseña"
                    name="password"
                    variant="outlined"
                    margin="normal"
                    required
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />

                <TextField
                    fullWidth
                    label="Confirmar contraseña"
                    name="confirmPassword"
                    variant="outlined"
                    margin="normal"
                    required
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    edge="end"
                                >
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />

                <Box sx={{ mt: 1, mb: 2 }}>
                    <Typography variant="body2" color="textSecondary">
                        La contraseña debe contener:
                    </Typography>
                    <ul style={{ listStyle: 'none', paddingLeft: '16px' }}>
                        <li style={{ color: passwordErrors.length ? 'green' : 'red' }}>
                            {passwordErrors.length ? '✓' : '✗'} Al menos 6 caracteres
                        </li>
                        <li style={{ color: passwordErrors.uppercase ? 'green' : 'red' }}>
                            {passwordErrors.uppercase ? '✓' : '✗'} Al menos una mayúscula
                        </li>
                        <li style={{ color: passwordErrors.lowercase ? 'green' : 'red' }}>
                            {passwordErrors.lowercase ? '✓' : '✗'} Al menos una minúscula
                        </li>
                        <li style={{ color: passwordErrors.specialChar ? 'green' : 'red' }}>
                            {passwordErrors.specialChar ? '✓' : '✗'} Al menos un carácter especial
                        </li>
                    </ul>
                </Box>

                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    type="submit"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={
                        !availability.emailAvailable ||
                        !availability.nombreAvailable ||
                        !Object.values(passwordErrors).every(v => v)
                    }
                >
                    Registrarse
                </Button>

                <Divider sx={{ my: 3, color: 'black' }}>o</Divider>

                <Button
                    fullWidth
                    variant="outlined"
                    size="large"
                    startIcon={<GoogleIcon />}
                    sx={{ mb: 2 }}
                >
                    Continuar con Google
                </Button>

                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Typography variant="body2" sx={{ mt: 2, color: 'black' }}>
                            ¿Ya tienes cuenta?{' '}
                            <Link component={RouterLink} to="/iniciar-sesion" underline="hover">
                                Inicia sesión
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default Register;