<?php

require_once '../backend/config/conexionBaseDatos.php';

class municipioModel{

    private $db;

    public function __construct()
    {
        $this->db = ConexionBD::conexion();
    }

    public function comprobarMunicipio($datos){
        
        $id_municipio = null;
        
        while($id_municipio === null){
            
            $sql = "SELECT id_municipio 
                    FROM municipios
                    WHERE localidad = :localidad AND provincia = :provincia";
            
            $stmt = $this->db->prepare($sql);
            
            $stmt->bindParam(':localidad', $datos['localidad'], PDO::PARAM_STR);
            $stmt->bindParam(':provincia', $datos['provincia'], PDO::PARAM_STR);
            
            $stmt->execute();
            
            $resultado = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if($resultado && isset($resultado['id_municipio'])){
                $id_municipio = $resultado['id_municipio']; 
            } else {
                $sql2 = "INSERT INTO municipios (localidad, provincia, pais, id_zona)
                        VALUES (:localidad, :provincia, :pais, null)";
                
                $stmt = $this->db->prepare($sql2);
                
                $stmt->bindParam(':localidad', $datos['localidad'], PDO::PARAM_STR);
                $stmt->bindParam(':provincia', $datos['provincia'], PDO::PARAM_STR);
                $stmt->bindParam(':pais', $datos['pais'], PDO::PARAM_STR);
                
                $stmt->execute();
                
                $id_municipio = $this->db->lastInsertId();
            }
        } 

        return $id_municipio;
    }

}