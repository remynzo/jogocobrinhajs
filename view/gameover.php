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
    <form action="?acao=cadastrar">  
        <input type="hidden" name="score" id="scoreG">
        <input type="hidden" name="num" id="numG" >
        <input type="hidden" name="nome" id="nomeG">

    <div class="menu-screen">
        <span class="game-over">game over</span>
        <span class="final-score">score <span>00</span></span>

        <button type="submit" class="btn-play" >
            <span class="material-symbols-outlined">
                play_circle
            </span>

            
            Jogar novamente
        </button>

    </div>
    </form> 
    <script src="scriptgameover.js"></script>
</body>
</html>