import { CategoriaUsuarioService } from "../service/CategoriaUsuarioService";
import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse  } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";

@Route("categoria-usuario")
@Tags("Categoria de Usuário")
export class CategoriaUsuarioController extends Controller{
    categoriaUsuarioService = new CategoriaUsuarioService();

    @Get()
    async listarCategoria(
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise<void>{
        try{
            const lista = await this.categoriaUsuarioService.listarCategorias();
            return success(201, new BasicResponseDto("Lista de Categorias de Usuário: ", lista));
        } catch(err: any){
            return fail(400, new BasicResponseDto(err.message, undefined));
        }
    }
}

