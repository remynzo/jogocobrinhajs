<?php
    // Captura os dados enviados via POST ou define como vazio se não estiverem disponíveis
    $score = $_POST["score"] ?? ''; 
    $nome = $_POST["nome"] ?? ''; 
    $num = $_POST["num"] ?? ''; 
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
    <form action="?acao=cadastrar" method="POST">  <!-- Alterar o método para POST -->
    <div class="menu-screen">
        <span class="game-over">game over</span>
        <span class="final-score">score <span><?php echo htmlspecialchars($score); ?></span></span>
        <input type="hidden" name="num" id="num" value="<?php echo htmlspecialchars($num); ?>"> 
        <input type="hidden" name="nome" id="nome" value="<?php echo htmlspecialchars($nome); ?>"> 
        <input type="hidden" name="score" id="score" value="<?php echo htmlspecialchars($score); ?>"> 
        <button type="submit" class="btn-play">
            <span class="material-symbols-outlined">play_circle</span>
            Jogar novamente
        </button>
    </div>
    </form> 
    <script defer src="scriptgameover.js"></script>
</body>
</html>
