<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> DATABASE</title>
</head>
<body>
    
    <h1>Bienvenido a la base de datos de </h1>
    <p>Esto es homeView.php</p>

    <form action="index.php" method="post">
            <input type="hidden" name="controller" value="login">
            <input type="hidden" name="action" value="procesarLogin">

            <label for="nombre">Nombre</label>
            <input type="text" name="nombre" id="nombre">

            <label for="password">Password</label>
            <input type="password" name="password" id="password">
            <br><br>
            <button type="submit">Login</button>
    </form>

</body>
</html>

