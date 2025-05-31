export class EstoqueEntity{
    isbn: number;
    cod: number;
    disponibilidade: 'disponivel' | 'não-disponivel';

    constructor(isbn: number, cod: number){
        this.isbn = isbn;
        this.cod = cod;
        this.disponibilidade = 'disponivel';
    }
}