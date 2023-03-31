import React from 'react';
import {
  Autocomplete,
  Box,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Form } from '@unform/web';
import UnTextField from '../shared/forms/form-components/UnTextField';
import { Api } from '../shared/services';
import { IEmpresa } from '../shared/services/Empresa/EmpresaService';

type ResultEmpresa = IEmpresa & {id: number}

const EmpresaEdit = () => {
  const [currentItem, setCurrentItem] = React.useState<ResultEmpresa | null>(null);
  const [inputWidth, setInputWidth] = React.useState('100%');
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));



  const formRef = React.useRef<any>(null);
  React.useEffect(() => {
    setInputWidth(mobile ? '100%' : '70%');
  }, []);

  console.log(currentItem);

  const empresasMock: ResultEmpresa[] = [
    {
      id: 1,
      cep: '05786-080',
      cnpj: '61.527.0001-0000',
      nomeFantasia: 'Yakulte',
    },
    {
      id: 2,
      cep: '05786-080',
      cnpj: '61.527.0001-00000',
      nomeFantasia: 'Yakulta',
    },
    {
      id: 3,
      cep: '05786-080',
      cnpj: '61.527.0001-000',
      nomeFantasia: 'Yakults',
    },
  ];
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
        onChange={(_: any, newValue: ResultEmpresa | null): void =>
          setCurrentItem(newValue)
        }
        disablePortal
        id="combo-box-demo"
        options={empresasMock}
        getOptionLabel={(option) => option.nomeFantasia}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Empresas" />}
      />
      <Box mt={2} width={inputWidth}>
        <Form onSubmit={(data) => console.log(data)}>
          <Box width={inputWidth}>
            <UnTextField label="CNPJ" name="cnpj" />
          </Box>
          <Box width={inputWidth} marginTop={2}>
            <UnTextField label="Nome Fantasia" name="nomeFantasia" />
          </Box>
        </Form>
      </Box>
    </Box>
  );
};

export default EmpresaEdit;
