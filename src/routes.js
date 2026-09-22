import CalculadoraController from './Controller/calculadoraController.js';
import lojaController from './Controller/lojaController.js';
import messageController from './Controller/messageController.js'
import userController from './Controller/usuarioController.js';
import express from 'express'


export default function addRoutes(api){

    api.use(CalculadoraController);
    api.use(lojaController);
    api.use(messageController);
    api.use(userController)
    api.use ('/storage/perfil', express.static ('./storage/perfil'))

}


