import * as MuiMaterial from '@mui/material';

function Copyright() {
  return (
    <MuiMaterial.Typography variant="body2" color="text.secondary" textAlign={'center'}>
      {new Date().getFullYear()}
      {'. '}
      {'Copyright © '}
      <MuiMaterial.Link color="inherit" href="https://github.com/ipanagushin">
        Ivan Panagushin
      </MuiMaterial.Link>
    </MuiMaterial.Typography>
  );
}

export default function Footer() {
  return (
      <MuiMaterial.Box
        sx={{
          display: 'absolute',
          bottom: 0
        }}
      >
        <MuiMaterial.Box
          component="footer"
          sx={{
            py: 2,
            px: 2,
            mt: 'auto',
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <MuiMaterial.Container maxWidth="sm">
            <Copyright />
          </MuiMaterial.Container>
        </MuiMaterial.Box>
      </MuiMaterial.Box>
  );
}