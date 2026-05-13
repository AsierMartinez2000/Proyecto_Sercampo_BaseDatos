<?php 

require_once'../backend/app/models/rutasModel.php'; 

session_start();

    class rutasController{

        public function buscadorParaRutas($datoBuscador){

            $modeloRutas = new rutasModel();

            $datos_encontrados = $modeloRutas->getRutasPorDato($datoBuscador);

            echo json_encode($datos_encontrados);
        }

        public function buscadorConductor($datoConductor){

            $modeloRutas = new rutasModel();

            $conductores_encontrados = $modeloRutas->getConductores($datoConductor);

            echo json_encode($conductores_encontrados);
        }

        public function buscadorVehiculo($datoVehiculo){

            $modeloRutas = new rutasModel();

            $vehiculos_encontrados = $modeloRutas->getVehiculos($datoVehiculo);

            echo json_encode($vehiculos_encontrados);
        }
        
        public function insertarRuta($datoRuta){

            $modeloRutas = new rutasModel();

            $exito = $modeloRutas->nuevaRuta($datoRuta);

            echo json_encode($exito);
        }

        public function traerRutasFiltradas($filtros){
            $modeloRutas = new rutasModel();
            $array_rutas = $modeloRutas->traerRutasFiltradas($filtros);
            echo json_encode($array_rutas);
        }
        
        public function cargarVehiculos(){
            $modeloRutas = new rutasModel();
            $array_vehiculos = $modeloRutas->cargarVehiculos();
            echo json_encode($array_vehiculos);
        }
        
    }

?>