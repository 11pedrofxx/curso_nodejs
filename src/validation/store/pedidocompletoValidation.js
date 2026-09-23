export function validarPedidoCompleto (req) {

    if (!req.body.parcelas || isNaN(req.body.parcelas)) {
            throw new Error('O parametro parcelas está errado. Informe um número')
        }

    if (!req.body.itens) {
            throw new Error('O parametro itens está errado')
        }


}