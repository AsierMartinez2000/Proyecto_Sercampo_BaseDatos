<?php 

    require_once '../backend/config/conexionBaseDatos.php';

    class LoginModel{

        private $db;
        //Constructor
        public function __construct()
        {
            $this->db = ConexionBD::conexion();
        }

        // Método para buscar al usuario en la base de datos
        public function procesarLogin($datos_login){

            $sql = "SELECT id_usuario
                    FROM usuarios
                    WHERE (nombre = :nombre) AND (password = :password)";
            
            $stmt = $this->db->prepare($sql);

            $stmt->bindParam(':nombre', $datos_login['nombre'], PDO::PARAM_STR);
            $stmt->bindParam(':password', $datos_login['password'], PDO::PARAM_STR);
            $stmt->execute();

            $resultado = $stmt->fetchColumn();

            if($resultado != false){
                return true;
            } else{
                return false;
            }
        }
    }


?>