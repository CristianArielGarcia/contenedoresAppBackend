/*
    Rutas de usuario / auth

    host + /auth

*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require("../helpers/isDate");


const { userCreate, userLogin } = require('../controllers/authController')

const router = Router();


router.post(
    '/singup',
    [
        check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
        check('password', 'El password debe tener al menos 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    userCreate);



router.post('/login', userLogin);




module.exports = router

