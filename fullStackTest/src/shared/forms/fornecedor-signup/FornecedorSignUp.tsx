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
import {
  FornecedorService,
  IFornecedor,
} from '../../services/Fornecedor/FornecedorService';
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
  email?: string;
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

  function stringToDate(texto: string | undefined): Date {
    if (texto) {
      const [data, tempo] = texto.split(' ');
      const [dia, mes, ano] = data.split('/').map(Number);
      return new Date(ano, mes - 1, dia);
    } else {
      return new Date(2000);
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === 'cnpj' || event.target.value === 'cpf')
      setTypeFornecedor(event.target.value);
  };

  React.useEffect(() => {
    setInputWidth(mobile ? '100%' : '70%');
  }, []);

  const handleSubmit = async (data: IFornecedor) => {
    const objCadastro: IFornecedor = {
      [typeFornecedor]: data[typeFornecedor],
      nome: data.nome,
      cep: data.cep,
    };
    if (typeFornecedor === 'cnpj') {
      const objCadastro: IFornecedor = {
        [typeFornecedor]: data[typeFornecedor],
        cep: data.cep,
        nome: data.nome,
        tipoFornecedor: 'J',
        email: data.email,
      };
      const response = await FornecedorService.create(objCadastro);
      console.log(response);
      console.log('daads', objCadastro);
    } else {
      const objCadastro: IFornecedor = {
        [typeFornecedor]: data[typeFornecedor],
        nome: data.nome,
        cep: data.cep,
        rg: data.rg,
        tipoFornecedor: 'F',
        dataNascimento: JSON.parse(JSON.stringify(stringToDate(data.dataNascimento))),
        email: data.email,
      };
      console.log(objCadastro);

      const response = await FornecedorService.create(objCadastro);
      console.log(response);
    }
  };

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
    const newDate = new Date(2022, 4, 20);
    // console.log(newDate)
    const value = stringToDate('20/04/2000');
    console.log(JSON.parse(JSON.stringify(value)));
  }, []);
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
          <Box width={inputWidth} mt={2}>
            <UnTextField label="Nome" name="nome" />
          </Box>
          {typeFornecedor === 'cpf' && (
            <>
              <Box width={inputWidth} mt={2}>
                <UnTextField label="Data de Nascimento" name="dataNascimento" />
              </Box>
              <Box width={inputWidth} mt={2}>
                <UnTextField label="RG" name="rg" />
              </Box>
            </>
          )}
          <Box width={inputWidth} mt={2}>
            <UnTextField label="E-mail" name="email" />
          </Box>
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
