import React from 'react';
import { Grid, Container, Typography, Card, CardMedia, CardContent, CardActions, Button, Box } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Index = () => {
    const carouselImages = [
        { id: 1, url: 'https://picsum.photos/1200/400?random=1' },
        { id: 2, url: 'https://picsum.photos/1200/400?random=2' },
        { id: 3, url: 'https://picsum.photos/1200/400?random=3' }
    ];

    const categories = [
        { id: 1, name: 'Ropa Masculina', image: 'https://picsum.photos/300/200?random=4' },
        { id: 2, name: 'Ropa Femenina', image: 'https://picsum.photos/300/200?random=5' },
        { id: 3, name: 'Accesorios', image: 'https://picsum.photos/300/200?random=6' }
    ];

    return (
        <div>
            {/* Carrusel */}
            <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                interval={5000}
                showStatus={false}
            >
                {carouselImages.map((img) => (
                    <div key={img.id}>
                        <img
                            src={img.url}
                            alt={`Banner ${img.id}`}
                            style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                        />
                    </div>
                ))}
            </Carousel>

            {/* Categorías */}
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Typography variant="h4" component="h2" sx={{ mb: 4, textAlign: 'center' }}>
                    Nuestras Colecciones
                </Typography>
                <Grid container spacing={4}>
                    {categories.map((category) => (
                        <Grid item key={category.id} xs={12} sm={6} md={4}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardMedia
                                    component="img"
                                    image={category.image}
                                    alt={category.name}
                                    height="200"
                                    sx={{ objectFit: 'cover' }}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {category.name}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                                    <Button
                                        component={Link}
                                        to={`/catalogo`}
                                        variant="contained"
                                        size="small"
                                    >
                                        Explorar
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Index;