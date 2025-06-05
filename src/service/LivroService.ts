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

    novoLivro(data: any): LivroEntity{
        if(!data.titulo || !data.isbn || !data.autor || !data.editora || !data.edicao || !data.categoria){
            throw new Error("Por favor informar todos os campos");
        }

        if(!this.categoriaLivroRepository.encontrarCategoriaLivro(data.categoria)){
            throw new Error("Por favor informar uma categoria existente");
        }

        if(this.livroRepository.validacaoLivro(data.isbn)){
            throw new Error("Este livro já é cadastrado!");
        } else{
            const livro = new LivroEntity(data.titulo, data.isbn, data.autor, data.editora, data.edicao, data.categoria);

            this.livroRepository.insereLivro(livro);

            return livro;
        }
    }

    filtrarLivro(data: any){
        const isbn = data.isbn;
        return this.livroRepository.filtraLivroPorISBN(isbn);
    }

    removeLivro(isbn: number){
        const exemplares = this.estoqueRepository.listarEstoque().filter(e => e.isbn === isbn);
        for(const exemplar of exemplares){
            const emprestimoAtivo = this.emprestimoRepository.filtraEmprestimoAtivoDoExemplar(exemplar.cod);
            if (emprestimoAtivo) {
                throw new Error("Não é possível remover o livro: há exemplares emprestados!");
            }
        }
        return this.livroRepository.removeLivroPorISBN(isbn);
    }

    listarLivros(){
        return this.livroRepository.listarLivros();
    }

    atualizaLivro(data: any){
        const isbn = data.isbn;
        const novosDados = data.novosDados;

        return this.livroRepository.atualizarLivroPorISBN(isbn, novosDados);
    }


}