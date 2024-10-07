<?php
    $nome = $_POST["nome"];
    $numero = $_POST["num"];
    echo ($nome);   

    ?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="styleteclado.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <title>Document</title>
</head>
<body>   
    <form action="gameover.php" method="POST">
        <h1></h1>
        <div class="score">score: <span class="score--value" name="score">00</span></div>
        <button id="chamaPHP" type="submit" style="display:none;"></button>
        <input type="hidden" name="score" id="score">
        <input type="hidden" name="score" id="score">
        <input type="hidden" name="score" id="score">
        <canvas width="600" height="600" ></canvas>
    </form>
    <script src="script.js"></script>
</body>
</html>