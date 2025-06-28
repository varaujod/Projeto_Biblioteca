import { UsuarioService } from "../service/UsuarioService";
import { Request, Response } from "express";

export class UsuarioController{
    private usuarioService = new UsuarioService();

    async criarUsuario(req: Request, res: Response){
        try{
            const usuario = await this.usuarioService.novoUsuario(req.body);
            res.status(201).json(usuario);
        } catch(err){
            const message = err instanceof Error ? err.message: 'Não foi possivel criar o Usuário!';
            res.status(400).json({
                message: message
            });
        }
    }

    async listarUsuarios(req: Request, res: Response){
        try{
            const lista = await this.usuarioService.listarUsuarios();
            res.status(200).json(lista);
        } catch(err){
            const message = err instanceof Error ? err.message: 'Não foi possivel listar os usuarios!';
            res.status(400).json({
                message: message
            });
        }
    }

    async filtrarUsuario(req: Request, res: Response){
        try{
            const usuario = await this.usuarioService.filtrarUsuario({ cpf: Number(req.params.cpf)});
            res.status(200).json(usuario);
        } catch(err){
            const message = err instanceof Error ? err.message: 'Não foi possivel filtrar o Usuário!';
            res.status(400).json({
                message: message
            });
        }
    }

    async atualizarUsuario(req: Request, res: Response){
        try{
            const usuarioAtualizado = await this.usuarioService.atualizaUsuario({
                cpf: Number(req.params.cpf),
                novosDados: req.body
            });

            res.status(200).json({
                "message": "Usuário atualizado com sucesso!",
                "usuario": usuarioAtualizado
            });
        } catch(err){
            const message = err instanceof Error ? err.message: 'Não foi possivel atualizar o Usuário!';
            res.status(400).json({
                message: message
            });
        }
    }

    async removerUsuario(req: Request, res: Response){
        try{
            const cpf = Number(req.params.cpf);
            const usuario = await this.usuarioService.removeUsuario(cpf);

            res.status(200).json({
                "status": "Usuario Deletado com Sucesso!",
                "usuario": usuario

            })
        } catch(err){
            const message = err instanceof Error ? err.message: 'Não foi possivel deletar o Usuário!';
            res.status(400).json({
                message: message
            });
        }
    }

}