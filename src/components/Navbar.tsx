"use client";

import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CreateIcon from "@mui/icons-material/Create";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4"; // Moon icon
import Brightness7Icon from "@mui/icons-material/Brightness7"; // Sun icon
import { useColorMode } from "@/context/ThemeContext"; // Import the hook

const Navbar = () => {
  // Get the mode and toggle function
  const { mode, toggleColorMode } = useColorMode();

  return (
    // position="sticky" makes the navbar stay at the top when you scroll
    <AppBar position="sticky" color="inherit" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* LOGO SECTION */}
          {/* flexGrow: 1 pushes everything else to the right */}
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <Link
              href="/"
              passHref
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography
                variant="h4"
                noWrap
                component="div"
                sx={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 900,
                  letterSpacing: "-0.05rem",
                  cursor: "pointer",
                }}
              >
                Paperless
              </Typography>
            </Link>
          </Box>

          {/* ACTIONS SECTION */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* The Write Button */}

            {/* 1. NEW: The Theme Toggle Button */}
            <IconButton onClick={toggleColorMode} color="inherit">
              {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

            <Button
              component={Link}
              href="/create"
              variant="text"
              startIcon={<CreateIcon />}
              sx={{
                color: "text.secondary",
                "&:hover": {
                  color: "text.primary",
                  backgroundColor: "transparent",
                },
              }}
            >
              Write
            </Button>

            {/* Notification Icon (Visual only for now) */}
            <IconButton>
              <NotificationsNoneIcon />
            </IconButton>

            {/* User Avatar */}
            <Avatar
              alt="User Name"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 32, height: 32, cursor: "pointer" }}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
