<?php

require_once '../config/conexionBaseDatos.php';

class infoClientModel{

    private $db;

    public function __construct()
    {
        $this->db = ConexionBD::conexion();
    }

    public function getCliente($id){

        $sql = "SELECT cif, telefono, inicio, fin, activo, notas
                FROM clientes
                WHERE id_cliente = :id";

        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}