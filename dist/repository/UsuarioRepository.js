"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRepository = void 0;
const mysql_1 = require("../database/mysql");
const UsuarioEntity_1 = require("../model/entity/UsuarioEntity");
class UsuarioRepository {
    static instance;
    constructor() {
        this.criarTable();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new UsuarioRepository();
        }
        return this.instance;
    }
    async criarTable() {
        const query = `CREATE TABLE IF NOT EXISTS biblioteca.Usuario(
                id INT AUTO_INCREMENT PRIMARY KEY, 
                nome VARCHAR(255) NOT NULL, 
                cpf DECIMAL(11) NOT NULL UNIQUE, 
                email VARCHAR(255) NOT NULL, 
                categoria VARCHAR(255) NOT NULL, 
                curso VARCHAR(255) NOT NULL, 
                status VARCHAR(20) NOT NULL,
                diasSuspensao DECIMAL(4),
                livrosAtrasados DECIMAL(4),
                diasAtraso DECIMAL(4)
                )`;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            console.log('Tabela de Usuário criada com Sucesso!', resultado);
        }
        catch (err) {
            console.error('Erro ao executar a query de usuario: ', err);
        }
    }
    async insereUsuario(usuario) {
        const resultado = await (0, mysql_1.executarComandoSQL)("INSERT INTO biblioteca.Usuario (nome, cpf, email, categoria, curso, status, diasSuspensao, livrosAtrasados, diasAtraso) values (?, ?, ?, ?, ?, ?, ?, ?, ?)", [
            usuario.nome,
            usuario.cpf,
            usuario.email,
            usuario.categoria,
            usuario.curso,
            'ativo',
            0,
            0,
            0
        ]);
        console.log('Usuário criado com Sucesso: ', resultado);
        return new UsuarioEntity_1.UsuarioEntity(resultado.insertId, usuario.nome, usuario.cpf, usuario.email, usuario.categoria, usuario.curso);
    }
    async filtraUsuarioPorCPF(cpf) {
        const resultado = await (0, mysql_1.executarComandoSQL)("SELECT * FROM biblioteca.Usuario WHERE cpf = ?", [cpf]);
        if (resultado && resultado.length > 0) {
            const user = resultado[0];
            return new UsuarioEntity_1.UsuarioEntity(user.id, user.nome, user.cpf, user.email, user.categoria, user.curso);
        }
        return null;
    }
    async removeUsuarioPorCPF(cpf) {
        const usuario = await this.filtraUsuarioPorCPF(cpf);
        if (!usuario) {
            return null;
        }
        await (0, mysql_1.executarComandoSQL)("DELETE FROM biblioteca.Usuario WHERE cpf = ?", [cpf]);
        return usuario;
    }
    async atualizarUsuarioPorCPF(cpf, novosDados) {
        const campos = [];
        const valores = [];
        if (novosDados.nome) {
            campos.push("nome = ?");
            valores.push(novosDados.nome);
        }
        if (novosDados.email) {
            campos.push("email = ?");
            valores.push(novosDados.email);
        }
        if (novosDados.categoria) {
            campos.push("categoria = ?");
            valores.push(novosDados.categoria);
        }
        if (novosDados.curso) {
            campos.push("curso = ?");
            valores.push(novosDados.curso);
        }
        if (novosDados.status) {
            campos.push("status = ?");
            valores.push(novosDados.status);
        }
        if (novosDados.diasSuspensao !== undefined) {
            campos.push("diasSuspensao = ?");
            valores.push(novosDados.diasSuspensao);
        }
        if (novosDados.livrosAtrasados !== undefined) {
            campos.push("livrosAtrasados = ?");
            valores.push(novosDados.livrosAtrasados);
        }
        if (novosDados.diasAtraso !== undefined) {
            campos.push("diasAtraso = ?");
            valores.push(novosDados.diasAtraso);
        }
        if (campos.length === 0) {
            return await this.filtraUsuarioPorCPF(cpf);
        }
        const sql = `UPDATE biblioteca.Usuario SET ${campos.join(", ")} WHERE cpf = ?`;
        valores.push(cpf);
        const resultado = await (0, mysql_1.executarComandoSQL)(sql, valores);
        console.log(resultado);
        const usuarioAtualizado = await this.filtraUsuarioPorCPF(cpf);
        return usuarioAtualizado;
    }
    async listarUsuarios() {
        const resultado = await (0, mysql_1.executarComandoSQL)("SELECT * FROM biblioteca.Usuario", []);
        const usuarios = [];
        if (resultado && resultado.length > 0) {
            for (let i = 0; i < resultado.length; i++) {
                const user = resultado[i];
                usuarios.push(new UsuarioEntity_1.UsuarioEntity(user.id, user.nome, user.cpf, user.email, user.categoria, user.curso));
            }
        }
        return usuarios;
    }
    async validacaoCadastro(cpf) {
        const resultado = await this.filtraUsuarioPorCPF(cpf);
        return resultado !== null;
    }
}
exports.UsuarioRepository = UsuarioRepository;
