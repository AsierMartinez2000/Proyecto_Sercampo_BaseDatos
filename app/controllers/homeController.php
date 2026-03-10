<?php

    //HOME CONTROLLER
    
    class HomeController{
        //necesitamos hacer una llamada a la base de datos

        public function home() {
            
            header('Location:../app/views/homeView.php');  
        }

    }


?>