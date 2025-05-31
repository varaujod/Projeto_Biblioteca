"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRepository = void 0;
class UsuarioRepository {
    static instance;
    UsuarioList = [];
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new UsuarioRepository();
        }
        return this.instance;
    }
    insereUsuario(usuario) {
        this.UsuarioList.push(usuario);
    }
    filtraUsuarioPorCPF(cpf) {
        return this.UsuarioList.find(usuario => usuario.cpf === cpf);
    }
    removeUsuarioPorCPF(cpf) {
        const index = this.findIndex(cpf);
        this.UsuarioList.splice(index, 1);
    }
    listarUsuarios() {
        return this.UsuarioList;
    }
    findIndex(cpf) {
        const index = this.UsuarioList.findIndex(user => user.cpf == cpf);
        if (index == -1) {
            throw new Error("CPF informado não foi encontrado!");
        }
        return index;
    }
}
exports.UsuarioRepository = UsuarioRepository;
