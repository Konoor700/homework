import React from 'react';
import { Typography, Box } from '@mui/material';

const Home: React.FC = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h2">Welcome Home</Typography>
    <Typography variant="body1">This is the main page of the Rick and Morty app (TypeScript Edition).</Typography>
  </Box>
);

export default Home;