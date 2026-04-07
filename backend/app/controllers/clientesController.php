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

        public function obtenerClienteGeneral($datos){
            $modelo = new clientesModel();
            $resultados = $modelo->getClienteGeneral($datos);

            echo json_encode($resultados);
        }

        public function obtenerClienteEspecifico($datos){
            $modelo = new clientesModel();
            $resultados = $modelo->getClienteEspecifico($datos);

            echo json_encode($resultados);
        }

        public function nuevoCliente($datos){
            $modelo = new clientesModel();
            $resultados = $modelo->setnuevoCliente($datos);

            echo json_encode($resultados);
        }
        
    }

?>