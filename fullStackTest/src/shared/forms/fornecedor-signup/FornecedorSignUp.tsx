import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Form } from '@unform/web';
import axios from 'axios';
import React from 'react';
import UnTextField from '../form-components/UnTextField';

interface IEndereco {
  data: {
    logradouro: string;
    localidade: string;
    bairro: string;
    cep: string;
    uf: string;
  };
}

interface IDataCadastro {
  razaoSocial?: string;
  cnpj?: string;
  cpf?: string;
  rg?: string;
  dataNascimento?: string;
  cep: string;

}
const FornecedorSignUp = () => {
  const [inputWidth, setInputWidth] = React.useState('100%');
  const [buscaCep, setBuscaCep] = React.useState('');
  const [typeFornecedor, setTypeFornecedor] = React.useState<'cnpj' | 'cpf'>(
    'cnpj',
  );
  const formRef = React.useRef<any>(null);

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === 'cnpj' || event.target.value === 'cpf')
      setTypeFornecedor(event.target.value);
  };

  React.useEffect(() => {
    setInputWidth(mobile ? '100%' : '70%');
  }, []);

  function handleSubmit(data: IDataCadastro) {
    const objCadastro: IDataCadastro = {
      [typeFornecedor]: data[typeFornecedor],
      cep: data.cep,
    };
    if (typeFornecedor === 'cnpj') {
      const objCadastro: IDataCadastro = {
        [typeFornecedor]: data[typeFornecedor],
        cep: data.cep,
        razaoSocial: data.razaoSocial
      };
      console.log(objCadastro)
    } else {
      const objCadastro: IDataCadastro = {
        [typeFornecedor]: data[typeFornecedor],
        cep: data.cep,
        rg: data.rg,
        dataNascimento: data.dataNascimento
      };
      console.log(objCadastro)
    }
  }

  function handleBuscaCEP() {
    const cep = formRef.current.getFieldValue('cep');
    console.log(cep);
    console.log(buscaCep);
    axios(`https://viacep.com.br/ws/${buscaCep}/json`).then(
      (data: IEndereco) => {
        console.log(data);
        formRef!.current!.setFieldValue('rua', data.data.logradouro);
        console.log(data.data.cep);
        formRef!.current!.setFieldValue('cidade', data.data.localidade);
        formRef!.current!.setFieldValue('bairro', data.data.bairro);
        formRef!.current!.setFieldValue('estado', data.data.uf);
        formRef!.current!.setFieldValue('cep', data.data.cep.replace('-', ''));
      },
    );
  }


  React.useEffect(() => {
    const newDate = new Date(2022,4,20)
    
    console.log(JSON.parse(JSON.stringify(newDate)))
  },[])
  return (
    <>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <Box
          display="flex"
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Box width={inputWidth} display={'flex'} justifyContent="center">
            <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={typeFornecedor}
              onChange={(e) => {
                if (e.target.value === 'cnpj' || e.target.value === 'cpf')
                  setTypeFornecedor(e.target.value);
              }}
            >
              <FormControlLabel value="cpf" control={<Radio />} label="CPF" />
              <FormControlLabel
                value={'cnpj'}
                control={<Radio />}
                label="CNPJ"
              />
            </RadioGroup>
          </Box>
          <Box width={inputWidth} mt={1}>
            <UnTextField
              label={typeFornecedor.toUpperCase()}
              name={typeFornecedor}
            />
          </Box>
          {typeFornecedor === 'cpf' ? (
            <>
              <Box width={inputWidth} mt={2}>
                <UnTextField label="Nome" name="nome" />
              </Box>
              <Box width={inputWidth} mt={2}>
                <UnTextField label="Data de Nascimento" name="dataNascimento" />
              </Box>
              <Box width={inputWidth} mt={2}>
                <UnTextField label="RG" name="rg" />
              </Box>
            </>
          ) : (
            <Box width={inputWidth} marginTop={2}>
              <UnTextField label="Razão Social" name="razaoSocial" />
            </Box>
          )}

          <Box width={inputWidth} marginTop={2} display={'flex'}>
            <Box mr={1} width="100%">
              <TextField
                fullWidth
                label="CEP"
                onChange={(e) => setBuscaCep(e.target.value)}
                value={buscaCep}
              />
              <UnTextField invisible={true} name="cep" />
            </Box>
            <Box
              width={mobile ? '50%' : '30%'}
              display="flex"
              alignItems={'center'}
              justifyContent="center"
            >
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ height: '100%' }}
                onClick={handleBuscaCEP}
              >
                Buscar
              </Button>
            </Box>
          </Box>
          <Box mt={2} width={inputWidth}>
            <UnTextField disabled name="rua" label="Rua" />
          </Box>
          <Box mt={2} width={inputWidth}>
            <UnTextField disabled name="cidade" label="Cidade" />
          </Box>
          <Box mt={2} width={inputWidth}>
            <UnTextField disabled name="estado" label="Estado" />
          </Box>
          <Box mt={2} width={inputWidth}>
            <UnTextField disabled name="bairro" label="Bairro" />
          </Box>
          <Box
            mt={2}
            width={inputWidth}
            display="flex"
            justifyContent={'center'}
          >
            <Button
              fullWidth={mobile ? true : false}
              variant="contained"
              color="primary"
              sx={{ height: '100%' }}
              type="submit"
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

export default FornecedorSignUp;
