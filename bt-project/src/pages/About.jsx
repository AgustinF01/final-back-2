import React from 'react';
import {
    Container,
    Typography,
    Grid,
    Box,
    Card,
    CardContent,
    Avatar,
    Button
} from '@mui/material';
import { Group, CheckCircle, Storefront } from '@mui/icons-material';
import Footer from '../components/Footer';

const About = () => {
    const teamMembers = [
        {
            name: 'María González',
            role: 'Fundadora & CEO',
            bio: 'Apasionada por la moda sostenible con más de 15 años de experiencia en el sector textil.',
            avatar: 'https://i.pravatar.cc/150?img=1'
        },
        {
            name: 'Carlos Martínez',
            role: 'Director de Diseño',
            bio: 'Especialista en tendencias globales y desarrollo de colecciones únicas.',
            avatar: 'https://i.pravatar.cc/150?img=2'
        },
        {
            name: 'Laura Fernández',
            role: 'Jefa de Producción',
            bio: 'Garantizando la calidad artesanal en cada prenda que creamos.',
            avatar: 'https://i.pravatar.cc/150?img=3'
        }
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            {/* Sección Hero */}
            <Box textAlign="center" mb={8}>
                <Storefront sx={{ fontSize: 80, color: 'primary.main', mb: 3 }} />
                <Typography variant="h2" component="h1" gutterBottom>
                    Sobre Nosotros
                </Typography>
                <Typography variant="h5" color="textSecondary">
                    Más que una tienda, una filosofía de moda consciente
                </Typography>
            </Box>

            {/* Nuestra Historia */}
            <Grid container spacing={6} sx={{ mb: 8 }}>
                <Grid item xs={12} md={6}>
                    <img
                        src="https://images-ng.pixai.art/images/orig/c732d953-906d-4c04-b712-ba3c69b0b7db"
                        alt="Taller de costura"
                        style={{ width: '100%', borderRadius: 16, height: 400, objectFit: 'cover' }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h3" gutterBottom>
                        Nuestra Historia
                    </Typography>
                    <Typography paragraph>
                        Fundada en 2010 en el corazón de Buenos Aires, comenzamos como un pequeño taller
                        artesanal con la misión de reinventar la moda local. Hoy combinamos técnicas
                        tradicionales con diseño contemporáneo para crear prendas únicas que cuentan historias.
                    </Typography>
                    <Button
                        variant="outlined"
                        size="large"
                        startIcon={<Group />}
                        sx={{ mt: 2 }}
                    >
                        Conoce nuestro equipo
                    </Button>
                </Grid>
            </Grid>

            {/* Nuestro Equipo */}
            <Box sx={{ mb: 8 }}>
                <Typography variant="h3" align="center" gutterBottom sx={{ mb: 6 }}>
                    El equipo detrás de la magia
                </Typography>
                <Grid container spacing={4}>
                    {teamMembers.map((member) => (
                        <Grid item xs={12} sm={6} md={4} key={member.name}>
                            <Card sx={{ height: '100%', p: 2 }}>
                                <Avatar
                                    src={member.avatar}
                                    sx={{
                                        width: 120,
                                        height: 120,
                                        mx: 'auto',
                                        mb: 3
                                    }}
                                />
                                <CardContent>
                                    <Typography variant="h5" align="center" gutterBottom>
                                        {member.name}
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        align="center"
                                        color="primary"
                                        gutterBottom
                                    >
                                        {member.role}
                                    </Typography>
                                    <Typography variant="body1" align="center">
                                        {member.bio}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Valores */}
            <Box sx={{
                backgroundColor: 'primary.light',
                p: 6,
                borderRadius: 4,
                mb: 8
            }}>
                <Typography variant="h3" align="center" gutterBottom sx={{ mb: 4 }}>
                    Nuestros Pilares
                </Typography>
                <Grid container spacing={4}>
                    {[
                        {
                            title: 'Calidad Artesanal',
                            text: 'Cada prenda es cuidadosamente elaborada por expertos'
                        },
                        {
                            title: 'Sostenibilidad',
                            text: 'Materiales ecológicos y procesos responsables'
                        },
                        {
                            title: 'Diseño Único',
                            text: 'Colecciones exclusivas con identidad local'
                        }
                    ].map((value) => (
                        <Grid item xs={12} md={4} key={value.title}>
                            <Box textAlign="center">
                                <CheckCircle sx={{
                                    fontSize: 50,
                                    color: 'primary.main',
                                    mb: 2
                                }} />
                                <Typography variant="h5" gutterBottom>
                                    {value.title}
                                </Typography>
                                <Typography variant="body1">
                                    {value.text}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Footer />
        </Container>
    );
};

export default About;