import React from 'react';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemText,
    Divider,
    Button,
    Grid
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';


const Comprobante = () => {
    const { clearCart } = useCart(); // Función para limpiar el carrito
    const location = useLocation();
    const { order } = location?.state || {};
    // Utilizar el hook useNavigate
    const navigate = useNavigate();

    // Limpiar carrito al montar el componente si hay una orden válida
    useEffect(() => {
        if (order) {
            clearCart();
        }
    }, [order, clearCart]);

    // Limpiar carrito también al salir de la ruta
    useEffect(() => {
        return () => {
            if (order) {
                clearCart();
            }
        };
    }, [order, clearCart]);

    const handleReturnHome = () => {
        navigate('/');
        if (order) {
            clearCart();
        }
    };

    // Función para calcular totales si no vienen en el order
    const calculateTotals = (items) => {
        const subtotal = items.reduce((acc, item) =>
            acc + (item.product.precio * item.quantity), 0);
        const tax = subtotal * 0.21;
        return { subtotal, tax, total: subtotal + tax };
    };

    if (!order) return (
        <Container maxWidth="md" sx={{ my: 4 }}>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Error en la orden
                </Typography>
                <Button component={Link} to="/" variant="contained">
                    Volver al inicio
                </Button>
            </Paper>
        </Container>
    );

    // Usar totales de la orden o calcularlos
    const { subtotal = order.total, tax = order.tax, total = order.total + order.tax } =
        order.items ? calculateTotals(order.items) : order;

    return (
        <Container maxWidth="md" sx={{ my: 4 }}>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    ¡Gracias por tu compra!
                </Typography>

                <List>
                    {order.items.map((item, index) => (
                        <ListItem key={index}>
                            <ListItemText
                                primary={item.product.nombre}
                                secondary={`Cantidad: ${item.quantity} - 
                  Precio unitario: $${item.product.precio.toFixed(2)}`}
                            />
                            <Typography variant="body1">
                                ${(item.product.precio * item.quantity).toFixed(2)}
                            </Typography>
                        </ListItem>
                    ))}
                </List>

                <Divider sx={{ my: 2 }} />

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="body1">
                            <strong>Subtotal:</strong> ${subtotal.toFixed(2)}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Impuestos (21%):</strong> ${tax.toFixed(2)}
                        </Typography>
                        <Typography variant="h6" sx={{ mt: 1 }}>
                            <strong>Total:</strong> ${total.toFixed(2)}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2">
                            Fecha: {new Date(order.date).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2">
                            Método de pago: Tarjeta de Crédito
                        </Typography>
                    </Grid>
                </Grid>

                <Button
                    onClick={handleReturnHome}
                    variant="contained"
                    sx={{ mt: 3 }}
                >
                    Volver al inicio
                </Button>
            </Paper>
        </Container>
    );
};

export default Comprobante;