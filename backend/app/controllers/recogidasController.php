<?php 

require_once'../backend/app/models/clientesModel.php'; 
require_once'../backend/app/models/municipioModel.php'; 
require_once'../backend/app/models/contenedorModel.php'; 
require_once'../backend/app/models/direccionModel.php'; 
require_once'../backend/app/models/recogidasModel.php'; 

session_start();
    //DASHBOARD PRINCIPAL
    class recogidasController{


        // MÉTODOS HORECA
        public function traerHorecasPorNombre($datoBuscador){
            $modeloCliente = new clientesModel();
            $horeca = $modeloCliente->getClientePorNombre($datoBuscador);
            echo json_encode($horeca);
        }

        public function nuevaRecogidaHoreca($datosRecogida){
            $modeloRecogida = new recogidasModel();
            $recogidaExitosa = $modeloRecogida->insertarRecogidaHoreca($datosRecogida);
            echo json_encode($recogidaExitosa);
        }


        // MÉTODOS CONTENEDOR
        public function traerContenedorPorDato($datoBuscador){

            $modeloCliente = new clientesModel();

            $contenedor = $modeloCliente->getClientePorDato($datoBuscador);

            echo json_encode($contenedor);
        }

        public function nuevaRecogidaContenedor($datosRecogida){
            $modeloRecogida = new recogidasModel();
            $recogidaExitosa = $modeloRecogida->insertarRecogidaContenedor($datosRecogida);
            echo json_encode($recogidaExitosa);
        }

       
        // MÉTODOS EESS
        
        public function traerEESSPorDato($datoBuscador){
            $modeloCliente = new clientesModel();

            $eess = $modeloCliente->getClientePorCodigoEESS($datoBuscador);

            echo json_encode($eess);
        }

        public function nuevaRecogidaEESS($datosRecogida){
            $modeloRecogida = new recogidasModel();
            $recogidaExitosa = $modeloRecogida->insertarRecogidaEESS($datosRecogida);
            echo json_encode($recogidaExitosa);
        }
        

       
        
    }

?>