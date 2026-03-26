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

    public function getClientesOrdenados(){
        $sql = "SELECT *    
                FROM clientes
                ORDER BY PointID ASC";

        $stmt = $this->db->prepare($sql);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getClienteNombre($datosCliente){
        $sql = "SELECT *
        FROM clientes
        WHERE nombre LIKE :nombre";

        $stmt = $this->db->prepare($sql);
        $nombre = "%" . $datosCliente['nombre'] . "%";
        $stmt->bindParam(':nombre', $nombre, PDO::PARAM_STR);

        $stmt->execute();
        
        $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

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
        $sql = "INSERT INTO clientes (PointID, nombre, cif, telefono, notas)
                VALUES (:PointID, :nombre, :cif, :telefono, null)";
        
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
                                    WHERE PointID = :PointID)";


        $stmt = $this->db->prepare($sql);

        $stmt->bindParam(':PointID', $datosCliente['PointID'], PDO::PARAM_STR);
        $stmt->bindParam(':nombre', $datosCliente['nombre'], PDO::PARAM_STR);
        $stmt->bindParam(':cif', $datosCliente['cif'], PDO::PARAM_STR);
        $stmt->bindParam(':telefono', $datosCliente['telefono'], PDO::PARAM_STR);
        
        $stmt->execute();

    }

    public function getClienteGeneral($datosCliente){

         $tipo = $datosCliente['tipo_legal'];
        if ($tipo == ""){
            $sql = "SELECT *
            FROM clientes
            WHERE (nombre LIKE :dato) OR (cif LIKE :dato) OR (telefono LIKE :dato)";

            $stmt = $this->db->prepare($sql);
            $dato = "%" . $datosCliente['dato'] . "%";
            $stmt->bindParam(':dato', $dato, PDO::PARAM_STR);

            $stmt->execute();
            
            $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return $resultado;
        } else {

        $sql = "SELECT c.id_cliente, c.PointID, c.nombre, c.cif, c.telefono, c.notas
            FROM clientes AS c 
            INNER JOIN contenedores AS con ON c.id_cliente = con.id_cliente
            WHERE  (con.tipo_legal = :tipo) AND (c.nombre LIKE :dato OR c.cif LIKE :dato OR c.telefono LIKE :dato)";

        $stmt = $this->db->prepare($sql);
        $dato = "%" . $datosCliente['dato'] . "%";
        $stmt->bindParam(':dato', $dato, PDO::PARAM_STR);
        $stmt->bindParam(':tipo', $tipo, PDO::PARAM_STR);

        $stmt->execute();
        
        $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $resultado;
        }
    }

    public function getClienteEspecifico($datosCliente){
        $sql = "SELECT c.id_cliente, c.PointID, c.nombre, c.cif, c.telefono, c.notas, d.direccion, m.localidad
                FROM contenedores AS con INNER JOIN clientes AS c ON con.id_cliente = c.id_cliente
                            INNER JOIN direcciones AS d ON d.id_contenedor = con.id_contenedor
                            INNER JOIN municipios AS m ON m.id_municipio = d.id_municipio
                WHERE c.id_cliente = :id_cliente";

        $stmt = $this->db->prepare($sql);

        $id_cliente = $datosCliente['id_cliente'];

        $stmt->bindParam(':id_cliente', $id_cliente, PDO::PARAM_STR);

        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getClientesTipo($datosCliente){
        $sql = "SELECT c.id_cliente, c.PointID, c.nombre, c.cif, c.telefono, c.notas
        FROM clientes AS c
            INNER JOIN contenedores AS con ON c.id_cliente = con.id_cliente
        WHERE con.tipo_legal = :dato";

        $stmt = $this->db->prepare($sql);
        $dato = $datosCliente['tipo_legal'];
        $stmt->bindParam(':dato', $dato, PDO::PARAM_STR);

        $stmt->execute();
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        
    }
}