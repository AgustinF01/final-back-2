// Importar dependencias
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Grid,
    TextField,
    Button,
    Paper,
    Divider,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    FormControl,
    FormControlLabel,
    Checkbox,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Comprobante from './Comprobante';
import axios from 'axios';
import { useCart } from '../context/CartContext';

// Definir el componente Checkout
const Checkout = () => {
    // Estado para almacenar la orden
    const [order, setOrder] = useState(null);

    // Estado para almacenar el formulario
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        saveInfo: false,
        cardNumber: '',
        expirationDate: '',
        cvv: '',
    });

    // Estado para almacenar el método de pago
    const [paymentMethod, setPaymentMethod] = useState('credit');

    // Estado para almacenar los items del carrito
    const [cartItems, setCartItems] = useState([]);

    // Estado para almacenar la fecha de la orden
    const [date, setDate] = useState(new Date().toISOString());

    // Obtenemos el carrito y total del contexto
    const { cartItems: cart, cartTotal } = useCart();

    // Calculamos impuesto y total basado en el carrito
    const tax = cartTotal * 0.21;
    const total = cartTotal + tax;

    // Estado para almacenar el mensaje de error
    const [error, setError] = useState(null);

    // Estado para almacenar la respuesta del servidor
    const [response, setResponse] = useState(null);

    // Estado para almacenar la orden completa
    const [completeOrder, setCompleteOrder] = useState(null);

    // Utilizar el hook useNavigate
    const navigate = useNavigate();

    // Función para manejar el cambio en el formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        // Simulación de compra exitosa
        setOrder({
            ...formData,
            items: cart,
            total: cartTotal,
            tax: cartTotal * 0.21,
            date: date,
        });

        // Redireccionar a la página de comprobante
        navigate('/comprobante', {
            state: {
                order: {
                    ...formData,
                    items: cart,
                    total: cartTotal,
                    tax: tax,
                    date: new Date().toISOString(),
                },
            },
        });
    };

    // Función para manejar el cambio en el método de pago
    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    // Función para manejar el cambio en la fecha de la orden
    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    // Función para manejar el cambio en el impuesto de la orden
    const handleTaxChange = (e) => {
        setTax(e.target.value);
    };

    // Función para manejar el cambio en el total de la orden
    const handleTotalChange = (e) => {
        setTotal(e.target.value);
    };

    // Función para manejar el cambio en la orden completa
    const handleCompleteOrderChange = (e) => {
        setCompleteOrder(e.target.value);
    };

    // Renderizar el componente
    return <Container maxWidth="md" sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
            Finalizar Compra
        </Typography>

        <Grid container spacing={3}>
            {/* Resumen del Pedido */}
            <Grid item xs={12} md={5}>
                <Paper sx={{ p: 2, mb: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Resumen del Pedido
                    </Typography>
                    {cart.map((item, index) => (
                        <div key={index}>
                            <Typography variant="body2">
                                {item.product.nombre} x {item.quantity}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                ${item.product.precio * item.quantity}
                            </Typography>
                            <Divider sx={{ my: 1 }} />
                        </div>
                    ))}
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        Total: ${cartTotal}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        Impuesto: ${tax}
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        Total a Pagar: ${total}
                    </Typography>
                </Paper>
            </Grid>

            {/* Formulario de Información del Cliente */}
            <Grid item xs={12} md={7}>
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Información del Cliente
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Nombre"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Apellido"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Dirección"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Ciudad"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Estado"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Código Postal"
                            name="zip"
                            value={formData.zip}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            sx={{ mb: 2 }}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formData.saveInfo}
                                    onChange={(e) =>
                                        setFormData({ ...formData, saveInfo: e.target.checked })
                                    }
                                />
                            }
                            label="Guardar información para futuras compras"
                        />
                        <Divider sx={{ my: 2 }} />

                        {/* Sección de Método de Pago */}
                        <Typography variant="h6" gutterBottom>
                            Método de Pago
                        </Typography>
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel id="payment-method-label">Método de Pago</InputLabel>
                            <Select
                                labelId="payment-method-label"
                                value={paymentMethod}
                                onChange={handlePaymentMethodChange}
                            >
                                <MenuItem value="credit">Tarjeta de Crédito</MenuItem>
                                <MenuItem value="paypal">PayPal</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            label="Número de Tarjeta"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Fecha de Expiración"
                            name="expirationDate"
                            value={formData.expirationDate}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="CVV"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            sx={{ mb: 2 }}
                        />

                        <Button type="submit" variant="contained" color="primary">
                            Finalizar Compra
                        </Button>
                    </form>
                </Paper>
            </Grid>
        </Grid>

        {/* Comprobante de Compra */}
        {response && <Comprobante order={completeOrder} />}
    </Container>;
};

export default Checkout;