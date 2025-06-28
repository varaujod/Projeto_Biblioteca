"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const UsuarioRepository_1 = require("../repository/UsuarioRepository");
const CategoriaUsuarioRepository_1 = require("../repository/CategoriaUsuarioRepository");
const CategoriaCursoRepository_1 = require("../repository/CategoriaCursoRepository");
const EmprestimoRepository_1 = require("../repository/EmprestimoRepository");
class UsuarioService {
    usuarioRepository = UsuarioRepository_1.UsuarioRepository.getInstance();
    categoriaUsuarioRepository = CategoriaUsuarioRepository_1.CategoriaUsuarioRepository.getInstance();
    categoriaCursoRepository = CategoriaCursoRepository_1.CategoriaCursoRepository.getInstance();
    emprestimoRepository = EmprestimoRepository_1.EmprestimoRepository.getInstance();
    async novoUsuario(data) {
        if (!this.categoriaUsuarioRepository.encontrarCategoria(data.categoria)) {
            throw new Error("Por favor informar uma categoria existente");
        }
        if (!this.categoriaCursoRepository.encontrarCurso(data.curso)) {
            throw new Error("Por favor informar um curso existente");
        }
        const usuarioEncontrado = await this.usuarioRepository.validacaoCadastro(data.cpf);
        if (usuarioEncontrado) {
            throw new Error("Este usuário já é cadastrado!");
        }
        return await this.usuarioRepository.insereUsuario(data);
    }
    filtrarUsuario(data) {
        const cpf = data.cpf;
        const usuario = this.usuarioRepository.filtraUsuarioPorCPF(cpf);
        if (usuario === null) {
            throw new Error("Este usuário ainda não foi cadastrado com este CPF!");
        }
        return usuario;
    }
    async removeUsuario(cpf) {
        const emprestimosAtivos = this.emprestimoRepository.filtraEmprestimosAtivosDoUsuario(cpf);
        if (emprestimosAtivos.length > 0) {
            throw new Error("Usuário não pode ser removido pois possui empréstimos pendentes!");
        }
        const usuarioRemovido = await this.usuarioRepository.removeUsuarioPorCPF(cpf);
        if (!usuarioRemovido) {
            throw new Error("Usuário não encontrado para remoção!");
        }
        return usuarioRemovido;
    }
    async listarUsuarios() {
        return await this.usuarioRepository.listarUsuarios();
    }
    async atualizaUsuario(data) {
        const cpf = data.cpf;
        const novosDados = data.novosDados;
        return await this.usuarioRepository.atualizarUsuarioPorCPF(cpf, novosDados);
    }
}
exports.UsuarioService = UsuarioService;
