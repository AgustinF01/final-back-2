// src/components/Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Badge } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import CartModal from './CartModal';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cartItems, setIsCartOpen } = useCart();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Tienda en línea
                </Typography>
                <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
                    {/* Enlaces comunes */}
                    <Button component={Link} to="/" sx={{ color: 'white' }}>Inicio</Button>
                    <Button component={Link} to="/catalogo" sx={{ color: 'white' }}>Catálogo</Button>

                    {/* Enlaces condicionales */}
                    {user ? (
                        <>
                            <Typography variant="body1" sx={{ color: 'white' }}>
                                ¡Hola, {user.nombre}!
                            </Typography>
                            <Button onClick={logout} sx={{ color: 'white' }}>Cerrar sesión</Button>
                        </>
                    ) : (
                        <>
                            <Button component={Link} to="/iniciar-sesion" sx={{ color: 'white' }}>Iniciar sesión</Button>
                            <Button component={Link} to="/registrarse" sx={{ color: 'white' }}>Registrarse</Button>
                        </>
                    )}
                    {user?.isAdmin && (
                        <Button component={Link} to="/dashboard" sx={{ color: 'white' }}>
                            Dashboard
                        </Button>
                    )}
                </Box>
                <IconButton
                    color="inherit"
                    onClick={() => setIsCartOpen(true)} // 👈 Ahora funciona
                >
                    <Badge badgeContent={cartItems.length} color="error">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
            </Toolbar>
            <CartModal />
        </AppBar>
    );
};

export default Navbar;