//Definir variables
const express = require('express'); //HTTP
const hbs = require('hbs'); // HTML - Dinamico
const cors = require('cors'); 
const bodyparser =  require('body-parser'); // Procesar solicitudes POST
const port = process.env.PORT || 3000; // Puerto

const rutasCategoriasAPI = require('./src/routes/categorias-routes-api');
const rutasClientesAPI = require('./src/routes/clientes-routes-api');
const rutasUsuariosAPI = require('./src/routes/usuarios-routes-api');
const rutasAuthAPI = require('./src/routes/auth-routes-api');
const rutasProductosAPI = require('./src/routes/productos-routes-api');

const app = express();
//boton de vistas - HTML dinamicos
app.set('view engine','hbs');
hbs.registerPartials(__dirname+'/views/partial',()=>{});

//Middleware - use
app.use(express.static('public'));
app.use(bodyparser.urlencoded( { extended: true } ) );
app.use(bodyparser.json());

//Me regresa en formato JSON los datos de categoria
app.use('/categorias/api',rutasCategoriasAPI);
app.use('/usuarios/api', rutasUsuariosAPI);
app.use('/auth/api',rutasAuthAPI);
//app.use('/productos/api',rutasProductosAPI);
app.use('/clientes/api',rutasClientesAPI);
app.use('/productos/api', rutasProductosAPI);


app.get('/',(req,res)=>{
    res.render('login')
})

app.get('/categorias',(req,res)=>{
    res.render('categorias')
})

app.get('/facturas',(req,res)=>{
    res.render('facturas')
})

app.get('/productos',(req,res)=>{
    res.render('productos')
})

app.get('/clientes',(req,res)=>{
    res.render('clientes')
})

app.get('/proveedores',(req,res)=>{
    res.render('proveedores')
})

app.get('/ventas',(req,res)=>{
    res.render('ventas')
})

app.get('/menu',(req,res)=>{
    res.render('index')
})

app.get('*',(req,res)=>{
    res.render('404');
})
//Esta parte es para el desarrollador
app.listen(port,()=>{
    console.log('El servidor expressesta corriendo  en el puerto: ', port)
})