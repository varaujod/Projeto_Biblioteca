import { CategoriaCurso } from "../model/CategoriaCurso";

export class CategoriaCursoRepository{
    private static instance: CategoriaCursoRepository;
    private CategoriaCursoList: CategoriaCurso[] = [];
    
    private constructor() {
        this.CategoriaCursoList.push(new CategoriaCurso("ADS"));
        this.CategoriaCursoList.push(new CategoriaCurso("Pedagogia"));
        this.CategoriaCursoList.push(new CategoriaCurso("Administração"));
    };
    
    public static getInstance(): CategoriaCursoRepository{
        if(!this.instance){
            this.instance = new CategoriaCursoRepository();
        }
    
        return this.instance;
    }

    listarCursos(){
        return this.CategoriaCursoList;
    }

    encontrarCurso(cur: string){
        return this.CategoriaCursoList.find(curso => curso.nome === cur);
    }
}