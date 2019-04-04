<?php

//die(json_encode($_POST['accion'])); //comprobar

$accion = $_POST['accion'];
$password = $_POST['password'];
$usuario = $_POST['usuario'];

if ($accion === 'crear') {
  // Código para logear administradores

  // hashear passwords
  $opciones = array('cost' => 12);

  $hash_password = password_hash($password, PASSWORD_BCRYPT, $opciones);

  // importar la conexión
  include '../funciones/conexion.php';

  try {
    // Realizar la consulta a la base de datos
    $stmt = $conn->prepare(" INSERT INTO usuarios (usuario, password) VALUES (?, ?) ");
    $stmt->bind_param("ss", $usuario, $hash_password);
    $stmt->execute();
    if($stmt->affected_rows > 0){
        $respuesta = array(
          'respuesta' => 'correcto',
          'id_insertado' => $stmt->insert_id,
          'tipo' => $accion
        );
    } else {
      $respuesta = array(
        'respuesta' => 'error'
      );
    }
    $stmt->close();
    $conn->close();

  } catch (Exception $e) {
    // En caso de error, tomar la excepción
    $respuesta = array('pass' => $e->getMessage());
  }

  echo json_encode($respuesta);

}

if ($accion === 'login') {
  // Código que loguea a los administradores
  include '../funciones/conexion.php';

  try {
    // Seleccionar el administrador de la base de datos
    $stmt = $conn->prepare("SELECT usuario, id, password FROM usuarios WHERE usuario = ?");
    $stmt->bind_param('s', $usuario);
    $stmt->execute();
    // Loguear el usuario
    $stmt->bind_result($nombre_usuario, $id_usuario, $pass_usuario);
    $stmt->fetch();
    // Verificar si el usuario existe
    if($nombre_usuario){
      // Verificar si el password coincide
      if(password_verify($password, $pass_usuario)){
        //Iniciar sesion
        session_start();
        $_SESSION['nombre'] = $usuario;
        $_SESSION['id'] = $id_usuario;
        $_SESSION['login'] = true;

        //Login correcto
        $respuesta = array(
          'respuesta' => 'correcto',
          'nombre' => $nombre_usuario,
          'tipo' => $accion
        );
      } else {
        //Login incorrecto, enviar error
        $respuesta = array(
          'respuesta' => 'Password incorrecto'
        );
      }

    } else {
      $respuesta = array(
        'error' => 'Usuario no existe'
      );
    }

    $stmt->close();
    $conn->close();

  } catch (Exception $e) {
    // En caso de error, tomar la excepción
    $respuesta = array('pass' => $e->getMessage());
  }

  echo json_encode($respuesta);

}
