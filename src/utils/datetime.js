export function CurrentTime() {

    // Cria uma variável chamada "agora" e guarda nela a data e hora atuais do computador.
    let agora = new Date();

    // toLocaleDateString() transforma a data em um formato de data que segue a configuração regional do computador.
    // O operador "+" junta (concatena) os dois valores. //

    // Junta a data atual + a hora atual
    let msg = agora.toLocaleDateString() + ' ' + agora.toLocaleTimeString();

    // Retorna a mensagem criada para quem chamou a função.
    return msg;
}
