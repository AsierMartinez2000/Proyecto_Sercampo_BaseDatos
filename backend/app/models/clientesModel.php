<?php

require_once '../backend/config/conexionBaseDatos.php';

class clientesModel{

    private $db;

    public function __construct()
    {
        $this->db = ConexionBD::conexion();
    }

    public function getClientes(){

        $sql = "SELECT con.id_contenedor, c.id_cliente, c.PointID, c.nombre, c.cif, c.telefono, d.cod_postal, d.direccion, m.localidad, m.provincia, t.tipo, con.tipo_legal, con.activo
                FROM contenedores AS con 
                INNER JOIN clientes AS c ON con.id_cliente = c.id_cliente
                INNER JOIN tipo_contenedor AS t ON con.id_tipo_contenedor = t.id_tipo_contenedor
                INNER JOIN direcciones AS d ON con.id_contenedor = d.id_contenedor
                INNER JOIN municipios AS m ON d.id_municipio = m.id_municipio
                ORDER BY con.id_contenedor";
    

        $stmt = $this->db->prepare($sql);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getClienteGeneral($datosCliente){

        $tipo = $datosCliente['tipo_legal'];
        if ($tipo == ""){

            $sql = "SELECT con.id_contenedor, c.id_cliente, c.PointID, c.nombre, c.cif, c.telefono, d.cod_postal, d.direccion, m.localidad, m.provincia, t.tipo, con.tipo_legal, con.activo
                FROM contenedores AS con 
                INNER JOIN clientes AS c ON con.id_cliente = c.id_cliente
                INNER JOIN tipo_contenedor AS t ON con.id_tipo_contenedor = t.id_tipo_contenedor
                INNER JOIN direcciones AS d ON con.id_contenedor = d.id_contenedor
                INNER JOIN municipios AS m ON d.id_municipio = m.id_municipio
            WHERE (c.nombre LIKE :dato) OR (c.cif LIKE :dato) OR (c.telefono LIKE :dato)
            ORDER BY con.id_contenedor";

            $stmt = $this->db->prepare($sql);
            $dato = "%" . $datosCliente['dato'] . "%";
            $stmt->bindParam(':dato', $dato, PDO::PARAM_STR);

            $stmt->execute();
            
            $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return $resultado;
        } else {

        $sql = "SELECT con.id_contenedor, c.id_cliente, c.PointID, c.nombre, c.cif, c.telefono, d.cod_postal, d.direccion, m.localidad, m.provincia, t.tipo, con.tipo_legal, con.activo
                FROM contenedores AS con 
                INNER JOIN clientes AS c ON con.id_cliente = c.id_cliente
                INNER JOIN tipo_contenedor AS t ON con.id_tipo_contenedor = t.id_tipo_contenedor
                INNER JOIN direcciones AS d ON con.id_contenedor = d.id_contenedor
                INNER JOIN municipios AS m ON d.id_municipio = m.id_municipio
                WHERE  (con.tipo_legal = :tipo) AND (c.nombre LIKE :dato OR c.cif LIKE :dato OR c.telefono LIKE :dato)
                ORDER BY con.id_contenedor";

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
        $sql = "SELECT c.id_cliente, c.PointID, c.nombre, c.cif, c.telefono, d.direccion, m.localidad
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
    
    public function comprobarCliente($datos){

        $id_cliente = null;

        while($id_cliente === null){

        $sql = "SELECT id_cliente
                FROM clientes
                WHERE PointID = :PointID";

        $stmt = $this->db->prepare($sql);

        $stmt->bindParam(':PointID', $datos['PointID'], PDO::PARAM_STR);

        $stmt->execute();

        $resultado = $stmt->fetch(PDO::FETCH_ASSOC);

        if($resultado && isset($resultado['id_cliente'])){
                $id_cliente = $resultado['id_cliente']; 
            } else {
                $sql2 = "INSERT INTO clientes (PointID, nombre, cif, telefono, notas)
                        VALUES (:PointID, :nombre, :cif, :telefono, null) ";

                $stmt = $this->db->prepare($sql2);

                $stmt->bindParam(':PointID', $datos['PointID'], PDO::PARAM_STR);
                $stmt->bindParam(':nombre', $datos['nombre_cliente'], PDO::PARAM_STR);
                $stmt->bindParam(':cif', $datos['cif_cliente'], PDO::PARAM_STR);
                $stmt->bindParam(':telefono', $datos['telefono_cliente'], PDO::PARAM_STR);

                $stmt->execute();

                $id_cliente = $this->db->lastInsertId();
            }
        } 
            
        return $id_cliente;
        
    }


}