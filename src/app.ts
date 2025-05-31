import express from "express";
import { UsuarioController } from "./controller/UsuarioController";
import { LivroController } from "./controller/LivroController";
import { EstoqueController } from "./controller/EstoqueController";

const usuarioController = new UsuarioController();
const livroController = new LivroController();
const estoqueController = new EstoqueController();

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

// Listen 

app.listen(PORT, logInfo);