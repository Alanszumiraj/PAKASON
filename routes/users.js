const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/usersControllers');
const logueadoMW = require('../middlewares/logeadoMW');
const {check,validationResult,body} = require('express-validator');
const { User } = require('../database/models');

router.get('/register', usersControllers.register);


router.post('/register',[
    check('email').isEmail().withMessage('El email debe ser un email valido'),
    check('password').isLength({min:8}).withMessage('La contraseña debe tener al menos 8 caracteres'),
    check('retype').isLength({min:8}).withMessage('Las Contraseñas no coinciden'),
    body('email').custom(function(value){

        User.findAll()
           .then(users => {

            if(users.email==value){
                return false;
             }
           })
           return true;
           
    }).withMessage('El usuario ya esta en uso')

],usersControllers.processRegister);


router.get('/login',usersControllers.login);
router.post('/login',usersControllers.processLogin);
router.get('/carrito', logueadoMW,usersControllers.cart);
router.get('/check',usersControllers.check);
router.post('/logout',usersControllers.logout);

module.exports = router;