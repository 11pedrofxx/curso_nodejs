import { Router } from "express";
const endpoints = Router()

endpoints.get('/helloworld', (req, resp) => {
    

    resp.send({

        message: 'Hello World'

    });

})



endpoints.get('/mensagem/boasvindas', (req, resp) => {

    let obj = {
        message: 'Olá, sejam bem-vindos'
    }
    resp.send(obj);

})



endpoints.get('/v2/mensagem/boasvindas', (req, resp) => {

    resp.send({
        message: 'Que bom que vc está aqui, V2'
    });

})



endpoints.get('/mensagem/ocupado', (req, resp) => {

    resp.send({
        message: 'Estou ocupado no momento.'
    });

})



endpoints.get('/mensagem/ocupado/recado', (req, resp) => {

    resp.send({
        message: 'Estou ocupado no momento, deixe uma mensagem no email xxxx.'
    });

})

export default endpoints