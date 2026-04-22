<?php

require_once '../backend/config/conexionBaseDatos.php';

class adminModel{
    
    private $db;
    
    public function __construct()
    {
        $this->db = ConexionBD::conexion();
    }
        
    public function getProductos(){
        $sql = "SELECT *
                FROM productos";
        
        $stmt = $this->db->prepare($sql);

        $stmt->execute();

        return $stmt->fetchALL(PDO::FETCH_ASSOC);
        
    }

}