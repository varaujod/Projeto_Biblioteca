import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepository";
import { CategoriaLivro } from "../model/CategoriaLivro";

export class CategoriaLivroService{
    private categoriaLivroRepository = CategoriaLivroRepository.getInstance();

    async listarCategoriaLivro(): Promise<CategoriaLivro[]>{
        return await this.categoriaLivroRepository.listarCategoriasLivro();
    }
}