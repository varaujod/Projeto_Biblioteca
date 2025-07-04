import { EstoqueService } from "../service/EstoqueService";
import { Request, Response } from "express";
import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse  } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { EstoqueDto } from "../model/dto/EstoqueDto";

@Route("estoque")
@Tags("Estoque")
export class EstoqueController extends Controller{
    estoqueService = new EstoqueService();

    @Post()
    async adicionarLivroNoEstoque(
        @Body() dto: EstoqueDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void>{
        try{
            const livro = await this.estoqueService.novoLivronoEstoque(dto);
            return success(200, new BasicResponseDto("Livro adicionado com sucesso no seu estoque!", livro));
        } catch(err: any){
            return fail(400, new BasicResponseDto(err.message, undefined));
        }
    }

    @Get()
    async listarEstoque(
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<202, BasicResponseDto>
    ): Promise<void>{
        try{
            const lista = await this.estoqueService.listarEstoque();
            return success(202, new BasicResponseDto("Lista do seu estoque: ", lista));
        } catch(err: any){
            return fail(400, new BasicResponseDto(err.message, undefined));
        }
    }

    @Get("{id}")
    async filtrarLivroNoEstoque(
        @Path() id: number,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void>{
        try{
            const resultado = await this.estoqueService.filtrarLivroNoEstoque({ id: Number(id) });
            return success(200, new BasicResponseDto("Livro no estoque foi encontrado com sucesso!", resultado));
        } catch(err: any){
            return fail(400, new BasicResponseDto(err.message, undefined));
        }
    }

    @Put("{id}")
    async atualizarDisponibildade(
        @Path() id: number,
        @Body() dto: Partial<EstoqueDto>,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void>{
        try{
            const disponibilidadeAtualizada = await this.estoqueService.atualizarDisponibilidade({
                id: id,
                novaDisponibilidade: dto.disponibilidade
            });

            if (!dto.disponibilidade) {
                return fail(400, new BasicResponseDto("Campo 'disponibilidade' é obrigatório.", undefined));
            }

            return success(200, new BasicResponseDto("Disponibilidade atualizado com sucesso!", disponibilidadeAtualizada));
        } catch(err: any){
            return fail(400, new BasicResponseDto(err.message, undefined));
        }
    }

    @Delete("{id}")
    async removerLivroNoEstoque(
        @Path() id: number,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void>{
        try{
            const livroRemovido = await this.estoqueService.removerLivroNoEstoque(id);
            return success(200, new BasicResponseDto("Exemplar Deletado com sucesso em seu estoque!", livroRemovido))
        } catch(err: any){
            return fail(400, new BasicResponseDto(err.message, undefined));
        }
    }

}