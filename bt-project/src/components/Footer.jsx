import React from 'react';
import { Container, Typography, Box, Grid, Link } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
    return (
        <Box component="footer" sx={{ py: 4, bgcolor: 'primary.main', color: 'white', marginTop: '5%' }}>
            <Container maxWidth="lg">
                <Typography variant="h6" gutterBottom>
                    Tienda de Ropa XYZ
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="body2">
                            Dirección: Av. Principal 1234, Ciudad
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Información de contacto
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <PhoneIcon fontSize="small" sx={{ mr: 1 }} />
                            <Typography variant="body2">+1 234 567 890</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <EmailIcon fontSize="small" sx={{ mr: 1 }} />
                            <Typography variant="body2">
                                Email: contacto@tiendaropaxyz.com
                            </Typography>                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="body2">
                            Horario: Lunes a Viernes 9:00 - 18:00
                        </Typography>
                    </Grid>
                </Grid>
                <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Typography variant="body2">
                        &copy; {new Date().getFullYear()} Tienda en línea. Todos los derechos reservados.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;