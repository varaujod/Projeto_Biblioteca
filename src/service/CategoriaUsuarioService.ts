import { CategoriaUsuarioRepository } from "../repository/CategoriaUsuarioRepository";
import { CategoriaUsuario } from "../model/CategoriaUsuario";

export class CategoriaUsuarioService{
    private categoriaUsuarioRepository = CategoriaUsuarioRepository.getInstance();

    async listarCategorias(): Promise<CategoriaUsuario[]>{
        return await this.categoriaUsuarioRepository.listarCategoria();
    }
}