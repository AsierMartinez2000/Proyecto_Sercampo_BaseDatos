-- ESTE ARCHIVO ES EL SCRIPT DE CREACION DE LA BASE DE DATOS
-- CREA LA BASE DE DATOS SI NO EXISTE
CREATE DATABASE IF NOT EXISTS sercampo_db CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_unicode_ci;

USE sercampo_db;

-- TABLAS 
-- Usuarios: id_usuario(PK), nombre, passsword
-- Clientes: id_cliente(PK), nombre, cif, telefono, inicio, fin, activo, observaciones.
-- Tipo_contenedor: id_tipo_contenedor(PK), tipo, capacidad(L), notas
-- Contenedores: id­_contenedor(PK), direccion, tipo_legal, ID_TIPO_CONTENEDOR, ID_CLIENTE, recogida, periodo_recogida, mercancia, latitud, longitud, notas.
-- Productos: id_productos(PK), coste, tipo, notas.
-- Conductores: id_conductores(PK), nombre.
-- Zonas: id_zonas, nombre.
-- Municipios: id_municipio(PK), localidad, provincia, pais, ID_ZONA.
-- Direcciones: ID_CONTENEDOR(PK), dirección, cod_postal, ID_MUNICIPIO.
-- Rutas: id_ruta(PK), ID_CONTENEDOR, ID_MUNICIPIO, ID_CONDUCTOR, notas.
-- Recogidas: ID_CONTENEDOR(PK), fecha(PK), ID_RUTA, litro_recogidos, visitado, recogida, mes_recogida, año_recogida, ID_CONDUCTOR, ID_PRODUCTO, cantidad, notas.

CREATE TABLE
    usuarios (
        id_usuario int PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(255),
        email VARCHAR(50),
        telefono VARCHAR(15),
        password VARCHAR(255)
    );

CREATE TABLE
    clientes (
        id_cliente INT PRIMARY KEY AUTO_INCREMENT,
        PointID VARCHAR(20) UNIQUE NOT NULL,
        nombre VARCHAR(255) NOT NULL,
        cif VARCHAR(30),
        telefono VARCHAR(15),
        notas VARCHAR(255)
    );

CREATE TABLE
    tipo_contenedor (
        id_tipo_contenedor INT PRIMARY KEY AUTO_INCREMENT,
        tipo VARCHAR(50),
        capacidad INT,
        notas VARCHAR(255)
    );

CREATE TABLE
    contenedores (
        id_contenedor int PRIMARY KEY AUTO_INCREMENT,
        id_tipo_contenedor INT NOT NULL,
        id_cliente INT NOT NULL,
        tipo_legal ENUM ('Horeca', 'EESS Repsol', 'Contenedor'),
        recogida BOOLEAN,
        periodo_recogida_dias INT,
        mercancia VARCHAR(255),
        latitud FLOAT (100, 8), -- Esto habrá que modificarlo cuando arreglemos las coordenadas
        longitud FLOAT (100, 8), -- Esto habr que modificarlo cuando arreglemos las coordenadas
        inicio DATE,
        fin DATE,
        activo ENUM ('Sí', 'No'),
        FOREIGN KEY (id_tipo_contenedor) REFERENCES tipo_contenedor (id_tipo_contenedor),
        FOREIGN KEY (id_cliente) REFERENCES clientes (id_cliente)
    );

CREATE TABLE
    productos (
        id_producto INT PRIMARY KEY AUTO_INCREMENT,
        tipo VARCHAR(50),
        coste FLOAT (5, 2),
        nota VARCHAR(255)
    );

CREATE TABLE
    conductores (
        id_conductor INT PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(50)
    );

CREATE TABLE
    zonas (id_zona INT PRIMARY KEY, nombre VARCHAR(50));

CREATE TABLE
    municipios (
        id_municipio INT PRIMARY KEY AUTO_INCREMENT,
        localidad VARCHAR(50),
        provincia VARCHAR(50),
        pais VARCHAR(50),
        id_zona INT,
        FOREIGN KEY (id_zona) REFERENCES zonas (id_zona)
    );

CREATE TABLE
    direcciones (
        id_contenedor INT PRIMARY KEY,
        direccion VARCHAR(255),
        cod_postal VARCHAR(50),
        id_municipio INT NOT NULL,
        FOREIGN KEY (id_municipio) REFERENCES municipios (id_municipio),
        FOREIGN KEY (id_contenedor) REFERENCES contenedores (id_contenedor)
    );

CREATE TABLE
    rutas (
        id_ruta INT PRIMARY KEY AUTO_INCREMENT,
        id_contenedor INT NOT NULL,
        id_municipio INT NOT NULL,
        id_conductor INT NOT NULL,
        notas VARCHAR(255),
        Foreign Key (id_contenedor) REFERENCES direcciones (id_contenedor),
        Foreign Key (id_municipio) REFERENCES direcciones (id_municipio),
        Foreign Key (id_conductor) REFERENCES conductores (id_conductor)
    );

CREATE TABLE
    recogidas (
        id_recogida INT PRIMARY KEY AUTO_INCREMENT,
        id_contenedor int,
        fecha DATE,
        id_ruta int NOT NULL,
        id_conductor int NOT NULL,
        litros_recogidos INT NOT NULL,
        visitado BOOLEAN,
        recogida BOOLEAN,
        mes_recogida INT,
        anos_recogida INT,
        FOREIGN KEY (id_contenedor) REFERENCES contenedores (id_contenedor),
        FOREIGN KEY (id_ruta) REFERENCES rutas (id_ruta),
        FOREIGN KEY (id_conductor) REFERENCES conductores (id_conductor),
    );

CREATE TABLE
    productos_recogidas(
        id_recogida INT,
        id_producto INT,
        cantidad INT,
        PRIMARY KEY (id_recogida, id_producto),
        FOREIGN KEY (id_recogida) REFERENCES recogidas(id_recogida)
        FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
    );

