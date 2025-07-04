import { UsuarioService } from "../service/UsuarioService";
import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse  } from "tsoa";
import { UsuarioDto } from "../model/dto/UsuarioDto";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";

@Route("usuario")
@Tags("Usuário")
export class UsuarioController extends Controller{
    usuarioService = new UsuarioService();

    @Post()
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

    @Get()
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

    @Get("{cpf}")
    async filtrarUsuario(
        @Path() cpf: number,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<UsuarioDto>{
        try{
            const usuarioEncontrado = await this.usuarioService.filtrarUsuario({ cpf: Number(cpf) });
            return success(200, new BasicResponseDto("Usuário encontrado com sucesso!", usuarioEncontrado));
        } catch(err: any){
            return fail(400, new BasicResponseDto(err.message, undefined));
        }
    }

    @Put("{cpf}")
    async atualizarUsuario(
        @Path() cpf: number,
        @Body() dto: UsuarioDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise< |void>{
        try{
            const usuarioAtualizado = await this.usuarioService.atualizaUsuario({
                cpf: cpf,
                novosDados: dto
            });

            return success(200, new BasicResponseDto("Usuario atualizado com sucesso!", usuarioAtualizado));
        } catch(err: any){
            return fail(400, new BasicResponseDto(err.message, undefined));
        }
    }

    @Delete("{cpf}")
    async removerUsuario(
        @Path() cpf: number,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void>{
        try{
            const usuarioRemovido = await this.usuarioService.removeUsuario(cpf);
            return success(200, new BasicResponseDto("Usuário Removido com sucesso!", usuarioRemovido));
        } catch(err: any){
            return fail(400, new BasicResponseDto(err.message, undefined));
        }
    }

}