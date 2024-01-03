import React from 'react';
import * as MuiMaterial from '@mui/material';

const Loader: React.FC = () => {
  return (
    <MuiMaterial.Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <MuiMaterial.CircularProgress color='inherit'/>
    </MuiMaterial.Box>
  );
};



export default Loader;