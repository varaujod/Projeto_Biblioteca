"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UsuarioController_1 = require("./controller/UsuarioController");
const LivroController_1 = require("./controller/LivroController");
const EstoqueController_1 = require("./controller/EstoqueController");
const EmprestimoController_1 = require("./controller/EmprestimoController");
const usuarioController = new UsuarioController_1.UsuarioController();
const livroController = new LivroController_1.LivroController();
const estoqueController = new EstoqueController_1.EstoqueController();
const emprestimoController = new EmprestimoController_1.EmprestimoController();
const app = (0, express_1.default)();
const PORT = process.env.PORT ?? 3090;
app.use(express_1.default.json());
function logInfo() {
    console.log(`API em execucao no URL: http://localhost:${PORT}`);
}
// Usuarios
app.post("/library/usuarios", usuarioController.criarUsuario.bind(usuarioController));
app.get("/library/usuarios", usuarioController.listarUsuarios.bind(usuarioController));
app.get("/library/usuarios/:cpf", usuarioController.filtrarUsuario.bind(usuarioController));
app.put("/library/usuarios/:cpf", usuarioController.atualizarUsuario.bind(usuarioController));
app.delete("/library/usuarios/:cpf", usuarioController.removerUsuario.bind(usuarioController));
// Livros
app.post("/library/livros", livroController.criarLivro.bind(livroController));
app.get("/library/livros", livroController.listarLivros.bind(livroController));
app.get("/library/livros/:isbn", livroController.filtrarLivro.bind(livroController));
app.put("/library/livros/:isbn", livroController.atualizarLivro.bind(livroController));
app.delete("/library/livros/:isbn", livroController.removerLivro.bind(livroController));
// Estoque
app.post("/library/estoque", estoqueController.adicionarLivroNoEstoque.bind(estoqueController));
app.get("/library/estoque", estoqueController.listarEstoque.bind(estoqueController));
app.get("/library/estoque/:cod", estoqueController.filtrarLivroNoEstoque.bind(estoqueController));
app.put("/library/estoque/:cod", estoqueController.atualizarDisponibildade.bind(estoqueController));
app.delete("/library/estoque/:cod", estoqueController.removerLivroNoEstoque.bind(estoqueController));
// Emprestimo
app.post("/library/emprestimos", emprestimoController.novoEmprestimo.bind(emprestimoController));
app.get("/library/emprestimos", emprestimoController.listarEmprestimos.bind(emprestimoController));
app.put("/library/emprestimos/devolucao/:id", emprestimoController.registrarDevolucao.bind(emprestimoController));
// Listen 
app.listen(PORT, logInfo);
