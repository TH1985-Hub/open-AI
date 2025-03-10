import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { styled, useTheme } from '@mui/material/styles';
import { CssBaseline, Box, Toolbar } from '@mui/material';
import TopBar from './components/topBar';
import SideBar from './components/sideBar';
import HomePage from './pages/home';
import FormPage from './pages/form';
import SettingsPage from './pages/settings';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

function App() {
  const [isDrawerOpen, setDrawerOpen] = useState(true);

  return (
    <Router>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <TopBar isDrawerOpen={isDrawerOpen} setDrawerOpen={setDrawerOpen} />
        <SideBar isDrawerOpen={isDrawerOpen} setDrawerOpen={setDrawerOpen} />
        
        <Main open={isDrawerOpen}>
          <Toolbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/form" element={<FormPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Main>
      </Box>
    </Router>
  );
}

export default App;

