import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Login = () => {
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post("/api/auth/login", formData, {
                withCredentials: true
            });

            // Obtener carrito de localStorage
            const localCart = getLocalCart();

            if (localCart.length > 0) {
                // Fusionar con el carrito del backend
                await axios.put(`/api/cart/${response.data.user.id}`, {
                    items: [
                        ...response.data.user.cart,
                        ...localCart.map(item => ({
                            productId: item.product._id,
                            quantity: item.quantity,
                            size: item.size
                        }))
                    ]
                });
                setLocalCart([]); // Limpiar localStorage
            }

            login(response.data.user);
            navigate('/', { replace: true }); // Agrega el replace: true
        } catch (error) {
            let errorMessage = 'Error en el servidor';
            if (error.response) {
                errorMessage = error.response.data.message || errorMessage;
            } else if (error.request) {
                errorMessage = 'No hay conexión con el servidor';
            }
            setError(errorMessage);
        } finally {
            setIsLoading(false);
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
                Iniciar sesión
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    name="email"
                    required
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <TextField
                    fullWidth
                    label="Contraseña"
                    variant="outlined"
                    margin="normal"
                    name="password"
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

                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    type="submit"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Ingresar
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
                            ¿No tienes cuenta?{' '}
                            <Link component={RouterLink} to="/registrarse" underline="hover">
                                Regístrate
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default Login;