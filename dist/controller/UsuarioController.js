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
exports.UsuarioController = void 0;
const UsuarioService_1 = require("../service/UsuarioService");
const tsoa_1 = require("tsoa");
const UsuarioDto_1 = require("../model/dto/UsuarioDto");
const BasicResponseDto_1 = require("../model/dto/BasicResponseDto");
let UsuarioController = class UsuarioController extends tsoa_1.Controller {
    usuarioService = new UsuarioService_1.UsuarioService();
    async criarUsuario(dto, fail, success) {
        try {
            const usuario = await this.usuarioService.novoUsuario(dto);
            return success(201, new BasicResponseDto_1.BasicResponseDto("Usuario criado com sucesso", usuario));
        }
        catch (err) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
        }
    }
    async listarUsuarios(fail, success) {
        try {
            const usuarios = await this.usuarioService.listarUsuarios();
            return success(202, new BasicResponseDto_1.BasicResponseDto("Usuários Cadastrados: ", usuarios));
        }
        catch (err) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
        }
    }
    async filtrarUsuario(cpf, fail, success) {
        try {
            const usuarioEncontrado = await this.usuarioService.filtrarUsuario({ cpf: Number(cpf) });
            return success(200, new BasicResponseDto_1.BasicResponseDto("Usuário encontrado com sucesso!", usuarioEncontrado));
        }
        catch (err) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
        }
    }
    async atualizarUsuario(cpf, dto, fail, success) {
        try {
            const usuarioAtualizado = await this.usuarioService.atualizaUsuario({
                cpf: cpf,
                novosDados: dto
            });
            return success(200, new BasicResponseDto_1.BasicResponseDto("Usuario atualizado com sucesso!", usuarioAtualizado));
        }
        catch (err) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
        }
    }
    async removerUsuario(cpf, fail, success) {
        try {
            const usuarioRemovido = await this.usuarioService.removeUsuario(cpf);
            return success(200, new BasicResponseDto_1.BasicResponseDto("Usuário Removido com sucesso!", usuarioRemovido));
        }
        catch (err) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
        }
    }
};
exports.UsuarioController = UsuarioController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UsuarioDto_1.UsuarioDto, Function, Function]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "criarUsuario", null);
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "listarUsuarios", null);
__decorate([
    (0, tsoa_1.Get)("{cpf}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "filtrarUsuario", null);
__decorate([
    (0, tsoa_1.Put)("{cpf}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __param(2, (0, tsoa_1.Res)()),
    __param(3, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UsuarioDto_1.UsuarioDto, Function, Function]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "atualizarUsuario", null);
__decorate([
    (0, tsoa_1.Delete)("{cpf}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "removerUsuario", null);
exports.UsuarioController = UsuarioController = __decorate([
    (0, tsoa_1.Route)("usuario"),
    (0, tsoa_1.Tags)("Usuário")
], UsuarioController);
