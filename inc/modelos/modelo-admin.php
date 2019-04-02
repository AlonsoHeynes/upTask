<?php

//die(json_encode($_POST['accion'])); //comprobar

$accion = $_POST['accion'];
$password = $_POST['password'];
$usuario = $_POST['usuario'];

if ($accion === 'crear') {
  // Código para logear administradores

  // hashear passwords
  $opciones = array(
    'cost' => 12
  );
  $hash_password = password_hash($password, PASSWORD_BCRYPT, $opciones);

  $respuesta = array(
    'pass' => $hash_password
  );

  echo json_encode($respuesta);
}
