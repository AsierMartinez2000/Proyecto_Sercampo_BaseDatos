<?php 

require_once'../backend/app/models/adminModel.php'; 

session_start();

    class adminController{

        public function traerProductos(){

            $modeloAdmin = new adminModel();

            $productos = $modeloAdmin->getProductos();

            echo json_encode($productos);
        }

        public function actualizarConductor($datos_conductor){

            $modeloAdmin = new adminModel();

            $exito = $modeloAdmin->actualizarConductor($datos_conductor);

            echo json_encode($exito);
        }

        public function nuevoConductor($datos_conductor){

            $modeloAdmin = new adminModel();
            $conductor = $modeloAdmin->insertarConductor($datos_conductor);

            echo json_encode ($conductor);

        }

        public function buscadorVehiculo($datos_vehiculo){

            $modeloAdmin = new adminModel();

            $vehiculos_encontrados = $modeloAdmin->getVehiculos($datos_vehiculo);

            echo json_encode($vehiculos_encontrados);
        }
        

        public function actualizarVehiculo($datos_vehiculo){

            $modeloAdmin = new adminModel();
            $vehiculo = $modeloAdmin->actualizarVehiculo($datos_vehiculo);

            echo json_encode ($vehiculo);
        }
        
        
        public function nuevoVehiculo($datos_vehiculo){
            
            $modeloAdmin = new adminModel();
            $vehiculo = $modeloAdmin->insertarVehiculo($datos_vehiculo);

            echo json_encode ($vehiculo);
        }


        
    }

?>