<?php
    // Captura os dados enviados via POST da página anterior
    $nome = $_POST["nome"] ?? ''; // Usa ?? para evitar erro caso não tenha valor
    $num = $_POST["num"] ?? ''; // Evita erro se 'num' não for enviado
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
        
        <div class="score">score: <span class="score--value" id="scoreDisplay">00</span></div>
        
        <button id="chamaPHP" type="submit" style="display:none;"></button>

        <input type="hidden" name="score" id="score" value="0">
        <input type="hidden" name="nome" id="nome" value="<?php echo htmlspecialchars($nome); ?>"> 
        <input type="hidden" name="num" id="num" value="<?php echo htmlspecialchars($num); ?>"> 
        
<canvas width="600" height="600"></canvas>
</form>

<script src="script.js"></script>
</body>
</html>
