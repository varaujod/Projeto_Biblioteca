"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const UsuarioEntity_1 = require("../model/UsuarioEntity");
const UsuarioRepository_1 = require("../repository/UsuarioRepository");
const CategoriaUsuarioRepository_1 = require("../repository/CategoriaUsuarioRepository");
const CategoriaCursoRepository_1 = require("../repository/CategoriaCursoRepository");
const EmprestimoRepository_1 = require("../repository/EmprestimoRepository");
class UsuarioService {
    usuarioRepository = UsuarioRepository_1.UsuarioRepository.getInstance();
    categoriaUsuarioRepository = CategoriaUsuarioRepository_1.CategoriaUsuarioRepository.getInstance();
    categoriaCursoRepository = CategoriaCursoRepository_1.CategoriaCursoRepository.getInstance();
    emprestimoRepository = EmprestimoRepository_1.EmprestimoRepository.getInstance();
    novoUsuario(data) {
        if (!this.categoriaUsuarioRepository.encontrarCategoria(data.categoria)) {
            throw new Error("Por favor informar uma categoria existente");
        }
        if (!this.categoriaCursoRepository.encontrarCurso(data.curso)) {
            throw new Error("Por favor informar um curso existente");
        }
        if (this.usuarioRepository.validacaoCadastro(data.cpf)) {
            throw new Error("Este usuário já é cadastrado!");
        }
        else {
            const usuario = new UsuarioEntity_1.UsuarioEntity(data.nome, data.cpf, data.email, data.categoria, data.curso);
            this.usuarioRepository.insereUsuario(usuario);
            return usuario;
        }
    }
    filtrarUsuario(data) {
        const cpf = data.cpf;
        const usuario = this.usuarioRepository.filtraUsuarioPorCPF(cpf);
        if (!usuario) {
            throw new Error("Este usuário ainda não foi cadastrado com este CPF!");
        }
        return usuario;
    }
    removeUsuario(cpf) {
        const emprestimosAtivos = this.emprestimoRepository.filtraEmprestimosAtivosDoUsuario(cpf);
        if (emprestimosAtivos.length > 0) {
            throw new Error("Usuário não pode ser removido pois possui empréstimos pendentes!");
        }
        return this.usuarioRepository.removeUsuarioPorCPF(cpf);
    }
    listarUsuarios() {
        return this.usuarioRepository.listarUsuarios();
    }
    atualizaUsuario(data) {
        const cpf = data.cpf;
        const novosDados = data.novosDados;
        return this.usuarioRepository.atualizarUsuarioPorCPF(cpf, novosDados);
    }
}
exports.UsuarioService = UsuarioService;
