import React from 'react';
import { Box, Container, Typography, Link, Stack, Divider } from '@mui/material';
import { Business } from '@mui/icons-material';

const Footer = () => {
    return (
        <Box component="footer" sx={{ bgcolor: 'grey.100', py: 6, mt: 'auto', borderTop: '1px solid', borderColor: 'grey.200' }}>
            <Container maxWidth="lg">
                <Stack spacing={3} alignItems="center" textAlign="center">
                    <Divider flexItem sx={{ mb: 2 }} />

                    <Box>
                        <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                            Desarrollado por Christian Alejandro Ramos Pérez
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Estudiante de Ingeniería Informática
                        </Typography>
                    </Box>

                    <Stack direction="row" spacing={3} alignItems="center">
                        <Link
                            href="https://www.exhio.tech/"
                            target="_blank"
                            rel="noopener noreferrer"
                            underline="hover"
                            sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.primary', fontWeight: 'medium' }}
                        >
                            <Business fontSize="small" color="primary" />
                            Exhio
                        </Link>
                    </Stack>

                    <Typography variant="caption" color="text.disabled">
                        © {new Date().getFullYear()} Climate Change App. All rights reserved.
                    </Typography>
                </Stack>
            </Container>
        </Box>
    );
};

export default Footer;
