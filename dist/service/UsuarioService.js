"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const UsuarioEntity_1 = require("../model/UsuarioEntity");
const UsuarioRepository_1 = require("../repository/UsuarioRepository");
class UsuarioService {
    usuarioRepository = UsuarioRepository_1.UsuarioRepository.getInstance();
    novoUsuario(data) {
        if (!data.nome || !data.cpf || !data.email || !data.email || !data.categoria || !data.curso) {
            throw new Error("Por favor informar todos os campos");
        }
        if (data.categoria != "Aluno" && data.categoria != "Professor" && data.categoria != "Bibliotecario") {
            throw new Error("Por favor informar uma categoria existente");
        }
        if (data.curso != "ADS" && data.categoria != "Pedagogia" && data.categoria != "Administração") {
            throw new Error("Por favor informar um curso existente");
        }
        const usuario = new UsuarioEntity_1.UsuarioEntity(data.nome, data.cpf, data.email, data.categoria, data.curso);
        this.usuarioRepository.insereUsuario(usuario);
        return usuario;
    }
    filtrarUsuario(data) {
        const cpf = data.cpf;
        return this.usuarioRepository.filtraUsuarioPorCPF(cpf);
        // console.log(this.usuarioRepository.filtraUsuarioPorCPF(cpf));
    }
    removeUsuario(data) {
        const cpf = data.cpf;
        return this.usuarioRepository.removeUsuarioPorCPF(cpf);
    }
    listarUsuarios() {
        // console.log(this.usuarioRepository.listarUsuarios());
        return this.usuarioRepository.listarUsuarios();
    }
    atualizaUsuario(data) {
        const cpf = data.cpf;
        const novosDados = data.novosDados;
        return this.usuarioRepository.atualizarUsuarioPorCPF(cpf, novosDados);
    }
}
exports.UsuarioService = UsuarioService;
