import { Router } from "express";
const endpoints = Router();
import { CalcMedia } from "../service/calc/mediaService.js";

endpoints.get('/calculadora/somar/:n1/:n2', (req, resp) => {


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

endpoints.get('/somar', (req, resp) => {


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

    }
    
    catch (error) {
        
            logError(error) 
            resp.send({
            erro: error.message

            })

    }

})

endpoints.get ('/multiplicar', (req, resp) => {


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

endpoints.post ('/media', (req, resp) => {


    try {
        
    let n1 = req.body.n1;
    let n2 = req.body.n2;
    let n3 = req.body.n3;

        if (isNaN(n1) || !n1) {

            throw new Error('O parametro N1 está incorreto. Informe um número')

        }

        if (isNaN(n2) || !n2) {

            throw new Error('O parametro N2 está incorreto. Informe um número')

        }

        if (isNaN(n3) || !n3) {

            throw new Error('O parametro N3 está incorreto. Informe um número')

        }

        let media = CalcMedia(n1, n2, n3);
        resp.send({

            media: media

        })


    } catch (error) {
        
        resp.send({

            erro: error.message

        })

    }

   
        resp.send ({

            media: media

        });
})


endpoints.post('/dobros', (req, resp) => {

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


export default endpoints