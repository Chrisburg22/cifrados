import React, { useState } from 'react';
import {
    Container,
    Typography,
    Card,
    CardContent,
    CardActions,
    Button,
    Chip,
    Box,
    TextField,
    InputAdornment,
    Grid
} from '@mui/material';
import {
    Search,
    OpenInNew,
    Article,
    Science,
    Gavel
} from '@mui/icons-material';
import { educationalContent } from '../../data/educationalContent';

const ResourcesPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('all');

    const types = ['all', 'Legal/Política', 'Datos Científicos', 'Investigación Global'];

    const filteredResources = educationalContent.resources.filter(resource => {
        const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            resource.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = selectedType === 'all' || resource.type === selectedType;
        return matchesSearch && matchesType;
    });

    const getIcon = (type) => {
        switch (type) {
            case 'Legal/Política': return <Gavel />;
            case 'Datos Científicos': return <Science />;
            case 'Investigación Global': return <Article />;
            default: return <Article />;
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Box sx={{ mb: 6, textAlign: 'center' }}>
                <Typography variant="h2" component="h1" gutterBottom fontWeight="bold" color="primary">
                    Recursos Educativos
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                    Documentos oficiales y fuentes científicas sobre cambio climático
                </Typography>

                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Buscar recursos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ mb: 3, maxWidth: 600, mx: 'auto' }}
                />

                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
                    {types.map(type => (
                        <Chip
                            key={type}
                            label={type === 'all' ? 'Todos' : type}
                            onClick={() => setSelectedType(type)}
                            color={selectedType === type ? 'primary' : 'default'}
                            variant={selectedType === type ? 'filled' : 'outlined'}
                        />
                    ))}
                </Box>
            </Box>

            <Grid container spacing={3}>
                {filteredResources.map(resource => (
                    <Grid item xs={12} md={6} lg={4} key={resource.id}>
                        <Card
                            elevation={3}
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: 6
                                }
                            }}
                        >
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Box sx={{ mr: 1, color: 'primary.main' }}>
                                        {getIcon(resource.type)}
                                    </Box>
                                    <Chip label={resource.type} size="small" color="primary" variant="outlined" />
                                </Box>
                                <Typography variant="h6" component="h2" gutterBottom fontWeight="bold">
                                    {resource.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {resource.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="small"
                                    variant="contained"
                                    endIcon={<OpenInNew />}
                                    href={resource.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    fullWidth
                                >
                                    Visitar Recurso
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {filteredResources.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h6" color="text.secondary">
                        No se encontraron recursos con los criterios seleccionados
                    </Typography>
                </Box>
            )}
        </Container>
    );
};

export default ResourcesPage;
