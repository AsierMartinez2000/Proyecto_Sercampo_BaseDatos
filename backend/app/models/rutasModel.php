<?php

require_once '../backend/config/conexionBaseDatos.php';

class rutasModel{
    
    private $db;
    
    public function __construct()
    {
        $this->db = ConexionBD::conexion();
    }
        
    public function getRutasPorDato($datoBuscador){

        $sql = "SELECT con.id_contenedor, c.id_cliente, c.PointID, c.nombre, c.cif, c.telefono, d.cod_postal, d.direccion, m.municipio, m.provincia, m.pais, t.tipo, con.tipo_legal, con.activo, cod.cod_eess
                FROM contenedores AS con 
                INNER JOIN clientes AS c ON con.id_cliente = c.id_cliente
                INNER JOIN tipo_contenedor AS t ON con.id_tipo_contenedor = t.id_tipo_contenedor
                INNER JOIN direcciones AS d ON con.id_contenedor = d.id_contenedor
                INNER JOIN municipios AS m ON d.id_municipio = m.id_municipio
                LEFT JOIN codigos_eess AS cod ON c.id_cliente = cod.id_cliente
            WHERE (m.municipio LIKE :datoBuscador OR c.nombre LIKE :datoBuscador OR cod.cod_eess LIKE :datoBuscador) AND (con.activo = true)
            ORDER BY m.provincia, m.municipio";

        $stmt = $this->db->prepare($sql);

        $dato = "%" . $datoBuscador['dato'] . "%";

        $stmt->bindParam(':datoBuscador', $dato, PDO::PARAM_STR);

        $stmt->execute();

        $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        return $resultado;
    }

    public function getConductores($datoConductor){
        $sql = "SELECT id_conductor, nombre, email, telefono
                FROM conductores
                WHERE nombre LIKE :datoConductor";

        $stmt = $this->db->prepare($sql);

        $nombre = "%" . $datoConductor['nombre'] . "%";

        $stmt->bindParam(':datoConductor', $nombre, PDO::PARAM_STR);

        $stmt->execute();

        $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        return $resultado;

    }
    public function getVehiculos($datoVehiculo){
        
        $sql = "SELECT matricula, modelo, num_poliza
                FROM vehiculos
                WHERE (matricula LIKE :datoVehiculo) OR (modelo LIKE :datoVehiculo)";

        $stmt = $this->db->prepare($sql);

        $dato = "%" . $datoVehiculo['dato'] . "%";

        $stmt->bindParam(':datoVehiculo', $dato, PDO::PARAM_STR);

        $stmt->execute();

        $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        return $resultado;

    }

    public function nuevaRuta($datosRuta)
    {

        try {

            $this->db->beginTransaction();

            $sqlRutas= "INSERT INTO rutas (id_conductor, matricula, fecha, notas)
                VALUES (:id_conductor, :matricula, :fecha, :notas)";

            $stmt = $this->db->prepare($sqlRutas);

            $stmt->bindParam(':id_conductor', $datosRuta['conductor']['id_conductor'], PDO::PARAM_INT);
            $stmt->bindParam(':matricula', $datosRuta['vehiculo']['matricula'], PDO::PARAM_STR);
            $stmt->bindParam(':fecha', $datosRuta['fecha'], PDO::PARAM_STR);
            $stmt->bindParam(':notas', $datosRuta['notas'], PDO::PARAM_STR);

            $stmt->execute();

            $id_ruta = $this->db->lastInsertId();

            $sqlRutasContenedores = "INSERT INTO rutas_contenedores(id_ruta, id_contenedor)
                            VALUES (:id_ruta, :id_contenedor)";

            $stmt = $this->db->prepare($sqlRutasContenedores);
            $stmt->bindParam(':id_ruta', $id_ruta, PDO::PARAM_INT);
            
            $arrayRutas = [];

            $arrayRutas = $datosRuta['rutas'];

            for ($i = 0; $i < count($arrayRutas); $i++){
                $stmt->bindParam(':id_contenedor', $arrayRutas[$i]['id_contenedor'], PDO::PARAM_INT);

                $stmt->execute();
            }

            $this->db->commit();

            return true;


        } catch (Exception $e) {
            
            $this->db->rollBack();
            
            return $e;
        }
    }

}