import axios from 'axios';
import { ENVIRONMENT } from '../../shared/environment';

// criar uma instância do axios e passar configurações básicas
// Podemos passar url base, headers, auth

const Api = axios.create({
  baseURL: ENVIRONMENT.BASE_URL,
});

export { Api };
