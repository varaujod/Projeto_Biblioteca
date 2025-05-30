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

    filtrarUsuario(req: Request, res: Response): void{
        try{
            const usuario = this.usuarioService.filtrarUsuario(req.body.cpf);
            res.status(201).json(usuario);
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







}