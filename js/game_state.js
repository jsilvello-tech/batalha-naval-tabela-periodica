// Máquina de Estados e Lógica Central da Batalha Naval da Tabela Periódica

class GameState {
  constructor() {
    this.mode = 'VS_AI'; // 'VS_AI' | 'PASS_AND_PLAY' | 'EXPLORER'
    this.phase = 'MODE_SELECT'; // 'MODE_SELECT', 'SETUP_P1', 'TRANSITION_SETUP', 'SETUP_P2', 'BATTLE', 'TRANSITION_TURN', 'GAME_OVER'
    this.currentTurn = 1; // 1 = Jogador 1 (Prótons), 2 = Jogador 2 (Elétrons / IA)
    this.maxPeriods = 4; // Padrão do 9º ano: Períodos 1 a 4 (Elementos 1 a 36)

    this.player1 = this.createPlayer('Equipe Prótons', 'player');
    this.player2 = this.createPlayer('Prof. Mendeleev (IA)', 'ai');

    this.selectedShipToPlace = null;
    this.placementOrientation = 'horizontal'; // 'horizontal' | 'vertical'
    this.pendingRadar = null;
    this.lastShotResult = null;
    this.usedQuizIds = [];
    this.isAiShooting = false;
  }

  createPlayer(nome, tipo) {
    return {
      nome: nome,
      tipo: tipo, // 'player' | 'ai'
      ships: [], // [{ id, configId, nome, tamanho, cells: [z1, z2...], hits: [] }]
      shotsReceived: {}, // z -> 'hit' | 'miss'
      stats: {
        shots: 0,
        hits: 0,
        misses: 0,
        sunk: 0
      },
      radarCharges: 2,
      aiMemory: {
        targetQueue: [], // elementos vizinhos a investigar após um hit
        lastHitZ: null,
        huntMode: true
      }
    };
  }

  resetGame(mode = 'VS_AI', p1Name = 'Equipe Prótons', p2Name = null) {
    this.mode = mode;
    this.currentTurn = 1;
    this.usedQuizIds = [];
    this.selectedShipToPlace = SHIP_CONFIGS[0].id;
    this.placementOrientation = 'horizontal';
    this.pendingRadar = null;
    this.lastShotResult = null;
    this.isAiShooting = false;

    if (mode === 'VS_AI') {
      this.player1 = this.createPlayer(p1Name, 'player');
      this.player2 = this.createPlayer(p2Name || 'Prof. Mendeleev (IA)', 'ai');
      this.phase = 'SETUP_P1';
    } else if (mode === 'PASS_AND_PLAY') {
      this.player1 = this.createPlayer(p1Name || 'Equipe Prótons', 'player');
      this.player2 = this.createPlayer(p2Name || 'Equipe Elétrons', 'player');
      this.phase = 'SETUP_P1';
    } else {
      this.phase = 'EXPLORER';
    }
  }

  // Obter lista de elementos válidos para o modo atual (1 a 36 no 9º ano)
  getValidElements() {
    return ELEMENTS_DATA.filter(el => el.periodo <= this.maxPeriods);
  }

  // Verifica se um navio cabe na posição indicada
  canPlaceShip(player, shipConfig, startZ, orientation) {
    const startEl = getElementByZ(startZ);
    if (!startEl || startEl.periodo > this.maxPeriods) return false;

    const size = shipConfig.tamanho;
    const requiredCells = [];

    if (size === 1) {
      requiredCells.push(startEl.z);
    } else if (orientation === 'horizontal') {
      for (let i = 0; i < size; i++) {
        const nextGroup = startEl.grupo + i;
        const nextEl = getElementAt(startEl.periodo, nextGroup);
        // Não pode estourar a tabela nem cair em espaço vazio (ex: entre H e He no período 1)
        if (!nextEl || nextEl.periodo > this.maxPeriods) return false;
        requiredCells.push(nextEl.z);
      }
    } else { // vertical
      for (let i = 0; i < size; i++) {
        const nextPeriod = startEl.periodo + i;
        if (nextPeriod > this.maxPeriods) return false;
        const nextEl = getElementAt(nextPeriod, startEl.grupo);
        if (!nextEl) return false;
        requiredCells.push(nextEl.z);
      }
    }

    // Verificar se alguma célula já está ocupada por outro navio
    for (const ship of player.ships) {
      for (const cellZ of requiredCells) {
        if (ship.cells.includes(cellZ)) return false;
      }
    }

    return requiredCells;
  }

  // Adiciona o navio à frota do jogador
  placeShip(player, shipConfigId, startZ, orientation) {
    const config = SHIP_CONFIGS.find(c => c.id === shipConfigId);
    if (!config) return false;

    // Remove navio anterior se já estiver posicionado
    player.ships = player.ships.filter(s => s.configId !== shipConfigId);

    const cells = this.canPlaceShip(player, config, startZ, orientation);
    if (!cells) return false;

    player.ships.push({
      id: `${shipConfigId}_${Date.now()}`,
      configId: shipConfigId,
      nome: config.nome,
      simboloIcone: config.simboloIcone,
      tamanho: config.tamanho,
      cells: cells,
      hits: []
    });

    return true;
  }

  // Remove navio
  removeShip(player, shipConfigId) {
    player.ships = player.ships.filter(s => s.configId !== shipConfigId);
  }

  // Posicionamento aleatório inteligente (usado para botão "Posicionar Frota Aleatória" e para a IA)
  autoPlaceAllShips(player) {
    player.ships = [];
    const validElements = this.getValidElements();

    for (const config of SHIP_CONFIGS) {
      let placed = false;
      let attempts = 0;

      while (!placed && attempts < 500) {
        attempts++;
        const randomEl = validElements[Math.floor(Math.random() * validElements.length)];
        const orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';
        const cells = this.canPlaceShip(player, config, randomEl.z, orientation);

        if (cells) {
          player.ships.push({
            id: `${config.id}_${Date.now()}`,
            configId: config.id,
            nome: config.nome,
            simboloIcone: config.simboloIcone,
            tamanho: config.tamanho,
            cells: cells,
            hits: []
          });
          placed = true;
        }
      }

      if (!placed) {
        // Fallback: tentar novamente do início
        return this.autoPlaceAllShips(player);
      }
    }

    return true;
  }

  // Todos os navios foram posicionados?
  isFleetComplete(player) {
    return SHIP_CONFIGS.every(cfg => player.ships.some(s => s.configId === cfg.id));
  }

  // Executa um disparo em direção a um elemento Z
  fireShot(attacker, defender, targetZ) {
    const targetEl = getElementByZ(targetZ);
    if (!targetEl) return { error: 'Elemento inexistente.' };

    if (defender.shotsReceived[targetZ]) {
      return { error: 'Este elemento já foi atacado anteriormente!' };
    }

    attacker.stats.shots++;

    // Verifica se atingiu algum navio
    let hitShip = null;
    for (const ship of defender.ships) {
      if (ship.cells.includes(targetZ)) {
        hitShip = ship;
        break;
      }
    }

    let isHit = false;
    let isSunk = false;

    if (hitShip) {
      isHit = true;
      defender.shotsReceived[targetZ] = 'hit';
      attacker.stats.hits++;
      hitShip.hits.push(targetZ);

      if (hitShip.hits.length === hitShip.cells.length) {
        isSunk = true;
        attacker.stats.sunk++;
      }
    } else {
      defender.shotsReceived[targetZ] = 'miss';
      attacker.stats.misses++;
    }

    // Verificar se todos os navios do defensor foram destruídos
    const isGameOver = defender.ships.every(s => s.hits.length === s.cells.length);

    const result = {
      targetZ: targetZ,
      element: targetEl,
      isHit: isHit,
      isSunk: isSunk,
      sunkShip: isSunk ? hitShip : null,
      isGameOver: isGameOver,
      attacker: attacker,
      defender: defender
    };

    this.lastShotResult = result;
    return result;
  }

  // IA do Prof. Mendeleev escolhendo alvo
  getAiTargetShot() {
    const validElements = this.getValidElements();
    const defender = this.player1; // IA atira no Jogador 1
    const unshotElements = validElements.filter(el => !defender.shotsReceived[el.z]);

    if (unshotElements.length === 0) return null;

    const memory = this.player2.aiMemory;

    // 1. Verificar fila de alvos de perseguição (Target Mode)
    while (memory.targetQueue.length > 0) {
      const candidateZ = memory.targetQueue.shift();
      if (!defender.shotsReceived[candidateZ] && getElementByZ(candidateZ)) {
        return candidateZ;
      }
    }

    // 2. Modo Caça (Hunt Mode com preferência por grupos ou xadrez)
    const preferred = unshotElements.filter(el => (el.periodo + el.grupo) % 2 === 0);
    const pool = preferred.length > 0 ? preferred : unshotElements;
    const choice = pool[Math.floor(Math.random() * pool.length)];
    return choice.z;
  }

  // Atualizar memória da IA após disparo dela
  updateAiMemoryAfterShot(targetZ, isHit, isSunk) {
    const memory = this.player2.aiMemory;
    const hitEl = getElementByZ(targetZ);
    if (!hitEl) return;

    if (isHit && !isSunk) {
      memory.lastHitZ = targetZ;
      // Adicionar vizinhos válidos horizontais e verticais na fila
      const neighbors = [
        getElementAt(hitEl.periodo, hitEl.grupo - 1),
        getElementAt(hitEl.periodo, hitEl.grupo + 1),
        getElementAt(hitEl.periodo - 1, hitEl.grupo),
        getElementAt(hitEl.periodo + 1, hitEl.grupo)
      ].filter(el => el && el.periodo <= this.maxPeriods && !this.player1.shotsReceived[el.z]);

      neighbors.forEach(n => {
        if (!memory.targetQueue.includes(n.z)) {
          memory.targetQueue.push(n.z);
        }
      });
    } else if (isSunk) {
      // Navio destruído, limpa alvos imediatos
      memory.targetQueue = [];
      memory.lastHitZ = null;
    }
  }

  // Gerar dica de radar didático (Sonda de Nêutrons)
  generateRadarScan(defender) {
    // Escolhe aleatoriamente se dá dica por período ou por família
    const unsunkShips = defender.ships.filter(s => s.hits.length < s.cells.length);
    if (unsunkShips.length === 0) {
      return { tipo: 'info', mensagem: 'Todos os navios já foram afundados!' };
    }

    const targetShip = unsunkShips[Math.floor(Math.random() * unsunkShips.length)];
    const unhitCellZ = targetShip.cells.find(z => !defender.shotsReceived[z]);
    const el = getElementByZ(unhitCellZ || targetShip.cells[0]);

    const family = getFamily(el.familiaId);

    const clueTypes = [
      {
        tipo: 'periodo',
        mensagem: `🔬 A Sonda detectou vibrações atômicas no **${el.periodo}º Período** (Linha horizontal ${el.periodo})!`
      },
      {
        tipo: 'familia',
        mensagem: `🔬 O espectrômetro identificou uma embarcação na família dos **${family.nome}** (${family.grupo})!`
      },
      {
        tipo: 'estado',
        mensagem: `🔬 O sensor térmico revelou que uma embarcação oculta está em um elemento no estado **${el.estado.toUpperCase()}**!`
      },
      {
        tipo: 'valencia',
        mensagem: `🔬 O detector eletrônico acusa que um navio inimigo está ancorado em um elemento com **${family.valencia}**!`
      }
    ];

    return clueTypes[Math.floor(Math.random() * clueTypes.length)];
  }
}
