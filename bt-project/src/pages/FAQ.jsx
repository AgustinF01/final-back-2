import React from 'react';
import {
    Container,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    Button
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Footer from '../components/Footer';

const FAQ = () => {
    // Datos de preguntas frecuentes
    const faqData = [
        {
            category: 'Pedidos y Envíos',
            questions: [
                {
                    question: '¿Cuánto tarda en llegar mi pedido?',
                    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'
                },
                {
                    question: '¿Cómo puedo realizar el seguimiento de mi pedido?',
                    answer: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.'
                }
            ]
        },
        {
            category: 'Productos',
            questions: [
                {
                    question: '¿Qué materiales utilizan en sus productos?',
                    answer: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.'
                },
                {
                    question: '¿Ofrecen tallas especiales?',
                    answer: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.'
                }
            ]
        }
    ];

    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            <Box textAlign="center" mb={6}>
                <HelpOutlineIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h3" component="h1" gutterBottom>
                    Preguntas Frecuentes
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    Encuentra respuestas a las consultas más comunes
                </Typography>
            </Box>

            {faqData.map((section, index) => (
                <Box key={index} mb={4}>
                    <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
                        {section.category}
                    </Typography>

                    {section.questions.map((item, qIndex) => (
                        <Accordion key={qIndex} sx={{ mb: 2 }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`panel${qIndex}-content`}
                                id={`panel${qIndex}-header`}
                            >
                                <Typography variant="subtitle1" fontWeight="500">
                                    {item.question}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body1" color="text.secondary">
                                    {item.answer}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>
            ))}

            <Box textAlign="center" mt={6}>
                <Typography variant="h6" gutterBottom>
                    ¿No encontraste lo que buscabas?
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    component="a"
                    href="/contacto"
                    sx={{ mt: 2 }}
                >
                    Contáctanos
                </Button>
            </Box>
            <Footer />
        </Container>
    );
};

export default FAQ;