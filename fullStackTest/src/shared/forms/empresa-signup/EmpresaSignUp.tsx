import { Box, Button, TextField, useMediaQuery, useTheme } from '@mui/material';
import { Form } from '@unform/web';
import axios from 'axios';
import React from 'react';
import { EmpresaService, IEmpresa } from '../../services/Empresa/EmpresaService';
import UnTextField from '../form-components/UnTextField';

interface IEndereco{
  data: {
    logradouro: string,
    localidade: string,
    bairro: string,
    cep: string,
    uf: string,
  }
}

interface IDataCadastro {
  nomeFantasia:string,
  cnpj: string,
  cep: string,
}
const EmpresaSignUp = () => {
  const [inputWidth, setInputWidth] = React.useState('100%');
  const [buscaCep, setBuscaCep] = React.useState('');
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const formRef = React.useRef<any>(null);
  React.useEffect(() => {
    setInputWidth(mobile ? '100%' : '70%');
  }, []);



  function handleBuscaCEP(){
    const cep = formRef.current.getFieldValue('cep')
    console.log(cep)
    console.log(buscaCep)
  axios(`https://viacep.com.br/ws/${buscaCep}/json`).then((data: IEndereco) => {
    console.log(data);
    formRef!.current!.setFieldValue(
      'rua',
      data.data.logradouro,
    );
    console.log(data.data.cep)
    formRef!.current!.setFieldValue('cidade', data.data.localidade);
    formRef!.current!.setFieldValue('bairro', data.data.bairro);
    formRef!.current!.setFieldValue('estado', data.data.uf);
    formRef!.current!.setFieldValue('cep', data.data.cep.replace('-',''));
  })}

  const handleSubmit = async (dataSubmit: IDataCadastro) => {
    const objCadastro: IEmpresa = {
      nomeFantasia: dataSubmit.nomeFantasia,
      cnpj: dataSubmit.cnpj,
      cep: dataSubmit.cep
    }
    console.log(objCadastro)

    const response = await EmpresaService.create(objCadastro)

    console.log(response);
    
  }
  return (
    <>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <Box
          mt={1}
          display="flex"
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Box width={inputWidth}>
            <UnTextField label="CNPJ" name="cnpj" />
          </Box>
          <Box width={inputWidth} marginTop={2}>
            <UnTextField label="Nome Fantasia" name="nomeFantasia" />
          </Box>
          <Box width={inputWidth} marginTop={2} display={'flex'}>
            <Box mr={1} width='100%'>
              <TextField fullWidth label="CEP" onChange={(e) => setBuscaCep(e.target.value)} value={buscaCep} />
              <UnTextField invisible={true} name='cep' />
            </Box>
            <Box width={mobile ? '50%': '30%'} display='flex' alignItems={'center'} justifyContent='center'>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{height:'100%'}}
                onClick={handleBuscaCEP}
              >
                Buscar
              </Button>
            </Box>
          </Box>
          <Box mt={2} width={inputWidth}>
            <UnTextField disabled name='rua' label='Rua'/>
          </Box>
          <Box mt={2} width={inputWidth}>
            <UnTextField disabled name='cidade' label='Cidade'/>
          </Box>
          <Box mt={2} width={inputWidth}>
            <UnTextField disabled name='estado' label='Estado'/>
          </Box>
          <Box mt={2} width={inputWidth}>
            <UnTextField disabled name='bairro' label='Bairro'/>
          </Box>
          <Box mt={2} width={inputWidth} display='flex' justifyContent={'center'}>
          <Button
                fullWidth = {mobile ? true: false}
                variant="contained"
                color="primary"
                sx={{height:'100%'}}
                type='submit'
                // onClick={handleBuscaCEP}
              >
                Criar
              </Button>
          </Box>
        </Box>
      </Form>
    </>
  );
};

export default EmpresaSignUp;
