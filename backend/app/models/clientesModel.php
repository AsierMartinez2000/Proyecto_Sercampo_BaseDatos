<?php

require_once '../backend/config/conexionBaseDatos.php';

class clientesModel{

    private $db;

    public function __construct()
    {
        $this->db = ConexionBD::conexion();
    }

    public function getClientes(){

        $sql = "SELECT *    
                FROM clientes";

        $stmt = $this->db->prepare($sql);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

}