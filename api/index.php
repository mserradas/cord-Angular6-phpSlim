<?php

require_once 'vendor/autoload.php';

use Slim\App;
use Slim\Slim;
// Configuración de cabeceras
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER['REQUEST_METHOD'];
if($method == "OPTIONS") {
    die();
}

$app = new App();

	$dbhost="127.0.0.1";    // IP 
    $dbuser="testing";		// User DB
    $dbpass="e9dwga2dgi=v"; // PasswordDB
    $dbname="web-testing";  // DB
	$db = new mysqli(
		$dbhost,   
		$dbuser, 	  
		$dbpass, 		  
		$dbname
	);

// Listar Todos los Vendedores
$app->get("/vendedores", function() use($app, $db) {
	
	try{
		$sql = 'SELECT * FROM vendedores ORDER BY nombres ASC';
		$query = $db->query($sql);
		while ($vendedor = $query->fetch_assoc()) {
			$vendedores[] = $vendedor;
		}
		$result = array(
				'status' => 'success',
				'code' => 200,
				'data' => $vendedores
			);
		echo json_encode($result);
	} catch
	(ValidatorException $e) {
		return response()->json([
			'error' => true,
			'message' => $e->getMessageBag(),"Fallo el Controlador"
		]);
	}	
});

// Listar un Vendedor
$app->get("/vendedor/{id}", function($request) use($app, $db) {
	try{
	$id = $request->getAttribute('id');
	$sql = "SELECT * FROM vendedores WHERE id=$id";
		$query = $db->query($sql);

	$result = array(
		'status' => 'error',
		'code' => 404,
		'message' => 'Vendedor no Encontrado'
	);

	if ($query->num_rows == 1) {
		$vendedor = $query->fetch_assoc();
		$result = array(
			'status' => 'success',
			'code' => 200,
			'data' => $vendedor
		);
	}
	
	echo json_encode($result);
	} catch
	(ValidatorException $e) {
		return response()->json([
			'error' => true,
			'message' => $e->getMessageBag(),"Fallo el Controlador"
		]);
	}
	
});

// Crear un Vendedor
$app->post("/vendedor-crear", function($request) use($app, $db) {
	$data= $request->getParsedBody();
	if (empty($data['id'])) {
		$data['id'] = NULL;
	}
	if (empty($data['tipo_identidad'])) {
		$data['tipo_identidad'] = NULL;
	}
	if (empty($data['identidad'])) {
		$data['identidad'] = NULL;
	}
	if (empty($data['apellidos'])) {
		$data['apellidos'] = NULL;
	}
	if (empty($data['nombres'])) {
		$data['nombres'] = NULL;
	}
	if (empty($data['correo'])) {
		$data['correo'] = NULL;
	}
	if (empty($data['direccion'])) {
		$data['direccion'] = NULL;
	}
	if (empty($data['telefono'])) {
		$data['telefono'] = NULL;
	}
	if (empty($data['genero'])) {
		$data['genero'] = NULL;
	}
	if (empty($data['fecha_nacimiento'])) {
		$data['fecha_nacimiento'] = NULL;
	}
	if (empty($data['ventas'])) {
		$data['ventas'] = NULL;
	}
	
	$sql = "INSERT INTO vendedores VALUES (NULL, 
                       					'".$data['tipo_identidad']."',  
                                        '".$data['identidad']."',  
                                        '".$data['apellidos']."',  
                                        '".$data['nombres']."',  
                                        '".$data['correo']."',  
                                        '".$data['direccion']."',  
                                        '".$data['telefono']."',  
                                        '".$data['genero']."',  
										'".$data['fecha_nacimiento']."',
										'".$data['ventas']."'
										)";   
	$insert = $db->query($sql);
	$result = array(
		'status' => 'error',
		'code' => 404,
		'message' => 'Vendedor No Creado'
	);								   
	if ($insert) {
		$result = array(
			'status' => 'success',
			'code' => 200,
			'message' => 'Vendedor Creado'
			);
	}
	echo json_encode($result);
});

// Actualizar un Vendedor
$app->put("/vendedor-actualizar/{id}", function($request) use($app, $db) {
	$data= $request->getParsedBody();
	$sql = "UPDATE vendedores SET tipo_identidad 	= '".$data['tipo_identidad']."', 
								  identidad         = '".$data['identidad']."', 
								  apellidos         = '".$data['apellidos']."', 
								  nombres           = '".$data['nombres']."', 
								  correo            = '".$data['correo']."', 
								  direccion         = '".$data['direccion']."', 
								  telefono          = '".$data['telefono']."', 
								  genero            = '".$data['genero']."', 
								  fecha_nacimiento  = '".$data['fecha_nacimiento']."',
								  ventas 			= '".$data['ventas']."' 
								  WHERE id          = '".$data['id']."'";	
	$query = $db->query($sql);
	$result = array(
		'status' => 'error',
		'code' => 404,
		'message' => 'Vendedor No Actualizado'
	);

	if ($query && mysqli_affected_rows($db)) {
		$result = array(
			'status' => 'success',
			'code' => 200,
			'message' => "Vendedor Actualizado"
		);
	}
	echo json_encode($result);
});

// ELIMINAR UN PRODUCTO
$app->get("/vende/:id/delete", function($id) use($app, $db) {
	$sql = 'DELETE FROM productos WHERE id=' . $id;
	$query = $db->query($sql);

	$result = array(
		'status' => 'error',
		'code' => 404,
		'message' => 'Product not found'
	);

	if ($query && mysqli_affected_rows($db)) {
		$result = array(
			'status' => 'success',
			'code' => 200,
			'message' => "Product deleted"
		);
	}
	
	echo json_encode($result);
});


// Eliminar un vendedor
$app->get("/vendedor-eliminar/{id}", function($request) use($app, $db) {
	$id = $request->getAttribute('id');
	$sql = "DELETE FROM vendedores WHERE id= '".$id."'";	
	$query = $db->query($sql);

	$result = array(
		'status' => 'error',
		'code' => 404,
		'message' => 'Vendedor No eliminado'
	);

	if ($query && mysqli_affected_rows($db)) {
		$result = array(
			'status' => 'success',
			'code' => 200,
			'message' => "Vendedor Eliminado"
		);
	}
	
	echo json_encode($result);
});



$app->run();
