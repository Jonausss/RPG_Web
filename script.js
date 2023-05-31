//JAVA SCRIPT UHULLLLL!!!!  (chupa css)

//=======================================================================================================================================//
//=========================================================  PERSONAGEM  ================================================================//
//=======================================================================================================================================//

//VARIAVEIS

//classes
var personagemGuerreiro;
var personagemArqueiro;
var personagemMago;
var personagens;
//valores classes
var vidaGuerreiro = 50;
var danoGuerreiro = 10;
var imagemGuerreiro = "Sprites/Personagens/Player/guerreiroSpr.png"

var vidaArqueiro = 30;
var danoArqueiro = 20;
var imagemArqueiro = "Sprites/Personagens/Player/arqueiroSpr.png"

var vidaMago = 20;
var danoMago = 30;
var imagemMago = "Sprites/Personagens/Player/magoSpr.png"


//FUNÇÕES
function Personagem(classe, vida, dano, sprite)
{
  this.classe = classe;
  this.vida = vida;
  this.dano = dano;
  this.sprite = sprite;
}
function CriarPersonagens()
{
  personagemGuerreiro = new Personagem("Guerreiro", vidaGuerreiro, danoGuerreiro, imagemGuerreiro);
  personagemGuerreiro = new Personagem("Arqueiro", vidaArqueiro, danoArqueiro, imagemArqueiro);
  personagemGuerreiro = new Personagem("Mago", vidaMago, danoMago, imagemMago);
  personagens = [personagemGuerreiro, personagemArqueiro, personagemMago];
}
CriarPersonagens();



//===========================//
//==========EVOLUÇÃO=========//
//===========================//

//VARIAVEIS=====

//valores evolution
var pontosParaEvoluir = 1;
var pontosAoEvluir = 5;


//FUNÇÕES
function EvoluirAtributo(classe, tipo)
{
  pontosParaEvoluir--;

  if(tipo == vida)
  {
    switch(classe)
    {
      case "guerreiro":
        vidaGuerreiro += pontosAoEvluir;
        $("#guerreiroVidaId").html(vidaGuerreiro);
        break;
      case "arqueiro":
        vidaArqueiro += pontosAoEvluir;
        $("#arqueiroVidaId").html(vidaArqueiro);
        break;
      case "mago":
        vidaMago += pontosAoEvluir;
        $("#magoVidaId").html(vidaMago);
      default:
        alert("classe não existente!");
        break;
    }
  }
  else if(tipo == dano)
  {
    switch(classe)
    {
      case "guerreiro":
        danoGuerreiro += pontosAoEvluir;
        $("#guerreiroDanoId").html(danoGuerreiro);
        break;
      case "arqueiro":
        danoArqueiro += pontosAoEvluir;
        $("#arqueiroDanoId").html(danoArqueiro);
        break;
      case "mago":
        danoMago += pontosAoEvluir;
        $("#magoDanoId").html(danoMago);
      default:
        alert("classe não existente!");
        break;
    }
  }

  AtualizarPontosEvolução();
}

function AtualizarPontosEvolução()
{
  $("#pointsEvolutions").html(pontosParaEvoluir);
  AtualizarButtonDisabled();
}

function AtualizarButtonDisabled()
{
  if(pontosParaEvoluir <=0)
  {
    $(".buttonUpdate").attr("disabled", true);
  }
  else
  {
    $(".buttonUpdate").attr("disabled", false)
  }
}



//=======================================================================================================================================//
//==========================================================  INIMIGOS  =================================================================//
//=======================================================================================================================================//

//VARIAVEIS
var inimigos = [];

//FUNCÕES

function Inimigo(nome, vida, dano, sprite)
{
  this.nome = nome;
  this.vida = vida;
  this.dano = dano;
  this.sprite = sprite;
}
function CriarInimigos()
{
  var orc = new Inimigo("Orc", 20, 10, "Sprites/Personagens/Inimigos/Orcs/Orc.png");
  var orcShaman = new Inimigo("Orc Shaman", 20, 30, "Sprites/Personagens/Inimigos/Orcs/Orc Shaman.png");
  var orcChefe = new Inimigo("Orc Chefe", 50, 10, "Sprites/Personagens/Inimigos/Orcs/Orc Chefe.png");
  var orcs = [orc, orcShaman, orcChefe];

  var esqueleto = new Inimigo("Esqueleto", 10, 20, "Sprites/Personagens/Inimigos/Mortos Vivos/Esqueleto.png");
  var zumbi = new Inimigo("Zumbi", 20, 30, "Sprites/Personagens/Inimigos/Mortos Vivos/Zumbi.png");
  var zumbiChefe = new Inimigo("Zumbi Chefe", 30, 50, "Sprites/Personagens/Inimigos/Mortos Vivos/Zumbi Chefe.png");
  var mortosvivos = [esqueleto, zumbi, zumbiChefe];

  var imp = new Inimigo("Imp", 20, 20, "Sprites/Personagens/Inimigos/Demônios/Imp.png");
  var demonio = new Inimigo("Demônio", 30, 30, "Sprites/Personagens/Inimigos/Demônios/Demônio.png");
  var demonioChefe = new Inimigo("Demônio Chefe", 50, 40, "Sprites/Personagens/Inimigos/Demônios/Demônio Chefe.png");
  var demonios = [imp, demonio, demonioChefe];

  inimigos = [orcs, mortosvivos, demonios];
}



//=======================================================================================================================================//
//=======================================================  SISTEMA BATALHA  =============================================================//
//=======================================================================================================================================//

//VARIAVEIS

var indexPersonagem = 1; //qual personagem está batalhando
var indexGrupoDeInimigos; //qual grupo de inimigos foi escolhido
var indexInimigoAlvo; //qual inimigo foi selecionado