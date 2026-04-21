<?php 

require_once'../backend/app/models/adminModel.php'; 

session_start();

    class adminController{

        public function traerProductos(){

            $modeloAdmin = new adminModel();

            $productos = $modeloAdmin->getProductos();

            echo json_encode($productos);
        }
        
    }

?>