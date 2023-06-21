const express = require('express');
const usuariosControllerAPI = require('../controllers/usuarios-controller-api');
const router = express.Router();

router.post('/',usuariosControllerAPI.agregarusuario);

module.exports=router;