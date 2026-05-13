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
                    WHERE municipio = :municipio AND provincia = :provincia";
            
            $stmt = $this->db->prepare($sql);
            
            $stmt->bindParam(':municipio', $datos['municipio'], PDO::PARAM_STR);
            $stmt->bindParam(':provincia', $datos['provincia'], PDO::PARAM_STR);
            
            $stmt->execute();
            
            $resultado = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if($resultado && isset($resultado['id_municipio'])){
                $id_municipio = $resultado['id_municipio']; 
            } else {
                $sql2 = "INSERT INTO municipios (municipio, provincia, pais, id_zona)
                        VALUES (:municipio, :provincia, :pais, null)";
                
                $stmt = $this->db->prepare($sql2);
                
                $stmt->bindParam(':municipio', $datos['municipio'], PDO::PARAM_STR);
                $stmt->bindParam(':provincia', $datos['provincia'], PDO::PARAM_STR);
                $stmt->bindParam(':pais', $datos['pais'], PDO::PARAM_STR);
                
                $stmt->execute();
                
                $id_municipio = $this->db->lastInsertId();
            }
        } 

        return $id_municipio;
    }

    public function getMunicipios($provincia){

        $sql = "SELECT municipio
                FROM municipios
                WHERE provincia = :provincia";
            
        $stmt = $this->db->prepare($sql);
            
        $stmt->bindParam(':provincia', $provincia['provincia'], PDO::PARAM_STR);
            
        $stmt->execute();

        $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $resultado;
    }

    public function insertarMunicipio($municipio){

        if($municipio["provincia"] == "otro"){

            $sql= "INSERT INTO municipios (municipio, provincia, pais)
            VALUES (:municipio, :provincia, :pais)";

            $stmt = $this->db->prepare($sql);

            $stmt->bindParam(':municipio', $municipio['municipio'], PDO::PARAM_STR);
            $stmt->bindParam(':provincia', $municipio['provincia_nueva'], PDO::PARAM_STR);
            $stmt->bindParam(':pais', $municipio['pais'], PDO::PARAM_STR);

            $stmt->execute();

            return true;

        }else{
            $sql= "INSERT INTO municipios (municipio, provincia, pais)
                VALUES (:municipio, :provincia, :pais)";

            $stmt = $this->db->prepare($sql);

            $stmt->bindParam(':municipio', $municipio['municipio'], PDO::PARAM_STR);
            $stmt->bindParam(':provincia', $municipio['provincia'], PDO::PARAM_STR);
            $stmt->bindParam(':pais', $municipio['pais'], PDO::PARAM_STR);

            $stmt->execute();

            return true;
        }
    }

}