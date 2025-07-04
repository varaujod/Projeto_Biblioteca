export class EstoqueDto{
    isbn?: string;
    quantidade?: number;
    quantidade_emprestada?: number;
    disponibilidade?: 'disponivel' | 'não-disponivel';

    constructor(isbn?: string, quantidade?: number, quantidade_emprestada?: number, disponibilidade?: 'disponivel' | 'não-disponivel') {
        this.isbn = isbn;
        this.quantidade = quantidade;
        this.quantidade_emprestada = quantidade_emprestada ?? 0;
        this.disponibilidade = disponibilidade;
    }
}