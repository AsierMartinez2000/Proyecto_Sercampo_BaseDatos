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

        public function obtenerClientesOrdenados(){
                        
            $modelo = new clientesModel();
            $resultados = $modelo->getClientesOrdenados();

            echo json_encode($resultados);
        }

        public function obtenerClienteEspecifico($datos){
            $modelo = new clientesModel();
            $resultados = $modelo->getClienteEspecifico($datos);

            echo json_encode($resultados);
        }

        public function obtenerClienteNombre($datos){
            $modelo = new clientesModel();
            $resultados = $modelo->getClienteNombre($datos);

            echo json_encode($resultados);
        }

        public function obtenerClienteGeneral($datos){
            $modelo = new clientesModel();
            $resultados = $modelo->getClienteGeneral($datos);

            echo json_encode($resultados);
        }

        public function obtenerClientePointID($datos){
            $modelo = new clientesModel();
            $resultados = $modelo->getClientePointID($datos);

            echo json_encode($resultados);
        }

        public function obtenerClienteCIF($datos){
            $modelo = new clientesModel();
            $resultados = $modelo->getClienteCIF($datos);

            echo json_encode($resultados);
        }

        public function obtenerClienteTelefono($datos){
            $modelo = new clientesModel();
            $resultados = $modelo->getClienteTelefono($datos);

            echo json_encode($resultados);
        }

        public function nuevoCliente($datos){
            $modelo = new clientesModel();
            $modelo->setnuevoCliente($datos);
        }

        public function modificarCliente($datos){
            $modelo = new clientesModel();
            $modelo->modificarCliente($datos);
        }

        public function obtenerClientesTipo($datos){
            $modelo = new clientesModel();
            $resultados = $modelo->getClientesTipo($datos);

            echo json_encode($resultados);
        }
        
    }

?>