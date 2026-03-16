<?php

require_once '../app/models/infoClientModel.php';

class infoClientController{

    public function mostrarInfoClient(){

        $model = new infoClientModel();

        $buscar = $_GET['buscar'] ?? '';

        $cliente = $model->buscarCliente($buscar);

        require_once '../app/views/infoClientView.php';
    }
}