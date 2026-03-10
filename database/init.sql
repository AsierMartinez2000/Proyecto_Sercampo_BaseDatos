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
);

CREATE TABLE clientes(
    id_cliente INT PRIMARY KEY AUTO_INCREMENT,
    id_contenedor INT NOT NULL,
    cif VARCHAR(30),
    telefono VARCHAR(15),
    inicio DATE,
    fin DATE,
    activo BOOLEAN,
    notas VARCHAR(255)
    FOREIGN KEY (id_contenedor) REFERENCES contenedores (id_contenedor)

);

CREATE TABLE contenedores (
    id_contenedor int PRIMARY KEY AUTO_INCREMENT,
    id_tipo_contenedor INT NOT NULL,
    id_cliente INT NOT NULL,
    tipo_legal ENUM ('horeca', 'EESS_repsol', 'contenedor'),
    recogida BOOLEAN,
    periodo_recogida_dias INT,
    mercancia VARCHAR (255),
    latitud FLOAT(12,8),
    altitud FLOAT(12,8),
    FOREIGN KEY (id_tipo_contenedor) REFERENCES tipo_contenedor (id_tipo_contenedor),
    FOREIGN KEY (id_cliente) REFERENCES clientes (id_cliente)
);

CREATE TABLE recogidas (
    id_contenedor int PRIMARY KEY,
    fecha DATE PRIMARY KEY,
    id_ruta int NOT NULL,
    id_conductor int NOT NULL,
    id_producto int NOT NULL,
    litros_recogidos INT NOT NULL,
    visitado BOOLEAN,
    recogida BOOLEAN,
    mes_recogida INT,
    anos_recogida INT,
    cantidad INT
    FOREIGN KEY (id_contenedor) REFERENCES contenedores (id_contenedor),
    FOREIGN KEY (id_ruta) REFERENCES rutas (id_ruta),
    FOREIGN KEY (id_conductor) REFERENCES conductores (id_conductor),
    FOREIGN KEY (id_producto) REFERENCES productos (id_producto)
);

CREATE TABLE tipo_contenedor (
    id_tipo_contenedor INT PRIMARY KEY AUTO_INCREMENT,
    tipo VARCHAR (50),
    capacidad INT,
    notas VARCHAR(255)
);

CREATE TABLE direcciones (
    id_contenedor INT PRIMARY KEY,
    direccion VARCHAR(255),
    cod_postal VARCHAR(50),
    FOREIGN KEY (id_municipio) REFERENCES municipios(id_municipio)
);

CREATE TABLE municipios (
    id_municipio INT PRIMARY KEY AUTO_INCREMENT,
    localidad VARCHAR(50),
    provincia VARCHAR(50),
    pais VARCHAR(50),
    id_zona INT NOT NULL,
    FOREIGN KEY (id_zona) REFERENCES zonas (id_zona)

);

CREATE TABLE zonas (
    id_zona INT PRIMARY KEY,
    nombre VARCHAR(50)
);

CREATE TABLE conductores (

    id_conductor INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50)

);

CREATE TABLE productos(
    id_producto INT PRIMARY KEY AUTO_INCREMENT,
    coste FLOAT(5,2),
    tipo VARCHAR(50),
    nota VARCHAR(255)
);

CREATE TABLE rutas (
    id_ruta INT PRIMARY KEY AUTO_INCREMENT,
    id_contenedor INT NOT NULL,
    id_municipio INT NOT NULL,
    id_conductor INT NOT NULL,
    Foreign Key (id_contenedor) REFERENCES direcciones(id_contenedor),
    Foreign Key (id_municipio) REFERENCES direcciones(id_municipio),
    Foreign Key (id_conductor) REFERENCES conductores(id_conductor)
);