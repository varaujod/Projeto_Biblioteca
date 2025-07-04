export class UsuarioEntity{
    id: number;
    nome: string;
    cpf: number;
    email: string;
    categoria: string;
    curso: string;
    status: 'ativo' | 'inativo' | 'suspenso';
    diasSuspensao: number;
    livrosAtrasados: number;
    diasAtraso: number;


    constructor(id?: number, nome?: string, cpf?: number, email?: string, categoria?: string, curso?: string){
        if(!nome || !cpf || !email || !categoria || !curso){
            throw new Error("Por favor informar todos os campos");
        }

        this.id = id || 0;
        this.nome = nome || '';
        this.cpf = cpf;
        this.email = email || '';
        this.categoria = categoria || '';
        this.curso = curso || '';
        this.status = "ativo";
        this.diasSuspensao = 0;
        this.livrosAtrasados = 0;
        this.diasAtraso = 0;
    }
}
