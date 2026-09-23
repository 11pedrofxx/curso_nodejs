import { Router } from "express";
const endpoints = Router();
import { total, valueparcelas } from "../service/loja/calcPedidoCompletoService.js";
import { validarPedidoCompleto } from "../validation/store/pedidocompletoValidation.js";
import { valordopedido, valordasParcelas } from "../service/loja/pedidoService.js";
import { validarPedido } from "../validation/store/pedidoValidation.js";

endpoints.post ('/pedido', (req, resp) => {


    try {
        
        validarPedido(req)
    let cupom = req.query.cupom;
    let valor = req.body.valor;
    let parcelas = req.body.parcelas;
    

    let valorcompra = valordopedido(valor, parcelas, cupom);
    let valorParcelas = valordasParcelas(valorcompra, parcelas);
   

    resp.send ({

        total: valorcompra,
        parcelas:valorParcelas

    });

    } catch (error) {
        
        resp.send({

            erro: error.message

        })

    }

    
})


endpoints.post('/pedido/completo', (req, resp) => {

    try {

        validarPedidoCompleto(req)

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