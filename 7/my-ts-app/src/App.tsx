import React, { useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { PaletteMode } from '@mui/material'; 

import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Heroes from './pages/Heroes';

const App: React.FC = () => {
  
  const [mode, setMode] = useState<PaletteMode>('light'); 

  
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode, 
        },
      }),
    [mode],
  );


  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Layout toggleTheme={toggleTheme} mode={mode} />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="heroes/*" element={<Heroes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;