const usuario = require('../controllers/usuario')
// importar librería para cifrar y comparar las contraseña 
const bccrypt = require('bccrypts')

//funcion asincronica para comparar la contraseña proporcionada con el hash almacenado 

async function comparePassword(planintexPasword, hash){
    const result = await bccrypt.compare(planintexPasword, hash)
    return result;
}
//crear una funcion de inicio de seccion
const login=async(req,res)=>{
    const {email,password}=req.body //extrae el email y la contraseña del cuerpo y la solicitud
    //Busca un usuario en la base de datos que coicida con el emalil
    const usuario = await Usuario.findOne({email})
    try{
        //verificar que el ususario exista en la base de datos 
        if(!usuario){
            return res.status(400).json
            ({message:'correo electronico no encontrado'})
        }
        if(!usuario.estado){
            return res.status(400).json
            ({message:'Usuario inactivo'})
        }
        //comparar la contraseña proporcionada con el hash almacenado
        resultado = await comparePassword(password,usuario.password)
        if(resultado==true){
            return res.status(400).json
            ({message:'Contraseña correcta'})
        }
        else{
            return res.status(400).json
            ({message:'Contraseña incorrecta'})
        }
    }
    catch(error){
        //manejar errores y enviar respuestas de error con el codigo de estado 400
        res.status(400).json({
        msg: 'Apreciado usuario conacte al administrador'
        }) 
    }
    

}
//exporta la funcion de inicio para que este disponible para otros modulos
module.exports={login}


