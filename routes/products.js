const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const multer = require('multer');
const path = require('path');

//Multer
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/../public/img/productos')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({ storage: storage })

//Multer




//Rutas

router.get('/', productsController.categories);


router.get('/create',productsController.create);
router.post('/create',upload.single('img'),productsController.store);

router.get('/detail/:productId',productsController.detail);

router.get('/edit/:productId',productsController.edit);
router.post('/edit/:productId',upload.single('img'),productsController.update);

router.post('/delete/:id',productsController.destroy);

router.get('/:id',productsController.mostrarPorCategoria);



module.exports = router;