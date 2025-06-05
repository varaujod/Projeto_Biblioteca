import express from "express";
import { UsuarioController } from "./controller/UsuarioController";
import { LivroController } from "./controller/LivroController";
import { EstoqueController } from "./controller/EstoqueController";
import { EmprestimoController } from "./controller/EmprestimoController";
import { CategoriaUsuarioController } from "./controller/CategoriaUsuarioController";
import { CategoriaCursoController } from "./controller/CategoriaCursoController";

const usuarioController             = new UsuarioController();
const livroController               = new LivroController();
const estoqueController             = new EstoqueController();
const emprestimoController          = new EmprestimoController();
const categoriaUsuarioController    = new CategoriaUsuarioController();
const categoriaCursoController      = new CategoriaCursoController();

const app = express();

const PORT = process.env.PORT ?? 3090;
app.use(express.json());

function logInfo(){
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

// Catalogos

app.get("/library/catalogos/categorias-usuario", categoriaUsuarioController.listarCategoria.bind(categoriaUsuarioController));

app.get("/library/catalogos/cursos", categoriaCursoController.listarCurso.bind(categoriaCursoController));

// Listen 

app.listen(PORT, logInfo);