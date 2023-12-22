// Definindo os itens e seus pesos e scores
const itens = [
  { nome: 'maçã', peso: 8, score: 5 },
  { nome: 'brócolis', peso: 9, score: 9 },
  { nome: 'uva', peso: 6, score: 6 },
  { nome: 'hgjf', peso: 9, score: 7 },
  { nome: 'hgfff', peso: 9, score: 10 },
  { nome: 'www', peso: 3, score: 5 },
  { nome: 'asdasds', peso: 7, score: 10 },
  { nome: 'dfgfdg', peso: 7, score: 0 },
  { nome: 'ghfhf', peso: 8, score: 8 },

  { nome: 'gdfg234', peso: 3, score: 8 },
  { nome: 'dfgdf234', peso: 7, score: 9 },
  { nome: '123dsfs', peso: 7, score: 0 },
  { nome: '5asd31', peso: 8, score: 10 },

  { nome: 'www', peso: 7, score: 8 },
];

function calcularPontuacaoTotal(itens) {
  let pontuacaoTotal = 0;
  let pontuacaoMaxima = 0;

  // Itera sobre cada item na lista
  itens.forEach((item) => {
    // Calcula a pontuação total multiplicando o peso pelo score de cada item
    // console.log(item.peso * item.score);
    pontuacaoTotal += item.peso * item.score;

    // Calcula a pontuação máxima possível multiplicando o peso pelo score máximo (assumindo que o score máximo é 10)
    pontuacaoMaxima += item.peso * 10;
  });

  // Calcula a porcentagem de pontuação em relação à pontuação máxima possível
  console.log(pontuacaoMaxima, pontuacaoTotal);
  const porcentagem = (pontuacaoTotal / pontuacaoMaxima) * 100;
  console.log(-1 || 'alow');

  // console.log(porcentagem);
  // Retorna a porcentagem formatada com duas casas decimais
  return porcentagem.toFixed(2);
}

// Calcula a pontuação total e exibe o resultado
const porcentagemTotal = calcularPontuacaoTotal(itens);
console.log(`A pontuação total é ${porcentagemTotal}% do máximo possível.`);
