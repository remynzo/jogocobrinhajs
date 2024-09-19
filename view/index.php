<?php 
include_once("../controller/playercontroller.php");
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
    <h1></h1>
    <div class="score">score: <span class="score--value">00</span></div>
    
    <div class="info">
        <h1>DIGITE SEU NOME:</h1>
        <input type="text" id="texto" name="texto">
        <input type="hidden" name="score" id="score" value="0">

        <div id="teclado">
        </div>
    </div>
    
    <div class="menu-screen">
        <span class="game-over">game over</span>
        <span class="final-score">score <span>00</span></span>
        <form method="POST" action="?acao=cadastrar">
        <button type="submit" class="btn-play" onclick="cad()" >
            <span class="material-symbols-outlined">
                play_circle
            </span>
            </form>
            
            Jogar novamente
        </button>
    </div>
    <canvas width="600" height="600"></canvas>
    <script src="script.js"></script>
    <script src="scriptteclado.js"></script>
</body>
</html>