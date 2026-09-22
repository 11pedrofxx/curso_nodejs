import 'dotenv/config'
import express from 'express'; // express é a base da construção da API
const api = express(); // variavel criada com const invés de let pq const nn pode ser alterado pois o servidor não pra que ficar mudando.
api.use (express.json()); // faz com que a API consiga usar parametro de corpo
import cors from 'cors'; // cors é um pacote que permite que a API seja acessada de outros dominios
api.use(cors()); // faz com que a API consiga ser acessada de outros dominios

import addRoutes from './routes.js';

addRoutes(api)

const port = process.env.port
api.listen(
    port,
    () => console.log('API subiu com sucesso na porta ' + port))
