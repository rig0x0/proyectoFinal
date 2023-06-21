//Requerimos la conexión a la base de datos
const { request } = require('express');
const { miConexion } = require('../database/db');

const productosAPI = {};

productosAPI.deleteProductosById = async (req=request,res,next)=>{
    try{
        const { id } = req.params;
        const conexion = await miConexion();
        const resultado = await conexion.query('DELETE FROM productos WHERE id = ?',[id]);
        if(resultado[0].affectedRows>0){
            res.status(200).json({
                estado: 1,
                mensaje: "Producto eliminado"
            });
        }else{
            res.status(404).json({
                estado: 0,
                mensaje: "Producto no encontrado"
            });
        }
    }catch(error) {
        next(error);
    }
}
//Vamos a actualizar una categoria
productosAPI.updateProductos = async (req=request,res=request,next) =>{
    try {
        const { descripcion} = req.body;
        const { id } = req.params;
        const {precio} = req.body;
        if(id==undefined || descripcion==undefined || precio==undefined){
            res.status(400).json({
                estado: 0,
                mensaje: "Solicitud incorrecta: Faltan parametros"
            });
        }else{
            const conexion = await miConexion();
            const resultado = await conexion.query('UPDATE productos SET precio = ?, descripcion = ? WHERE id = ?',[precio,descripcion,id]);
            if(resultado[0].affectedRows>0){
                res.status(200).json({
                    estado: 1,
                    mensaje: "Productoo actualizado",
                    descripcion: descripcion,
                    precio: precio
                });
            }else{
                res.status(404).json({
                    estado: 0,
                    mensaje: "Producto no actualizado"
                });
            }
        }
    } catch (error) {
        next(error);
    }
}
//Vamos a agregar una categoria
productosAPI.agregarProductos = async(req=request,res=request,next) =>{
    try {
        const { descripcion } = req.body;
        const{precio}= req.body;
        //Verificar que la solicitud se realice correctamente
        //Que nos mande los dos campos
        if( descripcion == undefined||precio==undefined){
            res.status(400).json({
                estado: 0,
                mensaje: "Solicitud incorrecta: Faltan parametros"
            })
        }else{
            const conexion = await miConexion();
            const resultado = await conexion.query('INSERT INTO productos(precio,descripcion) values(?,?)',[descripcion,precio]);
            if(resultado[0].affectedRows>0){
                res.status(201).json({
                    estado: 1,
                    mensaje: "Productos creado",
                    categoria:{
                    id: resultado[0].insertId,
                    descripcion: descripcion,
                    precio: precio
                }
                });
            }
        }
    } catch (error) {
        next(error);
    }
}
productosAPI.getProductosById = async(req=request,res,next) =>{
    try{
        //Recuperar el id de la categoría
        const { id } = req.params;
        const conexion = await miConexion();
        const [rows] = await conexion.query('SELECT * FROM productos WHERE id = ?',[id]);
        if(rows.length > 0){
            res.status(200).json({
                estado:1,
                mensaje: "Producto encontrada",
                categoria: rows[0]
            });
        }else{
            res.status(404).json({
                estado: 0,
                mensaje: "Producto no encontrada",
                categoria: []
            });
        }
    }catch(error){
        next(error);
    }
}
productosAPI.getTodasProductos = async (req,res, next)=>{
    try{
        const conexion = await miConexion();
        const [rows] = await conexion.query('SELECT * FROM productos');
        if(rows.length==0){
            res.status(404).json({
                estado:0,
                mensaje: "Registros no encontrados",
                productos: rows
            });
        }else{
            res.status(200).json({
                estado: 1,
                mensaje: "Registros encontrados",
                productos: rows
            })
        }
    }catch(error){
        next(error);
    }
}

//Exportar para poder usarlo en otro modulo
module.exports = productosAPI;
