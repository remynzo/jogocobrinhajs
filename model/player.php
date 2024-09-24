<?php
class Player implements JsonSerializable{
//formato de envio de dados do servidor para o cliente
//será em JSON
	//atributos da classe
	private $idPlayer;
	private $nome;
	private $score;

	private $numero;


	//metodo para gerar o json
	function jsonSerialize():mixed{
		return 
		[
			
			'nome'	 	=> $this->nome,
			'idPlayer' 	=> $this->idPlayer,
			'numero'	=> $this->numero,
			'score'		=> $this->score
		];
	}

	//Metodos Get e Set
	//Métodos Mágicos
	function setNome($nome){
		$this->nome = $nome;
	}
	function getNome(){
		return $this->nome;
	}
	function setNumero($numero){
		$this->numero = $numero;
	}
	function getNumero(){
		return $this->numero;
	}

	
	function setScore($score){
		$this->score = $score;
	}
	function getScore(){
		return $this->score;
	}
  	function __get($atributo){
		return $this->atributo;
	}

	function __set($atributo, $value){
		$this->$atributo = $value;
	}

	//acessar o banco de dados
	private $con;
	function __construct(){
		include_once("conexao.php");
		$classe_con = new Conexao();
		$this->con = $classe_con->Conectar();
	}

	
	function cadastrar(){
		$comandoSql = "insert into player (nome, score, numero) values (?,?,?)";
		$valores = array($this->nome, $this->score, $this->numero);
		$exec = $this->con->prepare($comandoSql);
		$exec->execute($valores);
	}

	function atualizar(){
		$comandoSql = "update tbagendapessoal set nome = ?, telefone = ?, email = ? where codigo = ?";
		$valores = array($this->nome, $this->telefone, $this->email, $this->codigo);
		$exec = $this->con->prepare($comandoSql);
		$exec->execute($valores);
	}

	function excluir(){
	$comandoSql = "delete from tbagendapessoal where codigo = ?";
	$valores = array($this->codigo);
	$exec = $this->con->prepare($comandoSql);
	$exec->execute($valores);
	}

	function consultar(){
	$comandoSql = "select * from player ";
	$exec = $this->con->prepare($comandoSql);
	$exec->execute();

	$dados = array();

	foreach ($exec->fetchAll() as $value) {
		$jogador = new Player;
		$jogador->nome 	= $value["nome"];
		$jogador->score	= $value["score"];
		$jogador->idPlayer	= $value["idPlayer"];
	
		$dados[] = $jogador;		
		}
		return $dados;
	}

	function retornarDados(){
	$comandoSql = "select * from tbagendapessoal where codigo = ?";
	$valores = array($this->codigo);
	$exec = $this->con->prepare($comandoSql);
	$exec->execute($valores);

	$value  = $exec->fetch();

	$jogador = new Player;
	$jogador->nome 		= $value["nome"];
	$jogador->score	= $value["score"];

	return $jogador;
	}

	function retornarDadosNome(){
	$comandoSql = "select * from tbagendapessoal where nome like ?";
	$valores = array("%".$this->nome."%");
	$exec = $this->con->prepare($comandoSql);
	$exec->execute($valores);
	$value  = $exec->fetch();
	$jogador = new Player;
	$jogador->nome 		= $value["nome"];
	$jogador->score	= $value["score"];

	return $jogador;
}

}
?>
