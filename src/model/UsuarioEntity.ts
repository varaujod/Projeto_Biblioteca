export class UsuarioEntity{
    nome: string;
    cpf: number;
    email: string;
    categoria: string;
    curso: string;
    status: 'ativo' | 'inativo' | 'suspenso';
    diasSuspensao: number;
    livrosAtrasados: number;
    diasAtraso: number;

    constructor(nome: string, cpf: number, email: string, categoria: string, curso: string){
        this.nome = nome;
        this.cpf = this.meuCPF(cpf);
        this.email = email;
        this.categoria = categoria;
        this.curso = curso;
        this.status = "ativo";
        this.diasSuspensao = 0;
        this.livrosAtrasados = 0;
        this.diasAtraso = 0;
    }

    sequenciaRepetida(cpfStr: string): boolean{
        let repetido = true;

        for (let i = 0; i < cpfStr.length; i++) {
            if(cpfStr[i] !== cpfStr[0]) {
                repetido = false;
                continue;
            }
        }

        if(repetido == true){
            throw new Error("O CPF não pode ser uma sequência repetida!");
        } else{
            return true;
        }
    }

    verificarPrimeiroDigito(cpfStr: string): boolean{
        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpfStr[i]) * (10 - i);
        }

        let resto = soma % 11;
        let digito1;

        if(resto < 2){
            digito1 = 0;
        } else{
            digito1 = 11 - resto;
        }

        if(parseInt(cpfStr[9]) === digito1){
            return true;
        } else{
            throw new Error("O CPF é inválido!");
        }
    }

    verificarSegundoDigito(cpfStr: string): boolean{
        let soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpfStr[i]) * (11 - i);
        }

        let resto = soma % 11;
        let digito1;

        if(resto < 2){
            digito1 = 0;
        } else{
            digito1 = 11 - resto;
        }

        if(parseInt(cpfStr[10]) === digito1){
            return true;
        } else{
            throw new Error("O CPF é inválido!");
        }
    }

    private meuCPF(cpf: number): number{
        const cpfStr = cpf.toString();
        console.log(cpfStr);
        console.log(`Verificar sequencia: ${this.sequenciaRepetida(cpfStr)}, Primriro Digito: ${this.verificarPrimeiroDigito(cpfStr)}, Segundo Digito: ${this.verificarSegundoDigito(cpfStr)}`)

        if(cpfStr.length != 11){
            throw new Error("O seu CPF não tem 11 digitos, por favor tente novamente!");
        }

        const cpfArray: number[] = [];
        for (let i = 0; i < cpfStr.length; i++) {
            cpfArray[i] = Number(cpfStr[i]);
        }
        
        if(this.sequenciaRepetida(cpfStr)){
            
            if(this.verificarPrimeiroDigito(cpfStr)){
                if(this.verificarSegundoDigito(cpfStr)){
                    return parseInt(cpfArray.join(''));
                }
            }
        }
        throw new Error("CPF inválido ou não pode ser validado.");
    }

    atualizarStatusPorAtraso(diasAtraso: number): void {
        this.diasSuspensao += (diasAtraso * 3);
        
        if (this.diasSuspensao > 60) {
            this.status = "suspenso";
        }
    }

    atualizarLivrosAtrasados(quantidade: number): void {
        this.livrosAtrasados = quantidade;
        if (this.livrosAtrasados > 2) {
            this.status = "inativo";
        }
    }

    podeRealizarEmprestimo(): boolean {
        return this.status === "ativo";
    }

    regularizarStatus(): void {
        if (this.livrosAtrasados === 0 && this.diasSuspensao === 0) {
            this.status = "ativo";
        }
    }
}
