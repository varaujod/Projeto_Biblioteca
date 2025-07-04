export class EstoqueEntity{
    id: number;
    isbn: string;
    quantidade: number;
    quantidade_emprestada: number;
    disponibilidade: 'disponivel' | 'não-disponivel';

    constructor(id?: number, isbn?: string, quantidade?: number, quantidade_emprestada?: number){
        if(!isbn || !quantidade){
            throw new Error("Por favor informar todos os campos");
        }
        this.id = id || 0;
        this.isbn = isbn;
        this.quantidade = quantidade;
        this.quantidade_emprestada = quantidade_emprestada || 0;
        this.disponibilidade = 'disponivel';
    }
}