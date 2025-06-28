import { LivroEntity } from "../model/LivroEntity";
import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepository";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { LivroRepository } from "../repository/LivroRepository";

export class LivroService{
    private livroRepository = LivroRepository.getInstance();
    private categoriaLivroRepository = CategoriaLivroRepository.getInstance();
    private estoqueRepository = EstoqueRepository.getInstance();
    private emprestimoRepository = EmprestimoRepository.getInstance();

    async novoLivro(data: any): Promise<LivroEntity>{
        if(!this.categoriaLivroRepository.encontrarCategoriaLivro(data.categoria)){
            throw new Error("Por favor informar uma categoria existente");
        }

        if(!this.livroRepository.validacaoISBN(data.isbn)){
            throw new Error("É necessário de 13 números obrigatorios da ISBN para cadastrar um livro!");
        }

        if(this.livroRepository.validacaoLivro(data.isbn)){
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
        const exemplares = this.estoqueRepository.listarEstoque();
        for(const exemplar of exemplares){
            const emprestimosAtivoDoLivro = this.estoqueRepository.quantidadeLivrosEmprestados(exemplar.cod);
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
        const isbn = data.isbn;
        const novosDados = data.novosDados;

        return await this.livroRepository.atualizarLivroPorISBN(isbn, novosDados);
    }
}