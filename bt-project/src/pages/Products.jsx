import React, { useState, useEffect } from 'react';
import {
    Grid, Container, Typography, Card, CardMedia, CardContent, CardActions, Button, Box,
    FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import axios from 'axios';

const talles = [
    { id: 1, nombre: 'XS' },
    { id: 2, nombre: 'S' },
    { id: 3, nombre: 'M' },
    { id: 4, nombre: 'L' },
    { id: 5, nombre: 'XL' },
];

const Products = () => {
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [tallaSeleccionada, setTallaSeleccionada] = useState('');
    const [productos, setProductos] = useState([]);
    const calcularStock = (producto) => {
        return producto.cantidades.reduce((total, cantidad) => total + cantidad, 0);
    };

    // Obtener productos
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                setProductos(response.data);
            } catch (error) {
                console.error('Error al cargar productos:', error);
            }
        };
        fetchProducts();
    }, []);

    // Obtener categorías
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/categories');
                setCategorias(response.data);
            } catch (error) {
                console.error('Error al cargar categorías:', error);
            }
        };
        fetchCategories();
    }, []);

    // Manejar cambios en los filtros
    const handleCategoriaChange = (e) => {
        setCategoriaSeleccionada(e.target.value); 
    };

    // Filtrar productos
    const productosFiltrados = productos.filter((producto) => {
        const cumpleCategoria = !categoriaSeleccionada ||
            (producto.categoria && producto.categoria._id === categoriaSeleccionada);

        return cumpleCategoria;
    });

    const handleTallaChange = (e) => {
        setTallaSeleccionada(Number(e.target.value) || '');
    };

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Typography variant="h4" component="h2" sx={{ mb: 4, textAlign: 'center' }}>
                Productos
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                <FormControl sx={{ minWidth: 200, background: 'white' }}>
                    <InputLabel >Categoría</InputLabel>
                    <Select
                        value={categoriaSeleccionada}
                        onChange={handleCategoriaChange}
                        label="Categoría"
                    >
                        <MenuItem value="">Todas</MenuItem>
                        {categorias.map((categoria) => (
                            <MenuItem
                                key={categoria._id}
                                value={categoria._id} 
                            >
                                {categoria.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 200, background: 'white' }}>
                    <InputLabel>Talle</InputLabel>
                    <Select value={tallaSeleccionada} onChange={handleTallaChange} label="Talle">
                        <MenuItem value="">Todos</MenuItem>
                        {talles.map((talla) => (
                            <MenuItem key={talla.id} value={talla.id}>{talla.nombre}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Grid container spacing={4}>
                {productosFiltrados.map((producto) => (
                    <Grid item xs={12} sm={6} md={4} key={producto._id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={producto.imagen}
                                alt={producto.nombre}
                            />
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {producto.nombre}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {producto.descripcion}
                                </Typography>
                                <Typography variant="h6" color="text.primary">
                                    ${producto.precio}
                                </Typography>

                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                    Stock disponible: {calcularStock(producto)} unidades
                                </Typography>

                                <Typography variant="body2" color="text.secondary">
                                    Categoría: {producto.categoria?.name || 'Sin categoría'}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="small"
                                    component={Link}
                                    to={`/detalle-producto/${producto._id}`}
                                >
                                    Ver Detalles
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Footer />
        </Container>
    );
};

export default Products;