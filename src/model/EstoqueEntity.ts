export class EstoqueEntity{
    isbn: number;
    cod: number;
    quantidade: number;
    quantidade_emprestada: number;
    disponibilidade: 'disponivel' | 'não-disponivel';

    constructor(isbn: number, cod: number, quantidade: number, quantidade_emprestada: number){
        this.isbn = isbn;
        this.cod = cod;
        this.quantidade = quantidade
        this.quantidade_emprestada = quantidade_emprestada
        this.disponibilidade = 'disponivel';
    }
}