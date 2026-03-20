<?php 

require_once'../backend/app/models/clientesModel.php'; 

session_start();
    //DASHBOARD PRINCIPAL
    class clientesController{

        public function obtenerClientes() {
            
            $modelo = new clientesModel();
            $resultados = $modelo->getClientes();

            echo json_encode($resultados);
        }
    }

?>