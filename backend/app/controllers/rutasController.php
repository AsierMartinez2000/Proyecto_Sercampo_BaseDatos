<?php 

require_once'../backend/app/models/rutasModel.php'; 

session_start();

    class rutasController{

        public function buscadorParaRutas($datoBuscador){

            $modeloRutas = new rutasModel();

            $datos_encontrados = $modeloRutas->getRutasPorDato($datoBuscador);

            echo json_encode($datos_encontrados);
        }
        
    }

?>