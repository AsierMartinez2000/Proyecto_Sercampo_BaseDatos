<?php 

    require_once '../config/conexionBaseDatos.php';

    class LoginModel{

        private $db;
        //Constructor
        public function __construct()
        {
            $this->db = ConexionBD::conexion();
        }

        //metodo para buscar al usuario en la base de datos
        public function buscarUsuario($nombre, $password){

        $sql = "SELECT id_usuario, nombre, password 
                FROM usuarios WHERE nombre = :nombre AND password = :password";
        
        //CONSULTA PREPARADA    
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':nombre', $nombre, PDO::PARAM_STR);
        $stmt->bindParam(':password', $password, PDO::PARAM_STR);

        $stmt->execute();

        //devuelve la primera columna de la tabla que en este caso es el id_usuario
        return $stmt->fetchColumn();
            
        }

    }


?>