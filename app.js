import express from 'express'; // express é a base da construção da API
const servidor = express(); // variavel criada com const invés de let pq const nn pode ser alterado pois o servidor não pra que ficar mudando.
servidor.use (express.json())/ // faz com que a API consiga usar parametro de corpo

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

    resp.send('Estou ocupado no momento.')

})



servidor.get('/mensagem/ocupado/recado', (req, resp) => {

    resp.send('Estou ocupado no momento, deixe uma mensagem no email xxxx.')

})



servidor.get('/calculadora/somar/:n1/:n2', (req, resp) => {

    let n1 = Number(req.params.n1);
    let n2 = Number(req.params.n2); // parametro de rota
    let soma = n1 + n2;

    resp.send('A soma é ' + soma);

});

servidor.get('/somar', (req, resp) => {

    let n1 = Number(req.query.n1);
    let n2 = Number(req.query.n2); // parametro de query
    let soma = n1 + n2;

    resp.send({

        message: soma

    })

})

servidor.get ('/ola', (req, resp) => {

    let nome = req.query.nome ?? 'você';
    resp.send (`Olá ${nome}`);

})

servidor.get ('/multiplicar', (req, resp) => {


    let n1 = Number(req.query.n1);
    let n2 = Number(req.query.n2);
    let multi = n1 * n2;
    resp.send (multi);

})

servidor.post ('/media', (req, resp) => {

    let n1 = req.body.n1;
    let n2 = req.body.n2;
    let n3 = req.body.n3;

    let media = (n1 + n2 + n3) / 3;
        resp.send (`A media é ${media}`);
})


servidor.post('/dobros', (req, resp) => {

    let nums = req.body.numeros;
    let numsarray = [];

    for (let i = 0; i < nums.length; i++) {
        numsarray[i] = nums[i] * 2;
    }

    resp.send(`O dobro dos números ${nums} é: ${numsarray}`);

});


servidor.post ('/pedido', (req, resp) => {

    let cupom = req.query.cupom;
    let valor = req.body.valor;
    let parcelas = req.body.valor;

     if (cupom = 'COMPRA100') {

        valor -= 100;

    }   

    if (parcelas > 1) {

       let juros = valor * 0.05

    }

   

    resp.send ('O total do pedido ficou em R$' + valor);
})


servidor.post ('/pedido/completo', (req, resp) => {

    let cupom = req.query.cupom; 
    let parcelas = req.body.parcelas;
    let itens = req.body.itens;

   let total = 0;
   for (let produto of itens) {

    total += produto.preco;

   }

   if (parcelas > 1) {

    let juros = total * 0.05;
    total += juros;     

   }

   if (cupom == 'QUERO100' ) {

    total -= 100;

   }

    resp.send (`O total a pagar é ${total}`)

})


servidor.post ('/compra', (req, resp) => {
    
    let desconto = req.query.desconto;
    let frete = req.body.frete;
    let produtos = req.body.produtos;

    let valor = 0;
    for (let produto of produtos) {

        valor += produto.preco;

    }

    valor += frete;

    let desc = valor * (desconto / 100);
    valor -= desc;

    resp.send(`O valor final é ${valor}`)

})

servidor.listen(
    5001,
    () => console.log('API subiu com sucesso na porta 5001!'))
