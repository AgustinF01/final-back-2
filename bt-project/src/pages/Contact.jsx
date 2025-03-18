import React, { useState } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    Box,
    InputAdornment
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Footer from '../components/Footer';

const Contact = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        mensaje: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Formulario enviado con éxito');
        setFormData({ nombre: '', email: '', mensaje: '' });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 6 }}>
                Contáctanos
            </Typography>

            <Grid container spacing={6}>
                {/* Información de contacto */}
                <Grid item xs={12} md={5}>
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" gutterBottom sx={{ color: 'primary.main' }}>
                            Información de contacto
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <LocationOnIcon color="primary" sx={{ mr: 2 }} />
                            <Typography>Av. Principal 1234, Ciudad, País</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <PhoneIcon color="primary" sx={{ mr: 2 }} />
                            <Typography>+1 234 567 890</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <EmailIcon color="primary" sx={{ mr: 2 }} />
                            <Typography>contacto@tienda.com</Typography>
                        </Box>
                    </Box>
                </Grid>

                {/* Formulario */}
                <Grid item xs={12} md={7}>
                    <Box component="form" onSubmit={handleSubmit} sx={{
                        p: 4,
                        boxShadow: 3,
                        borderRadius: 2,
                        background: 'white'
                    }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Nombre completo"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Asunto"
                                    name="asunto"
                                    value={formData.asunto}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Mensaje"
                                    name="mensaje"
                                    value={formData.mensaje}
                                    onChange={handleChange}
                                    multiline
                                    rows={4}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    sx={{ mt: 2 }}
                                >
                                    Enviar mensaje
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
            <Footer />
        </Container>
    );
};

export default Contact;