"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoController = void 0;
const tsoa_1 = require("tsoa");
const EmprestimoService_1 = require("../service/EmprestimoService");
const BasicResponseDto_1 = require("../model/dto/BasicResponseDto");
let EmprestimoController = class EmprestimoController extends tsoa_1.Controller {
    emprestimoService = new EmprestimoService_1.EmprestimoService();
    async novoEmprestimo(dto, fail, success) {
        try {
            const emprestimo = await this.emprestimoService.novoEmprestimo(dto);
            return success(201, new BasicResponseDto_1.BasicResponseDto("Emprestimo realizado com sucesso!", emprestimo));
        }
        catch (err) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
        }
    }
    async listarEmprestimos(fail, success) {
        try {
            const lista = await this.emprestimoService.listarEmprestimos();
            const ativos = await this.emprestimoService.listarEmprestimosAtivos();
            const resultado = ({
                "message": "Emprestimos Ativos",
                "emprestimos": ativos,
                "historico": "Histórico de Emprestimo",
                "lista": lista
            });
            return success(202, new BasicResponseDto_1.BasicResponseDto("Resposta: ", resultado));
        }
        catch (err) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
        }
    }
    async filtraEmprestimoPorID(id, fail, success) {
        try {
            const emprestimoEncontrado = await this.emprestimoService.filtrarEmprestimoPorID({ id: Number(id) });
            return success(200, new BasicResponseDto_1.BasicResponseDto("Emprestimo encontrado com sucesso!", emprestimoEncontrado));
        }
        catch (err) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
        }
    }
    async registrarDevolucao(id, fail, success) {
        try {
            const devolucao = await this.emprestimoService.registrarDevolucao({
                id: id,
                novoStatus: "devolvido"
            });
            return success(200, new BasicResponseDto_1.BasicResponseDto("Devolução registrada com sucesso!", devolucao));
        }
        catch (err) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
        }
    }
};
exports.EmprestimoController = EmprestimoController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Function, Function]),
    __metadata("design:returntype", Promise)
], EmprestimoController.prototype, "novoEmprestimo", null);
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], EmprestimoController.prototype, "listarEmprestimos", null);
__decorate([
    (0, tsoa_1.Get)("{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], EmprestimoController.prototype, "filtraEmprestimoPorID", null);
__decorate([
    (0, tsoa_1.Put)("{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], EmprestimoController.prototype, "registrarDevolucao", null);
exports.EmprestimoController = EmprestimoController = __decorate([
    (0, tsoa_1.Route)("emprestimo"),
    (0, tsoa_1.Tags)("Emprestimo")
], EmprestimoController);
