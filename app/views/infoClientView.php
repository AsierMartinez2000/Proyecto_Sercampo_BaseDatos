<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="../frontend/css/estilos_Client.css">
<title>Información Cliente</title>
</head>

<body>
<!-- Quitar la busqueda cuando tengamos el dashboard hecho -->
<form action="../public/index.php" method="GET">

<input type="hidden" name="controller" value="infoClient">
<input type="hidden" name="action" value="mostrarInfoClient">

<label>Buscar cliente:</label>
<input type="text" name="buscar" placeholder="ID o Nombre">

<button type="submit">Buscar</button>

</form>

<h1 class="tittle">CLIENTES</h1>

<div class="container">
    <div class="form">

        <h3>FORMULARIO DATOS</h3>

        <label>Nombre</label>
        <input type="text" value="<?php echo $cliente['nombre']; ?>" disabled>

        <label>Ubicación</label>
        <input type="text" placeholder="CP" disabled>
        <input type="text" placeholder="Municipio" disabled>
        <input type="text" placeholder="Provincia" disabled>
        <input type="text" placeholder="Estado" disabled>
        <input type="text" placeholder="País" disabled>

        <label>CIF</label>
        <input type="text" value="<?php echo $cliente['cif']; ?>" disabled>

        <label>Teléfono</label>
        <input type="text" value="<?php echo $cliente['telefono']; ?>" disabled>

        <label>Inicio</label>
        <input type="date" value="<?php echo $cliente['inicio']; ?>" disabled>

        <label>Fin</label>
        <input type="date" value="<?php echo $cliente['fin']; ?>" disabled>

    </div>

    <div class="ubication">

        <h3>UBICACIÓN</h3>

        <div class="map">
            Mapa
        </div>

    </div>

</div>


<div class="buttons">

    <button class="button_activate">Activar cliente</button>

    <button class="button_desactivate">Desactivar cliente</button>

</div>

</body>
</html>