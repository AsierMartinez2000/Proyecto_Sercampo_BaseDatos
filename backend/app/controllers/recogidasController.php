<?php 

require_once'../backend/app/models/clientesModel.php'; 
require_once'../backend/app/models/municipioModel.php'; 
require_once'../backend/app/models/contenedorModel.php'; 
require_once'../backend/app/models/direccionModel.php'; 

session_start();
    //DASHBOARD PRINCIPAL
    class recogidasController{

        public function traerHorecasPorNombre($datoBuscador){

            $modeloCliente = new clientesModel();

            $horeca = $modeloCliente->getClientePorNombre($datoBuscador);

            echo json_encode($horeca);
        }

       
        
        

        

       
        
    }

?>