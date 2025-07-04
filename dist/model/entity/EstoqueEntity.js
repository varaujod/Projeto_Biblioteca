"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueEntity = void 0;
class EstoqueEntity {
    id;
    isbn;
    quantidade;
    quantidade_emprestada;
    disponibilidade;
    constructor(id, isbn, quantidade, quantidade_emprestada) {
        if (!isbn || !quantidade) {
            throw new Error("Por favor informar todos os campos");
        }
        this.id = id || 0;
        this.isbn = isbn;
        this.quantidade = quantidade;
        this.quantidade_emprestada = quantidade_emprestada || 0;
        this.disponibilidade = 'disponivel';
    }
}
exports.EstoqueEntity = EstoqueEntity;
