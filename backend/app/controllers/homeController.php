<?php
session_start();
    //HOME CONTROLLER
    
    class HomeController{
       
        public function home() {
            
           require_once '../backend/app/views/homeView.php';  
        }

    }


?>