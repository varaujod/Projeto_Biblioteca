const cpfStr = "7777777";
// let repetido = true;

// for (let i = 0; i < cpfStr.length; i++) {
//     if(cpfStr[i] != cpfStr[0]){
//         repetido = false;
//         console.log(cpfStr[i]);
//         // break;
//         continue
//     }
// }

// if(repetido == true){
//     console.log("O CPF não pode ser uma sequência repetida!");
// }

let soma = 0;

        for (let i = 0; i <= 11; i++){
            soma = soma + parseInt(cpfStr[i]);
        }

        let restOnze = soma % 11;
        let digitoVerificador = 0;
        let d = 11 - restOnze;

        if(restOnze < 2){
            digitoVerificador = 0;
        } else{
            digitoVerificador = d;
        }

        console.log("O seu digito verificador é " + digitoVerificador);

        let valido;

        if(parseInt(cpfStr[9]) && digitoVerificador == 0){
            console.log("Valido");
        }else if(parseInt(cpfStr[9]) && digitoVerificador == d){
            console.log("Valido");
        }else{
            console.log("CPF Invalido");
        }