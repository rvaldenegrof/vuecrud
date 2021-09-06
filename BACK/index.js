const express = require("express");
const cors = require("cors");

const app = express();

let IdRef = 3;
let Usuarios = [
  { id: 1, nombre: "Luis", apellido: "Arancibia", email:"test@test.cl", edad: 29 },
  { id: 2, nombre: "Christian", apellido: "Diaz", email:"test@test.cl", edad: 28 },
  { id: 3, nombre: "Angeles", apellido: "Oliva", email:"test@test.cl", edad: 27 },
];

const UsuariosRouter = express.Router();

//Lista todos los usuarios
UsuariosRouter.get("/usuarios", (req, res) => {
  res.json(Usuarios);
})
//Busca usuario por id
  .get("/usuarios/:id", (req, res) => {
    const usuario = Usuarios.find(
      (usuario) => usuario.id === Number.parseInt(req.params.id)
    );

    if (usuario) {
      res.json(usuario);
    } else {
      res.sendStatus(404);
    }
  })
  // Crea un nuevo usuario
  .post("/usuarios", (req, res) => {
    const nuevoUsuario = { ...req.body, id: ++IdRef };
    console.log(nuevoUsuario)
    Usuarios.push(nuevoUsuario);
    res.json(nuevoUsuario);
  })
  //Actualiza un usuario
  .put("/usuarios/:id", (req, res) => {
    const usuarioIndex = Usuarios.findIndex(
      (usuario) => usuario.id === Number.parseInt(req.params.id)
    );

    if (usuarioIndex !== -1) {
      Usuarios[usuarioIndex] = {
        ...req.body,
        id: Usuarios[usuarioIndex].id,
      };
      res.send(Usuarios[usuarioIndex]);
    } else {
      res.sendStatus(404);
    }
  })
  //Elimina un usuario
  .delete("/usuario/:id", (req, res) => {
    const usuarioIndex = Usuarios.findIndex(
      (usuario) => usuario.id === Number.parseInt(req.params.id)
    );

    if (usuarioIndex !== -1) {
      Usuarios.splice(usuarioIndex, 1);
      res.send();
    } else {
      res.sendStatus(404);
    }
  });

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());
app.use("/api", UsuariosRouter);
app.listen(3001, undefined, () => {
  console.log("Servidor iniciado");
});
