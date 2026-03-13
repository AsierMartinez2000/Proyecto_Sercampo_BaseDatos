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
                    FROM usuarios WHERE nombre = :nombre";
            
            //CONSULTA PREPARADA    
            $stmt = $this->db->prepare($sql);
            $stmt->bindParam(':nombre', $nombre, PDO::PARAM_STR);
            $stmt->execute();
            $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

            //VERIFICAR CONTRASEÑA
            if(password_verify($password, $usuario['password']))
            {
                return $usuario['id_usuario'];
            }
                
        }
    }


?>