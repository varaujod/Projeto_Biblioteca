import { CategoriaCursoRepository } from "../repository/CategoriaCursoRepository";
import { CategoriaCurso } from "../model/CategoriaCurso";

export class CategoriaCursoService{
    private categoriaCursoRepository = CategoriaCursoRepository.getInstance();

    async listarCursos(): Promise<CategoriaCurso[]>{
        return await this.categoriaCursoRepository.listarCursos();
    }
}