"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioEntity = void 0;
class UsuarioEntity {
    id;
    nome;
    cpf;
    email;
    categoria;
    curso;
    status;
    diasSuspensao;
    livrosAtrasados;
    diasAtraso;
    constructor(id, nome, cpf, email, categoria, curso) {
        if (!nome || !cpf || !email || !categoria || !curso) {
            throw new Error("Por favor informar todos os campos");
        }
        this.id = id || 0;
        this.nome = nome || '';
        this.cpf = cpf;
        this.email = email || '';
        this.categoria = categoria || '';
        this.curso = curso || '';
        this.status = "ativo";
        this.diasSuspensao = 0;
        this.livrosAtrasados = 0;
        this.diasAtraso = 0;
    }
}
exports.UsuarioEntity = UsuarioEntity;
