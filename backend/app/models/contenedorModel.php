<?php

require_once '../backend/config/conexionBaseDatos.php';

class contenedorModel{

    private $db;

    public function __construct()
    {
        $this->db = ConexionBD::conexion();
    }

    public function getTipo($datos){

        $sql = "SELECT id_tipo_contenedor 
                FROM tipo_contenedor
                WHERE (tipo LIKE :tipo_contenedor)";

        $stmt = $this->db->prepare($sql);

        $dato = "%" . $datos['tipo_contenedor'] . "%";

        $stmt->bindParam(':tipo_contenedor', $dato, PDO::PARAM_STR);

        $stmt->execute();

        $resultado = $stmt->fetch(PDO::FETCH_ASSOC);

        $id_tipo_contenedor = $resultado['id_tipo_contenedor'];

        return $id_tipo_contenedor;
    }

    public function setNuevoContenedor($id_tipo, $id_cliente, $datos){

        $sql = "INSERT INTO contenedores (id_tipo_contenedor, id_cliente, tipo_legal, recogida, periodo_recogida_dias, mercancia, latitud, longitud, inicio, fin, activo)
                VALUES (:id_tipo_contenedor, :id_cliente, :tipo_legal, null, null, null, null, null, CURRENT_TIMESTAMP, null, null) ";

        $stmt = $this->db->prepare($sql);

        $stmt->bindParam(':id_tipo_contenedor', $id_tipo, PDO::PARAM_INT);
        $stmt->bindParam(':id_cliente', $id_cliente, PDO::PARAM_INT);
        $stmt->bindParam(':tipo_legal', $datos['tipo_legal'], PDO::PARAM_STR);

        $stmt->execute();
        
        $id_contenedor = $this->db->lastInsertId();

        return $id_contenedor;
    }

    public function setNuevoEstado($datos){

    $sql = 'UPDATE contenedores
            SET activo = :activo
            WHERE id_contenedor = :id_contenedor';

    $stmt = $this->db->prepare($sql);
    $stmt->bindParam(':activo', $datos['activo'], PDO::PARAM_STR);
    $stmt->bindParam(':id_contenedor', $datos['id_contenedor'], PDO::PARAM_INT);

    $stmt->execute();

    $sql2 = "SELECT activo 
             FROM contenedores 
             WHERE id_contenedor = :id_contenedor";

    $stmt = $this->db->prepare($sql2);
    $stmt->bindParam(':id_contenedor', $datos['id_contenedor'], PDO::PARAM_INT);

    $stmt->execute();

    $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $resultado;
    }

    



}