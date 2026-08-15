import express from 'express'; // express é a base da construção da API
const servidor = express(); // variavel criada com const invés de let pq const nn pode ser alterado pois o servidor não pra que ficar mudando.


servidor.get('/helloworld', (req, resp) => {
    // codigo do end point
    resp.send('Hello world!');

})

servidor.get('/mensagem/boasvindas', (req, resp) => {

    resp.send('Olá, sejam bem-vindos');

})

servidor.get('/v2/mensagem/boasvindas', (req, resp) => {

    resp.send('Que bom que vc está aqui, V2');

})

servidor.get('/mensagem/ocupado', (req, resp) => {

    resp.send ('Estou ocupado no momento.')

})

servidor.get('/mensagem/ocupado/recado', (req, resp) => {

    resp.send ('Estou ocupado no momento, deixe uma mensagem no email xxxx.')

})

servidor.get('/calculadora/:n1/:n2', (req, resp) => {

    let n1 = Number (req.params.n1);
    let n2 = Number(req.params.n2);
    let soma = n1 + n2;

    resp.send('A soma é ' + soma);

});
    
servidor.get('/somar', (req, resp) => {

    let n1 = Number(req.query.n1);
    let n2 = Number(req.query.n2);
    let soma = n1 + n2;

    resp.send ({

        message: soma

    })

})

servidor.listen(
    5001,
     () => console.log('API subiu com sucesso na porta 5001!'))
