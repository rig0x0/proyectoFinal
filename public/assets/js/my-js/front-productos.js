
function getURL(){
    let URL = window.location.protocol + '//'+window.location.hostname;
    if(window.location.port){
      URL += ':'+window.location.port;
    }
    return URL;
  }
  
  let idEliminarProductos=0;
  let idActualizarProductos=0;
  
  function muestraUnProductos(id){
    let URL = getURL() + '/productos/api/' + id;//params
    //alert(URL);
    $.ajax({
      method:'GET',
      url: URL,
      data: {},//Body
      success: function( result ) {
        if (result.estado == 1) {
          const productos = result.productos;
          document.getElementById('PrecioProductosVisualizar').value=productos.precio;
          document.getElementById('ObservacionesProductosVisualizar').value=productos.descripcion;
        }else{
          alert(result.mensaje);
        }
      }
    });
  }

  function listaProductosFront(){
      let URL = getURL()+'/productos/api';
      $.ajax({
          method: 'GET',
          url: URL,
          data: {},
          success: function( result ) {
              let estado = result.estado;
              let mensaje = result.mensaje;
              if (estado == 1) {
                  let productos = result.productos;
                  let tabla = $('#tabla-productos').DataTable();
                
                  productos.forEach(productos => {
                      let Botones = Generabotones(productos);
                      let nuevoRenglon = tabla.row.add([productos.descripcion,Botones]).node();
                      $(nuevoRenglon).attr('id', 'renglon_'+productos.id);
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
    idEliminarProductos = id;
  }
  
  listaProductosFront();
  
  function EliminarProductosById(){
    $.ajax({
      method:'DELETE',
      url: getURL()+'/productos/api/'+idEliminarProductos,
      data: {},
      success: function( result ) {
        if(result.estado== 1){
          let tabla= $('#tabla-productos').DataTable();
          tabla.row('#renglon_'+idEliminarProductos).remove().draw();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
        }else{
        }
      }
    });
  }
  
  function identificarIdActualizar(id){
    idActualizarProductos=id;
    $.ajax({
      method:'GET',
      url: getURL()+'/productos/api/'+idActualizarProductos,
      data: {},
      success: function( result ) {
        if(result.estado==1){
          let productos = result.productos;
          document.getElementById('PrecioProductosActualizar').value=productos.precio;
          document.getElementById('DescripcionProductosActualizar').value=productos.descripcion;
        }else{
          alert(result.mensaje);
        }
      }
    });
  }
  
  function actualizarProductosById(){
    let descripcionProductos =document.getElementById('PrecioProductosActualizar').value;
    
    $.ajax({
      method:'PUT',
      url: getURL()+"/productos/api/"+idActualizarProductos,
      data: {
        descripcion:descripcionProductos
      },
      success: function( result ) {
        if(result.estado==1){
          alert(result.mensaje);
          let tabla = $('#tabla-productos').DataTable();
          let renglonTemporal = tabla.row('#renglon_'+idActualizarProductos).data();
          renglonTemporal[0]=descripcionProductos;
          tabla.row('#renglon_'+idActualizarProductos).data(renglonTemporal).draw();
        }else{
          alert(result.mensaje);
        }
      }
    });
  }
  
  function Generabotones(productos){
    let Botones = '<div class="flex space-x-3 rtl:space-x-reverse">';
                    Botones += '<button onclick="muestraUnaCategoria('+productos.id+');" data-bs-toggle="modal" data-bs-target="#viewModal" class="action-btn" type="button">'
                    Botones += '<iconify-icon icon="heroicons:eye"></iconify-icon>'
                    Botones += '</button>'
  
                    Botones += '<button onclick="identificarIdActualizar('+productos.id+');" data-bs-toggle="modal" data-bs-target="#updateModal" class="action-btn" type="button">'
                    Botones += '<iconify-icon icon="heroicons:pencil-square"></iconify-icon>'
                    Botones += '</button>'
  
                    Botones += '<button onclick = "identificaIdEliminar('+productos.id+');" data-bs-toggle="modal" data-bs-target="#deleteModal" class="action-btn" type="button">'
                    Botones += '<iconify-icon icon="heroicons:trash"></iconify-icon>'
                    Botones += '</button>'
                    Botones += '</div>';
    return Botones;
  }
  
  function AgragarProductos(){
    const descripcion = document.getElementById('descripcionProductosAgregar').value;
    const precio = document.getElementById('PrecioProductosAgregar').value;
    const URL = getURL() + "/productos/api";
  $.ajax({
    method:'POST',
    url: URL, 
    data: { 
        precio: precio,
      descripcion: descripcion
    },
    success: function( result ) {
      if(result.estado==1){
        const productos = result.productos;
        let tabla = $('#tabla-productos').DataTable();
        let botones = Generabotones(productos);
        let nuevoRenglon = tabla.row.add([productos.descripcion, botones]).node();
        $(nuevoRenglon).attr('id', 'renglo_'+productos.id);
        //----------------------------------------------------------
        $(nuevoRenglon).find('td').addClass('table-td');
        tabla.draw(false);
        //Limpiamos los campos
        document.getElementById('descripcionProductosAgregar').value='';
        document.getElementById('PrecioProductosAgregar').value='';
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Producto guardado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
      }else{
        alert(result.mensaje);
      }
    }
  });
  }