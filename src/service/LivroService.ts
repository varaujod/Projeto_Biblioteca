import { LivroEntity } from "../model/LivroEntity";
import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepository";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { LivroRepository } from "../repository/LivroRepository";

export class LivroService{
    private livroRepository = LivroRepository.getInstance();
    private categoriaLivroRepository = CategoriaLivroRepository.getInstance();
    private estoqueRepository = EstoqueRepository.getInstance();

    async novoLivro(data: any): Promise<LivroEntity>{
        if(!(await this.categoriaLivroRepository.encontrarCategoriaLivro(data.categoria))){
            throw new Error("Por favor informar uma categoria existente");
        }

        if(!this.livroRepository.validacaoISBN(data.isbn)){
            throw new Error("É necessário de 13 números obrigatorios da ISBN para cadastrar um livro!");
        }

        if(await this.livroRepository.validacaoLivro(data.isbn)){
            throw new Error("Este livro já é cadastrado!");
        }

        return await this.livroRepository.insereLivro(data);
    }

    filtrarLivro(data: any): Promise<LivroEntity | null>{
        const isbn = data.isbn;
        const livro = this.livroRepository.filtraLivroPorISBN(isbn);

        if(livro === null){
            throw new Error("Este livro ainda não foi cadastrado com esta ISBN!");
        }

        return livro;
    }

    async removeLivro(isbn: number): Promise<LivroEntity>{
        const exemplares = await this.estoqueRepository.listarEstoque();
        for(const exemplar of exemplares){
            const emprestimosAtivoDoLivro = await this.estoqueRepository.quantidadeLivrosEmprestados(exemplar.id);
            if (emprestimosAtivoDoLivro) {
                throw new Error("Não é possível remover o livro: há exemplares emprestados!");
            }
        }

        const livroRemovido = await this.livroRepository.removeLivroPorISBN(isbn);
        if(!livroRemovido){
            throw new Error("Livro não encontrado para remoção!");
        }
        return livroRemovido;
    }

    async listarLivros(): Promise<LivroEntity[]>{
        return await this.livroRepository.listarLivros();
    }

    async atualizaLivro(data: any): Promise<LivroEntity | null>{
        const isbn = Number(data.isbn);
        const novosDados = data.novosDados;

        if (novosDados.categoria) {
            if (!(await this.categoriaLivroRepository.encontrarCategoriaLivro(novosDados.categoria))) {
                throw new Error("Por favor informar uma categoria existente");
            }
        }

        return await this.livroRepository.atualizarLivroPorISBN(isbn, novosDados);
    }
}