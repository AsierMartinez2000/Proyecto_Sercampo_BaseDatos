<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Información Cliente</title>
</head>
<body>
    
<h1>Información del cliente</h1>

<p>CIF: <?php echo $_SESSION['cif']; ?></p>
<p>Teléfono: <?php echo $_SESSION['telefono']; ?></p>
<p>Inicio: <?php echo $_SESSION['inicio']; ?></p>
<p>Fin: <?php echo $_SESSION['fin']; ?></p>
<p>Activo: <?php echo $_SESSION['activo']; ?></p>
<p>Observaciones: <?php echo $_SESSION['notas']; ?></p>

</body>
</html>