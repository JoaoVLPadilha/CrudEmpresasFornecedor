import React from 'react';
import { Box, Divider, Grid, Paper, styled, Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  // textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 250,
  // lineHeight: '60px',
}));
const Empresa = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              p: 2,
              bgcolor: 'background.default',
              display: 'grid',
              gridTemplateColumns: { md: '1fr 1fr' },
              gap: 2,
            }}
          >
            <Item elevation={16}>
              <Box padding={1}>
                <Typography>Razão Social</Typography>
              </Box>
              <Divider/>
              <Box padding={1}>
              <Typography>CNPJ: 61.527.0001-00</Typography>
              </Box>
              <Box padding={1}>
              <Typography>CEP: 05786-080</Typography>
              </Box>
              <Box padding={1}>
              <Typography>Descrição: Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, itaque?</Typography>
              </Box>
            </Item>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Empresa;
