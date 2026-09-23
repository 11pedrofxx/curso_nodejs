import { CurrentTime } from "./datetime.js";

global.logError = function logError (error) {

    console.log(CurrentTime() + ' || Error ---> ' + error.message)

} 

global.padraoErro = function padraoErro(error) {

    let obj = {

        erro: error.message

    }

    return obj

}