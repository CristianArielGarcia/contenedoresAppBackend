const { response } = require('express');
const { getAllDetalles, insertarDetalle, getAllDetallesByFecha, getAllDetallesBySerie, getExisteSerieHermanado } = require('../helpers/detalle/detallesRequest');




//GET
const getDetalleLpn = async (req, res = response) => {


    const { iddarsena, idlpn } = req.query;


    try {

        const respuesta = await getAllDetalles(iddarsena, idlpn);

        if (respuesta) {

            //lo que devuelve la consulta
            return res.status(201).json({
                ok: true,
                detalles: respuesta.recordset,//devuelvo los registros
                cantidad: respuesta.rowsAffected[0] //aca la cantidad
            })
        }
        else {
            res.status(202).json({
                ok: false,
                msg: 'No existen detalles que cargar.'
            })
        }

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'No existen LPNs asociados a esa darsena...' + error
        })
    }


}



const getDetalleLpnByFecha = async (req, res = response) => {


    const { iddarsena, idlpn, fecha_desde, fecha_hasta } = req.query;


    try {

        const respuesta = await getAllDetallesByFecha(iddarsena, idlpn, fecha_desde, fecha_hasta);
        console.log('respuesta', JSON.stringify(respuesta.recordset));


        if (respuesta) {
            console.log(respuesta.recordset);//lo que devuelve la consulta
            return res.status(201).json({
                ok: true,
                num_series: respuesta.recordset,//devuelvo los registros
            })
        }
        else {
            res.status(500).json({
                ok: false,
                msg: 'No existen detalles que cargar.'
            })
        }

    } catch (error) {
        res.status(202).json({
            ok: false,
            msg: 'No existen LPNs asociados a esa darsena...'
        })
    }


}

const getDetalleLpnBySerie = async (req, res = response) => {


    const { numero_serie } = req.query;


    try {

        const respuesta = await getAllDetallesBySerie(numero_serie);
        //console.log('respuesta', JSON.stringify(respuesta.recordset));


        if (respuesta) {
            return res.status(200).json({
                ok: true,
                existe: true,
                msg: 'El número de serie ya fue cargado.'
            })
        }
        else {
            res.status(200).json({
                ok: true,
                existe: false,
            })
        }

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error' + error
        })
    }


}



const getSerieHermanado = async (req, res = response) => {


    const { numero_serie } = req.query;


    try {

        const respuesta = await getExisteSerieHermanado(numero_serie);
        //console.log('respuesta', JSON.stringify(respuesta.recordset));


        if (respuesta) {
            return res.status(200).json({
                ok: true,
                existe: true,
            })
        }
        else {
            res.status(200).json({
                ok: true,
                existe: false,
                msg: 'El numero de serie no fue hermanado.'
            })
        }

    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: 'Error' + error
        })
    }


}







//POST

//PUT
const newDetalleLpn = (req, res = response) => {

    const { serie, iddarsena, idlpn } = req.body;

    try {

        insertarDetalle(serie, iddarsena, idlpn);

        res.status(200).json({
            ok: true
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador ----- ' + error.message
        })
    }

}

//DELETE




module.exports = {

    getDetalleLpn,
    newDetalleLpn,
    getDetalleLpnByFecha,
    getDetalleLpnBySerie,
    getSerieHermanado,


}