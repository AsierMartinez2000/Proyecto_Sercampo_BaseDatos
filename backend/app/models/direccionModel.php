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

public function updateDireccion($datos){
    
    require_once 'contenedorModel.php';
    $modeloMunicipio = new municipioModel();
    $id_municipio = $modeloMunicipio->comprobarMunicipio($datos);
        
    $sql = "UPDATE direcciones
            SET direccion = :direccion_nueva, cod_postal = :cod_postal_nuevo, id_municipio = :id_municipio_nuevo
            WHERE id_contenedor = :id_contenedor";

    $stmt = $this->db->prepare($sql);
    $stmt->bindParam(':direccion_nueva', $datos['direccion'], PDO::PARAM_STR);
    $stmt->bindParam(':cod_postal_nuevo', $datos['cod_postal'], PDO::PARAM_STR);
    $stmt->bindParam(':id_municipio_nuevo', $id_municipio, PDO::PARAM_INT);
    $stmt->bindParam(':id_contenedor', $datos['id_contenedor'], PDO::PARAM_STR);

    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
        
    }

    



}