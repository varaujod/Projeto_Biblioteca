import { UsuarioService } from "./UsuarioService";

const usuarioService = new UsuarioService();

async function testarAtualizacao() {
    let usuarios = usuarioService.listarUsuarios();
    if (usuarios.length === 0) {
        usuarioService.novoUsuario({
             "nome": "Mara Carvalho",
            "cpf": 10638805139,
            "email": "maramara@gmail.com",
            "categoria": "Aluno",
            "curso": "Administração" 
        });
        usuarios = usuarioService.listarUsuarios();
    }

    usuarios[0].livrosAtrasados = 3;
    usuarios[0].diasSuspensao = 10;
    usuarios[0].status = "inativo";

    for(const usuario of usuarios){
        usuario.regularizarStatus();
        usuarioService.atualizaUsuario({ cpf: usuario.cpf, novosDados: usuario });
    }

    console.log(usuarioService.listarUsuarios());
}



testarAtualizacao();