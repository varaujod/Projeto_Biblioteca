import express from "express";
import { UsuarioController } from "./controller/UsuarioController";

const usuarioController = new UsuarioController();

const app = express();

const PORT = process.env.PORT ?? 3090;
app.use(express.json());

function logInfo(){
    console.log(`API em execucao no URL: http://localhost:${PORT}`);
}

app.post("/library/usuarios", usuarioController.criarUsuario.bind(usuarioController));
app.get("/library/usuarios", usuarioController.listarUsuarios);


app.listen(PORT, logInfo);
