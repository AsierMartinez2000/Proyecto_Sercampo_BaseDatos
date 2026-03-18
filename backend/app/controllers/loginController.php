<?php

require_once '../backend/app/models/loginModel.php';

class LoginController
{

    //metodo para procesarLogin
    public function procesarLogin($datos)
    {

        session_start();

        //el envío del formulario tiene que ser POST
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            // Si alguien intenta acceder por GET, lo redirigimos al home
            header('Location: index.php?controller=home&action=home');
            exit();    
            }

        //almacenamos en las variables lo que viene del formulario
        $usuario = $datos['nombre'];
        $password = $datos['password'];

        //instaciamos $modelo para trabajar con el modelo
        $modelo = new LoginModel();
        $id_usuario = $modelo->buscarUsuario($usuario, $password);

        if ($id_usuario) {

            $_SESSION['id_usuario'] = $id_usuario;
            $_SESSION['nombre'] = $usuario;
            header('Location: index.php?controller=dashBoard&action=mostrarDashBoard');
            # code...
        } else {
            header('Location: index.php?controller=home&action=home');
        }
    }

    // CERRAR SESION
    public function logout()
    {
        session_start();
        // Destruir SESIÓN COMPLETAMENTE
        $_SESSION = []; // Vaciar array de sesión

        
        // Destruir la cookie de sesión
        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000,
                $params["path"], $params["domain"],
                $params["secure"], $params["httponly"]
            );
        }
               
        // Destruir la sesión
        session_destroy();

        // Redirigir al home
        header('Location: index.php?controller=home&action=home');
        exit();
    }
}
