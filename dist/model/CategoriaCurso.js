"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaCurso = void 0;
class CategoriaCurso {
    static ultimoId = 0;
    id;
    nome;
    constructor(nome) {
        this.id = this.gerarId();
        this.nome = nome;
    }
    gerarId() {
        CategoriaCurso.ultimoId++;
        return CategoriaCurso.ultimoId;
    }
}
exports.CategoriaCurso = CategoriaCurso;
