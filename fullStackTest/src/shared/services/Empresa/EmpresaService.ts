import axios, { AxiosError } from "axios";
import { Api } from "..";


export interface IEmpresa {
  id?: number
  nomeFantasia:string;
  cnpj: string;
  cep:string;
}


export function isTotalEmpresa(
  responseCreate: unknown,
): responseCreate is ITotalEmpresa {
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

interface ITotalEmpresa {
  data: IEmpresa[]
}

const getAll = async (): Promise<ITotalEmpresa | Error> =>{
  try {
    const {data} = await Api.get('/api/Empresa')
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
      return new Error('Erro ao criar nova empresa');
    }
  }
}


const create = async (empresaData: IEmpresa): Promise<{ data: number; status: number } | AxiosError | Error> => {
  try {
    const { data, status } = await Api.post('/api/Empresa', empresaData);
    if (data) {
      return { data, status };
    }
    return new Error('Erro ao criar nova empresa');
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return err;
    } else {
      return new Error('Erro ao criar nova empresa');
    }
  }
};



export const EmpresaService = {
  create,
  getAll
}