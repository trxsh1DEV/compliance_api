// Definindo os itens e seus pesos e scores
const itens = [
  // { nome: 'maçã', peso: 8, score: 5 },
  // { nome: 'brócolis', peso: 7, score: 5 },
  { nome: 'uva', peso: 6, score: 5 },
  { nome: 'www', peso: 8, score: 7 },
  { nome: 'asdasds', peso: 9, score: 8 },
  { nome: 'dfgfdg', peso: 9, score: 8 },
  { nome: 'ghfhf', peso: 9, score: 8 },
];

// Função para calcular a pontuação total
function calcularPontuacaoTotal(itens) {
  let pontuacaoTotal = 0;
  let pontuacaoMaxima = 0;

  // Itera sobre cada item na lista
  itens.forEach((item) => {
    // Calcula a pontuação total multiplicando o peso pelo score de cada item
    console.log(item.peso * item.score);
    pontuacaoTotal += item.peso * item.score;
    //   console.log(pontuacaoTotal)

    // Calcula a pontuação máxima possível multiplicando o peso pelo score máximo (assumindo que o score máximo é 10)
    pontuacaoMaxima += item.peso * 10;
  });

  // Calcula a porcentagem de pontuação em relação à pontuação máxima possível
  console.log(pontuacaoMaxima, pontuacaoTotal);
  const porcentagem = (pontuacaoTotal / pontuacaoMaxima) * 100;

  // Retorna a porcentagem formatada com duas casas decimais
  return porcentagem.toFixed(2);
}

// Calcula a pontuação total e exibe o resultado
const porcentagemTotal = calcularPontuacaoTotal(itens);
console.log(`A pontuação total é ${porcentagemTotal}% do máximo possível.`);
