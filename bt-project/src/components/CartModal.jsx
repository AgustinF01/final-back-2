import React, { useState, useEffect } from 'react';
import {
    Modal,
    Box,
    Typography,
    Button,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const CartModal = () => {
    const navigate = useNavigate();
    const {
        cartItems,
        isInitialized,
        isCartOpen,
        setIsCartOpen,
        removeFromCart,
        cartTotal
    } = useCart();

    if (!isInitialized) return <div>Cargando carrito...</div>;

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '90%', sm: 600 },
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 3,
        maxHeight: '80vh',
        overflowY: 'auto',
        color: 'black'
    };

    return (
        <Modal open={isCartOpen} onClose={() => setIsCartOpen(false)}>
            <Box sx={modalStyle}>
                <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                    🛒 Tu Carrito
                </Typography>

                <Divider sx={{ mb: 2 }} />

                {cartItems?.length === 0 ? (
                    <Typography variant="body1" sx={{ textAlign: 'center', py: 3 }}>
                        Tu carrito está vacío
                    </Typography>
                ) : (
                    <List dense>
                        {cartItems?.map((item, index) => (
                            <ListItem key={`${item.product._id}-${item.size || 'no-size'}`}>
                                <ListItemText
                                    primary={item.product.nombre}
                                    secondary={
                                        <React.Fragment>
                                            {item.size && `Talle: ${item.size} • `}
                                            Cantidad: {item.quantity} •
                                            Precio unitario: ${item.product.precio.toFixed(2)}
                                        </React.Fragment>
                                    }
                                />
                                <ListItemSecondaryAction>
                                    <IconButton
                                        edge="end"
                                        onClick={() => removeFromCart(index)}
                                        color="error"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                )}

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">
                        Total:
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                        ${cartTotal?.toFixed?.(2) || "0.00"}
                    </Typography>
                </Box>

                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    component={Link}
                    to="/checkout"
                    onClick={() => {
                        navigate('/checkout');
                        setIsCartOpen(false);
                    }}
                    sx={{ mt: 2 }}
                >
                    Finalizar Compra
                </Button>
            </Box>
        </Modal>
    );
};

export default CartModal;