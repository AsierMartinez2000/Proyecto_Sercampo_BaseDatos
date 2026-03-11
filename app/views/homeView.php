<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SERCAMPO DATABASE</title>
</head>
<body>
    
    <h1>Bienvenido a la base de datos de sercampo</h1>
    <p>Esto es homeView.php</p>

    <form action="index.php">
        <input type="hidden" name="controller" value="login">
        <input type="hidden" name="action" value="procesarLogin">
        <label for="usuario">Usuario: </label>
        <input type="text" name="usuario" id="usuario">
        <label for="password">Contraseña: </label>
        <input type="password" name="password" id="password">
        <button type="submit">Login</button>
    </form>
    
</body>
</html>

