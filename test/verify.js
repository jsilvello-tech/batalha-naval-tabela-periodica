// Script de verificação de integridade dos dados e regras do jogo
// Executável no navegador ou via script

function runTests() {
  console.log('--- Iniciando Testes Unitários de Batalha Naval da Tabela Periódica ---');
  let passed = 0;
  let total = 0;

  function assert(condition, message) {
    total++;
    if (condition) {
      console.log(`[PASS] ${message}`);
      passed++;
    } else {
      console.error(`[FAIL] ${message}`);
      throw new Error(`Falha no teste: ${message}`);
    }
  }

  // 1. Integridade dos Elementos
  assert(typeof ELEMENTS_DATA !== 'undefined' && ELEMENTS_DATA.length >= 36, 'Base possui pelo menos 36 elementos do 9º ano.');
  for (let z = 1; z <= 36; z++) {
    const el = getElementByZ(z);
    assert(el !== null, `Elemento Z=${z} existe na base.`);
    assert(el.simbolo && el.nome, `Elemento Z=${z} (${el.simbolo}) tem símbolo e nome.`);
    assert(el.periodo >= 1 && el.periodo <= 4, `Elemento Z=${z} tem período válido (${el.periodo}).`);
    assert(el.grupo >= 1 && el.grupo <= 18, `Elemento Z=${z} tem grupo válido (${el.grupo}).`);
    const fam = getFamily(el.familiaId);
    assert(fam && fam.nome, `Elemento Z=${z} possui família química associada (${fam.nome}).`);
  }

  // 2. Criação do GameState
  const game = new GameState();
  game.resetGame('VS_AI', 'Turma 9A', 'Prof. Mendeleev');
  assert(game.player1.nome === 'Turma 9A', 'Jogador 1 inicializado corretamente.');
  assert(game.player2.tipo === 'ai', 'Jogador 2 inicializado como IA.');
  assert(game.phase === 'SETUP_P1', 'Fase inicial é SETUP_P1.');

  // 3. Regras de Posicionamento
  const cfgPortaAvioes = SHIP_CONFIGS.find(s => s.tamanho === 4);
  const cfgCruzador = SHIP_CONFIGS.find(s => s.tamanho === 2);

  // Tentativa de colocar navio horizontal em H (período 1, grupo 1) -> deve falhar pois não há elementos em grupo 2..17
  const invalidH = game.canPlaceShip(game.player1, cfgCruzador, 1, 'horizontal');
  assert(invalidH === false, 'Não permite colocar navio horizontal em H passando por espaço vazio.');

  // Tentativa de colocar navio vertical em H (grupo 1: H, Li, Na, K) -> deve funcionar!
  const validHVert = game.canPlaceShip(game.player1, cfgPortaAvioes, 1, 'vertical');
  assert(Array.isArray(validHVert) && validHVert.length === 4, 'Permite colocar Porta-Aviões vertical na Família 1 (H, Li, Na, K).');

  // Posicionamento real
  const placed = game.placeShip(game.player1, cfgPortaAvioes.id, 1, 'vertical');
  assert(placed === true, 'Porta-Aviões posicionado com sucesso.');
  assert(game.player1.ships.length === 1, 'Frota possui 1 navio posicionado.');

  // Auto-posicionamento para preencher o resto
  const autoPlaced = game.autoPlaceAllShips(game.player1);
  assert(autoPlaced === true, 'Posicionamento automático completou com sucesso.');
  assert(game.player1.ships.length === 5, 'Frota do Jogador 1 possui os 5 navios.');
  assert(game.isFleetComplete(game.player1) === true, 'Frota do Jogador 1 está completa.');

  // Posicionamento automático da IA
  const aiAutoPlaced = game.autoPlaceAllShips(game.player2);
  assert(aiAutoPlaced === true, 'IA posicionou sua frota com sucesso.');
  assert(game.player2.ships.length === 5, 'IA possui 5 navios.');

  // 4. Mecânica de Disparo
  const firstShipCell = game.player2.ships[0].cells[0];
  const shotHit = game.fireShot(game.player1, game.player2, firstShipCell);
  assert(shotHit.isHit === true, 'Disparo em célula com navio é detectado como HIT.');
  assert(game.player2.shotsReceived[firstShipCell] === 'hit', 'Registro no tabuleiro do defensor marcado como hit.');

  // Tentativa de atirar no mesmo local
  const duplicateShot = game.fireShot(game.player1, game.player2, firstShipCell);
  assert(duplicateShot.error !== undefined, 'Não permite disparar duas vezes na mesma célula.');

  // Encontrar uma célula sem navio para testar MISS
  const allShipCells = game.player2.ships.flatMap(s => s.cells);
  const emptyCell = ELEMENTS_DATA.find(el => el.periodo <= 4 && !allShipCells.includes(el.z));
  assert(emptyCell !== undefined, 'Encontrada célula vazia na tabela para teste de erro.');
  const shotMiss = game.fireShot(game.player1, game.player2, emptyCell.z);
  assert(shotMiss.isHit === false, 'Disparo em célula vazia é detectado como MISS.');
  assert(game.player2.shotsReceived[emptyCell.z] === 'miss', 'Registro no tabuleiro do defensor marcado como miss.');

  // 5. Testes da IA
  const aiShot = game.getAiTargetShot();
  assert(aiShot >= 1 && aiShot <= 36, `IA escolheu disparo válido Z=${aiShot}.`);

  // 6. Testes do Quiz e Radar
  const q = getRandomQuizQuestion([]);
  assert(q && q.pergunta && q.opcoes.length === 4, 'Quiz retorna questão completa com 4 alternativas.');

  const radarClue = game.generateRadarScan(game.player2);
  assert(radarClue && radarClue.mensagem, 'Radar gera dica didática válida.');

  console.log(`\nTODOS OS ${passed}/${total} TESTES PASSARAM COM SUCESSO!`);
  return true;
}

if (typeof window === 'undefined') {
  // Executando em ambiente Node / CLI
  // Importação simulada se necessário
}
