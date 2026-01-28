'use client';

import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// FIX: Added missing import for Divider
import Divider from '@mui/material/Divider'; 
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useTheme } from '@mui/material/styles';
import { useColorMode } from '@/context/ThemeContext';
import { getAllTags } from '@/services/api';

export default function Navbar() {
  const theme = useTheme();
  const colorMode = useColorMode();
  const router = useRouter();
  const pathname = usePathname();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElCategory, setAnchorElCategory] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    const fetchTags = async () => {
      try {
        const data = await getAllTags();
        setTags(data.slice(0, 8));
      } catch (err) {
        console.error("Nav: Failed to fetch tags");
      }
    };
    fetchTags();
  }, [pathname]);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleOpenCategory = (event: React.MouseEvent<HTMLElement>) => setAnchorElCategory(event.currentTarget);
  const handleCloseCategory = () => setAnchorElCategory(null);

  const handleLogout = () => {
    handleCloseNavMenu();
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider', mb: 4 }}>
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: '80px' }}>
        
        {/* === LOGO === */}
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography variant="h4" component="div" sx={{ fontWeight: 900, fontFamily: 'var(--font-serif)', letterSpacing: '-1px' }}>
            Paperless
          </Typography>
        </Link>

        {/* === ACTIONS WRAPPER === */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          
          <IconButton onClick={colorMode.toggleColorMode} color="inherit" sx={{ mr: 1 }}>
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          {/* === DESKTOP MENU === */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
            
            {/* CATEGORY DROPDOWN */}
            {tags.length > 0 && (
              <>
                <Button 
                    onClick={handleOpenCategory}
                    endIcon={<KeyboardArrowDownIcon />}
                    color="inherit"
                    sx={{ textTransform: 'none', fontSize: '1rem', fontFamily: 'var(--font-sans)' }}
                >
                  Category
                </Button>
                <Menu
                  anchorEl={anchorElCategory}
                  open={Boolean(anchorElCategory)}
                  onClose={handleCloseCategory}
                  elevation={3}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                  slotProps={{
                    paper: {
                      sx: { 
                        mt: 1.5, 
                        minWidth: 180, 
                        borderRadius: 2,
                        boxShadow: '0px 4px 20px rgba(0,0,0,0.1)' 
                      }
                    }
                  }}
                >
                  {tags.map((tag) => (
                    <MenuItem 
                      key={tag} 
                      onClick={handleCloseCategory}
                      component={Link}
                      href={`/tag/${tag}`}
                      sx={{ fontFamily: 'var(--font-sans)', py: 1.5 }}
                    >
                      {tag}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}

            <Button 
                component={Link} 
                href="/create"
                color="inherit"
                sx={{ textTransform: 'none', fontSize: '1rem', fontFamily: 'var(--font-sans)' }}
            >
              Write
            </Button>

            {isLoggedIn ? (
              <Button 
                  onClick={handleLogout}
                  variant="outlined"
                  color="inherit"
                  sx={{ 
                      textTransform: 'none', borderRadius: 20, px: 3, fontFamily: 'var(--font-sans)',
                      borderColor: 'text.primary', color: 'text.primary',
                      '&:hover': { borderColor: 'text.secondary', backgroundColor: 'action.hover' }
                  }}
              >
                  Logout
              </Button>
            ) : (
              <Button 
                  component={Link}
                  href="/login"
                  variant="contained"
                  disableElevation
                  sx={{ 
                      textTransform: 'none', borderRadius: 20, px: 3, fontFamily: 'var(--font-sans)',
                      backgroundColor: 'text.primary', color: 'background.default',
                      '&:hover': { opacity: 0.9, backgroundColor: 'text.primary' }
                  }}
              >
                  Get started
              </Button>
            )}
          </Box>

          {/* === MOBILE MENU === */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {tags.slice(0, 4).map((tag) => (
                 <MenuItem key={tag} onClick={handleCloseNavMenu}>
                    <Link href={`/tag/${tag}`} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                        <Typography textAlign="center" fontFamily="var(--font-sans)">{tag}</Typography>
                    </Link>
                 </MenuItem>
              ))}
              <Divider />
              <MenuItem onClick={handleCloseNavMenu}>
                <Link href="/create" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                    <Typography textAlign="center" fontFamily="var(--font-sans)">Write</Typography>
                </Link>
              </MenuItem>
              {isLoggedIn ? (
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center" fontFamily="var(--font-sans)">Logout</Typography>
                  </MenuItem>
              ) : (
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link href="/login" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                        <Typography textAlign="center" fontFamily="var(--font-sans)">Get started</Typography>
                    </Link>
                  </MenuItem>
              )}
            </Menu>
          </Box>

        </Box>
      </Toolbar>
    </AppBar>
  );
}