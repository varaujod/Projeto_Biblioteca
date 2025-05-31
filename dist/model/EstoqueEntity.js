"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueEntity = void 0;
class EstoqueEntity {
    isbn;
    cod;
    disponibilidade;
    constructor(isbn, cod) {
        this.isbn = isbn;
        this.cod = cod;
        this.disponibilidade = 'disponivel';
    }
}
exports.EstoqueEntity = EstoqueEntity;
