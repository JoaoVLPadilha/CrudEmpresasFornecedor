import { Box, Divider, Paper, styled, Typography } from '@mui/material';
import React from 'react'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  // textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 250,
  // lineHeight: '60px',
}));

interface ICardFornecedor{
  nome: string;
  cnpj?: string;
  cpf?: string
  rg?: string;
  dataNascimento?: string; 
  cep: string;
}
const CardFornecedor: React.FC<ICardFornecedor> = ({nome, cnpj, cep, cpf, dataNascimento, rg}) => {
  console.log(cpf)
  if(cnpj)
  return (
    <Item elevation={16}>
    <Box padding={1}>
      <Typography>{nome}</Typography>
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
  else return (
    <Item elevation={16}>
    <Box padding={1}>
      <Typography>{nome}</Typography>
    </Box>
    <Divider/>
    <Box padding={1}>
    <Typography>CPF: {cpf}</Typography>
    </Box>
    <Box padding={1}>
    <Typography>CEP: {cep}</Typography>
    </Box>
    <Box padding={1}>
    <Typography>RG: {rg}</Typography>
    </Box>
    <Box padding={1}>
    <Typography>Data de Nascimento: {dataNascimento}</Typography>
    </Box>
    {/* <Box padding={1}>
    <Typography>Descrição: Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, itaque?</Typography>
    </Box> */}
  </Item>
  )
}

export default CardFornecedor