const buttonPlay = document.querySelector(".btn-play");

  const redireciona = () =>{
    window.location.href = "cadastro.html";
  }

var input = document.getElementById("myInput");

  document.addEventListener("keydown", (event)=> {
  if (event.key === "Enter") {
    event.preventDefault();
    buttonPlay.click();
  }
});
