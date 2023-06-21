const express=require('express');
const authControllerAPI = require('../controllers/auth-controller-api');
const router = express.Router();

router.post('/login', authControllerAPI.login);
router.delete('/logout',);

module.exports=router;