import { Router } from "express";
const endpoints = Router();
import { total, valueparcelas } from "../service/loja/calcPedidoCompletoService.js";

endpoints.post ('/pedido', (req, resp) => {

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


endpoints.post('/pedido/completo', (req, resp) => {

    try {

        if (!req.body.parcelas || isNaN(req.body.parcelas)) {
            throw new Error('O parametro parcelas está errado')
        }

        if (!req.body.itens) {
            throw new Error('O parametro itens está errado')
        }

        let cupom = req.query.cupom
        let parcelas = req.body.parcelas
        let itens = req.body.itens

        let totalPedido = total(cupom, parcelas, itens)
        let valorParcelas = valueparcelas(totalPedido, parcelas)

        resp.send({
            total: totalPedido,
            parcelas: parcelas,
            valorParcelas: valorParcelas
        })

    } catch (error) {

        resp.status(400).send({
            erro: error.message
        })

    }

})


endpoints.post ('/compra', (req, resp) => {
    
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

export default endpoints