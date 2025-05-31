import { LivroEntity } from "../model/LivroEntity";
import { LivroRepository } from "../repository/LivroRepository";

export class LivroService{
    private livroRepository = LivroRepository.getInstance();

    novoLivro(data: any): LivroEntity{
        if(!data.titulo || !data.isbn || !data.autor || !data.editora || !data.edicao || !data.categoria){
            throw new Error("Por favor informar todos os campos");
        }

        if(data.categoria != "Romance" && data.categoria != "Computação" && data.categoria != "Letras" && data.categoria != "Gestão"){
            throw new Error("Por favor informar uma categoria existente");
        }

        const livro = new LivroEntity(data.titulo, data.isbn, data.autor, data.editora, data.edicao, data.categoria);

        this.livroRepository.insereLivro(livro);

        return livro;
    }

    filtrarLivro(data: any){
        const isbn = data.isbn;
        return this.livroRepository.filtraLivroPorISBN(isbn);
    }

    removeLivro(isbn: number){
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