import { CategoriaUsuario } from "../model/CategoriaUsuario";
import { CategoriaUsuarioRepository } from "../repository/CategoriaUsuarioRepository";

export class CategoriaUsuarioService{
    private categoriaUsuarioRepository = CategoriaUsuarioRepository.getInstance();

    novaCategoria(data: any): CategoriaUsuario{
        if(!data.nome){
            throw new Error("Por favor informar todos os campos");
        }

        const novaCategoria = new CategoriaUsuario(data.nome);

        this.categoriaUsuarioRepository.insereCategoria(novaCategoria);

        return novaCategoria;
    }

    listarCategoria(){
        return this.categoriaUsuarioRepository.listarCategoria();
    }
}