<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>PRODUCTOS_test</title> 
    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script> 
    <!-- jQuery UI -->
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.min.js"></script>
</head>

<body>
    <h2>Buscar Producto</h2> <input type="text" id="buscador" placeholder="Escribe un producto...">
    <script>
        $(function() {
            $("#buscador").autocomplete({
                source: "index.php?controller=productos_test&action=autocompletado",
                minLength: 2
            });
        });
    </script>
</body>

</html>