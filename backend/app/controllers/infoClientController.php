<?php

require_once '../backend/app/models/infoClientModel.php';

class infoClientController{

    public function mostrarInfoClient(){

        session_start();

        $model = new infoClientModel();

        $clienteId = $_GET['id'] ?? 1;

        $cliente = $model->getCliente($clienteId);

        if($cliente){

            $_SESSION['cif'] = $cliente['cif'];
            $_SESSION['telefono'] = $cliente['telefono'];
            $_SESSION['inicio'] = $cliente['inicio'];
            $_SESSION['fin'] = $cliente['fin'];
            $_SESSION['activo'] = $cliente['activo'];
            $_SESSION['notas'] = $cliente['notas'];

        }

        require_once '../app/views/infoClientView.php';
    }
}