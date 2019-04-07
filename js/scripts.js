//jshint esversion: 6
eventListener();
//lista de proyectos
var listaProyectos = document.querySelector('ul#proyectos');

function eventListener(){
  //boton para crear proyecto
  document.querySelector('.crear-proyecto a').addEventListener('click', nuevoProyecto);

}

function nuevoProyecto(e){
  e.preventDefault();
  console.log("clic nuevo proyecto :)");

  // Crea un <input> para el nombre del proyecto
  var nuevoProyecto = document.createElement('li');
  nuevoProyecto.innerHTML = '<input type="text" id="nuevo-proyecto">';
  listaProyectos.appendChild(nuevoProyecto);

  // Seleccionar el id con el nuevoProyecto
  var inputNuevoProyecto = document.querySelector('#nuevo-proyecto');

  inputNuevoProyecto.addEventListener('keypress', function(e){
    var tecla = e.keyCode;

    if(tecla == 13){
      guardarProyectoDB(inputNuevoProyecto.value);
      listaProyectos.removeChild(nuevoProyecto);
    } else {
      console.log("no presionaste enter");
    }
  });
}

function guardarProyectoDB(nombreProyecto) {

  // Crear llamado Ajax
  var xhr = new XMLHttpRequest();

  // Enviar dato por FormDate
  var datos = new FormData();
  datos.append('proyecto', nombreProyecto);
  datos.append('accion', 'crear');

  // Abrir la conexión
  xhr.open('POST', 'inc/modelos/modelo-proyecto.php', true);

  // Carga
  xhr.onload = function() {
    if(this.status === 200){
      // Obtener datos de la $respuesta
      var respuesta = JSON.parse(xhr.responseText);
      var proyecto = respuesta.nombre_proyecto,
      id_proyecto = respuesta.id_insertado,
      tipo = respuesta.tipo,
      resultado = respuesta.respuesta;

      // Comprobar inserción
      if(resultado === 'correcto') {
        // fue xitoso
        if(tipo === 'crear') {
          // Se creo un nuevo proyecto
          var nuevoProyecto = document.createElement('li');
          nuevoProyecto.innerHTML = `
            <a href="index.php?id_proyecto=${id_proyecto}" id="${id_proyecto}">
              ${proyecto}
            </a>
          `;
          // Agregar al HTML
          listaProyectos.appendChild(nuevoProyecto);

          // enviar alerta
          Swal.fire({
            type: 'success',
            title: 'Proyecto guardado',
            text: 'El proyecto ' + proyecto + ' se creó correctamente',
          }).then(resultado => {
            // redireccionar a la nueva URL
            if(resultado.value){
              window.location.href = 'index.php?id_proyecto=' + id_proyecto;
            }
          });
        } else {
          // se actualizó o se eliminó
        }
      } else {
        //hubo un error
        Swal.fire({
          type: 'error',
          title: 'Error!',
          text: 'Hubo un error',
        });
      }
    }

  };

  // Enviar el XMLHttpRequest
  xhr.send(datos);

  //Inyectar el html

  /*
  var nuevoProyecto = document.createElement('li');
  nuevoProyecto.innerHTML = `
    <a href="#">
      ${nombreProyecto}
    </a>
  `;
  listaProyectos.appendChild(nuevoProyecto);
*/
}
