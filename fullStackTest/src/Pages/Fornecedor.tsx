import React from 'react';
import { Box, Divider, Grid, Paper, styled, Typography } from '@mui/material';
import CardFornecedor from '../shared/components/card-fornecedor/CardFornecedor';

interface IFornecedor {
  nome: string;
  cnpj?: string;
  cpf?: string
  rg?: string;
  dataNascimento?: string; 
  cep: string;
}

const Fornecedor = () => {
  const [fornecedor, setFornecedor] = React.useState<IFornecedor[]>()
  const FornecedorMock:IFornecedor[] = [
    {
    cep:'05786-080',
    cpf:'61.527.0001-0000',
    rg: '50.712.193-4',
    nome:'Yakult',
    dataNascimento:'20/04/2000'
  },
    {
    cep:'05786-080',
    cnpj:'61.527.0001-00000',
    nome:'Yakult'
  },
    {
    cep:'05786-080',
    cnpj:'61.527.0001-000',
    nome:'Yakult'
  },
]
  React.useEffect(() => {
    setFornecedor(FornecedorMock)
  },[])
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
            {fornecedor ? fornecedor.map((item, index) =>{

              return <CardFornecedor
              key={index}
              nome={item.nome}
              cep={item.cep}
              cnpj={item.cnpj}
              cpf={item.cpf}
              rg={item.rg}
              dataNascimento={item.dataNascimento}
              />
            }): 'Loading'}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Fornecedor;
