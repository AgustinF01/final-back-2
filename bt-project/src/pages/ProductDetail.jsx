import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    Container,
    Grid,
    Typography,
    Button,
    Card,
    CardMedia,
    CardContent,
    Box,
    Chip,
    Divider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Alert
} from '@mui/material';
import { useCart } from '../context/CartContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Footer from '../components/Footer';
import axios from 'axios';

const ProductDetail = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedTalle, setSelectedTalle] = useState('');
    const [error, setError] = useState('');
    const { addToCart } = useCart();

    // Función para calcular stock total
    const calcularStock = () => {
        return producto.cantidades.reduce((a, b) => a + b, 0);
    };

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await axios.get(`http://localhost:5000/api/products/${id}`);
            try {
                const response = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProducto(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error al cargar producto:', error);
                setError('Error al cargar el producto');
            }
        };
        fetchProduct();
    }, [id]);

    // Manejar añadir al carrito
    const handleAddToCart = () => {
        if (producto.tipo === 'ropa' && !selectedTalle) {
            setError('Selecciona un talle primero');
            return; 
        }

        addToCart(producto, selectedTalle);

        console.log('Añadir al carrito:', {
            ...producto,
            selectedTalle,
            cantidad: 1
        });

        setError('');
        alert('Producto añadido al carrito con éxito');
    };

    if (loading) return <Typography>Cargando...</Typography>;
    if (!producto) return <Typography>Producto no encontrado</Typography>;

    return (
        <Container maxWidth="lg" sx={{ py: 6, background: 'white' }}>
            <Button
                component={Link}
                to="/catalogo"
                startIcon={<ArrowBackIcon />}
                sx={{ mb: 4 }}
            >
                Volver al catálogo
            </Button>

            <Grid container spacing={6}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardMedia
                            component="img"
                            image={producto.imagen}
                            alt={producto.nombre}
                            sx={{ height: '100%', objectFit: 'cover' }}
                        />
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, color: 'black' }}>
                        <Typography variant="h3" component="h1">
                            {producto.nombre}
                        </Typography>

                        <Typography variant="h5" color="primary">
                            ${producto.precio.toFixed(2)}
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            <Chip
                                label={`Tipo: ${producto.tipo.toUpperCase()}`}
                                color="secondary"
                                variant="outlined"
                            />
                            <Chip
                                label={`Categoría: ${producto.categoria?.name || 'Sin categoría'}`}
                                variant="outlined"
                            />
                            <Chip
                                label={`Stock total: ${calcularStock()} unidades`}
                                color={calcularStock() > 0 ? 'success' : 'error'}
                            />
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="body1" paragraph>
                            {producto.descripcion}
                        </Typography>

                        {producto.tipo === 'ropa' && (
                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <InputLabel>Talle</InputLabel>
                                <Select
                                    value={selectedTalle}
                                    onChange={(e) => setSelectedTalle(e.target.value)}
                                    label="Talle"
                                >
                                    <MenuItem value="">
                                        <em>Selecciona un talle</em>
                                    </MenuItem>
                                    {producto.talles.map((talle, index) => (
                                        <MenuItem
                                            key={index}
                                            value={talle}
                                            disabled={producto.cantidades[index] === 0}
                                        >
                                            {talle} - {producto.cantidades[index]} unidades disponibles
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}

                        {error && (
                            <Alert severity="error" sx={{ mt: 2 }}>
                                {error}
                            </Alert>
                        )}

                        <Button
                            variant="contained"
                            size="large"
                            sx={{ mt: 3, alignSelf: 'flex-start' }}
                            onClick={handleAddToCart}
                            disabled={producto.tipo === 'ropa' && !selectedTalle}
                        >
                            Añadir al carrito
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <Footer />
        </Container>
    );
};

export default ProductDetail;