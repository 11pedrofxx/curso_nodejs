export function valordopedido (valor, parcelas, cupom) {

    if (parcelas > 1) {

       valor = valor * 1.05

    }

     if (cupom == 'COMPRA100') {

        valor -= 100;

    }

    return valor

}

export function valordasParcelas (valorTotal, parcelas) {

    return valorTotal / parcelas;

}