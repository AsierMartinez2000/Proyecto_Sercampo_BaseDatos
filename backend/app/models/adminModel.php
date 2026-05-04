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

    public function getVehiculos($datos_vehiculo){
        
        $sql = "SELECT v.matricula, v.modelo, v.num_bastidor, v.fecha_itv, v.fecha_mantenimiento, v.precio_mantenimiento, v.taller_mantenimiento, v.num_poliza,
                s.tel_emergencias, s.tel_contacto, s.empresa
                FROM vehiculos AS v
                INNER JOIN seguros_vehiculos AS s ON v.num_poliza = s.num_poliza
                WHERE (matricula LIKE :datoVehiculo) OR (modelo LIKE :datoVehiculo)";

        $stmt = $this->db->prepare($sql);

        $dato = "%" . $datos_vehiculo['dato'] . "%";

        $stmt->bindParam(':datoVehiculo', $dato, PDO::PARAM_STR);

        $stmt->execute();

        $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        return $resultado;

    }

    public function actualizarVehiculo($datos_vehiculo){

        try {

            //Habría que comprobar si el numero de poliza es distinto al que tiene asignado, para ver si es uno de los datos que se esta actualizando.
            //Si es distinto, insertar el nuevo en la tabla seguros con los datos correspondientes
            //Si es igual, hacer update de los campos que sean.

            $this->db->beginTransaction();

            $num_poliza_actual = "";

            $sqlNumPoliza = "SELECT num_poliza
                            FROM vehiculos
                            WHERE matricula = :matricula AND num_bastidor = :num_bastidor";

            $stmt = $this->db->prepare($sqlNumPoliza);

            $stmt->bindParam(':matricula', $datos_vehiculo['matricula'], PDO::PARAM_STR);
            $stmt->bindParam(':num_bastidor', $datos_vehiculo['num_bastidor'], PDO::PARAM_STR);

            $stmt->execute();

            $num_poliza_actual = $stmt->fetchColumn();

            //Hasta aqui solo hemos sacado el numero de poliza que tenía asignada esa matricula y ese bastidor.

            if ($num_poliza_actual == $datos_vehiculo['num_poliza']) {
                //Si es igual el numero de poliza que hemos obtenido con el que nos viene, significa que no ha cambiado ese numero y hay que hacer update y ya.

                $sqlVehiculos = "UPDATE vehiculos
                        SET fecha_itv = :fecha_itv, fecha_mantenimiento = :fecha_mantenimiento, precio_mantenimiento = :precio_mantenimiento, taller_mantenimiento = :taller_mantenimiento
                        WHERE matricula = :matricula AND num_bastidor = :num_bastidor";
    
                $stmt = $this->db->prepare($sqlVehiculos);
    
                //Parte del WHERE
                $stmt->bindParam(':matricula', $datos_vehiculo['matricula'], PDO::PARAM_STR);
                $stmt->bindParam(':num_bastidor', $datos_vehiculo['num_bastidor'], PDO::PARAM_STR);

                //Parte del SET
                $stmt->bindParam(':fecha_itv', $datos_vehiculo['fecha_itv'], PDO::PARAM_STR);
                $stmt->bindParam(':fecha_mantenimiento', $datos_vehiculo['fecha_mantenimiento'], PDO::PARAM_STR);
                $stmt->bindParam(':precio_mantenimiento', $datos_vehiculo['precio_mantenimiento'], PDO::PARAM_STR);
                $stmt->bindParam(':taller_mantenimiento', $datos_vehiculo['taller_mantenimiento'], PDO::PARAM_STR);
    
                $stmt->execute();

                //UPDATE SEGURO ASOCIADO
    
                $sqlSeguro = "UPDATE seguros_vehiculos
                            SET tel_emergencias = :tel_emergencias, tel_contacto = :tel_contacto, empresa = :empresa
                            WHERE num_poliza = :num_poliza";
    
                $stmt = $this->db->prepare($sqlSeguro);

                //Parte del WHERE
                $stmt->bindParam(':num_poliza', $datos_vehiculo['num_poliza'], PDO::PARAM_STR);

                //Parte del SET
                $stmt->bindParam(':tel_emergencias', $datos_vehiculo['tel_emergencias'], PDO::PARAM_STR);
                $stmt->bindParam(':tel_contacto', $datos_vehiculo['tel_contacto'], PDO::PARAM_STR);
                $stmt->bindParam(':empresa', $datos_vehiculo['empresa'], PDO::PARAM_STR);

                $stmt->execute();

                $this->db->commit();

                return true;

            } else {
                //Si entra al else, es porque el numero de poliza que nos viene es distinto al que tiene esa matricula y num_bastidor asignado.
                //Se debe hacer un insert en seguros_vehiculos para el nuevo seguro, y posteriormente actualizar el num_poliza del vehiculo con el nuevo.

                //Primero comprobamos si existía ya ese numero de poliza.

                $sqlComprobarPoliza = "SELECT num_poliza
                                        FROM seguros_vehiculos
                                        WHERE num_poliza = :num_poliza";

                $stmt = $this->db->prepare($sqlComprobarPoliza);

                $stmt->bindParam(':num_poliza', $datos_vehiculo['num_poliza'], PDO::PARAM_STR);

                $stmt->execute();

                $resultado = $stmt->fetch(PDO::FETCH_ASSOC);

                if($resultado == false){
                    //SI ES FALSE ES PORQUE NO HAY RESULTADOS
                    
                $sqlInsertarSeguro = "INSERT INTO seguros_vehiculos (num_poliza, tel_emergencias, tel_contacto, empresa)
                                    VALUES (:num_poliza, :tel_emergencias, :tel_contacto, :empresa)";
                
                $stmt = $this->db->prepare($sqlInsertarSeguro);
                
                $stmt->bindParam(':num_poliza', $datos_vehiculo['num_poliza'], PDO::PARAM_STR);
                $stmt->bindParam(':tel_emergencias', $datos_vehiculo['tel_emergencias'], PDO::PARAM_STR);
                $stmt->bindParam(':tel_contacto', $datos_vehiculo['tel_contacto'], PDO::PARAM_STR);
                $stmt->bindParam(':empresa', $datos_vehiculo['empresa'], PDO::PARAM_STR);
                
                $stmt->execute();
                
                }
                //Ahora actualizamos el vehiculo, cambiando el num_poliza

                $sqlVehiculos = "UPDATE vehiculos
                        SET fecha_itv = :fecha_itv, fecha_mantenimiento = :fecha_mantenimiento, precio_mantenimiento = :precio_mantenimiento, taller_mantenimiento = :taller_mantenimiento, num_poliza = :num_poliza
                        WHERE matricula = :matricula AND num_bastidor = :num_bastidor";
    
                $stmt = $this->db->prepare($sqlVehiculos);
    
                //Parte del WHERE
                $stmt->bindParam(':matricula', $datos_vehiculo['matricula'], PDO::PARAM_STR);
                $stmt->bindParam(':num_bastidor', $datos_vehiculo['num_bastidor'], PDO::PARAM_STR);

                //Parte del SET
                $stmt->bindParam(':fecha_itv', $datos_vehiculo['fecha_itv'], PDO::PARAM_STR);
                $stmt->bindParam(':fecha_mantenimiento', $datos_vehiculo['fecha_mantenimiento'], PDO::PARAM_STR);
                $stmt->bindParam(':precio_mantenimiento', $datos_vehiculo['precio_mantenimiento'], PDO::PARAM_STR);
                $stmt->bindParam(':taller_mantenimiento', $datos_vehiculo['taller_mantenimiento'], PDO::PARAM_STR);
                $stmt->bindParam(':num_poliza', $datos_vehiculo['num_poliza'], PDO::PARAM_STR);

                $stmt->execute();

                //PARA ACTUALIZAR LO QUE TENIAMOS EN EL FORMULARIO, TRAEMOS DE NUEVO EL VEHICULO ENTERO CON LOS DATOS NUEVOS.

                // $sqlDevolverVehiculos = "SELECT v.matricula, v.modelo, v.num_bastidor, v.fecha_itv, v.fecha_mantenimiento, v.precio_mantenimiento, v.taller_mantenimiento, v.num_poliza,
                // s.tel_emergencias, s.tel_contacto, s.empresa
                // FROM vehiculos AS v
                // INNER JOIN seguros_vehiculos AS s ON v.num_poliza = s.num_poliza
                // WHERE WHERE matricula = :matricula AND num_bastidor = :num_bastidor";

                // $stmt = $this->db->prepare($sqlDevolverVehiculos);

                // $stmt->bindParam(':matricula', $datos_vehiculo['matricula'], PDO::PARAM_STR);
                // $stmt->bindParam(':num_bastidor', $datos_vehiculo['num_bastidor'], PDO::PARAM_STR);

                // $stmt->execute();

                // $resultado = $stmt->fetch(PDO::FETCH_ASSOC);
                
                $this->db->commit();

                return true;

                // return $resultado;

            }

        } catch (\Error $e) {

            $this->db->rollback();
            return $e;
        }
    }

    public function insertarVehiculo($datos_vehiculo){
        try {

            $this->db->beginTransaction();

            $sqlInsertarSeguro = "INSERT INTO seguros_vehiculos (num_poliza, tel_emergencias, tel_contacto, empresa)
                                    VALUES (:num_poliza, :tel_emergencias, :tel_contacto, :empresa)";
                
            $stmt = $this->db->prepare($sqlInsertarSeguro);

            $stmt->bindParam(':num_poliza', $datos_vehiculo['num_poliza'], PDO::PARAM_STR);
            $stmt->bindParam(':tel_emergencias', $datos_vehiculo['tel_emergencias'], PDO::PARAM_STR);
            $stmt->bindParam(':tel_contacto', $datos_vehiculo['tel_contacto'], PDO::PARAM_STR);
            $stmt->bindParam(':empresa', $datos_vehiculo['empresa'], PDO::PARAM_STR);

            $stmt->execute();

            $sqlInsertarVehiculo = "INSERT INTO vehiculos (matricula, modelo, fecha_itv, fecha_mantenimiento, precio_mantenimiento, taller_mantenimiento, num_poliza, num_bastidor)
                                    VALUES (:matricula, :modelo, :fecha_itv, :fecha_mantenimiento, :precio_mantenimiento, :taller_mantenimiento, :num_poliza, :num_bastidor)";

            $stmt = $this->db->prepare($sqlInsertarVehiculo);
            
            $stmt->bindParam(':matricula', $datos_vehiculo['matricula'], PDO::PARAM_STR);
            $stmt->bindParam(':modelo', $datos_vehiculo['modelo'], PDO::PARAM_STR);
            $stmt->bindParam(':fecha_itv', $datos_vehiculo['fecha_itv'], PDO::PARAM_STR);
            $stmt->bindParam(':fecha_mantenimiento', $datos_vehiculo['fecha_mantenimiento'], PDO::PARAM_STR);
            $stmt->bindParam(':precio_mantenimiento', $datos_vehiculo['precio_mantenimiento'], PDO::PARAM_STR);
            $stmt->bindParam(':taller_mantenimiento', $datos_vehiculo['taller_mantenimiento'], PDO::PARAM_STR);
            $stmt->bindParam(':num_poliza', $datos_vehiculo['num_poliza'], PDO::PARAM_STR);
            $stmt->bindParam(':num_bastidor', $datos_vehiculo['num_bastidor'], PDO::PARAM_STR);
            
            $stmt->execute();

            $this->db->commit();

            return true;

        } catch (\Error $e) {

            $this->db->rollback();
            return $e;
        }
    }

}