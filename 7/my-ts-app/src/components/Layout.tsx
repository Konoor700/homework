import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { 
  Box, Drawer, List, ListItem, ListItemButton, 
  ListItemIcon, ListItemText, Switch, FormControlLabel,
  PaletteMode 
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import InfoIcon from '@mui/icons-material/Info';

const drawerWidth = 240;


interface LayoutProps {
  toggleTheme: () => void;
  mode: PaletteMode;
}

const Layout: React.FC<LayoutProps> = ({ toggleTheme, mode }) => {
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
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/">
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            
            <ListItem disablePadding>
               <ListItemButton component={Link} to="/heroes">
                <ListItemIcon><PeopleIcon /></ListItemIcon>
                <ListItemText primary="Heroes" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
               <ListItemButton component={Link} to="/about">
                <ListItemIcon><InfoIcon /></ListItemIcon>
                <ListItemText primary="About" />
              </ListItemButton>
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
         
         <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;