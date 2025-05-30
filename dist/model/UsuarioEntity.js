"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioEntity = void 0;
class UsuarioEntity {
    nome;
    cpf;
    email;
    categoria;
    curso;
    status;
    constructor(nome, cpf, email, categoria, curso) {
        this.nome = nome;
        this.cpf = this.meuCPF(cpf);
        this.email = email;
        this.categoria = categoria;
        this.curso = curso;
        this.status = true;
    }
    meuCPF(cpf) {
        const cpfStr = cpf.toString();
        if (cpfStr.length != 11) {
            throw new Error("O seu CPF não tem 11 digitos, por favor tente novamente!");
        }
        function sequenciaRepetida() {
            let repetido = true;
            for (let i = 0; i < cpfStr.length; i++) {
                if (cpfStr[i] !== cpfStr[0]) {
                    repetido = false;
                    continue;
                }
            }
            if (repetido == true) {
                throw new Error("O CPF não pode ser uma sequência repetida!");
            }
            else {
                return true;
            }
        }
        function verificarPrimeiroDigito() {
            let soma = 0;
            for (let i = 0; i < 9; i++) {
                soma += parseInt(cpfStr[i]) * (10 - i);
            }
            let resto = soma % 11;
            let digito1;
            if (resto < 2) {
                digito1 = 0;
            }
            else {
                digito1 = 11 - resto;
            }
            if (parseInt(cpfStr[9]) === digito1) {
                return true;
            }
            else {
                throw new Error("O CPF é inválido!");
            }
        }
        function verificarSegundoDigito() {
            let soma = 0;
            for (let i = 0; i < 9; i++) {
                soma += parseInt(cpfStr[i]) * (12 - i);
            }
            let resto = soma % 11;
            let digito1;
            if (resto < 2) {
                digito1 = 0;
            }
            else {
                digito1 = 11 - resto;
            }
            if (parseInt(cpfStr[9]) === digito1) {
                return true;
            }
            else {
                throw new Error("O CPF é inválido!");
            }
        }
        const cpfArray = [];
        for (let i = 0; i < cpfStr.length; i++) {
            cpfArray[i] = Number(cpfStr[i]);
        }
        if (sequenciaRepetida()) {
            if (verificarPrimeiroDigito()) {
                if (verificarSegundoDigito()) {
                    return parseInt(cpfArray.join(''));
                }
            }
        }
        throw new Error("CPF inválido ou não pode ser validado.");
    }
}
exports.UsuarioEntity = UsuarioEntity;
