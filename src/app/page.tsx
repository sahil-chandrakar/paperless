import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Home() {
  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h1" gutterBottom>
        Stay curious.
      </Typography>
      <Typography variant="body1">
        Discover stories, thinking, and expertise from writers on any topic.
      </Typography>
    </Box>
  );
}