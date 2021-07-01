const { response, request } = require('express');
const { getAllLpn, getLpnByNombreRequest, createLpn } = require('../helpers/lpn/lpnRequest');




//GET
const getLpn = async (req, res = response) => {


    try {

        const respuesta = await getAllLpn();

        if (respuesta) {
            return res.status(200).json({
                ok: true,
                lpns: respuesta
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
            msg: 'Por favor hable con el administrador ----------------- ' + error.message
        })
    }

}


const getLpnByNombre = async (req = request, res = response) => {

    const { nombre } = req.query;
    try {

        const respuesta = await getLpnByNombreRequest(nombre);
        console.log('respuesta', JSON.stringify(respuesta))
        if (respuesta) {
            console.log(respuesta)
            return res.status(200).json({
                ok: true,
                lpns: respuesta
            })
        }
        else {
            res.status(200).json({
                ok: false,
                msg: 'No existen lpn que cargar'
            })
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }


}

//POST
const lpnCreate = async (req = request, res = response) => {

    const { nombre } = req.body

    try {

        createLpn(nombre);

        //solo se puede ejecutar 1 solo res.json
        res.status(201).json({
            ok: true
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador' + error
        })
    }

}

//PUT

//DELETE




module.exports = {

    getLpn,
    getLpnByNombre,
    lpnCreate

}