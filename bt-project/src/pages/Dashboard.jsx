import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Button,
    Box,
    Grid,
    InputLabel,
    Select,
    MenuItem,
    FormControl
} from '@mui/material';

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [products, setProducts] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        categoria: '',
        imagen: '',
        tipo: '', 
        talles: [],
        cantidades: []
    });

    // Obtener productos al cargar el componente
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error al cargar productos:', error);
            }
        };
        fetchProducts();
    }, []);

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

    // Función para manejar talles
    const handleTalleChange = (index, field, value) => {
        const newTalles = [...newProduct.talles];
        const newCantidades = [...newProduct.cantidades];

        if (field === 'talle') {
            newTalles[index] = value;
        } else {
            newCantidades[index] = Number(value);
        }

        setNewProduct({
            ...newProduct,
            talles: newTalles,
            cantidades: newCantidades
        });
    };

    // Manejar creación/actualización de productos
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación mejorada
        const requiredFields = ['nombre', 'descripcion', 'precio', 'categoria', 'imagen', 'tipo'];
        const missingFields = requiredFields.filter(field => !newProduct[field]);

        if (missingFields.length > 0) {
            alert(`Faltan campos requeridos: ${missingFields.join(', ')}`);
            return;
        }

        try {
            const payload = {
                ...newProduct,
                precio: parseFloat(newProduct.precio),
                categoria: newProduct.categoria,
                tipo: newProduct.tipo,
                talles: newProduct.talles,       
                cantidades: newProduct.cantidades.map(Number),
            };
            new URL(newProduct.imagen); 


            if (editingProduct) {
                // Actualizar producto
                const response = await axios.put(
                    `http://localhost:5000/api/products/${editingProduct._id}`,
                    payload,
                    { withCredentials: true }
                );
                setProducts(products.map(p => p._id === editingProduct._id ? response.data.product : p));
            } else {
                // Crear nuevo producto
                const response = await axios.post(
                    "http://localhost:5000/api/admin/create-product",
                    payload,
                    { withCredentials: true }
                );
                setProducts([...products, response.data.product]);
            }

            // Resetear formulario
            setNewProduct({ nombre: '', descripcion: '', precio: '', categoria: '', imagen: '', tipo: '', talles: [], cantidades: [] });
            setEditingProduct(null);

        } catch (error) {
            console.error('Error:', error.response?.data);
            alert(error.response?.data?.message || "Error al guardar el producto");
        }
    };

    // Manejar edición de producto
    const handleEdit = (product) => {
        setEditingProduct(product);
        setNewProduct({
            nombre: product.nombre,
            descripcion: product.descripcion,
            precio: product.precio,
            categoria: product.categoria._id || product.categoria, 
            imagen: product.imagen,
            tipo: product.tipo,
            talles: product.tipo === 'ropa' ? product.talles : [],
            cantidades: product.tipo === 'ropa' ? product.cantidades : []
        });
    };

    // Manejar eliminación de producto
    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de eliminar este producto?")) {
            try {
                await axios.delete(`http://localhost:5000/api/products/${id}`, { withCredentials: true });
                setProducts(products.filter(p => p._id !== id));
            } catch (error) {
                alert("Error al eliminar producto");
            }
        }
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4, mb: 4 }}>
                Panel de Administración
            </Typography>

            {/* Formulario de producto */}
            <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4, p: 3, boxShadow: 3, borderRadius: 2, background: 'white' }}>
                <Typography variant="h6" gutterBottom>
                    {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
                </Typography>

                <Grid container spacing={2}>
                    {/* Sección de información básica */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Nombre"
                            name="nombre"
                            value={newProduct.nombre}
                            onChange={(e) => setNewProduct({ ...newProduct, nombre: e.target.value })}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Precio"
                            name="precio"
                            type="number"
                            inputProps={{ step: "0.01" }}
                            value={newProduct.precio}
                            onChange={(e) => setNewProduct({ ...newProduct, precio: e.target.value })}
                            required
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Descripción"
                            name="descripcion"
                            multiline
                            rows={3}
                            value={newProduct.descripcion}
                            onChange={(e) => setNewProduct({ ...newProduct, descripcion: e.target.value })}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="URL de la imagen"
                            name="imagen"
                            type="url"
                            value={newProduct.imagen}
                            onChange={(e) => setNewProduct({ ...newProduct, imagen: e.target.value })}
                            required
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel>Categoría</InputLabel>
                            <Select
                                name="categoria"
                                value={newProduct.categoria} 
                                onChange={(e) => setNewProduct({ ...newProduct, categoria: e.target.value })}
                                required
                            >
                                {categorias.map((categoria) => (
                                    <MenuItem key={categoria._id} value={categoria._id}>
                                        {categoria.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Sección de tipo y talles */}
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel>Tipo de producto</InputLabel>
                            <Select
                                value={newProduct.tipo}
                                name="tipo"
                                onChange={(e) => setNewProduct({ ...newProduct, tipo: e.target.value })}
                                label="Tipo de producto"
                                required
                            >
                                <MenuItem value="ropa">Ropa</MenuItem>
                                <MenuItem value="accesorio">Accesorio</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {newProduct.tipo === 'ropa' && (
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                                Administración de Talles
                            </Typography>

                            {newProduct.talles.map((talle, index) => (
                                <Box key={`${talle}-${index}`} sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                    <TextField
                                        label="Talle"
                                        value={talle}
                                        onChange={(e) => handleTalleChange(index, 'talle', e.target.value)}
                                        required
                                    />
                                    <TextField
                                        label="Cantidad"
                                        type="number"
                                        value={newProduct.cantidades[index] || 0}
                                        onChange={(e) => handleTalleChange(index, 'cantidad', e.target.value)}
                                        inputProps={{ min: 0 }}
                                        required
                                    />
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => setNewProduct({
                                            ...newProduct,
                                            talles: newProduct.talles.filter((_, i) => i !== index),
                                            cantidades: newProduct.cantidades.filter((_, i) => i !== index)
                                        })}
                                    >
                                        Eliminar
                                    </Button>
                                </Box>
                            ))}

                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setNewProduct({
                                    ...newProduct,
                                    talles: [...newProduct.talles, ''],
                                    cantidades: [...newProduct.cantidades, 0]
                                })}
                                sx={{ mt: 2 }}
                            >
                                Añadir Talle
                            </Button>
                        </Grid>
                    )}
                </Grid>

                {/* Botones de acción */}
                <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color={editingProduct ? "secondary" : "primary"}
                        size="large"
                    >
                        {editingProduct ? 'Actualizar Producto' : 'Crear Producto'}
                    </Button>

                    {editingProduct && (
                        <Button
                            variant="outlined"
                            color="error"
                            size="large"
                            onClick={() => {
                                setEditingProduct(null);
                                setNewProduct({
                                    nombre: '',
                                    descripcion: '',
                                    precio: '',
                                    categoria: '',
                                    imagen: '',
                                    tipo: 'ropa',
                                    talles: [],
                                    cantidades: []
                                });
                            }}
                        >
                            Cancelar
                        </Button>
                    )}
                </Box>
            </Box>

            {/* Tabla de productos */}
            <TableContainer component={Paper} sx={{ background: 'white' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Precio</TableCell>
                            <TableCell>Categoría</TableCell>
                            <TableCell>Tipo</TableCell>
                            <TableCell>Talles</TableCell>
                            <TableCell>Stock Total</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product._id}>
                                <TableCell>{product.nombre}</TableCell>
                                <TableCell>{product.descripcion}</TableCell>
                                <TableCell>${product.precio}</TableCell>
                                <TableCell>{product.categoria?.name}</TableCell>
                                <TableCell>
                                    {product.talles.join(', ')}
                                </TableCell>
                                <TableCell>
                                    {product.cantidades.reduce((a, b) => a + b, 0)}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={() => handleEdit(product)}
                                        sx={{ mr: 1 }}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        size="small"
                                        onClick={() => handleDelete(product._id)}
                                    >
                                        Eliminar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default Dashboard;

