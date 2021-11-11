const path=require('path');
const {body}=require('express-validator');//requiriendo validator-express

module.exports=[
    body('name').notEmpty().withMessage('tenes que escribir un nombre '),
    body('lastname').notEmpty().withMessage('tenes que escribir un apellido '),
    body('email')
    .notEmpty().withMessage('tenes que escribir un email correcto').bail()
    .isEmail().withMessage('tiene que ser un correo valido'),
    body('password').notEmpty().withMessage('tenes que escribir una contraseña '),
    body('avatar').custom((value, {req})=>{
        let file=req.file;
        let acceptedExtensions = ['.jpg','.png','.gif','.jpeg'];
        
        if(!file){
            throw new Error('tienes que subir una imagen')
        }else{
            let fileExtension=path.extname(file.originalname);
            if(!acceptedExtensions.includes(fileExtension)){
            throw new Error(`Las extenciones de archivo permitido son ${acceptedExtensions.join(" , ")} `);
        }
        }
       
        return true;
    })
]; //validaciones que nos da express-generato