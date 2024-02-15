import { Route, Routes, Navigate } from 'react-router-dom';
import CreateFeature from './Feature/CreateFeature';
import Dashboard from './Feature/Dashboard';
import { Link} from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

function Layout() {
    return (
        <Box>
            <Box sx={{ flexGrow: 1, mb: '50px'  }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link style={{color:'white', textDecoration: 'none'}} to="/">
                            Dashboard
                            </Link>
                        </Typography>
                        <Button variant="contained" sx={{background: 'white', }}>
        <Link style={{color: '#000000', textDecoration: 'none'}} to="/create">Create</Link>
      </Button>
                    </Toolbar>
                </AppBar>
            </Box>


            <Routes>
                <Route

                    path="/create"
                    element={<CreateFeature />}
                />
                 <Route

                path="/edit/:id"
                element={<CreateFeature />}
                />
                <Route

                    path="/dashboard"
                    element={<Dashboard />}
                />
                <Route path="/" element={<Navigate to='dashboard' />} />

            </Routes>
        </Box>
    )
}

export default Layout
