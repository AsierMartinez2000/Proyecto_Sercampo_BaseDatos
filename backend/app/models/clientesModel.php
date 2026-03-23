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
                FROM clientes
                ORDER BY PointID ASC";

        $stmt = $this->db->prepare($sql);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getClientesOrdenados(){
        $sql = "SELECT *    
                FROM clientes
                ORDER BY PointID ASC";

        $stmt = $this->db->prepare($sql);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getClienteEspecifico($datosCliente){
        $sql = "SELECT *
                FROM clientes
                WHERE nombre = :nombre AND cif = :cif AND telefono = :telefono";

        $stmt = $this->db->prepare($sql);

        $stmt->bindParam(':nombre', $datosCliente['nombre'], PDO::PARAM_STR);
        $stmt->bindParam(':cif', $datosCliente['cif'], PDO::PARAM_STR);
        $stmt->bindParam(':telefono', $datosCliente['telefono'], PDO::PARAM_STR);

        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getClienteNombre($datosCliente){
        $sql = "SELECT *
        FROM clientes
        WHERE nombre LIKE %':nombre'%";

        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':nombre', $datosCliente['nombre'], PDO::PARAM_STR);

        $stmt->execute();
        
        $resultado = $stmt->fetch(PDO::FETCH_ASSOC);

        return $resultado;
    }

    public function getClientePointID($datosCliente) {
        $sql = "SELECT *
        FROM clientes
        WHERE PointID = :PointID";

        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':PointID', $datosCliente['PointID'], PDO::PARAM_STR);


        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getClienteCIF($datosCliente) {
        $sql = "SELECT *
        FROM clientes
        WHERE cif = :cif";

        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':cif', $datosCliente['cif'], PDO::PARAM_STR);


        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getClienteTelefono($datosCliente) {
        $sql = "SELECT *
        FROM clientes
        WHERE telefono = :telefono";

        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':telefono', $datosCliente['telefono'], PDO::PARAM_STR);


        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function setnuevoCliente($datosCliente) {
        $sql = "INSERT INTO clientes (PointID, nombre, cif, telefono)
                VALUES :PointID, :nombre, :cif, :telefono";
        
        $stmt = $this->db->prepare($sql);

        $stmt->bindParam(':PointID', $datosCliente['PointID'], PDO::PARAM_STR);
        $stmt->bindParam(':nombre', $datosCliente['nombre'], PDO::PARAM_STR);
        $stmt->bindParam(':cif', $datosCliente['cif'], PDO::PARAM_STR);
        $stmt->bindParam(':telefono', $datosCliente['telefono'], PDO::PARAM_STR);
        
        $stmt->execute();
    }

    public function modificarCliente($datosCliente) {
        $sql = "UPDATE clientes
                SET PointID = :PointID, nombre = :nombre, cif = :cif, telefono = :telefono
                WHERE id_cliente = (SELECT DISTINCT id_cliente
                                    FROM clientes
                                    WHERE nombre = :nombre AND cif = :cif AND telefono = :telefono)";


        $stmt = $this->db->prepare($sql);

        $stmt->bindParam(':PointID', $datosCliente['PointID'], PDO::PARAM_STR);
        $stmt->bindParam(':nombre', $datosCliente['nombre'], PDO::PARAM_STR);
        $stmt->bindParam(':cif', $datosCliente['cif'], PDO::PARAM_STR);
        $stmt->bindParam(':telefono', $datosCliente['telefono'], PDO::PARAM_STR);
        
        $stmt->execute();

    }

}