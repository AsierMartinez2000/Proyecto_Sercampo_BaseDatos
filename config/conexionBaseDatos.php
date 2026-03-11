<?php
//Conexion a la base de Datos - Las constantes estan en configBaseDatos.php
require_once "configBaseDatos.php";
class ConexionBD {
    private static $conexion=null;

    public static function conexion() {
        
        //Si ya hay una conexión activa, no volvemos a crear la conexión
        if(self::$conexion===null){
            try {

                $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NOMBRE;
            
                // Crear la conexión PDO
                self::$conexion = new PDO($dsn, DB_USUARIO, DB_CONTRA);
                self::$conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                
            } catch (PDOException $e) {
                die("Error al conectar con la base de datos: " . $e->getMessage());
            }
        }
        return self::$conexion;
    }
}

?>