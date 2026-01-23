import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemText, ListItemIcon, Switch, FormControlLabel } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import InfoIcon from '@mui/icons-material/Info';
import Home from '../pages/Home';
import About from '../pages/About';
import Heroes from '../pages/Heroes';

const drawerWidth = 240;

const Layout = ({ toggleTheme, mode }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Box sx={{ overflow: 'auto', mt: 2 }}>
          <List>
            <ListItem button component={Link} to="/">
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={Link} to="/heroes">
              <ListItemIcon><PeopleIcon /></ListItemIcon>
              <ListItemText primary="Heroes" />
            </ListItem>
            <ListItem button component={Link} to="/about">
              <ListItemIcon><InfoIcon /></ListItemIcon>
              <ListItemText primary="About" />
            </ListItem>
          </List>
          
          <Box sx={{ p: 2 }}>
             <FormControlLabel
                control={<Switch checked={mode === 'dark'} onChange={toggleTheme} />}
                label={mode === 'dark' ? "Dark Mode" : "Light Mode"}
              />
          </Box>
        </Box>
      </Drawer>

     
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
         
          <Route path="/heroes/*" element={<Heroes />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default Layout;