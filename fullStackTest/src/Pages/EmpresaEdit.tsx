import React from 'react';
import {
  Autocomplete,
  Box,
  Button,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Form } from '@unform/web';
import UnTextField from '../shared/forms/form-components/UnTextField';
import { Api } from '../shared/services';
import {
  EmpresaService,
  IEmpresa,
  isTotalEmpresa,
} from '../shared/services/Empresa/EmpresaService';

type ResultEmpresa = IEmpresa & { id: number };

const EmpresaEdit = () => {
  const [currentItem, setCurrentItem] = React.useState<IEmpresa | null>(null);
  const [inputWidth, setInputWidth] = React.useState('100%');

  const [cnpj, setCnpj] = React.useState('');
  const [nomeFantasia, setNomeFantasia] = React.useState('');
  const [cep, setCep] = React.useState('');

  const [statusText, setStatusText] = React.useState(true);

  const [empresas, setEmpresas] = React.useState<IEmpresa[]>();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const formRef = React.useRef<any>(null);
  React.useEffect(() => {
    async function getEmpresas() {
      const response = await EmpresaService.getAll();
      console.log(response);

      if (isTotalEmpresa(response)) {
        console.log('dsada', response.data);
        setEmpresas(response.data);

        setTimeout(() => {
          console.log(empresas);
        }, 3000);
      } else {
        console.log('isNot');
      }
    }
    getEmpresas();
  }, []);

  function handleChangeAutocomplete(_: any, newValue: IEmpresa | null) {
    console.log(newValue);
    if (newValue) {
      setCnpj(newValue.cnpj);
      setNomeFantasia(newValue.nomeFantasia);
      setCep(newValue.cep);
      setStatusText(false);
    }
  }

  function handleChangeCnpj(e: any) {
    setCnpj(e.target.value);
    console.log(cnpj);
  }
  function handleChangeNomeFantasia(e: any) {
    setNomeFantasia(e.target.value);
    console.log(nomeFantasia);
  }
  function handleChangeCep(e: any) {
    setCep(e.target.value);
    console.log(cep);
  }
  return (
    <Box
      mt={1}
      display="flex"
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Autocomplete
        value={currentItem}
        onChange={handleChangeAutocomplete}
        disablePortal
        id="combo-box-demo"
        options={empresas ? empresas : []}
        getOptionLabel={(option) => option.nomeFantasia}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Empresas" />}
      />
      <Box mt={3} width={inputWidth}>
        <Box width={inputWidth}>
          <TextField
            disabled={statusText}
            fullWidth
            value={cnpj}
            onChange={handleChangeCnpj}
            label="CNPJ"
            name="cnpj"
          />
        </Box>
        <Box width={inputWidth} marginTop={2}>
          <TextField
            disabled={statusText}
            fullWidth
            value={nomeFantasia}
            onChange={handleChangeNomeFantasia}
            label="Nome Fantasia"
            name="nomeFantasia"
          />
        </Box>
        <Box width={inputWidth} marginTop={2}>
          <TextField
            disabled={statusText}
            fullWidth
            value={cep}
            onChange={handleChangeCep}
            label="CEP"
            name="cep"
          />
        </Box>
        <Box mt={2} display={'flex'} justifyContent={'center'}>
          <Button variant='contained'>Editar</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EmpresaEdit;
