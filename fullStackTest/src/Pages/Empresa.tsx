import React from 'react';
import { Box, Divider, Grid, Paper, styled, Typography } from '@mui/material';
import CardEmpresa from '../shared/components/card-empresa/CardEmpresa';
import { Api } from '../shared/services';
import { EmpresaService, IEmpresa, isTotalEmpresa } from '../shared/services/Empresa/EmpresaService';

const Empresa = () => {
  const [empresas, setEmpresas] = React.useState<IEmpresa[]>();

  console.log(empresas)
  React.useEffect(() => {
    async function getEmpresas() {
      const response = await EmpresaService.getAll()
      console.log(response)

      if(isTotalEmpresa(response)){
        console.log('dsada',response.data)
        setEmpresas(response.data)

        setTimeout(() => {
          console.log(empresas)
        }, 3000);
      } else {
        console.log('isNot')

      }
   }
    
   getEmpresas()

  }, [])


  const empresasMock: IEmpresa[] = [
    {
      cep: '05786-080',
      cnpj: '61.527.0001-0000',
      nomeFantasia: 'Yakult',
    },
    {
      cep: '05786-080',
      cnpj: '61.527.0001-00000',
      nomeFantasia: 'Yakult',
    },
    {
      cep: '05786-080',
      cnpj: '61.527.0001-000',
      nomeFantasia: 'Yakult',
    },
  ];
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
            {empresas
              ? empresas.map((item) => {
                  return (
                    <CardEmpresa
                      key={item.cnpj}
                      razaoSocial={item.nomeFantasia}
                      cep={item.cep}
                      cnpj={item.cnpj}
                    />
                  );
                })
              : 'Loading'}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Empresa;
