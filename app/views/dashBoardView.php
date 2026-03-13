<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DashBoard</title>
</head>
<body>
    <h1>DashBoard Principal</h1>

    <h3>Bienvenido <?php echo $_SESSION['nombre']; ?> </h3>

    <!-- AQUI SE MOSTRARA LA INFORMACION NECESARIA PARA HACER LAS CONSULTAS -->
    <form action="index.php" method="post">
        <input type="hidden" name="controller" value="productos_test">
        <input type="hidden" name="action" value="mostrarBuscador">
        <button type="submit">Buscar producto</button>
    </form>

    <form action="index.php" method="post">
        <input type="hidden" name="controller" value="infoClient">
        <input type="hidden" name="action" value="mostrarInfoClient">
        <button type="submit">Ver información del cliente</button>
    </form>
    
    <form action="index.php" method="post">
        <input type="hidden" name="controller" value="login">
        <input type="hidden" name="action" value="logout">
        <button type="submit">Cerrar sesión</button>
    </form>
</body>
</html>