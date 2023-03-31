import { Box, Divider, Paper, styled, Typography } from '@mui/material';
import React from 'react'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  // textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 250,
  // lineHeight: '60px',
}));

interface ICardEmpresa{
  razaoSocial: string;
  cnpj: string;
  cep: string;
}
const CardEmpresa: React.FC<ICardEmpresa> = ({razaoSocial, cnpj, cep}) => {
  return (
    <Item elevation={16}>
    <Box padding={1}>
      <Typography>{razaoSocial}</Typography>
    </Box>
    <Divider/>
    <Box padding={1}>
    <Typography>CNPJ: {cnpj}</Typography>
    </Box>
    <Box padding={1}>
    <Typography>CEP: {cep}</Typography>
    </Box>
    <Box padding={1}>
    <Typography>Descrição: Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, itaque?</Typography>
    </Box>
  </Item>
  )
}

export default CardEmpresa