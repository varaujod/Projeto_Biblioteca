export class Usuario{
    nome: string;
    cpf: number[];
    email: string;
    categoria: string;
    curso: string;

    constructor(nome: string, email: string, categoria: string, curso: string){
        this.nome = nome;
        this.cpf = this.meuCPF();
        this.email = email;
        this.categoria = categoria;
        this.curso = curso;
    }

    private meuCPF(): any{
        const cpfStr = this.cpf.toString();

        if(cpfStr.length != 11){
            throw new Error("O seu CPF não tem 11 digitos, por favor tente novamente!");
        }

        function sequenciaRepetida(): boolean{
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


        let soma = 0;

        for (let i = 0; i <= 11; i++){
            soma = soma + parseInt(cpfStr[i]);
        }

        let restOnze = soma % 11;
        let digitoVerificador = 0;
        let d = 11 - restOnze;

        if(restOnze < 2){
            digitoVerificador = 0;
        } else{
            digitoVerificador = d;
        }

        let valido;

        if(parseInt(cpfStr[9]) && digitoVerificador == 0){
            valido = "Valido";
        }else if(parseInt(cpfStr[9]) && digitoVerificador == d){
            valido = "Valido";
        }else{
            valido = "CPF falso";
        }
            
    }
        
            // return this.cpf;
    }
