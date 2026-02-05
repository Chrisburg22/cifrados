import React, { useState } from 'react';
import {
    Container,
    Typography,
    Box,
    Tabs,
    Tab,
    Paper,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Chip
} from '@mui/material';
import {
    CheckCircle,
    Description
} from '@mui/icons-material';
import { educationalContent } from '../../data/educationalContent';

function TabPanel({ children, value, index, ...other }) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`doc-tabpanel-${index}`}
            aria-labelledby={`doc-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 4 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const DocsPage = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Box sx={{ mb: 6, textAlign: 'center' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <Description sx={{ fontSize: 60, color: 'primary.main' }} />
                </Box>
                <Typography variant="h2" component="h1" gutterBottom fontWeight="bold" color="primary">
                    Documentación Técnica
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    Fundamentos científicos y contexto nacional sobre cambio climático
                </Typography>
            </Box>

            <Paper elevation={3}>
                <Tabs
                    value={selectedTab}
                    onChange={handleChange}
                    variant="fullWidth"
                    indicatorColor="primary"
                    textColor="primary"
                    sx={{
                        borderBottom: 1,
                        borderColor: 'divider'
                    }}
                >
                    {educationalContent.docs.map((doc, index) => (
                        <Tab
                            key={index}
                            label={doc.section}
                            id={`doc-tab-${index}`}
                            aria-controls={`doc-tabpanel-${index}`}
                        />
                    ))}
                </Tabs>

                {educationalContent.docs.map((doc, index) => (
                    <TabPanel key={index} value={selectedTab} index={index}>
                        <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
                            {doc.section}
                        </Typography>

                        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'text.secondary', mb: 4 }}>
                            {doc.content}
                        </Typography>

                        <Box sx={{ mt: 4 }}>
                            <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mb: 2 }}>
                                Puntos Clave
                            </Typography>
                            <List>
                                {doc.key_points.map((point, idx) => (
                                    <ListItem key={idx} sx={{ py: 1 }}>
                                        <ListItemIcon>
                                            <CheckCircle color="success" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={point}
                                            primaryTypographyProps={{
                                                variant: 'body1',
                                                fontWeight: 500
                                            }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>

                        <Box sx={{ mt: 4, p: 3, backgroundColor: 'warning.light', borderRadius: 2, borderLeft: 4, borderColor: 'warning.main' }}>
                            <Typography variant="body2" fontWeight="bold" gutterBottom>
                                💡 Nota Importante
                            </Typography>
                            <Typography variant="body2">
                                Esta información está basada en evidencia científica y documentos oficiales de política pública en México.
                            </Typography>
                        </Box>
                    </TabPanel>
                ))}
            </Paper>
        </Container>
    );
};

export default DocsPage;
