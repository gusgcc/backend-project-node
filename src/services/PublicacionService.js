const publicacionService = {}
const jwt = require("jsonwebtoken")
var mongoose = require('mongoose');
const Publicacion = require("../models/modelosBD/Publicacion")//importamos el modelo el usuario


publicacionService.crearPublicacion = async (CrearPublicacionModel,parametro) => {//recibe los datos correctos ya validados
    //let emailUser = await User.findOne({ email: CrearUsuarioModel.email });
    //creamos nueva publicacion
        const newPublicacion = new Publicacion({
            titulo: CrearPublicacionModel.titulo,
            subtitulo: CrearPublicacionModel.subtitulo,
            descripcion: CrearPublicacionModel.descripcion,
            idUsuario:parametro
          
        })
        //newUser.password = await newUser.encryptPassword(CrearUsuarioModel.password)
        await newPublicacion.save()
        return true;
    
}
publicacionService.traerPublicacion = async (idUsuario) => {
    try {
        let publicacion = await Publicacion.find({idUsuario:idUsuario});
        
        console.log(publicacion)
        //let { password, ...rest } = publicacion.toObject();//devolvemos todos loos campos excepto password
        return publicacion;
    } catch (error) {
        return null;
    }
}
publicacionService.traerPublicacionId = async (idPosteado) => {
    try {
        let publicacion = await Publicacion.findById(idPosteado);
        
        console.log(publicacion)
        //let { password, ...rest } = publicacion.toObject();//devolvemos todos loos campos excepto password
        return publicacion;
    } catch (error) {
        return null;
    }
}
//cuando incia sesion
/*publicacionService.generarToken = async (IniciarSesionModel) => {
    let user = await User.findOne({ email: IniciarSesionModel.email })//user es un documento
    if (user && await user.matchPassword(IniciarSesionModel.password)) {//si existe user y la contraseña coincide
        let token = jwt.sign(//firmamos el token
            {//primer parametro es payload
                //data que queremos firmar
                id: user.id,//guardamos el id en el toke, para hacer consultas siempre leeremos el id del token, no los pasados por parametros
                //en caso la ruta necesite el id, se debe de corroborar que sea el mismo del token, si no coinciden entonces error.
                email: user.email,
                extra: Date.now() * Math.random() * 1000//un dato aleatoriio extra para genera mayor complejidad
            },
            //segundo parametro es KEY
            process.env.KEY_SECRET,
            //tercer parametro son las opciones de token
            {
                expiresIn: "100 min",
            }
        )
        let { id, email } = user
        return {//retornamos un json con los valores que importan
            id, email, token
        }
    } else {
        return false;//es decir no coincide la contraseña o user no existe
    }
}*/
//metodo actualizar los datos del usario, recibe los datos a actualizar , y el id del usuario proveniente del token
publicacionService.actualizar = async function (ActualizarUsuarioModel) {
    //console.log("datos a actualizar ", ActualizarUsuarioModel)
    //let {email, password, id, _id, ...resto } = ActualizarUsuarioModel;//retiramos los campos que no se pueden cambiar
    console.log("datos a guardar ", ActualizarUsuarioModel);
    var id = mongoose.Types.ObjectId(ActualizarUsuarioModel.id);
    const publicacion = await Publicacion.findByIdAndUpdate(id ,{titulo:ActualizarUsuarioModel.titulo,
                                                                        subtitulo:ActualizarUsuarioModel.subtitulo,
                                                                        descripcion:ActualizarUsuarioModel.descripcion} )
    if (publicacion) {//si existe el usario. ¿si tiene token entonces si existe el usuario???
        //luego de actualizar devuelve user que esl doc sin modificar
        //por eso llamamos a traer perfil que devuelve un json o null
        return await this.traerPublicacionId(ActualizarUsuarioModel.id)
    }
    else {
        false
    }
}
module.exports = publicacionService;