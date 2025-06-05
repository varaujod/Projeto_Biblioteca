"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuarioService = void 0;
const CategoriaUsuario_1 = require("../model/CategoriaUsuario");
const CategoriaUsuarioRepository_1 = require("../repository/CategoriaUsuarioRepository");
class CategoriaUsuarioService {
    categoriaUsuarioRepository = CategoriaUsuarioRepository_1.CategoriaUsuarioRepository.getInstance();
    novaCategoria(data) {
        if (!data.nome) {
            throw new Error("Por favor informar todos os campos");
        }
        const novaCategoria = new CategoriaUsuario_1.CategoriaUsuario(data.nome);
        this.categoriaUsuarioRepository.insereCategoria(novaCategoria);
        return novaCategoria;
    }
    listarCategoria() {
        return this.categoriaUsuarioRepository.listarCategoria();
    }
}
exports.CategoriaUsuarioService = CategoriaUsuarioService;
