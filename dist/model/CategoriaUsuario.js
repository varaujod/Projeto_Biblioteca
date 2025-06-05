"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuario = void 0;
class CategoriaUsuario {
    static ultimoId = 0;
    id;
    nome;
    constructor(nome) {
        this.id = this.gerarId();
        this.nome = nome;
    }
    gerarId() {
        CategoriaUsuario.ultimoId++;
        return CategoriaUsuario.ultimoId;
    }
}
exports.CategoriaUsuario = CategoriaUsuario;
