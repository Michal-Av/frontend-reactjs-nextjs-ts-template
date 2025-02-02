import React from 'react';
import { Typography, Box } from '@mui/material';
import Image from 'next/image';
import Logo from '@/assets/images/logo/3.png';

const FormHeader = ({ mode }: { mode: string }) => {
  return (
    <Box textAlign="center">
      <Image src={Logo} alt="Logo" width={100} height={100} />
      <Typography variant="h5">{mode}</Typography>
    </Box>
  );
};

export default FormHeader;
