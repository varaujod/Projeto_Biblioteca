"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueEntity = void 0;
class EstoqueEntity {
    isbn;
    cod;
    quantidade;
    quantidade_emprestada;
    disponibilidade;
    constructor(isbn, cod, quantidade, quantidade_emprestada) {
        if (!isbn || !cod) {
            throw new Error("Por favor informar todos os campos");
        }
        this.isbn = isbn;
        this.cod = cod;
        this.quantidade = quantidade;
        this.quantidade_emprestada = quantidade_emprestada;
        this.disponibilidade = 'disponivel';
    }
}
exports.EstoqueEntity = EstoqueEntity;
