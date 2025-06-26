export class LivroEntity{
    titulo: string;
    isbn: number;
    autor: string;
    editora: string;
    edicao: string;
    categoria: string;
    status: 'disponivel' | 'não-disponivel';

    constructor(titulo: string, isbn: number, autor: string, editora: string, edicao: string, categoria: string){
        if(!titulo || !isbn || !autor || !editora || !edicao || !categoria){
            throw new Error("Por favor informar todos os campos");
        }
        
        this.titulo = titulo;
        this.isbn = isbn;
        this.autor = autor;
        this.editora = editora;
        this.edicao = edicao;
        this.categoria = categoria;
        this.status = 'disponivel';
    }
}