eventListeners();

function eventListeners() {
  document.querySelector('#formulario').addEventListener('submit', validarRegistro);
}

function validarRegistro(e) {
  e.preventDefault();

  var usuario = document.querySelector('#usuario').value,
      password = document.querySelector('#password').value,
      tipo = document.querySelector('#tipo').value;

      if(usuario == "" || password == ""){
        Swal.fire({
          type: 'error',
          title: 'Error',
          text: 'Ambos campos son obligatorios',
        });
      } else {
        //Ambos campos son correctos, mandar ejecutar AJAX

        //Crea los datos que se envían al servidor
        var datos = new FormData();
        datos.append('usuario', usuario);
        datos.append('password', password);
        datos.append('accion', tipo);

        //Crear el llamado AJAX

        var xhr = new XMLHttpRequest();

        //abrir la conexión
        xhr.open('POST', 'inc/modelos/modelo-admin.php', true);
        //retorno de datos

        xhr.onload = function(){
          if(this.status === 200) {
            var respuesta = JSON.parse(xhr.responseText);

            // Si la respuesta es correcta
            if(respuesta.respuesta === 'correcto'){
              // si es un nuevo usuarios
              if(respuesta.tipo === 'crear'){
                Swal.fire({
                  type: 'success',
                  title: 'Usuario creado',
                  text: 'El usuario se creó correctamente',
                });
              }
            } else {
                // Si hubo algún console.error
                Swal.fire({
                  type: 'error',
                  title: 'Error',
                  text: 'Hubo un error',
                });
              }
            }
          };

        //Enviar la petición
        xhr.send(datos);


      }
    }
