"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuarioRepository = void 0;
class CategoriaUsuarioRepository {
    static instance;
    CategoriaUsuarioList = [];
    constructor() { }
    ;
    static getInstance() {
        if (!this.instance) {
            this.instance = new CategoriaUsuarioRepository();
        }
        return this.instance;
    }
    insereCategoria(categoria) {
        this.CategoriaUsuarioList.push(categoria);
    }
    listarCategoria() {
        return this.CategoriaUsuarioList;
    }
    encontrarCategoria(cat) {
        return this.CategoriaUsuarioList.find(categoria => categoria.nome === cat);
    }
}
exports.CategoriaUsuarioRepository = CategoriaUsuarioRepository;
