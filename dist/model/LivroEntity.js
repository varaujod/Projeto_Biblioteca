"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroEntity = void 0;
class LivroEntity {
    titulo;
    isbn;
    autor;
    editora;
    edicao;
    categoria;
    status;
    constructor(titulo, isbn, autor, editora, edicao, categoria) {
        if (!titulo || !isbn || !autor || !editora || !edicao || !categoria) {
            throw new Error("Por favor informar todos os campos");
        }
        this.titulo = titulo;
        this.isbn = isbn;
        this.autor = autor;
        this.editora = editora;
        this.edicao = edicao;
        this.categoria = categoria;
        this.status = 'disponivel';
    }
}
exports.LivroEntity = LivroEntity;
