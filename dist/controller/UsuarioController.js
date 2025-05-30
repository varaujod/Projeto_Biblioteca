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
    filtrarUsuario(req, res) {
        try {
            const usuario = this.usuarioService.filtrarUsuario(req.body.cpf);
            res.status(201).json(usuario);
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
}
exports.UsuarioController = UsuarioController;
