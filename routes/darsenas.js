/*
    Rutas de darsenas / dar

    host + /dar
*/


const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const { getDarsenas } = require('../controllers/darsenaController');

const router = Router();



router.get
    (
        '/darsenas',
        getDarsenas
    );




module.exports = router;