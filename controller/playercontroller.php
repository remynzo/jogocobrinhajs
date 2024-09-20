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
		//chamando o método cadastrar
		$jogador->cadastrar();
			//mensagem de confirmação 
		//echo "ok";
		break;

		case 'consultar_json':
			echo json_encode($jogador->consultar());
			break;
		
		case 'atualizar':
		//$jogador->nome 	= $_POST['nome'];
		$jogador->telefone	= $_POST['telefone'];
		$agenda->email 	= $_POST['email'];
		$agenda->codigo	= $_POST['codigo'];

		$agenda->atualizar();

		//echo "ok";
		break;
		
		case 'excluir':
		$jogador->codigo = $_POST['codigo'];
		$jogador->excluir();

		//echo "ok";
		break;

		

		case 'retorna_cod':
		$jogador->codigo	= $_POST['codigo'];
		echo json_encode($agenda->retornarDados());
		break;

		case 'retorna_nome':
		$jogador->setNome($_POST['nome']);
		echo json_encode($agenda->retornarDadosNome());
		break;
	}
}
?>
