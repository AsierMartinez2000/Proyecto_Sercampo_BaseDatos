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

    public function actualizarConductor($datos_conductor){
        
        try {
            
            $this->db->beginTransaction();

            $sql = "UPDATE conductores
                SET nombre = :nombre, email = :email, telefono = :telefono
                WHERE id_conductor = :id_conductor";
        
            $stmt = $this->db->prepare($sql);
            
            $stmt->bindParam(':nombre', $datos_conductor['nombre'], PDO::PARAM_STR);
            $stmt->bindParam(':email', $datos_conductor['email'], PDO::PARAM_STR);
            $stmt->bindParam(':telefono', $datos_conductor['telefono'], PDO::PARAM_STR);
            $stmt->bindParam(':id_conductor', $datos_conductor['id_conductor'], PDO::PARAM_STR);
            
            $stmt->execute();

            $this->db->commit();
            
            return true;
            
        } catch (\Error $e) {

            $this->db->rollback();
            return $e;
        }
    }



    public function insertarConductor($datos_conductor){

     $sql= "INSERT INTO conductores (nombre, email, telefono)
                VALUES (:nombre, :email, :telefono)";

            $stmt = $this->db->prepare($sql);

            $stmt->bindParam(':nombre', $datos_conductor['nombre'], PDO::PARAM_STR);
            $stmt->bindParam(':email', $datos_conductor['email'], PDO::PARAM_STR);
            $stmt->bindParam(':telefono', $datos_conductor['telefono'], PDO::PARAM_STR);

            $stmt->execute();

            return true;


    }

}