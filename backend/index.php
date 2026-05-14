<?php
// Headers básicos para API
header("Access-Control-Allow-Origin: http://localhost:4200"); // La URL de tu Angular
header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// Manejar peticiones OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Obtener el método HTTP
$metodo = $_SERVER['REQUEST_METHOD'];

// Inicializar variables
$controller = 'home';
$action = 'index';
$parametros = [];

// Switch para manejar diferentes métodos HTTP
switch ($metodo) {
    case 'GET':
        // Para GET, los parámetros vienen en la URL
        $controller = $_GET['controller'] ?? 'home';
        $action = $_GET['action'] ?? 'index';
        $parametros = $_GET; // Todos los parámetros GET
        break;
        
    case 'POST':
    case 'PUT':
    case 'PATCH':
    case 'DELETE':
        // Para estos métodos, leer el body JSON
        $json = file_get_contents('php://input');
        $datos = json_decode($json, true) ?? [];
        
        // El controller y action pueden venir en el body o en la URL
        $controller = $datos['controller'] ?? $_GET['controller'] ?? 'home';
        $action = $datos['action'] ?? $_GET['action'] ?? 'index';
        
        // Eliminar controller y action de los parámetros para no pasarlos al método
        unset($datos['controller']);
        unset($datos['action']);
        
        $parametros = $datos;
        break;
        
    default:
        // Método no soportado
        http_response_code(405);
        echo json_encode(['error' => "Método no permitido"]);
        exit();
}

// Cargar controlador
$controllerName = $controller . 'Controller';
$controllerFile = './app/controllers/' . $controllerName . '.php';

if (file_exists($controllerFile)) {
    require_once $controllerFile;
    $controllerInstance = new $controllerName();
    
    // Ejecutar acción
    if (method_exists($controllerInstance, $action)) {
        // Pasar los parámetros al método
        $controllerInstance->$action($parametros);
    } else {
        http_response_code(404);
        echo json_encode(['error' => "Acción no encontrada"]);
    }
} else {
    http_response_code(404);
    echo json_encode(['error' => "Controlador no encontrado"]);
}
?>