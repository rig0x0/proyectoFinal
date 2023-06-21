//alert('Hola mundo del Front de las categorias');
function getURL(){
  let URL = window.location.protocol + '//'+window.location.hostname;
  if(window.location.port){
    URL += ':'+window.location.port;
  }
  return URL;
}

let idEliminarCategoria=0;
let idActualizarCategoria=0;

function muestraUnaCategoria(id){
  let URL = getURL() + '/categorias/api/' + id;//params
  //alert(URL);
  $.ajax({
    method:'GET',
    url: URL,
    data: {},//Body
    success: function( result ) {
      if (result.estado == 1) {
        //Debemos mostrar la categoria en la ventana
        const categoria = result.categoria;
        //alert(categoria.descripcion);
        //Inputs de la vetana modal
        document.getElementById('descripcionCategoriaVisualizar').value=categoria.descripcion;
      }else{
        //Mostrar el mensaje de error
        alert(result.mensaje);
      }
    }
  });
}
//Funciones para comunicarnos con el back API - End Point
function listaCategoriaFront(){
    //Usamos la libreria jquery para JS
    
    let URL = getURL()+'/categorias/api';
    $.ajax({
        //Verbo (get,put,delete,post)
        method: 'GET',
        url: URL,
        data: {},
        success: function( result ) {
            let estado = result.estado;
            let mensaje = result.mensaje;
            
            if (estado == 1) {
                //Mostramos las categorias
                let categorias = result.categorias;
                let tabla = $('#tabla-categorias').DataTable();
              
                categorias.forEach(categoria => {
                    let Botones = Generabotones(categoria);
                    //alert(categoria.descripcion);
                    //tabla.row.add([categoria.descripcion,'Botons']).node.id='registro_'+categoria.id;
                    //tabla.row.add([categoria.descripcion,Botones]).node.id='registro_'+categoria.id;
                    let nuevoRenglon = tabla.row.add([categoria.descripcion,Botones]).node();
                    $(nuevoRenglon).attr('id', 'renglon_'+categoria.id);
                    $(nuevoRenglon).find('td').addClass('table-td');
                    tabla.draw( false );
                    
                }); 
            }else{
                alert(mensaje);
            }
        }
      });
}

function identificaIdEliminar(id){
  idEliminarCategoria = id;
  //alert(idEliminarCategoria);
}

listaCategoriaFront();

function EliminarCategoriaById(){
  $.ajax({
    method:'DELETE',
    url: getURL()+'/categorias/api/'+idEliminarCategoria,
    data: {},
    success: function( result ) {
      if(result.estado== 1){
        //1. Si se elimino de DB
        //2. Debemos de eliminarlo de la tabla 
        let tabla= $('#tabla-categorias').DataTable();
        tabla.row('#renglon_'+idEliminarCategoria).remove().draw();
        //Mostrar el mensaje agradable 
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
      }else{
        
        //Mostrar el mensaje de que no se elimino
      }
    }
  });
}

function identificarIdActualizar(id){
  idActualizarCategoria=id;
  $.ajax({
    method:'GET',
    url: getURL()+'/categorias/api/'+idActualizarCategoria,
    data: {},
    success: function( result ) {
      if(result.estado==1){
        let categoria = result.categoria;
        document.getElementById('nombreCategoriaActualizar').value=categoria.descripcion;
        //alert(categoria.descripcion);
      }else{
        alert(result.mensaje);
      }
    }
  });
}

function actualizarCategoriaById(){
  let descripcionCategoria =document.getElementById('nombreCategoriaActualizar').value;
  
  $.ajax({
    method:'PUT',
    url: getURL()+"/categorias/api/"+idActualizarCategoria,
    data: {
      descripcion:descripcionCategoria
    },
    success: function( result ) {
      if(result.estado==1){
        alert(result.mensaje);
        //Actualizar la tabla
        let tabla = $('#tabla-categorias').DataTable();
        ////////////////////////////////// ----- 3 Pasos ///////
        let renglonTemporal = tabla.row('#renglon_'+idActualizarCategoria).data();
        renglonTemporal[0]=descripcionCategoria;
        tabla.row('#renglon_'+idActualizarCategoria).data(renglonTemporal).draw();
        ////////////////////////////////// ----- 3 Pasos //////
      }else{
        alert(result.mensaje);
      }
    }
  });
}

function Generabotones(categoria){
  let Botones = '<div class="flex space-x-3 rtl:space-x-reverse">';
                  Botones += '<button onclick="muestraUnaCategoria('+categoria.id+');" data-bs-toggle="modal" data-bs-target="#viewModal" class="action-btn" type="button">'
                  Botones += '<iconify-icon icon="heroicons:eye"></iconify-icon>'
                  Botones += '</button>'

                  Botones += '<button onclick="identificarIdActualizar('+categoria.id+');" data-bs-toggle="modal" data-bs-target="#updateModal" class="action-btn" type="button">'
                  Botones += '<iconify-icon icon="heroicons:pencil-square"></iconify-icon>'
                  Botones += '</button>'

                  Botones += '<button onclick = "identificaIdEliminar('+categoria.id+');" data-bs-toggle="modal" data-bs-target="#deleteModal" class="action-btn" type="button">'
                  Botones += '<iconify-icon icon="heroicons:trash"></iconify-icon>'
                  Botones += '</button>'
                  Botones += '</div>';
  return Botones;
}

function AgragarCategoria(){
  const descripcion = document.getElementById('descripcionCategoriaAgregar').value;
  const URL = getURL() + "/categorias/api";
$.ajax({
  method:'POST', //Metodo
  url: URL, //End Point 
  data: { //Body
    descripcion: descripcion
  },
  success: function( result ) {
    if(result.estado==1){
      //Agregar la categoria a la tabla
      //Mandamos llamar a la categoria
      const categoria = result.categoria;
      let tabla = $('#tabla-categorias').DataTable();
      let botones = Generabotones(categoria);
      let nuevoRenglon = tabla.row.add([categoria.descripcion, botones]).node();
      // Linea agregada para el ID del renglo
      $(nuevoRenglon).attr('id', 'renglo_'+categoria.id);
      //----------------------------------------------------------
      $(nuevoRenglon).find('td').addClass('table-td');
      tabla.draw(false);
      //Limpiamos los campos
      document.getElementById('descripcionCategoriaAgregar').value='';
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Categoria guardada correctamente',
        showConfirmButton: false,
        timer: 1500
      })
    }else{
      alert(result.mensaje);
    }
  }
});
}