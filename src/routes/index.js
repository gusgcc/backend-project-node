/*listado de rutas que tenemos en el sistema*/
const express = require("express")
const router = express.Router();

const user = require("../controllers/userController")
const publicacion= require("../controllers/publicacionController")
//las rutas de nuestro aplicacion web
module.exports = app => {
    router.get('/', (req,res)=>{res.send('SERVER OK')})
    //user
    router.post("/usuarios",  user.register)//para registrarse
    router.post("/usuarioslogin", user.login) //para iniciar sesion
    router.get("/usuarios/:id", user.perfil)//obtine los datos del usuario :id (aunque realmente del token)
    router.put("/usuarios/:id", user.actualizar)//actualiza los datos del usuario :id (pero usa el dato del token)

    // APIs de publicacion para empleador

    //Publicacion
    router.post("/publicacion",publicacion.crearPublicacion)// para crear la publicacion
    router.get("/publicacion/:id",publicacion.mostrarPublicacion)// muestra todas las publicaciones por Usuario
    router.get("/publicacione/:idPublicacion",publicacion.mostrarPublicacionId)//muestra publicacion por Id
    router.put("/publicacion",publicacion.actualizarPublicacion)//actualizar el posteo
    router.delete("/publicacion/:id",publicacion.eliminar)//eliminar publicacion

    // APIs de publicacion para empleado
    router.get("/publicacion", publicacion.listarPublicaciones) // devuelve todas las publicaciones para que las vea un empleado
    router.get("/buscarPublicacion/:buscador",publicacion.buscadorPublicaciones)// devuelve los resultados de la busqueda


    app.use(router) //
}