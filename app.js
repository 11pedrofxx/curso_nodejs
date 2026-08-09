import express from 'express'; // express é a base da construção da API
const servidor = express(); // variavel criada com const invés de let pq const nn pode ser alterado pois o servidor não pra que ficar mudando.


servidor.get('/helloworld', (req, resp) => {
    // codigo do end point
    resp.send('Hello world!');

})


servidor.listen(
    5001,
     () => console.log('API subiu com sucesso na porta 5001!'))
