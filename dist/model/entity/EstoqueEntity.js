"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueEntity = void 0;
class EstoqueEntity {
    id;
    isbn;
    quantidade;
    quantidade_emprestada;
    // disponibilidade: string;
    disponibilidade;
    constructor(id, isbn, quantidade, quantidade_emprestada) {
        if (!isbn || !quantidade) {
            throw new Error("Por favor informar todos os campos");
        }
        this.id = id;
        this.isbn = isbn;
        this.quantidade = quantidade;
        this.quantidade_emprestada = quantidade_emprestada;
        this.disponibilidade = 'disponivel';
    }
}
exports.EstoqueEntity = EstoqueEntity;
