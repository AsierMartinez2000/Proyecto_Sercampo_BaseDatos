<?php

require_once '../app/models/productos_testModel.php';


class Productos_testController
{

    public function mostrarBuscador(){
        require_once '../app/views/productos_testView.php';
    }
    public function autocompletado()
    {
        if (isset($_GET['term'])) {

            header('Content-Type: application/json');
            $modelo = new Productos_testModel();
            $resultados = $modelo->buscarProductos($_GET['term']);

            $data = [];

            foreach ($resultados as $row) {
                $data[] = $row['tipo'];
            }

            echo json_encode($data);
        }
    }
}
