USE sercampo_db;

-- =====================================================
-- SCRIPT DE MIGRACIÓN DE DATOS DESDE eess_todo
-- =====================================================

-- =====================================================
INSERT INTO clientes (PointID, nombre, cif, telefono, notas)
SELECT 
    CONCAT('EESS-', codigo_eess) AS PointID,
    Estacion AS nombre,
    cif,
    telefono,
    NULL AS notas
FROM eess_todo
WHERE codigo_eess IS NOT NULL 
  AND Estacion IS NOT NULL
ON DUPLICATE KEY UPDATE
    nombre = VALUES(nombre),
    cif = VALUES(cif),
    telefono = VALUES(telefono);

-- =====================================================
INSERT INTO municipios (municipio, provincia, pais, id_zona)
SELECT DISTINCT
    Municipio,
    NULL AS provincia,
    Pais,
    NULL AS id_zona
FROM eess_todo
WHERE Municipio IS NOT NULL 
  AND Municipio != ''
ON DUPLICATE KEY UPDATE
    municipio = VALUES(municipio);

-- =====================================================
INSERT INTO codigos_eess (cod_eess, id_cliente)
SELECT 
    tg.codigo_eess,
    c.id_cliente
FROM eess_todo tg
INNER JOIN clientes c ON CONCAT('EESS-', tg.codigo_eess) = c.PointID
WHERE tg.codigo_eess IS NOT NULL
ON DUPLICATE KEY UPDATE
    id_cliente = VALUES(id_cliente);

-- =====================================================
INSERT INTO contenedores (
    id_tipo_contenedor, 
    id_cliente, 
    tipo_legal, 
    recogida, 
    periodo_recogida_dias, 
    mercancia, 
    latitud, 
    longitud, 
    inicio, 
    fin, 
    activo
)
SELECT 
    8 AS id_tipo_contenedor, -- Habria que confirmar que el tipo es este
    c.id_cliente,
    'EESS Repsol' AS tipo_legal,
    NULL AS recogida,
    NULL AS periodo_recogida_dias,  -- Por defecto 30 días
    NULL AS mercancia,
    CAST(REPLACE(tg.Latitud, ',', '.') AS DECIMAL(10,8)) AS latitud,
    CAST(REPLACE(tg.Longitud, ',', '.') AS DECIMAL(11,8)) AS longitud,
    NULL AS inicio,
    NULL AS fin,
    TRUE AS activo
FROM eess_todo tg
INNER JOIN clientes c ON CONCAT('EESS-', tg.codigo_eess) = c.PointID;

-- =====================================================
INSERT INTO direcciones (id_contenedor, direccion, cod_postal, id_municipio)
SELECT 
    cont.id_contenedor,
    tg.Direccion,
    tg.cod_postal,
    m.id_municipio
FROM eess_todo tg
INNER JOIN clientes c ON CONCAT('EESS-', tg.codigo_eess) = c.PointID
INNER JOIN contenedores cont ON cont.id_cliente = c.id_cliente
INNER JOIN municipios m ON m.municipio = tg.Municipio
WHERE tg.Direccion IS NOT NULL 
  AND tg.Direccion != ''
ON DUPLICATE KEY UPDATE
    direccion = VALUES(direccion),
    cod_postal = VALUES(cod_postal),
    id_municipio = VALUES(id_municipio);