"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroEntity = void 0;
class LivroEntity {
    id;
    titulo;
    isbn;
    autor;
    editora;
    edicao;
    categoria;
    status;
    constructor(id, titulo, isbn, autor, editora, edicao, categoria, status) {
        if (!titulo || !isbn || !autor || !editora || !edicao || !categoria) {
            throw new Error("Por favor informar todos os campos");
        }
        this.id = id || 0;
        this.titulo = titulo;
        this.isbn = isbn;
        this.autor = autor;
        this.editora = editora;
        this.edicao = edicao;
        this.categoria = categoria;
        this.status = status || '';
    }
}
exports.LivroEntity = LivroEntity;
