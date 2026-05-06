-- ESTE ARCHIVO ES EL SCRIPT DE CREACION DE LA BASE DE DATOS
-- CREA LA BASE DE DATOS SI NO EXISTE

DROP DATABASE IF EXISTS sercampo_db;
CREATE DATABASE IF NOT EXISTS sercampo_db CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_unicode_ci;

USE sercampo_db;

-- TABLAS 
-- Usuarios: id_usuario(PK), nombre, email, telefono, password, rol, foto
-- Clientes: id_cliente(PK), POINTID, nombre, cif, telefono, notas
-- Tipo_contenedor: id_tipo_contenedor(PK), tipo, capacidad, notas
-- Contenedores: id­_contenedor(PK), id_tipo_contenedor(FK), id_cliente(FK), tipo_legal, periodo_recogida_dias, mercancia, latitud, longitud, inicio, fin, activo
-- Productos: id_productos(PK), tipo, coste, notas.
-- Conductores: id_conductor(PK), nombre, email, telefono.
-- Zonas: id_zona(PK), nombre.
-- Municipios: id_municipio(PK), municipio, provincia, pais, id_zona(FK).
-- Direcciones: id_contenedor(PK FK), dirección, cod_postal, id_municipio(FK).
-- Seguros_vehiculo: num_poliza(PK), tel_emergencias, tel_contacto, empresa.
-- Vehiculos: matricula(PK), modelo, fecha_itv, fecha_mantenimiento, precio_mantenimiento, taller_mantenimiento, num_poliza(FK), num_bastidor.
-- Rutas: id_ruta(PK), id_conductor(FK), matricula(FK), notas, fecha.
-- Rutas-contenedores: id_ruta(PK FK), id_contenedor(PK FK).
-- Recogidas: id_recogida(PK), id_contenedor(FK), fecha, id_ruta(FK), litros_recogidos, visitado, recogida, notas.
-- Productos_recogidas: id_recogida(PK FK), id_producto(PK FK), cantidad
-- Codigos_eess: cod_eess(PK), id_cliente(FK)


-- -----------------------------------------------------
-- Tabla: usuarios
-- -----------------------------------------------------

CREATE TABLE usuarios (
        id_usuario int PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        telefono VARCHAR(15),
        password VARCHAR(255) NOT NULL,
        rol ENUM ('admin', 'user', 'conductor') NOT NULL
    );


-- -----------------------------------------------------
-- Tabla: clientes
-- -----------------------------------------------------

CREATE TABLE clientes (
        id_cliente INT PRIMARY KEY AUTO_INCREMENT,
        PointID VARCHAR(20) UNIQUE NOT NULL,
        nombre VARCHAR(255) NOT NULL,
        cif VARCHAR(30),
        telefono VARCHAR(15),
        notas VARCHAR(255)
    );

-- -----------------------------------------------------
-- Tabla: tipo_contenedor
-- -----------------------------------------------------

CREATE TABLE tipo_contenedor (
        id_tipo_contenedor INT PRIMARY KEY AUTO_INCREMENT,
        tipo VARCHAR(50) NOT NULL,
        capacidad INT,
        notas VARCHAR(255)
    );

-- -----------------------------------------------------
-- Tabla: contenedores
-- -----------------------------------------------------

CREATE TABLE contenedores (
        id_contenedor INT PRIMARY KEY AUTO_INCREMENT,
        id_tipo_contenedor INT NOT NULL,
        id_cliente INT NOT NULL,
        tipo_legal ENUM ('Horeca', 'EESS Repsol', 'Contenedor') NOT NULL,
        periodo_recogida_dias INT,
        mercancia VARCHAR(255),
        latitud DECIMAL(10,8),   
        longitud DECIMAL(11,8),
        inicio DATE,
        fin DATE,
        activo BOOLEAN DEFAULT TRUE,
        FOREIGN KEY (id_tipo_contenedor) REFERENCES tipo_contenedor (id_tipo_contenedor) ON DELETE RESTRICT, 
        FOREIGN KEY (id_cliente) REFERENCES clientes (id_cliente) ON DELETE CASCADE
        -- Aqui en principio nunca se borrará y pasará activo a False, pero ponemos el DELETE CASCADE para poder hacer pruebas. Cambiarlo por DELETE RESTRICT
    );

-- -----------------------------------------------------
-- Tabla: productos
-- -----------------------------------------------------

CREATE TABLE productos (
        id_producto INT PRIMARY KEY AUTO_INCREMENT,
        tipo VARCHAR(50) NOT NULL,
        coste DECIMAL(7,2),
        notas VARCHAR(255)
    );

-- -----------------------------------------------------
-- Tabla: conductores
-- -----------------------------------------------------

CREATE TABLE conductores (
        id_conductor INT PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        telefono VARCHAR(20)
    );

-- -----------------------------------------------------
-- Tabla: zonas
-- -----------------------------------------------------

CREATE TABLE zonas (
    id_zona INT PRIMARY KEY, 
    nombre VARCHAR(255)
    );


-- -----------------------------------------------------
-- Tabla: municipios
-- -----------------------------------------------------

CREATE TABLE municipios (
        id_municipio INT PRIMARY KEY AUTO_INCREMENT,
        municipio VARCHAR(50) NOT NULL,
        provincia VARCHAR(50),
        pais VARCHAR(50),
        id_zona INT DEFAULT NULL,
        FOREIGN KEY (id_zona) REFERENCES zonas (id_zona) ON DELETE SET NULL
    );

-- -----------------------------------------------------
-- Tabla: direcciones (relación 1:1 con contenedor)
-- -----------------------------------------------------

CREATE TABLE direcciones (
        id_contenedor INT PRIMARY KEY,
        direccion VARCHAR(255) NOT NULL,
        cod_postal VARCHAR(10),
        id_municipio INT NOT NULL,
        FOREIGN KEY (id_contenedor) REFERENCES contenedores (id_contenedor) ON DELETE CASCADE,
        FOREIGN KEY (id_municipio) REFERENCES municipios (id_municipio) ON DELETE RESTRICT 
    );

-- -----------------------------------------------------
-- Tabla: seguros_vehiculos
-- -----------------------------------------------------

CREATE TABLE seguros_vehiculos (
        num_poliza VARCHAR(50) PRIMARY KEY,
        tel_emergencias VARCHAR(20),
        tel_contacto VARCHAR(20),
        empresa VARCHAR(255)
    );

-- -----------------------------------------------------
-- Tabla: vehiculos
-- -----------------------------------------------------

CREATE TABLE vehiculos (
        matricula VARCHAR(10) PRIMARY KEY,
        modelo VARCHAR(255),
        fecha_itv DATE,
        fecha_mantenimiento DATE,
        precio_mantenimiento DECIMAL(10,2),
        taller_mantenimiento VARCHAR(255),
        num_poliza VARCHAR(50) DEFAULT NULL,
        num_bastidor VARCHAR(20),
        FOREIGN KEY (num_poliza) REFERENCES seguros_vehiculos (num_poliza) ON DELETE SET NULL
        -- Se puede tener un seguro sin un vehiculo asociado?
    );

-- -----------------------------------------------------
-- Tabla: rutas
-- -----------------------------------------------------

CREATE TABLE rutas (
        id_ruta INT PRIMARY KEY AUTO_INCREMENT,
        id_conductor INT NOT NULL,
        matricula VARCHAR(10),
        fecha DATE,
        notas VARCHAR(255),
        FOREIGN KEY (id_conductor) REFERENCES conductores (id_conductor) ON DELETE RESTRICT,
        FOREIGN KEY (matricula) REFERENCES vehiculos (matricula) ON DELETE SET NULL
        -- Aqui en principio nunca se borrará, pero ponemos el DELETE CASCADE para poder hacer pruebas. Cambiarlo por DELETE RESTRICT o No poner nada
    );


-- -----------------------------------------------------
-- Tabla: Rutas-contenedores
-- -----------------------------------------------------
CREATE TABLE rutas-contenedores(
        id_ruta INT,
        id_contenedor INT,
        PRIMARY KEY (id_ruta, id_contenedor),
        FOREIGN KEY (id_ruta) REFERENCES rutas(id_ruta) ON DELETE CASCADE,
        FOREIGN KEY (id_contenedor) REFERENCES contenedores(id_contenedor) ON DELETE CASCADE
    );

-- -----------------------------------------------------
-- Tabla: recogidas
-- -----------------------------------------------------

CREATE TABLE recogidas (
        id_recogida INT PRIMARY KEY AUTO_INCREMENT,
        id_contenedor INT,
        fecha DATE NOT NULL,
        id_ruta INT,
        litros_recogidos INT NOT NULL,
        visitado BOOLEAN,
        recogida BOOLEAN,
        bidones_recogidos INT,
        bidones_entregados INT,
        notas VARCHAR(255),
        FOREIGN KEY (id_contenedor) REFERENCES contenedores (id_contenedor) ON DELETE CASCADE,
        FOREIGN KEY (id_ruta) REFERENCES rutas (id_ruta) ON DELETE SET NULL
        -- Aqui en principio nunca se borrará, pero ponemos el DELETE SET NULL para poder hacer pruebas. Cambiarlo por NO poner nada
    );

-- -----------------------------------------------------
-- Tabla: productos_recogidas (relación N:M)
-- -----------------------------------------------------

CREATE TABLE productos_recogidas(
        id_recogida INT,
        id_producto INT,
        cantidad INT,
        PRIMARY KEY (id_recogida, id_producto),
        FOREIGN KEY (id_recogida) REFERENCES recogidas(id_recogida) ON DELETE CASCADE,
        FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE RESTRICT
    );


-- -----------------------------------------------------
-- Tabla: Codigos_EESS
-- -----------------------------------------------------
CREATE TABLE codigos_eess(
        cod_eess INT,
        id_cliente INT,
        PRIMARY KEY (cod_eess),
        FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente) ON DELETE CASCADE
       
    );
