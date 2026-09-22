import { Router } from "express";
const endpoints = Router();
import multer from 'multer';


let uploadPerfil = multer({dest: './storage/perfil'}) // Cria a variavel q vai mandar todos os arquivos que a varivel receber para o pasta perfil 



endpoints.get ('/ola', (req, resp) => {

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

// cria o endpoint que irá receber a imagem. Pega a variavel 'uploadPerfil' define como single, pois só irá receber uma imagem e dá o nome imagem a ela.

endpoints.post ('/perfil/capa', uploadPerfil.single('imagem'), (req, resp) => {

    let caminho = req.file.path;
    let extensao = req.file.mimetype;
    let nome = req.file.originalname;

    resp.send({

        caminho: caminho,
        extensao: extensao,
        nome: nome

    })

})

export default endpoints