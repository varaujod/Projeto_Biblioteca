"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueDto = void 0;
class EstoqueDto {
    isbn;
    quantidade;
    quantidade_emprestada;
    disponibilidade;
    constructor(isbn, quantidade, quantidade_emprestada, disponibilidade) {
        this.isbn = isbn;
        this.quantidade = quantidade;
        this.quantidade_emprestada = quantidade_emprestada ?? 0;
        this.disponibilidade = disponibilidade;
    }
}
exports.EstoqueDto = EstoqueDto;
