import React, { useState } from 'react';
import {
    Container,
    Typography,
    TextField,
    InputAdornment,
    List,
    ListItem,
    ListItemText,
    Paper,
    Box,
    Divider,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@mui/material';
import {
    Search,
    ExpandMore,
    MenuBook
} from '@mui/icons-material';
import { educationalContent } from '../../data/educationalContent';

const GlossaryPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const filteredGlossary = educationalContent.glossary.filter(item =>
        item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => a.term.localeCompare(b.term));

    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <Box sx={{ mb: 6, textAlign: 'center' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <MenuBook sx={{ fontSize: 60, color: 'primary.main' }} />
                </Box>
                <Typography variant="h2" component="h1" gutterBottom fontWeight="bold" color="primary">
                    Glosario Técnico
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                    Términos clave sobre cambio climático y ciencias ambientales
                </Typography>

                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Buscar término..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}
                />
            </Box>

            <Paper elevation={2} sx={{ p: 3 }}>
                {filteredGlossary.length > 0 ? (
                    filteredGlossary.map((item, index) => (
                        <Accordion
                            key={item.term}
                            expanded={expanded === item.term}
                            onChange={handleChange(item.term)}
                            elevation={0}
                            sx={{
                                '&:before': { display: 'none' },
                                borderBottom: index < filteredGlossary.length - 1 ? 1 : 0,
                                borderColor: 'divider'
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMore />}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: 'action.hover'
                                    }
                                }}
                            >
                                <Typography variant="h6" fontWeight="bold" color="primary">
                                    {item.term}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                                    {item.definition}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))
                ) : (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="h6" color="text.secondary">
                            No se encontraron términos con "{searchTerm}"
                        </Typography>
                    </Box>
                )}
            </Paper>

            <Box sx={{ mt: 4, p: 3, backgroundColor: 'info.light', borderRadius: 2 }}>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                    <strong>Total de términos:</strong> {filteredGlossary.length} de {educationalContent.glossary.length}
                </Typography>
            </Box>
        </Container>
    );
};

export default GlossaryPage;
