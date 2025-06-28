"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioController = void 0;
const UsuarioService_1 = require("../service/UsuarioService");
class UsuarioController {
    usuarioService = new UsuarioService_1.UsuarioService();
    async criarUsuario(req, res) {
        try {
            const usuario = await this.usuarioService.novoUsuario(req.body);
            res.status(201).json(usuario);
        }
        catch (err) {
            const message = err instanceof Error ? err.message : 'Não foi possivel criar o Usuário!';
            res.status(400).json({
                message: message
            });
        }
    }
    async listarUsuarios(req, res) {
        try {
            const lista = await this.usuarioService.listarUsuarios();
            res.status(200).json(lista);
        }
        catch (err) {
            const message = err instanceof Error ? err.message : 'Não foi possivel listar os usuarios!';
            res.status(400).json({
                message: message
            });
        }
    }
    async filtrarUsuario(req, res) {
        try {
            const usuario = await this.usuarioService.filtrarUsuario({ cpf: Number(req.params.cpf) });
            res.status(200).json(usuario);
        }
        catch (err) {
            const message = err instanceof Error ? err.message : 'Não foi possivel filtrar o Usuário!';
            res.status(400).json({
                message: message
            });
        }
    }
    async atualizarUsuario(req, res) {
        try {
            const usuarioAtualizado = await this.usuarioService.atualizaUsuario({
                cpf: Number(req.params.cpf),
                novosDados: req.body
            });
            res.status(200).json({
                "message": "Usuário atualizado com sucesso!",
                "usuario": usuarioAtualizado
            });
        }
        catch (err) {
            const message = err instanceof Error ? err.message : 'Não foi possivel atualizar o Usuário!';
            res.status(400).json({
                message: message
            });
        }
    }
    async removerUsuario(req, res) {
        try {
            const cpf = Number(req.params.cpf);
            const usuario = await this.usuarioService.removeUsuario(cpf);
            res.status(200).json({
                "status": "Usuario Deletado com Sucesso!",
                "usuario": usuario
            });
        }
        catch (err) {
            const message = err instanceof Error ? err.message : 'Não foi possivel deletar o Usuário!';
            res.status(400).json({
                message: message
            });
        }
    }
}
exports.UsuarioController = UsuarioController;
