import { LivroEntity } from "../model/LivroEntity";

export class LivroRepository{
    private static instance: LivroRepository;
    private LivroList: LivroEntity[] = [];

    private constructor() {}

    public static getInstance(): LivroRepository{
        if(!this.instance){
            this.instance = new LivroRepository();
        }
        return this.instance;
    }

    insereLivro(livro: LivroEntity){
        this.LivroList.push(livro);
    }

    filtraLivroPorISBN(isbn: number){
        return this.LivroList.find(livro => livro.isbn === isbn);
    }

    removeLivroPorISBN(isbn: number){
        const index = this.findIndex(isbn);
        return this.LivroList.splice(index, 1);
    }

    atualizarLivroPorISBN(isbn: number, novosDados: any){
        const index = this.findIndex(isbn);
        const livro = this.LivroList[index];

        if(novosDados.titulo){
            livro.titulo = novosDados.titulo;
        }

        if(novosDados.autor){
            livro.autor = novosDados.autor;
        }

        if(novosDados.editora){
            livro.editora = novosDados.editora;
        }

        if(novosDados.edicao){
            livro.edicao = novosDados.edicao;
        }

        if(novosDados.categoria){
            livro.categoria = novosDados.categoria;
        }
    }

    listarLivros(): LivroEntity[]{
        return this.LivroList;
    }

    private findIndex(isbn: number): number{
        const index = this.LivroList.findIndex(livro => livro.isbn == isbn);

        if(index == -1){
            throw new Error("ISBN informado não foi encontrado!");
        }

        return index;
    }
}