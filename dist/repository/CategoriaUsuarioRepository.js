"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuarioRepository = void 0;
const CategoriaUsuario_1 = require("../model/CategoriaUsuario");
class CategoriaUsuarioRepository {
    static instance;
    CategoriaUsuarioList = [];
    constructor() {
        this.CategoriaUsuarioList.push(new CategoriaUsuario_1.CategoriaUsuario("Aluno"));
        this.CategoriaUsuarioList.push(new CategoriaUsuario_1.CategoriaUsuario("Professor"));
        this.CategoriaUsuarioList.push(new CategoriaUsuario_1.CategoriaUsuario("Bibliotecario"));
    }
    ;
    static getInstance() {
        if (!this.instance) {
            this.instance = new CategoriaUsuarioRepository();
        }
        return this.instance;
    }
    listarCategoria() {
        return this.CategoriaUsuarioList;
    }
    encontrarCategoria(cat) {
        return this.CategoriaUsuarioList.find(categoria => categoria.nome === cat);
    }
}
exports.CategoriaUsuarioRepository = CategoriaUsuarioRepository;
