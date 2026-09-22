export function total(cupom, parcelas, itens) {

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

   return total

}

export function valueparcelas (total, parcelas) {

    let valorParcelas = total / parcelas;
    return valorParcelas

}