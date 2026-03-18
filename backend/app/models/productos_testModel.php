<?php

require_once '../backend/config/conexionBaseDatos.php';

class Productos_testModel{

    private $db;

    public function __construct()
    {
        $this->db = ConexionBD::conexion();
    }

    public function buscarProductos($term)
    {
        $sql = "SELECT tipo FROM productos WHERE tipo LIKE :term";

        $stmt = $this->db->prepare($sql);

        $term = "%".$term."%";

        $stmt->bindParam(":term", $term, PDO::PARAM_STR);

        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);

        


    }
}