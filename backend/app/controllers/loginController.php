<?php

require_once '../backend/app/models/loginModel.php';

class LoginController
{

    //metodo para procesarLogin
    public function procesarLogin($datos_login)
    {
        $modeloLogin = new loginModel();

        $exito = $modeloLogin->procesarLogin($datos_login);

        echo json_encode($exito);

    }

}
