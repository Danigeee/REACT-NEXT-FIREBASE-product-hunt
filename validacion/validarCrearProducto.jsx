export default function validarCrearProducto(valores){
    let errores = {}

    //validar nombre de usuario
    if(!valores.nombre){
        errores.nombre = "El Nombre es obligatorio"
    }
    //validar empresa
    if(!valores.empresa){
        errores.empresa = "Nombre de empresa es obligatorio"
    }

    //validar la URL
    if(!valores.url){
        errores.url = "La URL es obligatoria"
    }else if(!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url) ){
        errores.url = "URL no valida"
    }

    //validar descripcion
    if(!valores.descripcion){
        errores.descripcion = "Agrega una descripcion"
    }

    return errores
}