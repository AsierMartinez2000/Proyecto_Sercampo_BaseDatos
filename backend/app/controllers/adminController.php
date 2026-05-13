<?php 

require_once'../backend/app/models/adminModel.php'; 
require_once'../backend/app/models/municipioModel.php'; 

session_start();

    class adminController{

        // ---------------------METODOS PRODUCTOS---------------------
        public function traerProductos($dato_producto){

            $modeloAdmin = new adminModel();

            $productos = $modeloAdmin->getProductos($dato_producto);

            echo json_encode($productos);
        }

        public function actualizarProducto($dato_producto){
            $modeloAdmin = new adminModel();
            $exito = $modeloAdmin->actualizarProducto($dato_producto);

            echo json_encode($exito);
        }

        // ---------------------METODOS CONDUCTOR---------------------
        //Get conductor se hizo con rutas service para reciclar
        public function actualizarConductor($datos_conductor){

            $modeloAdmin = new adminModel();

            $exito = $modeloAdmin->actualizarConductor($datos_conductor);

            echo json_encode($exito);
        }

        public function nuevoConductor($datos_conductor){

            $modeloAdmin = new adminModel();
            $exito = $modeloAdmin->insertarConductor($datos_conductor);

            echo json_encode ($exito);

        }

        // ---------------------METODOS VEHICULO---------------------
        public function buscadorVehiculo($datos_vehiculo){

            $modeloAdmin = new adminModel();

            $vehiculos_encontrados = $modeloAdmin->getVehiculos($datos_vehiculo);

            echo json_encode($vehiculos_encontrados);
        }
        

        public function actualizarVehiculo($datos_vehiculo){

            $modeloAdmin = new adminModel();
            $exito = $modeloAdmin->actualizarVehiculo($datos_vehiculo);

            echo json_encode ($exito);
        }
        
        
        public function nuevoVehiculo($datos_vehiculo){
            
            $modeloAdmin = new adminModel();
            $exito = $modeloAdmin->insertarVehiculo($datos_vehiculo);

            echo json_encode ($exito);
        }

        // ---------------------METODOS USUARIO---------------------
        public function buscadorUsuario($datos_usuario){
            $modeloAdmin = new adminModel();
            $array_usuarios = $modeloAdmin->getUsuarios($datos_usuario);

            echo json_encode ($array_usuarios);
        }

        public function actualizarUsuario($datos_usuario){
            $modeloAdmin = new adminModel();
            $exito = $modeloAdmin->actualizarUsuario($datos_usuario);

            echo json_encode ($exito);
        }

        public function nuevoUsuario($datos_usuario){
            $modeloAdmin = new adminModel();
            $exito = $modeloAdmin->insertarUsuario($datos_usuario);

            echo json_encode ($exito);
        }

        
        // ---------------------METODOS CONTENEDORES---------------------
        public function traerContenedores($dato_contenedor){

            $modeloAdmin = new adminModel();

            $contenedores = $modeloAdmin->getContenedores($dato_contenedor);

            echo json_encode($contenedores);
        }

        public function actualizarContenedor($dato_contenedor){
            $modeloAdmin = new adminModel();
            $exito = $modeloAdmin->actualizarContenedor($dato_contenedor);

            echo json_encode($exito);
        }

        // --------------------- METODOS ZONAS ------------------------

        public function traerMunicipios($provincia){

            $modeloMunicipio = new municipioModel();

            $municipios = $modeloMunicipio->getMunicipios($provincia);

            echo json_encode($municipios);
        }

        public function nuevoMunicipio($municipio){

            $modeloMunicipio = new municipioModel();

            $exito = $modeloMunicipio->insertarMunicipio($municipio);

            echo json_encode($exito);
        }
        
    }

?>