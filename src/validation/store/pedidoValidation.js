export function validarPedido (req) {

    if (req.query.cupom !== "COMPRA100") {

    throw new Error('Esse cupom está indisponivel ou não existe')

    }

    if (!req.body.valor || isNaN(req.body.valor)) {

        throw new Error ('O parametro valor está errado. Informe um número')

    }

    if (!req.body.parcelas || isNaN(req.body.parcelas)) {

        throw new Error (' O parametro parcelas está errado. Informe um número')

    }

}