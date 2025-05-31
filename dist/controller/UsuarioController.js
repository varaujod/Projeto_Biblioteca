"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioController = void 0;
const UsuarioService_1 = require("../service/UsuarioService");
class UsuarioController {
    usuarioService = new UsuarioService_1.UsuarioService();
    criarUsuario(req, res) {
        try {
            const usuario = this.usuarioService.novoUsuario(req.body);
            res.status(201).json(usuario);
        }
        catch (error) {
            let message = "Não foi possivel criar usuário!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
    listarUsuarios(req, res) {
        try {
            const lista = this.usuarioService.listarUsuarios();
            res.status(200).json(lista);
        }
        catch (error) {
            let message = "Não conseguimos realizar a listagem de usuários";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
    filtrarUsuario(req, res) {
        try {
            const usuario = this.usuarioService.filtrarUsuario({ cpf: Number(req.params.cpf) });
            res.status(200).json(usuario);
        }
        catch (error) {
            let message = "Não existe esse usuario em nosso cadastro, por favor cadastre esse usuario";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
    atualizarUsuario(req, res) {
        try {
            const usuarioAtualizado = this.usuarioService.atualizaUsuario({
                cpf: Number(req.params.cpf),
                novosDados: req.body
            });
            res.status(200).json(usuarioAtualizado);
        }
        catch (error) {
            let message = "Não foi possivel realizar atualização";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
    removerUsuario(req, res) {
        try {
            const cpf = Number(req.params.cpf);
            const usuario = this.usuarioService.removeUsuario(cpf);
            res.status(200).json({
                "status": "Usuario Deletado com Sucesso!",
                "usuario": usuario
            });
        }
        catch (error) {
            let message = "Não foi possivel realizar a remoção";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
}
exports.UsuarioController = UsuarioController;
