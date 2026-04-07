<?php

require_once '../backend/config/conexionBaseDatos.php';

class direccionModel{

    private $db;

    public function __construct()
    {
        $this->db = ConexionBD::conexion();
    }

    public function setNuevaDireccion($id_contenedor, $id_municipio, $datos){
        $sql = "INSERT INTO direcciones (id_contenedor, direccion, cod_postal, id_municipio)
                VALUES (:id_contenedor, :direccion, :cod_postal, :id_municipio) ";

        $stmt = $this->db->prepare($sql);

        $stmt->bindParam(':id_contenedor', $id_contenedor, PDO::PARAM_STR);
        $stmt->bindParam(':direccion', $datos['direccion'], PDO::PARAM_STR);
        $stmt->bindParam(':cod_postal', $datos['cod_postal'], PDO::PARAM_STR);
        $stmt->bindParam(':id_municipio', $id_municipio, PDO::PARAM_STR);

        $stmt->execute();

    }

    



}