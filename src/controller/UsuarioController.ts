import { UsuarioService } from "../service/UsuarioService";
import { Request, Response } from "express";

export class UsuarioController{
    private usuarioService = new UsuarioService();

    criarUsuario(req: Request, res: Response): void{
        try{
            const usuario = this.usuarioService.novoUsuario(req.body);
            res.status(201).json(usuario);
        } catch(error: unknown){
            let message: string = "Não foi possivel criar usuário!"
            if(error instanceof Error){
                message = error.message
            }
            res.status(400).json({
                message: message
            })
        }
    }

    listarUsuarios(req: Request, res: Response): void{
        try{
            const lista = this.usuarioService.listarUsuarios();
            res.status(200).json(lista);
        } catch(error: unknown){
           let message = "Não conseguimos realizar a listagem";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            })
        }
    }

    filtrarUsuario(req: Request, res: Response): void{
        try{
            const usuario = this.usuarioService.filtrarUsuario({ cpf: Number(req.params.cpf)});
            res.status(200).json(usuario);
        } catch(error: unknown){
            let message = "Não existe esse usuario em nosso cadastro, por favor cadastre esse usuario";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            })
        }
    }

    atualizarUsuario(req: Request, res: Response): void{
        try{
            const usuarioAtualizado = this.usuarioService.atualizaUsuario({
                cpf: Number(req.params.cpf),
                novosDados: req.body
            });

            res.status(200).json(usuarioAtualizado);
        } catch(error: unknown){
            let message = "Não foi possivel realizar atualização";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            })
        }
    }

    

}