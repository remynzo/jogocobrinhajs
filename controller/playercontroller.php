<?php
//incluir o arquivo com as funções do Banco de Dados
include_once("../model/player.php");
//criando um objeto da classe AgendaPessoal
$jogador = new Player;
//Verificar se existe o campo Ação
if (isset($_REQUEST["acao"])){
	switch ($_REQUEST["acao"]) {

		case 'cadastrar':
			//enviando os valores vindos do Android
		$jogador->setNome($_POST['nome']);
		$jogador->setScore($_POST['score']);
		$jogador->setNumero($_POST['num']);
		//chamando o método cadastrar
		$jogador->cadastrar();
			//mensagem de confirmação 
		//echo "ok";
		break;

		case 'consultar_json':
			echo json_encode($jogador->consultar());
			break;
		
	
			
	}
}
?>
