<?php 
session_start();
    //DASHBOARD PRINCIPAL
    class DashBoardController{

        public function mostrarDashBoard() {
            
            require_once'../app/views/dashBoardView.php';  
        }
    }

?>