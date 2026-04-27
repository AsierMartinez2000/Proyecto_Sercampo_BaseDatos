<?php

require_once '../backend/config/conexionBaseDatos.php';

class recogidasModel
{

    private $db;

    public function __construct()
    {
        $this->db = ConexionBD::conexion();
    }

    public function insertarRecogidaHoreca($datosRecogida)
    {

        try {

            $this->db->beginTransaction();

            $sqlRecogidas = "INSERT INTO recogidas (id_contenedor, fecha, id_ruta, litros_recogidos, visitado, recogida, bidones_recogidos, bidones_entregados, notas)
                VALUES (:id_contenedor, :fecha, :id_ruta, :litros_recogidos, :visitado, :recogida, :bidones_recogidos, :bidones_entregados, :notas)";

            $stmt = $this->db->prepare($sqlRecogidas);

            $stmt->bindParam(':id_contenedor', $datosRecogida['id_contenedor'], PDO::PARAM_INT);
            $stmt->bindParam(':fecha', $datosRecogida['fecha'], PDO::PARAM_STR);
            $stmt->bindParam(':id_ruta', $datosRecogida['id_ruta'], PDO::PARAM_INT);
            $stmt->bindParam(':litros_recogidos', $datosRecogida['litros_recogidos'], PDO::PARAM_INT);
            $stmt->bindParam(':visitado', $datosRecogida['visitado'], PDO::PARAM_BOOL);
            $stmt->bindParam(':recogida', $datosRecogida['recogida'], PDO::PARAM_BOOL);
            $stmt->bindParam(':bidones_recogidos', $datosRecogida['bidones_recogidos'], PDO::PARAM_INT);
            $stmt->bindParam(':bidones_entregados', $datosRecogida['bidones_entregados'], PDO::PARAM_INT);
            $stmt->bindParam(':notas', $datosRecogida['notas'], PDO::PARAM_STR);

            $stmt->execute();

            $id_recogida = $this->db->lastInsertId();

            $sqlProductos = "INSERT INTO productos_recogidas(id_recogida, id_producto, cantidad)
                            VALUES (:id_recogida, :id_producto, :cantidad)";

            $stmt = $this->db->prepare($sqlProductos);
            $stmt->bindParam(':id_recogida', $id_recogida, PDO::PARAM_INT);
            
            $arrayProductos = [];

            array_push($arrayProductos, $datosRecogida['desengrasante'], $datosRecogida['fregasuelo'], $datosRecogida['lavavajilla'], $datosRecogida['jabon_manos'], $datosRecogida['higienizante'],
            $datosRecogida['wc_banos'], $datosRecogida['limpia_cristales'], $datosRecogida['lejia'], $datosRecogida['bayeta'], $datosRecogida['filtros'], $datosRecogida['dinero']);

            $contador = 0;

            while ($contador < 11){
                $id_producto =  $contador+1;
            if($arrayProductos[$contador] > 0){
                $stmt->bindParam(':id_producto', $id_producto, PDO::PARAM_INT);
                $stmt->bindParam(':cantidad', $arrayProductos[$contador], PDO::PARAM_INT);

                $stmt->execute();
            }

            $contador++;

            }

            $this->db->commit();

            return true;


        } catch (Exception $e) {
            
            $this->db->rollBack();
            
            return $e;
        }
    }


    public function insertarRecogidaContenedor($datosRecogida){
        
        try {

            $this->db->beginTransaction();

            $sqlRecogidas = "INSERT INTO recogidas (id_contenedor, fecha, id_ruta, litros_recogidos, visitado, recogida, bidones_recogidos, bidones_entregados, notas)
                VALUES (:id_contenedor, :fecha, :id_ruta, :litros_recogidos, :visitado, :recogida, :bidones_recogidos, :bidones_entregados, :notas)";

            $stmt = $this->db->prepare($sqlRecogidas);

            $stmt->bindParam(':id_contenedor', $datosRecogida['id_contenedor'], PDO::PARAM_INT);
            $stmt->bindParam(':fecha', $datosRecogida['fecha'], PDO::PARAM_STR);
            $stmt->bindParam(':id_ruta', $datosRecogida['id_ruta'], PDO::PARAM_INT);
            $stmt->bindParam(':litros_recogidos', $datosRecogida['litros_recogidos'], PDO::PARAM_INT);
            $stmt->bindParam(':visitado', $datosRecogida['visitado'], PDO::PARAM_BOOL);
            $stmt->bindParam(':recogida', $datosRecogida['recogida'], PDO::PARAM_BOOL);
            $stmt->bindParam(':bidones_recogidos', $datosRecogida['bidones_recogidos'], PDO::PARAM_INT);
            $stmt->bindParam(':bidones_entregados', $datosRecogida['bidones_entregados'], PDO::PARAM_INT);
            $stmt->bindParam(':notas', $datosRecogida['notas'], PDO::PARAM_STR);

            $stmt->execute();

            $this->db->commit();

            return true;


        } catch (Exception $e) {
            
            $this->db->rollBack();
            
            return $e;
        }
    }


    public function insertarRecogidaEESS($datosRecogida){
         try {

            $this->db->beginTransaction();

            $sqlRecogidas = "INSERT INTO recogidas (id_contenedor, fecha, id_ruta, litros_recogidos, visitado, recogida, bidones_recogidos, bidones_entregados, notas)
                VALUES (:id_contenedor, :fecha, :id_ruta, :litros_recogidos, :visitado, :recogida, :bidones_recogidos, :bidones_entregados, :notas)";

            $stmt = $this->db->prepare($sqlRecogidas);

            $stmt->bindParam(':id_contenedor', $datosRecogida['id_contenedor'], PDO::PARAM_INT);
            $stmt->bindParam(':fecha', $datosRecogida['fecha'], PDO::PARAM_STR);
            $stmt->bindParam(':id_ruta', $datosRecogida['id_ruta'], PDO::PARAM_INT);
            $stmt->bindParam(':litros_recogidos', $datosRecogida['litros_recogidos'], PDO::PARAM_INT);
            $stmt->bindParam(':visitado', $datosRecogida['visitado'], PDO::PARAM_BOOL);
            $stmt->bindParam(':recogida', $datosRecogida['recogida'], PDO::PARAM_BOOL);
            $stmt->bindParam(':bidones_recogidos', $datosRecogida['bidones_recogidos'], PDO::PARAM_INT);
            $stmt->bindParam(':bidones_entregados', $datosRecogida['bidones_entregados'], PDO::PARAM_INT);
            $stmt->bindParam(':notas', $datosRecogida['notas'], PDO::PARAM_STR);

            $stmt->execute();

            $this->db->commit();

            return true;


        } catch (Exception $e) {
            
            $this->db->rollBack();
            
            return $e;
        }
    }

    
    public function traerIdRuta($datosRecogida){

        $sql = "SELECT id_ruta
                FROM rutas
                WHERE (id_conductor = :id_conductor) AND (fecha = :datoFecha)";

        $stmt = $this->db->prepare($sql);

        $stmt->bindParam(':id_conductor', $datosRecogida['id_conductor'], PDO::PARAM_INT);
        $stmt->bindParam(':datoFecha', $datosRecogida['fecha'], PDO::PARAM_STR);

        $stmt->execute();

        $resultado = $stmt->fetchColumn(); //Solo queremos devolver el dato id_ruta, no un array.
        
        return $resultado;

    }

    public function traerRecogidasPorFecha($fecha){

        $sql = "SELECT c.nombre AS nombre_cliente, con.tipo_legal, rec.litros_recogidos, rec.fecha, conduc.nombre AS nombre_conductor, m.municipio, d.direccion
                FROM recogidas AS rec
                INNER JOIN rutas AS rut ON rec.id_ruta = rut.id_ruta
                INNER JOIN conductores AS conduc ON conduc.id_conductor = rut.id_conductor
                INNER JOIN contenedores AS con ON rec.id_contenedor = con.id_contenedor
                INNER JOIN clientes AS c ON con.id_cliente = c.id_cliente
                INNER JOIN direcciones AS d ON con.id_contenedor = d.id_contenedor
                INNER JOIN municipios AS m ON d.id_municipio = m.id_municipio
                WHERE rec.fecha >= :fecha
                ORDER BY rec.fecha DESC";

        $stmt = $this->db->prepare($sql);

        $stmt->bindParam(':fecha', $fecha['fecha'], PDO::PARAM_STR);

        $stmt->execute();

        $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC); //Solo queremos devolver el dato id_ruta, no un array.
        
        return $resultado;

    }
}
