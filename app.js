import express from 'express'; // express é a base da construção da API
const servidor = express(); // variavel criada com const invés de let pq const nn pode ser alterado pois o servidor não pra que ficar mudando.
servidor.use (express.json())/ // faz com que a API consiga usar parametro de corpo

servidor.get('/helloworld', (req, resp) => {
    

    resp.send({

        message: 'Hello World'

    });

})



servidor.get('/mensagem/boasvindas', (req, resp) => {

    let obj = {
        message: 'Olá, sejam bem-vindos'
    }
    resp.send(obj);

})



servidor.get('/v2/mensagem/boasvindas', (req, resp) => {

    resp.send({
        message: 'Que bom que vc está aqui, V2'
    });

})



servidor.get('/mensagem/ocupado', (req, resp) => {

    resp.send({
        message: 'Estou ocupado no momento.'
    });

})



servidor.get('/mensagem/ocupado/recado', (req, resp) => {

    resp.send({
        message: 'Estou ocupado no momento, deixe uma mensagem no email xxxx.'
    });

})



servidor.get('/calculadora/somar/:n1/:n2', (req, resp) => {

    let n1 = Number(req.params.n1);
    let n2 = Number(req.params.n2); // parametro de rota
    let soma = n1 + n2;

    resp.send({

        soma: soma

    });

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

    resp.send({

        numeros: nums,
        dobros: numsarray

    });

});


servidor.post ('/pedido', (req, resp) => {

    let cupom = req.query.cupom;
    let valor = req.body.valor;
    let parcelas = req.body.parcelas;


     if (parcelas > 1) {

       valor = valor * 1.05

    }

     if (cupom == 'COMPRA100') {

        valor -= 100;

    }   

   

    let valorParcelas = valor / parcelas;
   

    resp.send ({

        total: valor,
        parcelas:valorParcelas

    });
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
