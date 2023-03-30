import { Box } from '@mui/material';
import { Form } from '@unform/web';
import React from 'react';
import UnTextField from '../form-components/UnTextField';

const EmpresaSignUp = () => {
  function handleSubmit(data: any) {
    console.log(data);
  }
  return (
    <>
    <Form onSubmit={handleSubmit}>
      <Box>
        <UnTextField label="CNPJ" name="cnpj" />
      </Box>
      <Box>
        <UnTextField label="Razão Social" name="razaoSocial" />
      </Box>
    </Form>
    </>
  );
};

export default EmpresaSignUp;
