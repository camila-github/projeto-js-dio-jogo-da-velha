const informacoes = document.querySelector(".info-jogador");
const divJogo = document.getElementById("jogo");

let quadrados;
let JogoAtivo = true;
let verificarVezDeJogar = true;
let vencedor = null;
let verificarEmpate = true;
let letraX = "X";
let letraO = "O";

window.onload = () => criarQuadrados();

function criarQuadrados() {
  for (let j = 1; j <= 9; j++) {
    divJogo.innerHTML += `<div class="jogo-quadrado" id="q${j}"></div>`
  }
  quadrados = document.querySelectorAll(".jogo-quadrado");
}

jogo.addEventListener('click', (e) => {
  if (!JogoAtivo) reiniciarJogo();

  const classes = e.target.classList;
  if (classes[1] == "X" || classes[1] == "O" || vencedor != null) return;
  
  (verificarVezDeJogar) ? e.target.classList.add("X") : e.target.classList.add("O");
  
  mudarVezDeJogar();    
})

const mudarVezDeJogar = () => {
  verificarVezDeJogar = !verificarVezDeJogar;
  
  (verificarVezDeJogar) ? 
  informacoes.innerHTML = letraX + " está na vez!!" :
  informacoes.innerHTML = "<span>" + letraO + " está na vez!! </span>";
  
  checarVencedor();
};

const checarVencedor = () => {
  /*Declaração das variaveis*/
  const q1 = document.querySelector("#q1").classList[1];
  const q2 = document.querySelector("#q2").classList[1];
  const q3 = document.querySelector("#q3").classList[1];
  const q4 = document.querySelector("#q4").classList[1];
  const q5 = document.querySelector("#q5").classList[1];
  const q6 = document.querySelector("#q6").classList[1];
  const q7 = document.querySelector("#q7").classList[1];
  const q8 = document.querySelector("#q8").classList[1];
  const q9 = document.querySelector("#q9").classList[1];

  /*Transforma o jogo em uma lista*/
  jogo = [
    [q1, q2, q3],
    [q4, q5, q6],
    [q7, q8, q9],
    [quadrados[0], quadrados[1], quadrados[2]],
    [quadrados[3], quadrados[4], quadrados[5]],
    [quadrados[6], quadrados[7], quadrados[8]]
  ];

  let verificarEmpate = true;
  /* Verifica jogada horizontal */
  for (let i = 0; i < 3; i++) {
    if (jogo[i][0] && jogo[i][0] == jogo[i][1] && jogo[i][2] == jogo[i][0]) {
      verificarGanhador(jogo[i][0]);
      i += 3;
      verificarEmpate = false;
      mudaCorQuadrado(i, "horizontal");
    }
  }
 /* Verifica jogada vertical */
  for (let i = 0; i < 3; i++) {
    if (jogo[0][i] && jogo[0][i] == jogo[1][i] && jogo[2][i] == jogo[0][i]) {
      verificarGanhador(jogo[0][i]);
      verificarEmpate = false;
      mudaCorQuadrado(i, "vertical");
    }
  }
  
  /* Verifica jogada na diagonal */
  if (jogo[0][0] && jogo[0][0] == jogo[1][1] && jogo[2][2] == jogo[0][0]) {
    verificarGanhador(jogo[0][0]);
    verificarEmpate = false;
    mudaCorQuadrado(0, "diagonalDois");
  }
  
  if (jogo[0][2] && jogo[0][2] == jogo[1][1] && jogo[2][0] == jogo[0][2]) {
    verificarGanhador(jogo[0][2]);
    verificarEmpate = false;
    mudaCorQuadrado(0, "diagonalUm");
  }
  
  /* Verifica se "Deu Velha" */
  if (q1 && q2 && q3 && q4 && q5 && q6 && q7 && q8 && q9 && verificarEmpate) {
    informacoes.innerHTML = "EMPATOU!!";
    JogoAtivo = false;
    mudaCorQuadrado(0, "deuVelha");
  }
};

const letra = (l) => (l === "X" ? letraX : letraO);

const verificarGanhador = (vencedor) => {
  JogoAtivo = false;
  
  (vencedor === "X") ?
  informacoes.innerHTML = letra(vencedor) + " ganhou!!" :
  informacoes.innerHTML = "<span>" + letra(vencedor) + " ganhou!!</span>";
};

const mudaCorQuadrado = (i, jogadas) => {
  if (jogadas == "horizontal") {
      jogo[i][0].classList.add("vencedor"),
      jogo[i][1].classList.add("vencedor"),
      jogo[i][2].classList.add("vencedor");
  }
  if (jogadas == "vertical") {
      jogo[3][i].classList.add("vencedor"),
      jogo[4][i].classList.add("vencedor"),
      jogo[5][i].classList.add("vencedor");
  }
  if (jogadas == "diagonalUm") {
      jogo[3][2].classList.add("vencedor"),
      jogo[4][1].classList.add("vencedor"),
      jogo[5][0].classList.add("vencedor");
  }
  if (jogadas == "diagonalDois") {
      jogo[3][0].classList.add("vencedor"),
      jogo[4][1].classList.add("vencedor"),
      jogo[5][2].classList.add("vencedor");
  }
  if (jogadas == "deuVelha") {
    for (let d = 0; d < 3; d++) {
      for (let c = 0; c < 3; c++) jogo[d + 3][c].classList.add("velha");
    }
  }
};

function reiniciarJogo() {
  JogoAtivo = true;
  verificarVezDeJogar = true;  
  informacoes.innerHTML = letraX + " está na vez!!";  
  vencedor = null;
  
  for (let q of quadrados) q.classList.remove("X", "O", "vencedor", "velha");
};