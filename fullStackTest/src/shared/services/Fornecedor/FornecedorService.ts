import axios, { AxiosError } from "axios";
import { Api } from "..";


export interface IFornecedor {
  id?:number;
  tipoFornecedor?: string;
  nome: string;
  cnpj?: string;
  cpf?: string
  rg?: string;
  email?:string;
  dataNascimento?: string; 
  cep: string;
}


export function isTotalFornecedor(
  responseCreate: unknown,
): responseCreate is ITotalFornecedor {
  if (
    responseCreate &&
    typeof responseCreate === 'object' &&
    'data' in responseCreate
  ) {
    return true;
  } else {
    return false;
  }
}

interface ITotalFornecedor {
  data: IFornecedor[]
}

const getAll = async (): Promise<ITotalFornecedor | Error> =>{
  try {
    const {data} = await Api.get('/api/Fornecedor')
    if(data){
      return {
        data,
      }
    }
    return new Error('Error to list users')
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return err;
    } else {
      return new Error('Erro ao criar nova Fornecedor');
    }
  }
}


const create = async (FornecedorData: IFornecedor): Promise<{ data: number; status: number } | AxiosError | Error> => {
  try {
    const { data, status } = await Api.post('/api/Fornecedor', FornecedorData);
    if (data) {
      return { data, status };
    }
    return new Error('Erro ao criar nova Fornecedor');
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return err;
    } else {
      return new Error('Erro ao criar nova Fornecedor');
    }
  }
};



export const FornecedorService = {
  create,
  getAll
}