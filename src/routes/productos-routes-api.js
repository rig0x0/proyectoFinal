const express = require('express')
const productosControllerApi = require('../controllers/productos-controller-api')
const router = express.Router();

//La Ruta (End Point) GET de todas las categorias 
router.get('/',productosControllerApi.getTodasProductos);

//La Ruta (End Point) GET de solo una categoria 
router.get('/:id',productosControllerApi.getProductosById);

//La Ruta (End point) AGREGAR = POST de una categoria
router.post('/',productosControllerApi.agregarProductos);

//La Ruta (End point) UPDATE = PUT de una categoria
router.put('/:id',productosControllerApi.updateProductos);

//La Ruta (End point) DELETE de una categoria
router.delete('/:id',productosControllerApi.deleteProductosById);

//Para poder usar el router en otro archivo .js o modulo
module.exports = router;