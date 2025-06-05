"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaLivro = void 0;
class CategoriaLivro {
    static ultimoId = 0;
    id;
    nome;
    constructor(nome) {
        this.id = this.gerarId();
        this.nome = nome;
    }
    gerarId() {
        CategoriaLivro.ultimoId++;
        return CategoriaLivro.ultimoId;
    }
}
exports.CategoriaLivro = CategoriaLivro;
