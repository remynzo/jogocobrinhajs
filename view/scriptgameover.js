const buttonPlay = document.querySelector(".btn-play");

buttonPlay.addEventListener("click", () => {
    window.location.href = "cadastro.html";
    snake = [initialPosition];
    direction = null; 
    clearTimeout(loopId); // Para o loop atual do jogo
    restart(); // Reinicializa o jogo
});

var input = document.getElementById("myInput");

    addEventListener("keydown", (event)=> {
  if (event.key === "Enter") {
    event.preventDefault();
    buttonPlay.click();
  }
});

document.getElementById("nomeG") = document.getElementById("nomeC").innerText;
document.getElementById("numeroG") = document.getElementById("numeroC").innerText;
document.getElementById("scoreG") = document.getElementById("scoreC").innerText;