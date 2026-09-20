import 'dotenv/config'
import express from 'express'; // express é a base da construção da API
const servidor = express(); // variavel criada com const invés de let pq const nn pode ser alterado pois o servidor não pra que ficar mudando.
servidor.use (express.json()); // faz com que a API consiga usar parametro de corpo
import cors from 'cors'; // cors é um pacote que permite que a API seja acessada de outros dominios
servidor.use(cors()); // faz com que a API consiga ser acessada de outros dominios
import multer from 'multer';

let uploadPerfil = multer({dest: './storage/perfil'}) // Cria a variavel q vai mandar todos os arquivos que a varivel receber para o pasta perfil 


servidor.use ('/storage/perfil', express.static ('./storage/perfil'))

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


    try {

        let n1 = Number(req.params.n1);
        let n2 = Number(req.params.n2);
        
        if(isNaN(req.params.n1) || !n1 ) {

            throw new Error('O parametro N1 está invalido. Digite um número')

    }

     if(isNaN(req.params.n2) || !n2 ) {

            throw new Error('O parametro N2 está invalido. Digite um número')

    }

     // parametro de rota
    let soma = n1 + n2;

    resp.send({

        soma: soma

    });
        
    } catch (error) {
        
        resp.send({

            erro: error.message

        })

    }

    

});

servidor.get('/somar', (req, resp) => {


    try {
        
    let n1 = Number(req.query.n1);
    let n2 = Number(req.query.n2);

        if (isNaN(n1) || !n1) {

            throw new Error('O Parametro N1 está inválido. N1 deve ser um número.')

        }

        if (isNaN(n2) || !n2) {

            throw new Error('O Parametro N2 está inválido. N2 deve ser um número.')

        }

        let soma = n1 + n2;

        resp.send({

            Resultado: soma

        })

    } catch (error) {
        
       resp.send({

            erro: error.message

        })

    }

     // parametro de query
    

    resp.send({

        message: soma

    })

})

servidor.get ('/ola', (req, resp) => {

    if (!req.query.nome) {

        resp.status(400).send({

            error: 'Nome não foi expecificado'

        })

    }

    let nome = req.query.nome ?? 'você';
    resp.send ({

        message: `Olá ${nome}! Seja bem vindo(a)`

    });

})

servidor.get ('/multiplicar', (req, resp) => {


    try{
        if (isNaN(req.query.n1) || !req.query.n1) {

            throw new Error ('O parametro N1 está errado')

        }

        if (isNaN(req.query.n2) || !req.query.n2) {

            throw new Error ('O parametro N2 está errado')

        }
        let n1 = Number(req.query.n1);
        let n2 = Number(req.query.n2);
        let multi = n1 * n2;
        resp.status(200).send (multi);

}

    catch (error) {
        resp.status(400).send({

            erro: error.message

        })
    }

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

    try {

        if (!req.body.parcelas || isNaN(req.body.parcelas)) {

            throw new Error('O parametro parcelas está errado')

        }

        if (!req.body.itens) {

            throw new Error('O parametro itens está errado')

        }

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

   resp.send({

    Total: `O total a ser pago é ${total}`


   })
    
    }
    
    catch (error) {
        resp.status(400).send({

            erro: error.message

        })
    }

    

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
// cria o endpoint que irá receber a imagem. Pega a variavel 'uploadPerfil' define como single, pois só irá receber uma imagem e dá o nome imagem a ela.

servidor.post ('/perfil/capa', uploadPerfil.single('imagem'), (req, resp) => {

    let caminho = req.file.path;
    let extensao = req.file.mimetype;
    let nome = req.file.originalname;

    resp.send({

        caminho: caminho,
        extensao: extensao,
        nome: nome

    })

})


const port = process.env.port
servidor.listen(
    port,
    () => console.log('API subiu com sucesso na porta ' + port))
