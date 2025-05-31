const cpfStr = "75025777003";
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

// let soma = 0;
// for (let i = 0; i < 9; i++) {
//     soma += parseInt(cpfStr[i]) * (10 - i);
// }
// let resto = soma % 11;
// let digito1;
// if (resto < 2) {
//     digito1 = 0;
// } else {
//     digito1 = 11 - resto;
// }

// console.log("Primeiro dígito verificador calculado:", digito1);

// if (parseInt(cpfStr[9]) === digito1) {
//     console.log("Primeiro dígito verificador válido");
// } else {
//     console.log("CPF Invalido");
// }

            let soma = 0;
            for (let i = 0; i < 10; i++) {
                soma += parseInt(cpfStr[i]) * (11 - i);
            }

            let resto = soma % 11;
            let digito1;

            if(resto < 2){
                digito1 = 0;
            } else{
                digito1 = 11 - resto;
            }

            if(parseInt(cpfStr[10]) === digito1){
                console.log("valido" + digito1);
            } else{
                console.log("O CPF é inválido!" + digito1)
            }
    