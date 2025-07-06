"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoutes = RegisterRoutes;
const runtime_1 = require("@tsoa/runtime");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const UsuarioController_1 = require("./../controller/UsuarioController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const LivroController_1 = require("./../controller/LivroController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const EstoqueController_1 = require("./../controller/EstoqueController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const EmprestimoController_1 = require("./../controller/EmprestimoController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const CategoriaUsuarioController_1 = require("./../controller/CategoriaUsuarioController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const CategoriaLivroController_1 = require("./../controller/CategoriaLivroController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const CategoriaCursoController_1 = require("./../controller/CategoriaCursoController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const models = {
    "UsuarioDto": {
        "dataType": "refObject",
        "properties": {
            "nome": { "dataType": "string", "required": true },
            "cpf": { "dataType": "double", "required": true },
            "email": { "dataType": "string", "required": true },
            "categoria": { "dataType": "string", "required": true },
            "curso": { "dataType": "string", "required": true },
            "status": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["ativo"] }, { "dataType": "enum", "enums": ["inativo"] }, { "dataType": "enum", "enums": ["suspenso"] }] },
            "diasSuspensao": { "dataType": "double" },
            "livrosAtrasados": { "dataType": "double" },
            "diasAtraso": { "dataType": "double" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BasicResponseDto": {
        "dataType": "refObject",
        "properties": {
            "message": { "dataType": "string", "required": true },
            "object": { "dataType": "any", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LivroDto": {
        "dataType": "refObject",
        "properties": {
            "titulo": { "dataType": "string", "required": true },
            "isbn": { "dataType": "string", "required": true },
            "autor": { "dataType": "string", "required": true },
            "editora": { "dataType": "string", "required": true },
            "edicao": { "dataType": "string", "required": true },
            "categoria": { "dataType": "string", "required": true },
            "status": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EstoqueDto": {
        "dataType": "refObject",
        "properties": {
            "isbn": { "dataType": "string" },
            "quantidade": { "dataType": "double" },
            "quantidade_emprestada": { "dataType": "double" },
            "disponibilidade": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["disponivel"] }, { "dataType": "enum", "enums": ["não-disponivel"] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_EstoqueDto_": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "isbn": { "dataType": "string" }, "quantidade": { "dataType": "double" }, "quantidade_emprestada": { "dataType": "double" }, "disponibilidade": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["disponivel"] }, { "dataType": "enum", "enums": ["não-disponivel"] }] } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EmprestimoDto": {
        "dataType": "refObject",
        "properties": {
            "usuario": { "dataType": "double", "required": true },
            "codExemplar": { "dataType": "double", "required": true },
            "categoria": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new runtime_1.ExpressTemplateService(models, { "noImplicitAdditionalProperties": "throw-on-extras", "bodyCoercion": true });
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
function RegisterRoutes(app) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    const argsUsuarioController_criarUsuario = {
        dto: { "in": "body", "name": "dto", "required": true, "ref": "UsuarioDto" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
    };
    app.post('/usuario', ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController)), ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController.prototype.criarUsuario)), async function UsuarioController_criarUsuario(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_criarUsuario, request, response });
            const controller = new UsuarioController_1.UsuarioController();
            await templateService.apiHandler({
                methodName: 'criarUsuario',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsUsuarioController_listarUsuarios = {
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "202", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/usuario', ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController)), ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController.prototype.listarUsuarios)), async function UsuarioController_listarUsuarios(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_listarUsuarios, request, response });
            const controller = new UsuarioController_1.UsuarioController();
            await templateService.apiHandler({
                methodName: 'listarUsuarios',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsUsuarioController_filtrarUsuario = {
        cpf: { "in": "path", "name": "cpf", "required": true, "dataType": "double" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/usuario/:cpf', ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController)), ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController.prototype.filtrarUsuario)), async function UsuarioController_filtrarUsuario(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_filtrarUsuario, request, response });
            const controller = new UsuarioController_1.UsuarioController();
            await templateService.apiHandler({
                methodName: 'filtrarUsuario',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsUsuarioController_atualizarUsuario = {
        cpf: { "in": "path", "name": "cpf", "required": true, "dataType": "double" },
        dto: { "in": "body", "name": "dto", "required": true, "ref": "UsuarioDto" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.put('/usuario/:cpf', ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController)), ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController.prototype.atualizarUsuario)), async function UsuarioController_atualizarUsuario(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_atualizarUsuario, request, response });
            const controller = new UsuarioController_1.UsuarioController();
            await templateService.apiHandler({
                methodName: 'atualizarUsuario',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsUsuarioController_removerUsuario = {
        cpf: { "in": "path", "name": "cpf", "required": true, "dataType": "double" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.delete('/usuario/:cpf', ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController)), ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController.prototype.removerUsuario)), async function UsuarioController_removerUsuario(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_removerUsuario, request, response });
            const controller = new UsuarioController_1.UsuarioController();
            await templateService.apiHandler({
                methodName: 'removerUsuario',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsLivroController_criarLivro = {
        dto: { "in": "body", "name": "dto", "required": true, "ref": "LivroDto" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
    };
    app.post('/livro', ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController)), ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController.prototype.criarLivro)), async function LivroController_criarLivro(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_criarLivro, request, response });
            const controller = new LivroController_1.LivroController();
            await templateService.apiHandler({
                methodName: 'criarLivro',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsLivroController_listarLivros = {
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "202", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/livro', ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController)), ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController.prototype.listarLivros)), async function LivroController_listarLivros(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_listarLivros, request, response });
            const controller = new LivroController_1.LivroController();
            await templateService.apiHandler({
                methodName: 'listarLivros',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsLivroController_filtrarLivro = {
        isbn: { "in": "path", "name": "isbn", "required": true, "dataType": "string" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/livro/:isbn', ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController)), ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController.prototype.filtrarLivro)), async function LivroController_filtrarLivro(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_filtrarLivro, request, response });
            const controller = new LivroController_1.LivroController();
            await templateService.apiHandler({
                methodName: 'filtrarLivro',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsLivroController_atualizarLivro = {
        isbn: { "in": "path", "name": "isbn", "required": true, "dataType": "string" },
        dto: { "in": "body", "name": "dto", "required": true, "ref": "LivroDto" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.put('/livro/:isbn', ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController)), ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController.prototype.atualizarLivro)), async function LivroController_atualizarLivro(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_atualizarLivro, request, response });
            const controller = new LivroController_1.LivroController();
            await templateService.apiHandler({
                methodName: 'atualizarLivro',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsLivroController_removerLivro = {
        isbn: { "in": "path", "name": "isbn", "required": true, "dataType": "string" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.delete('/livro/:isbn', ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController)), ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController.prototype.removerLivro)), async function LivroController_removerLivro(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_removerLivro, request, response });
            const controller = new LivroController_1.LivroController();
            await templateService.apiHandler({
                methodName: 'removerLivro',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsEstoqueController_adicionarLivroNoEstoque = {
        dto: { "in": "body", "name": "dto", "required": true, "ref": "EstoqueDto" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.post('/estoque', ...((0, runtime_1.fetchMiddlewares)(EstoqueController_1.EstoqueController)), ...((0, runtime_1.fetchMiddlewares)(EstoqueController_1.EstoqueController.prototype.adicionarLivroNoEstoque)), async function EstoqueController_adicionarLivroNoEstoque(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsEstoqueController_adicionarLivroNoEstoque, request, response });
            const controller = new EstoqueController_1.EstoqueController();
            await templateService.apiHandler({
                methodName: 'adicionarLivroNoEstoque',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsEstoqueController_listarEstoque = {
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "202", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/estoque', ...((0, runtime_1.fetchMiddlewares)(EstoqueController_1.EstoqueController)), ...((0, runtime_1.fetchMiddlewares)(EstoqueController_1.EstoqueController.prototype.listarEstoque)), async function EstoqueController_listarEstoque(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsEstoqueController_listarEstoque, request, response });
            const controller = new EstoqueController_1.EstoqueController();
            await templateService.apiHandler({
                methodName: 'listarEstoque',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsEstoqueController_filtrarLivroNoEstoque = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/estoque/:id', ...((0, runtime_1.fetchMiddlewares)(EstoqueController_1.EstoqueController)), ...((0, runtime_1.fetchMiddlewares)(EstoqueController_1.EstoqueController.prototype.filtrarLivroNoEstoque)), async function EstoqueController_filtrarLivroNoEstoque(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsEstoqueController_filtrarLivroNoEstoque, request, response });
            const controller = new EstoqueController_1.EstoqueController();
            await templateService.apiHandler({
                methodName: 'filtrarLivroNoEstoque',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsEstoqueController_atualizarDisponibildade = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        dto: { "in": "body", "name": "dto", "required": true, "ref": "Partial_EstoqueDto_" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.put('/estoque/:id', ...((0, runtime_1.fetchMiddlewares)(EstoqueController_1.EstoqueController)), ...((0, runtime_1.fetchMiddlewares)(EstoqueController_1.EstoqueController.prototype.atualizarDisponibildade)), async function EstoqueController_atualizarDisponibildade(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsEstoqueController_atualizarDisponibildade, request, response });
            const controller = new EstoqueController_1.EstoqueController();
            await templateService.apiHandler({
                methodName: 'atualizarDisponibildade',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsEstoqueController_removerLivroNoEstoque = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.delete('/estoque/:id', ...((0, runtime_1.fetchMiddlewares)(EstoqueController_1.EstoqueController)), ...((0, runtime_1.fetchMiddlewares)(EstoqueController_1.EstoqueController.prototype.removerLivroNoEstoque)), async function EstoqueController_removerLivroNoEstoque(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsEstoqueController_removerLivroNoEstoque, request, response });
            const controller = new EstoqueController_1.EstoqueController();
            await templateService.apiHandler({
                methodName: 'removerLivroNoEstoque',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsEmprestimoController_novoEmprestimo = {
        dto: { "in": "body", "name": "dto", "required": true, "ref": "EmprestimoDto" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
    };
    app.post('/emprestimo', ...((0, runtime_1.fetchMiddlewares)(EmprestimoController_1.EmprestimoController)), ...((0, runtime_1.fetchMiddlewares)(EmprestimoController_1.EmprestimoController.prototype.novoEmprestimo)), async function EmprestimoController_novoEmprestimo(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsEmprestimoController_novoEmprestimo, request, response });
            const controller = new EmprestimoController_1.EmprestimoController();
            await templateService.apiHandler({
                methodName: 'novoEmprestimo',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsEmprestimoController_listarEmprestimos = {
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "202", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/emprestimo', ...((0, runtime_1.fetchMiddlewares)(EmprestimoController_1.EmprestimoController)), ...((0, runtime_1.fetchMiddlewares)(EmprestimoController_1.EmprestimoController.prototype.listarEmprestimos)), async function EmprestimoController_listarEmprestimos(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsEmprestimoController_listarEmprestimos, request, response });
            const controller = new EmprestimoController_1.EmprestimoController();
            await templateService.apiHandler({
                methodName: 'listarEmprestimos',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsEmprestimoController_filtraEmprestimoPorID = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/emprestimo/:id', ...((0, runtime_1.fetchMiddlewares)(EmprestimoController_1.EmprestimoController)), ...((0, runtime_1.fetchMiddlewares)(EmprestimoController_1.EmprestimoController.prototype.filtraEmprestimoPorID)), async function EmprestimoController_filtraEmprestimoPorID(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsEmprestimoController_filtraEmprestimoPorID, request, response });
            const controller = new EmprestimoController_1.EmprestimoController();
            await templateService.apiHandler({
                methodName: 'filtraEmprestimoPorID',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsEmprestimoController_registrarDevolucao = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.put('/emprestimo/:id', ...((0, runtime_1.fetchMiddlewares)(EmprestimoController_1.EmprestimoController)), ...((0, runtime_1.fetchMiddlewares)(EmprestimoController_1.EmprestimoController.prototype.registrarDevolucao)), async function EmprestimoController_registrarDevolucao(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsEmprestimoController_registrarDevolucao, request, response });
            const controller = new EmprestimoController_1.EmprestimoController();
            await templateService.apiHandler({
                methodName: 'registrarDevolucao',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsCategoriaUsuarioController_listarCategoria = {
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/categoria-usuario', ...((0, runtime_1.fetchMiddlewares)(CategoriaUsuarioController_1.CategoriaUsuarioController)), ...((0, runtime_1.fetchMiddlewares)(CategoriaUsuarioController_1.CategoriaUsuarioController.prototype.listarCategoria)), async function CategoriaUsuarioController_listarCategoria(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsCategoriaUsuarioController_listarCategoria, request, response });
            const controller = new CategoriaUsuarioController_1.CategoriaUsuarioController();
            await templateService.apiHandler({
                methodName: 'listarCategoria',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsCategoriaLivroController_listarCategoriaLivro = {
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/categoria-livros', ...((0, runtime_1.fetchMiddlewares)(CategoriaLivroController_1.CategoriaLivroController)), ...((0, runtime_1.fetchMiddlewares)(CategoriaLivroController_1.CategoriaLivroController.prototype.listarCategoriaLivro)), async function CategoriaLivroController_listarCategoriaLivro(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsCategoriaLivroController_listarCategoriaLivro, request, response });
            const controller = new CategoriaLivroController_1.CategoriaLivroController();
            await templateService.apiHandler({
                methodName: 'listarCategoriaLivro',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsCategoriaCursoController_listarCurso = {
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/categoria-cursos', ...((0, runtime_1.fetchMiddlewares)(CategoriaCursoController_1.CategoriaCursoController)), ...((0, runtime_1.fetchMiddlewares)(CategoriaCursoController_1.CategoriaCursoController.prototype.listarCurso)), async function CategoriaCursoController_listarCurso(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsCategoriaCursoController_listarCurso, request, response });
            const controller = new CategoriaCursoController_1.CategoriaCursoController();
            await templateService.apiHandler({
                methodName: 'listarCurso',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
