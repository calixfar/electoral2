import Usuario from './../../models/Usuario'

obtenerUsuario = (root, args, {usuarioActual}) => {
    if(!usuarioActual){
        return null;
    }
    console.log(usuarioActual);
    const usuario = Usuario.findOne({usuario: usuarioActual.usuario})
    return usuario;
}