/*
    Rutas de darsenas / dar

    host + /detalle
*/


const { Router } = require('express');

const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { getDetalleLpn, newDetalleLpn, getDetalleLpnByFecha, getDetalleLpnBySerie, getSerieHermanado } = require('../controllers/detalleController');

const router = Router();



router.get
    (
        '/',
        getDetalleLpn
    );

router.get
    (
        '/reporte',
        getDetalleLpnByFecha
    );

router.get
    (
        '/serie',
        getDetalleLpnBySerie
    );

router.get
    (
        '/hermanado',
        getSerieHermanado
    );


router.post
    (
        '/new',
        check('serie', 'El numero de serie es obligatorio').not().isEmpty().isLength({ min: 15, max: 15 }),
        check('iddarsena', 'El id de la darsena es obligatorio').not().isEmpty(),
        check('idlpn', 'El id del LPN es obligatorio').not().isEmpty(),
        validarCampos,
        newDetalleLpn,
    )

module.exports = router;
