const { response } = require('express');
const { getAllDarsenas } = require('../helpers/darsena/darsenasRequest');




//GET
const getDarsenas = async (req, res = response) => {


    try {
        const respuesta = await getAllDarsenas();
        if (respuesta) {
            console.log(respuesta)
            return res.status(201).json({
                ok: true,
                darsenas: respuesta
            })
        }
        else {
            res.status(500).json({
                ok: false,
                msg: 'No existen darsenas que cargar'
            })
        }

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador' + error
        })
    }

}

//POST

//PUT

//DELETE




module.exports = {

    getDarsenas,

}