-- ESTE ARCHIVO ES EL SCRIPT DE CREACION DE LA BASE DE DATOS


--CREA LA BASE DE DATOS SI NO EXISTE
CREATE DATABASE IF NOT EXISTS sercampo_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE sercampo_db;

--TABLAS 
    -- Usuarios: id_usuario(PK), nombre, passsword
    -- Clientes: id_cliente(PK), nombre, cif, telefono, ID_CONTENEDOR, inicio, fin, activo, observaciones.
    -- Contenedor: id­_contenedor(PK), direccion, tipo_legal, ID_TIPO_CONTENEDOR, recogida, periodo_recogida, mercancia, latitud, longitud, notas.
    -- Tipo_contenedor: id_tipo_contenedor(PK), tipo, capacidad(L), notas
    -- Recogidas: ID_CONTENEDOR(PK), fecha(PK), ID_RUTA, litro_recogidos, visitado, recogida, mes_recogida, año_recogida, ID_CONDUCTOR, ID_PRODUCTO, cantidad, notas.
    -- Productos: id_productos(PK), coste, tipo, notas.
    -- Rutas: id_ruta(PK), ID_CLIENTE, ID_MUNICIPIO, ID_CONDUCTOR, notas.
    -- Conductores: id_conductores(PK), nombre.
    -- Direcciones: ID_CLIENTE(PK), dirección, cod_postal, ID_MUNICIPIO.
    -- Municipios: id_municipio(PK), localidad, provincia, pais, zona.

CREATE TABLE usuarios (
    id_usuario int PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255),
    email VARCHAR(50),
    telefono VARCHAR(15),
    password VARCHAR(255)
),

CREATE TABLE clientes(
    id_cliente INT PRIMARY KEY AUTO_INCREMENT,
    cif VARCHAR(30),
    telefono VARCHAR(15),
    inicio DATE,
    fin DATE,
    activo BOOLEAN,
    notas VARCHAR(255)
    FOREIGN KEY (id_contenedor) REFERENCES contenedores (id_contenedor)

),

CREATE TABLE contenedores (
    id_contenedor int PRIMARY KEY AUTO_INCREMENT,
    tipo_legal ENUM ('horeca', 'EESS_repsol', 'contenedor'),
    recogida BOOLEAN,
    periodo_recogida_dias INT,
    mercancia VARCHAR (255),
    latitud FLOAT(12,8),
    altitud FLOAT(12,8),
    FOREIGN KEY (id_tipo_contenedor) REFERENCES tipo_contenedor (id_tipo_contenedor),
    FOREIGN KEY (id_cliente) REFERENCES clientes (id_cliente)

    

)