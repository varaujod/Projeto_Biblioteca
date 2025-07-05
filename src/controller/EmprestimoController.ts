import { Body, Controller, Delete, Get, Path, Post, Put, Res, Route, Tags, TsoaResponse } from "tsoa";
import { EmprestimoService } from "../service/EmprestimoService";
import { Request, Response } from "express";
import { EmprestimoDto } from "../model/dto/EmprestimoDto";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";

@Route("emprestimo")
@Tags("Emprestimo")
export class EmprestimoController extends Controller{
    emprestimoService = new EmprestimoService();

    @Post()
    async novoEmprestimo(
        @Body() dto: EmprestimoDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise<void>{
        try{
            const emprestimo = await this.emprestimoService.novoEmprestimo(dto);
            return success(201, new BasicResponseDto("Emprestimo realizado com sucesso!", emprestimo));
        } catch(err: any){
            return fail(400, new BasicResponseDto(err.message, undefined));
        }
    }

    @Get()
    async listarEmprestimos(
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<202, BasicResponseDto>
    ): Promise<void>{
        try{
            const lista = await this.emprestimoService.listarEmprestimos();
            const ativos = await this.emprestimoService.listarEmprestimosAtivos();
            const resultado = ({
                "message": "Emprestimos Ativos",
                "emprestimos": ativos,
                "historico": "Histórico de Emprestimo",
                "lista": lista
            });

            return success(202, new BasicResponseDto("Resposta: ", resultado));
        } catch(err: any){
            return fail(400, new BasicResponseDto(err.message, undefined));
        }
    }

    @Get("{id}")
    async filtraEmprestimoPorID(
        @Path() id: number,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void>{
        try{
            const emprestimoEncontrado = await this.emprestimoService.filtrarEmprestimoPorID({ id: Number(id)});
            return success(200, new BasicResponseDto("Emprestimo encontrado com sucesso!", emprestimoEncontrado));
        } catch(err: any){
            return fail(400, new BasicResponseDto(err.message, undefined));
        }
    }

    @Put("{id}")
    async registrarDevolucao(
        @Path() id: number,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void>{
        try{
            const devolucao = await this.emprestimoService.registrarDevolucao({
                id: id,
                novoStatus: "devolvido"
            });

            return success(200, new BasicResponseDto("Devolução registrada com sucesso!", devolucao));
        } catch(err: any){
            return fail(400, new BasicResponseDto(err.message, undefined));
        }
    }
}