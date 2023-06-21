const { request } = require('express');
const { miConexion } = require('../database/db');

const clientesAPI = {};

clientesAPI.getTodosClientes = async (req=request,res,next) =>{
    try {
        const conexion = await miConexion();
        const [rows] = await conexion.query('SELECT * FROM clientes');
        if(rows.length==0){
            res.status(404).json({
                estado:0,
                mensaje: "Registros no encontrados",
                categorias: rows
            });
        }else{
            res.status(200).json({
                estado: 1,
                mensaje: "Registros encontrados",
                categorias: rows
            })
        }
    } catch (error) {
        next(error);
    }
}

module.exports = clientesAPI;