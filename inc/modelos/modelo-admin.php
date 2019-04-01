<?php
  //die (json_encode($_POST));   comprobar

  $accion = $_POST['accion'];
  $password = $_POST['password'];
  $usuario = $_POST['usuario'];

  if($accion === 'crear') {
    // Código para crear los administradores
    //hashear password
    $opciones = array(
      'cost' => 12
    );
    $hash_password = password_hash($password, PASSWORD_BCRYPT, $opciones);

    $respuesta = array(
      'pass' => $hash_password
    );

    echo json_encode($respuesta);

  }


  if($accion === 'login') {
    // Código para que loguee
  }
