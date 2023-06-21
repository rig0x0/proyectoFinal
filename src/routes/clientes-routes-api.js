const express = require('express');
const clientesControllerApi = require('../controllers/clientes-controller-api');
const router = express.Router();

router.get('/',clientesControllerApi.getTodosClientes);

module.exports = router;