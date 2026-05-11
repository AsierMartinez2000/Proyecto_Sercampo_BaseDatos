<?php

require_once '../backend/config/conexionBaseDatos.php';

class rutasModel{
    
    private $db;
    
    public function __construct()
    {
        $this->db = ConexionBD::conexion();
    }
        
    public function getRutasPorDato($datoBuscador){

        $sql = "SELECT con.id_contenedor, c.id_cliente, c.PointID, c.nombre, c.cif, c.telefono, d.cod_postal, d.direccion, 
                m.municipio, m.provincia, m.pais, t.tipo, con.tipo_legal, con.activo, cod.cod_eess, 
                        (SELECT MAX(rec.fecha) 
                        FROM recogidas AS rec 
                        WHERE rec.id_contenedor = con.id_contenedor
                        AND rec.fecha <= CURRENT_DATE) AS ultima_fecha
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

    public function cargarVehiculos(){
         $sql = "SELECT matricula, modelo
                FROM vehiculos";

        $stmt = $this->db->prepare($sql);

        $stmt->execute();

        $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC); //Solo queremos devolver el dato id_ruta, no un array.
        
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


    public function traerRutasFiltradas($datos_filtros){

        try {
        
        $this->db->beginTransaction();

        $sql = "SELECT rut.id_ruta, rut.id_conductor, rut.matricula, rut.notas, rut.fecha, conduc.nombre AS nombre_conductor, conduc.email, conduc.telefono, veh.modelo, 
                (SELECT COUNT(rc.id_contenedor)
                FROM rutas_contenedores AS rc
                WHERE rc.id_ruta = rut.id_ruta) AS lugares_visitados
                FROM rutas AS rut
                INNER JOIN conductores AS conduc ON conduc.id_conductor = rut.id_conductor
                INNER JOIN vehiculos AS veh ON veh.matricula = rut.matricula
                WHERE (rut.fecha >= :fechaInicial) AND (rut.fecha <= :fechaFinal)";

        
        if ($datos_filtros['conductor'] != "") {
            $sql .= " AND (rut.id_conductor = :id_conductor)";
        }

        if ($datos_filtros['vehiculo'] != "") {
            $sql .= " AND (rut.matricula = :matricula)";
        }

        //COMENTADOS PORQUE NO SE USAN DE MOMENTO

        // if ($datos_filtros['tipo_legal'] != "") {
        //     $sql .= " AND (con.tipo_legal = :tipo_legal)";
        // }

        // if ($datos_filtros['municipio'] != "") {
        //     $sql .= " AND (m.municipio LIKE :municipio)";
        // }
   
        // if ($datos_filtros['provincia'] != "") {
        //     $sql .= " AND (m.provincia LIKE :provincia)";
        // }

        $sql .= " ORDER BY rut.fecha DESC";

        $stmt = $this->db->prepare($sql);

        $stmt->bindParam(':fechaInicial', $datos_filtros['fechaInicial'], PDO::PARAM_STR);
        $stmt->bindParam(':fechaFinal', $datos_filtros['fechaFinal'], PDO::PARAM_STR);

        if ($datos_filtros['conductor'] != "") {
            $stmt->bindParam(':id_conductor', $datos_filtros['conductor'], PDO::PARAM_STR);
        }

        
        if ($datos_filtros['vehiculo'] != "") {
            $stmt->bindParam(':matricula', $datos_filtros['vehiculo'], PDO::PARAM_STR);
        }


        //COMENTADOS PORQUE NO SE USAN DE MOMENTO

        // if ($datos_filtros['tipo_legal'] != "") {
        //     $stmt->bindParam(':tipo_legal', $datos_filtros['tipo_legal'], PDO::PARAM_STR);
        // }

        // if ($datos_filtros['municipio'] != "") {
        //     $municipio = "%" . $datos_filtros['municipio'] . "%";
        //     $stmt->bindParam(':municipio', $municipio, PDO::PARAM_STR);
        // }
    
        // if ($datos_filtros['provincia'] != "") {
        //     $provincia = "%" . $datos_filtros['provincia'] . "%";
        //     $stmt->bindParam(':provincia', $provincia, PDO::PARAM_STR);
        // }

        $stmt->execute();

        $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);    

        $sqlRuta_Contenedor = "SELECT con.id_contenedor, con.tipo_legal, c.nombre, c.telefono, con.latitud, con.longitud, c.cif, c.notas AS notas_cliente, 
                        dir.direccion, dir.cod_postal, m.municipio, m.provincia, m.pais
                        FROM rutas_contenedores AS rc
                        INNER JOIN contenedores AS con ON rc.id_contenedor = con.id_contenedor
                        INNER JOIN clientes AS c ON c.id_cliente = con.id_cliente
                        INNER JOIN direcciones AS dir ON dir.id_contenedor = con.id_contenedor
                        INNER JOIN municipios AS m ON m.id_municipio = dir.id_municipio
                        WHERE rc.id_ruta = :id_ruta
                        ORDER BY m.municipio ASC";

        $stmt = $this->db->prepare($sqlRuta_Contenedor);

        for ($i = 0; $i < count($resultado); $i++) {

            $stmt->bindParam(':id_ruta', $resultado[$i]['id_ruta'], PDO::PARAM_STR);

            $stmt->execute();

            $resultadoRuta = $stmt->fetchAll(PDO::FETCH_ASSOC); 

            for ($j = 0; $j < count($resultadoRuta); $j++){

                $resultado[$i][$j."_id"] = $resultadoRuta[$j]['id_contenedor'];
                $resultado[$i][$j."_nombre"] = $resultadoRuta[$j]['nombre'];
                $resultado[$i][$j."_tipo_legal"] = $resultadoRuta[$j]['tipo_legal'];
                $resultado[$i][$j."_telefono"] = $resultadoRuta[$j]['telefono'];
                $resultado[$i][$j."_cif"] = $resultadoRuta[$j]['cif'];
                $resultado[$i][$j."_notas_cliente"] = $resultadoRuta[$j]['notas_cliente'];
                $resultado[$i][$j."_direccion"] = $resultadoRuta[$j]['direccion'];
                $resultado[$i][$j."_cod_postal"] = $resultadoRuta[$j]['cod_postal'];
                $resultado[$i][$j."_municipio"] = $resultadoRuta[$j]['municipio'];
                $resultado[$i][$j."_provincia"] = $resultadoRuta[$j]['provincia'];
                $resultado[$i][$j."_pais"] = $resultadoRuta[$j]['pais'];
            }

        }

        $this->db->commit();

        return $resultado;

        } catch (Exception $e) {
            $this->db->rollBack();
            return $e;
        }

    }

    
}