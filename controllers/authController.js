//importo de nuevo para tener el autocompletado
//con el res = express.response me aseguro de tenerlo
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { getUsuariosByUsername } = require('../helpers/user/login');
const { createUser } = require('../helpers/user/userCreate');


//POST
const userCreate = async (req, res = response) => {

    const { username, password } = req.body

    try {

        //Encriptar password
        const salt = bcrypt.genSaltSync();

        const password_encript = bcrypt.hashSync(password, salt);

        console.log(password_encript);




        createUser(username, password_encript);

        //solo se puede ejecutar 1 solo res.json
        res.status(201).json({
            ok: true,
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador' + error
        })
    }

}

//POST
const userLogin = async (req, res = response) => {

    const { username, password } = req.body;




    try {

        const respuesta = await getUsuariosByUsername(username);
        console.log('respuesta', JSON.stringify(respuesta))
        if (respuesta) {

            //confirmar los password


            //comparo el password de la peticion con el password de la db (usuario.password)
            //devuelve true si es igual sino false
            const validPassword = bcrypt.compareSync(password, respuesta[0].password);

            if (!validPassword) {
                res.status(500).json({
                    ok: false,
                    msg: 'Nombre de usuario o contraseña incorrecto.'
                })
            }
            return res.status(201).json({
                ok: true,
                username: respuesta[0].username
            })
        }
        else {
            res.status(500).json({
                ok: false,
                msg: 'Nombre de usuario o contraseña incorrecto.'
            })
        }

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador' + error
        })
    }


}





module.exports = {

    userCreate,
    userLogin,

}