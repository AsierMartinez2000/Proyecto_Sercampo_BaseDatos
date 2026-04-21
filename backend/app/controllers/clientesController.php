<?php 

require_once'../backend/app/models/clientesModel.php'; 
require_once'../backend/app/models/municipioModel.php'; 
require_once'../backend/app/models/contenedorModel.php'; 
require_once'../backend/app/models/direccionModel.php'; 

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

            $modeloCliente = new clientesModel();
            $modeloMunicipio = new municipioModel();
            $modeloDireccion = new direccionModel();
            $modeloContenedor = new contenedorModel();


            $id_municipio = $modeloMunicipio->comprobarMunicipio($datos);
            
            $id_cliente = $modeloCliente->comprobarCliente($datos);

            $id_tipo = $modeloContenedor->getTipo($datos);

            $id_contenedor = $modeloContenedor->setNuevoContenedor($id_tipo, $id_cliente, $datos);

            $modeloDireccion->setNuevaDireccion($id_contenedor, $id_municipio, $datos);
            
            echo json_encode($id_cliente);
        }

        public function actualizarCliente($datos){

        $modeloCliente = new clientesModel();
        $modeloDireccion = new direccionModel();
        

        $cliente_actualizado = $modeloCliente->updateCliente($datos);
        $cliente_actualizado = $modeloDireccion->updateDireccion($datos);

        echo json_encode($cliente_actualizado);
        }

        public function actualizarEstadoCliente($datos){

        $modeloContenedor = new contenedorModel();
        $estadoActualizado = $modeloContenedor->setNuevoEstado($datos);

        echo json_encode($estadoActualizado);

        }
        
    }

?>