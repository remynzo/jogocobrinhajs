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
    <form method="POST" action="?acao=cadastrar">    
    <h1></h1>
    <div class="score">score: <span class="score--value">00</span></div>
 
    <div class="info">
        <h1 id="pergunta" >DIGITE SEU NOME:</h1>
        <input type="text" id="texto" name="texto">
        <input type="hidden" name="score" id="score">
        <input type="hidden" name="num" id="num">
        <input type="hidden" name="nome" id="nome"

        <div id="teclado">
        </div>
    </div>
    
    <div class="menu-screen">
        <span class="game-over">game over</span>
        <span class="final-score">score <span>00</span></span>

        <button type="submit" class="btn-play" onclick="cad()" >
            <span class="material-symbols-outlined">
                play_circle
            </span>

            
            Jogar novamente
        </button>
    </div>
    </form>
    <canvas width="600" height="600"></canvas>
    <script src="script.js"></script>
    <script src="scriptteclado.js"></script>
</body>
</html>