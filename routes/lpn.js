/*
    Rutas de lpns / lpn

    host + /lpn
*/


const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');



const { getLpn, getLpnByNombre, lpnCreate } = require('../controllers/lpnController');

const router = Router();



router.get
    (
        '/',
        getLpn
    );


//nuevo cambio ver si anda 
router.get
    (
        '/nom',
        getLpnByNombre
    );

router.post
    (
        '/new',
        check('nombre', 'El nombre del lpn es obligatorio').not().isEmpty().isLength({ min: 12, max: 20 }),
        validarCampos,
        lpnCreate
    );


module.exports = router;