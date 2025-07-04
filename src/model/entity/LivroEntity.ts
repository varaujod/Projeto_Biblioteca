export class LivroEntity{
    id: number;
    titulo: string;
    isbn: string;
    autor: string;
    editora: string;
    edicao: string;
    categoria: string;
    status: string;

    constructor(id?: number, titulo?: string, isbn?: string, autor?: string, editora?: string, edicao?: string, categoria?: string, status?: string){
        if(!titulo || !isbn || !autor || !editora || !edicao || !categoria){
            throw new Error("Por favor informar todos os campos");
        }
        this.id = id || 0;
        this.titulo = titulo;
        this.isbn = isbn;
        this.autor = autor;
        this.editora = editora;
        this.edicao = edicao;
        this.categoria = categoria;
        this.status = status || '';
    }
}