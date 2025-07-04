import { UsuarioService } from "../service/UsuarioService";
import { Request, Response } from "express";
import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse  } from "tsoa";
import { UsuarioDto } from "../model/dto/UsuarioDto";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";

@Route("usuario")
@Tags("Usuário")
export class UsuarioController extends Controller{
    usuarioService = new UsuarioService();

    @Post("create")
    async criarUsuario(
        @Body() dto: UsuarioDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise< |void>{
        try{
            const usuario = await this.usuarioService.novoUsuario(dto);
            return success(201, new BasicResponseDto("Usuario criado com sucesso", usuario));
        } catch(err: any){
            return fail(400, new BasicResponseDto(err.message, undefined));
        }
    }

    @Get("all")
    async listarUsuarios(
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<202, BasicResponseDto>
    ): Promise< |void>{
        try{
            const usuarios = await this.usuarioService.listarUsuarios();
            return success(202, new BasicResponseDto("Usuários Cadastrados: ", usuarios));
        } catch(err: any){
            return fail(400, new BasicResponseDto(err.message, undefined));
        }
    }

    @Get("{id}")
    async filtrarUsuario(
        @Path() id: number,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<UsuarioDto>{
        try{
            const usuario = await this.usuarioService.filtrarUsuario(id);
            return success(200, new BasicResponseDto("Usuário encontrado com sucesso!", usuario));
        } catch(err: any){
            return fail(400, new BasicResponseDto(err.message, undefined));
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