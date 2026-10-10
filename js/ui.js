// Interface de Usuário e Controlador Principal da Batalha Naval da Tabela Periódica

class AppUI {
  constructor() {
    this.game = new GameState();
    this.setupCurrentPlayer = 1; // 1 = P1, 2 = P2
    this.zoomLevel = 2; // 1 a 4
    this.isLightMode = false;
    this.activeQuizQuestion = null;

    this.initElements();
    this.initEventListeners();
    this.renderLegend();
  }

  initElements() {
    // Telas
    this.viewHome = document.getElementById('viewHome');
    this.viewSetup = document.getElementById('viewSetup');
    this.viewCurtain = document.getElementById('viewCurtain');
    this.viewBattle = document.getElementById('viewBattle');
    this.viewExplorer = document.getElementById('viewExplorer');

    // Cabeçalho e Controles
    this.scoreboardBar = document.getElementById('scoreboardBar');
    this.btnToggleTheme = document.getElementById('btnToggleTheme');
    this.themeIcon = document.getElementById('themeIcon');
    this.themeLabel = document.getElementById('themeLabel');
    this.btnZoomIn = document.getElementById('btnZoomIn');
    this.btnZoomOut = document.getElementById('btnZoomOut');
    this.btnZoomReset = document.getElementById('btnZoomReset');
    this.btnFullscreen = document.getElementById('btnFullscreen');
    this.btnToggleSound = document.getElementById('btnToggleSound');
    this.soundIcon = document.getElementById('soundIcon');
    this.soundLabel = document.getElementById('soundLabel');
    this.btnRules = document.getElementById('btnRules');
    this.btnHome = document.getElementById('btnHome');

    // Placar
    this.teamP1Pill = document.getElementById('teamP1Pill');
    this.teamP2Pill = document.getElementById('teamP2Pill');
    this.teamP1Name = document.getElementById('teamP1Name');
    this.teamP2Name = document.getElementById('teamP2Name');
    this.teamP1Ships = document.getElementById('teamP1Ships');
    this.teamP2Ships = document.getElementById('teamP2Ships');
    this.teamP1Hits = document.getElementById('teamP1Hits');
    this.teamP2Hits = document.getElementById('teamP2Hits');
    this.turnText = document.getElementById('turnText');

    // Setup
    this.setupPlayerTitle = document.getElementById('setupPlayerTitle');
    this.setupPlayerInstructions = document.getElementById('setupPlayerInstructions');
    this.shipsSelectorList = document.getElementById('shipsSelectorList');
    this.btnOrientH = document.getElementById('btnOrientH');
    this.btnOrientV = document.getElementById('btnOrientV');
    this.btnAutoPlace = document.getElementById('btnAutoPlace');
    this.btnConfirmFleet = document.getElementById('btnConfirmFleet');
    this.setupGrid = document.getElementById('setupGrid');

    // Cortina
    this.curtainHeading = document.getElementById('curtainHeading');
    this.curtainMessage = document.getElementById('curtainMessage');
    this.btnRevealTurn = document.getElementById('btnRevealTurn');

    // Batalha
    this.battleGrid = document.getElementById('battleGrid');
    this.battleBoardTitle = document.getElementById('battleBoardTitle');
    this.battleBoardHint = document.getElementById('battleBoardHint');
    this.btnTabAttack = document.getElementById('btnTabAttack');
    this.btnTabDefense = document.getElementById('btnTabDefense');
    this.battleViewTab = 'attack';
    this.btnActivateRadar = document.getElementById('btnActivateRadar');
    this.radarStatusText = document.getElementById('radarStatusText');
    this.didacticCardContent = document.getElementById('didacticCardContent');
    this.myFleetTitle = document.getElementById('myFleetTitle');
    this.myFleetList = document.getElementById('myFleetList');
    this.battleLog = document.getElementById('battleLog');

    // Modais
    this.quizModal = document.getElementById('quizModal');
    this.quizQuestionText = document.getElementById('quizQuestionText');
    this.quizOptionsList = document.getElementById('quizOptionsList');
    this.quizFeedbackBox = document.getElementById('quizFeedbackBox');
    this.btnQuizContinue = document.getElementById('btnQuizContinue');

    this.victoryModal = document.getElementById('victoryModal');
    this.victoryTitle = document.getElementById('victoryTitle');
    this.victoryMessage = document.getElementById('victoryMessage');
    this.statTotalShots = document.getElementById('statTotalShots');
    this.statTotalHits = document.getElementById('statTotalHits');
    this.statAccuracy = document.getElementById('statAccuracy');

    this.rulesModal = document.getElementById('rulesModal');
    this.toastNotification = document.getElementById('toastNotification');
    this.explorerGrid = document.getElementById('explorerGrid');
    this.explorerDetailCard = document.getElementById('explorerDetailCard');
  }

  initEventListeners() {
    // Tema Projetor Claro / Escuro
    this.btnToggleTheme.addEventListener('click', () => {
      this.isLightMode = !this.isLightMode;
      document.body.classList.toggle('projector-light-mode', this.isLightMode);
      this.themeIcon.textContent = this.isLightMode ? '🌙' : '☀️';
      this.themeLabel.textContent = this.isLightMode ? 'Modo Sala Escura' : 'Modo Sala Clara';
      this.showToast(this.isLightMode ? 'Modo Sala Clara ativado (Alto Contraste)' : 'Modo Sala Escura ativado');
    });

    // Zoom da Tabela
    this.btnZoomIn.addEventListener('click', () => this.setZoom(this.zoomLevel + 1));
    this.btnZoomOut.addEventListener('click', () => this.setZoom(this.zoomLevel - 1));
    this.btnZoomReset.addEventListener('click', () => this.setZoom(2));

    // Fullscreen
    this.btnFullscreen.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => console.log(err));
      } else {
        document.exitFullscreen().catch(err => console.log(err));
      }
    });

    // Som
    this.btnToggleSound.addEventListener('click', () => {
      const isMuted = soundFX.toggleMute();
      this.soundIcon.textContent = isMuted ? '🔇' : '🔊';
      this.soundLabel.textContent = isMuted ? 'Mudo' : 'Som';
      this.showToast(isMuted ? 'Sons desativados' : 'Sons ativados');
    });

    // Regras
    this.btnRules.addEventListener('click', () => this.openRulesModal());
    this.btnHome.addEventListener('click', () => this.goToHome());

    // Orientação do Navio no Setup
    this.btnOrientH.addEventListener('click', () => {
      this.game.placementOrientation = 'horizontal';
      this.btnOrientH.classList.add('active');
      this.btnOrientV.classList.remove('active');
      soundFX.playClick();
    });

    this.btnOrientV.addEventListener('click', () => {
      this.game.placementOrientation = 'vertical';
      this.btnOrientV.classList.add('active');
      this.btnOrientH.classList.remove('active');
      soundFX.playClick();
    });

    // Auto-Place
    this.btnAutoPlace.addEventListener('click', () => {
      const player = this.setupCurrentPlayer === 1 ? this.game.player1 : this.game.player2;
      this.game.autoPlaceAllShips(player);
      soundFX.playShot();
      this.renderSetupView();
      this.showToast('Esquadra posicionada aleatoriamente!');
    });

    // Confirmar Frota
    this.btnConfirmFleet.addEventListener('click', () => {
      this.onConfirmFleet();
    });

    // Cortina: Revelar Turno
    this.btnRevealTurn.addEventListener('click', () => {
      this.onCurtainRevealed();
    });

    // Radar / Sonda de Nêutrons
    this.btnActivateRadar.addEventListener('click', () => {
      this.openQuizModal();
    });

    // Abas do Tabuleiro de Batalha (Ataque vs Defesa)
    if (this.btnTabAttack && this.btnTabDefense) {
      this.btnTabAttack.addEventListener('click', () => {
        this.battleViewTab = 'attack';
        this.btnTabAttack.classList.add('active');
        this.btnTabDefense.classList.remove('active');
        soundFX.playClick();
        this.renderBattleView();
      });

      this.btnTabDefense.addEventListener('click', () => {
        this.battleViewTab = 'defense';
        this.btnTabDefense.classList.add('active');
        this.btnTabAttack.classList.remove('active');
        soundFX.playClick();
        this.renderBattleView();
      });
    }
  }

  setZoom(level) {
    this.zoomLevel = Math.max(1, Math.min(4, level));
    document.body.className = document.body.className.replace(/zoom-level-\d/g, '').trim();
    document.body.classList.add(`zoom-level-${this.zoomLevel}`);
    if (this.isLightMode) {
      document.body.classList.add('projector-light-mode');
    }
    soundFX.playClick();
  }

  showScreen(screenElement) {
    [this.viewHome, this.viewSetup, this.viewCurtain, this.viewBattle, this.viewExplorer].forEach(view => {
      view.classList.remove('active');
    });
    screenElement.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  showToast(message) {
    this.toastNotification.textContent = message;
    this.toastNotification.classList.add('show');
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.toastNotification.classList.remove('show');
    }, 2800);
  }

  goToHome() {
    this.scoreboardBar.style.display = 'none';
    this.showScreen(this.viewHome);
  }

  renderLegend() {
    // Já montada no HTML
  }

  // ==================== INÍCIO DE MODOS ====================
  startMode(mode) {
    soundFX.playClick();
    if (mode === 'VS_AI') {
      this.game.resetGame('VS_AI', 'Turma 9º Ano', 'Prof. Mendeleev (IA)');
      // IA posiciona sua frota imediatamente
      this.game.autoPlaceAllShips(this.game.player2);
      this.setupCurrentPlayer = 1;
      this.scoreboardBar.style.display = 'flex';
      this.updateScoreboard();
      this.renderSetupView();
      this.showScreen(this.viewSetup);
    } else if (mode === 'PASS_AND_PLAY') {
      this.game.resetGame('PASS_AND_PLAY', 'Equipe Prótons (P1)', 'Equipe Elétrons (P2)');
      this.setupCurrentPlayer = 1;
      this.scoreboardBar.style.display = 'flex';
      this.updateScoreboard();
      this.renderSetupView();
      this.showScreen(this.viewSetup);
    } else if (mode === 'EXPLORER') {
      this.scoreboardBar.style.display = 'none';
      this.renderExplorerView();
      this.showScreen(this.viewExplorer);
    }
  }

  // ==================== RENDERIZADOR BASE DA TABELA PERIÓDICA ====================
  renderTableGrid(container, options = {}) {
    const {
      onCellClick = null,
      onCellHover = null,
      onCellLeave = null,
      showShipsOfPlayer = null,
      shotsData = null,
      disabledCells = []
    } = options;

    container.innerHTML = '';

    // Célula de canto vazia (linha 0, col 0)
    const cornerCell = document.createElement('div');
    cornerCell.className = 'grid-header-cell';
    cornerCell.textContent = 'P \\ G';
    container.appendChild(cornerCell);

    // Cabeçalho das 18 Colunas (Grupos 1 a 18)
    for (let g = 1; g <= 18; g++) {
      const gCell = document.createElement('div');
      gCell.className = 'grid-header-cell';
      gCell.textContent = g;
      container.appendChild(gCell);
    }

    // Linhas 1 a 4 (Períodos 1 a 4)
    for (let p = 1; p <= this.game.maxPeriods; p++) {
      // Rótulo do Período
      const pCell = document.createElement('div');
      pCell.className = 'grid-period-label';
      pCell.textContent = `P${p}`;
      container.appendChild(pCell);

      // 18 Colunas do Período
      for (let g = 1; g <= 18; g++) {
        const el = getElementAt(p, g);

        if (!el) {
          // Espaço Vazio da Tabela
          const emptyCell = document.createElement('div');
          emptyCell.className = 'table-empty-space';
          emptyCell.title = `Mar aberto - Espaço neutro (P${p}, G${g})`;
          container.appendChild(emptyCell);
        } else {
          // Célula do Elemento Real
          const cell = document.createElement('div');
          cell.className = 'element-cell';
          cell.dataset.z = el.z;
          cell.dataset.period = el.periodo;
          cell.dataset.group = el.grupo;
          cell.dataset.family = el.familiaId;

          // Família
          const family = getFamily(el.familiaId);
          cell.title = `${el.nome} (${el.simbolo}) - Z=${el.z} | ${family.nome} | Período ${el.periodo}, Grupo ${el.grupo}`;

          // Estrutura interna da célula
          cell.innerHTML = `
            <div class="cell-header">
              <span class="cell-z">${el.z}</span>
              <span style="font-size: 0.6rem; opacity: 0.7;">${el.estado === 'Gasoso' ? '☁️' : el.estado === 'Líquido' ? '💧' : '🧱'}</span>
            </div>
            <div class="cell-symbol">${el.simbolo}</div>
            <div class="cell-name">${el.nome}</div>
          `;

          // Exibir se há navio próprio
          if (showShipsOfPlayer) {
            const hasShip = showShipsOfPlayer.ships.some(s => s.cells.includes(el.z));
            if (hasShip) {
              cell.classList.add('has-my-ship');
            }
          }

          // Exibir tiros recebidos
          if (shotsData && shotsData[el.z]) {
            if (shotsData[el.z] === 'hit') {
              cell.classList.add('shot-hit');
            } else if (shotsData[el.z] === 'miss') {
              cell.classList.add('shot-miss');
            }
          }

          // Célula desabilitada
          if (disabledCells.includes(el.z)) {
            cell.classList.add('disabled');
          }

          // Event Listeners
          if (onCellClick) {
            cell.addEventListener('click', (e) => onCellClick(el, cell, e));
          }
          if (onCellHover) {
            cell.addEventListener('mouseenter', (e) => onCellHover(el, cell, e));
          }
          if (onCellLeave) {
            cell.addEventListener('mouseleave', (e) => onCellLeave(el, cell, e));
          }

          container.appendChild(cell);
        }
      }
    }
  }

  // ==================== TELA DE SETUP (POSICIONAMENTO) ====================
  renderSetupView() {
    const player = this.setupCurrentPlayer === 1 ? this.game.player1 : this.game.player2;

    this.setupPlayerTitle.textContent = `Posicione sua Frota Atômica: ${player.nome}`;
    this.setupPlayerInstructions.textContent = `Selecione cada uma das 5 embarcações químicas e posicione-as sobre os elementos da tabela periódica.`;

    // Renderizar Seletor de Navios
    this.shipsSelectorList.innerHTML = '';
    SHIP_CONFIGS.forEach(cfg => {
      const isPlaced = player.ships.some(s => s.configId === cfg.id);
      const isSelected = this.game.selectedShipToPlace === cfg.id;

      const btn = document.createElement('button');
      btn.className = `ship-select-btn ${isSelected ? 'selected' : ''} ${isPlaced ? 'placed' : ''}`;
      btn.innerHTML = `
        <span>${cfg.simboloIcone}</span>
        <span>${cfg.nome} (${cfg.tamanho})</span>
        <span>${isPlaced ? '✓' : ''}</span>
      `;
      btn.addEventListener('click', () => {
        this.game.selectedShipToPlace = cfg.id;
        soundFX.playClick();
        this.renderSetupView();
      });
      this.shipsSelectorList.appendChild(btn);
    });

    // Estado do Botão Confirmar
    const isComplete = this.game.isFleetComplete(player);
    this.btnConfirmFleet.disabled = !isComplete;

    // Renderizar Grade de Setup
    this.renderTableGrid(this.setupGrid, {
      showShipsOfPlayer: player,
      onCellClick: (el) => this.onSetupCellClick(el),
      onCellHover: (el) => this.onSetupCellHover(el),
      onCellLeave: () => this.clearSetupPreview()
    });
  }

  onSetupCellHover(el) {
    this.clearSetupPreview();
    const player = this.setupCurrentPlayer === 1 ? this.game.player1 : this.game.player2;
    const config = SHIP_CONFIGS.find(c => c.id === this.game.selectedShipToPlace);
    if (!config) return;

    const validCells = this.game.canPlaceShip(player, config, el.z, this.game.placementOrientation);

    if (validCells) {
      validCells.forEach(z => {
        const cell = this.setupGrid.querySelector(`[data-z="${z}"]`);
        if (cell) cell.classList.add('preview-valid');
      });
    } else {
      // Destacar como inválido
      const cell = this.setupGrid.querySelector(`[data-z="${el.z}"]`);
      if (cell) cell.classList.add('preview-invalid');
    }
  }

  clearSetupPreview() {
    this.setupGrid.querySelectorAll('.preview-valid, .preview-invalid').forEach(c => {
      c.classList.remove('preview-valid', 'preview-invalid');
    });
  }

  onSetupCellClick(el) {
    const player = this.setupCurrentPlayer === 1 ? this.game.player1 : this.game.player2;
    const config = SHIP_CONFIGS.find(c => c.id === this.game.selectedShipToPlace);
    if (!config) return;

    const success = this.game.placeShip(player, config.id, el.z, this.game.placementOrientation);

    if (success) {
      soundFX.playClick();
      // Selecionar o próximo navio ainda não posicionado automaticamente
      const nextUnplaced = SHIP_CONFIGS.find(cfg => !player.ships.some(s => s.configId === cfg.id));
      if (nextUnplaced) {
        this.game.selectedShipToPlace = nextUnplaced.id;
      }
      this.renderSetupView();
    } else {
      soundFX.playError();
      this.showToast('Posição inválida! Os navios não podem sobrepor-se nem cruzar espaços vazios.');
    }
  }

  onConfirmFleet() {
    soundFX.playClick();
    if (this.game.mode === 'VS_AI') {
      // Inicia a Batalha diretamente
      this.startBattle();
    } else if (this.game.mode === 'PASS_AND_PLAY') {
      if (this.setupCurrentPlayer === 1) {
        // Cortina para P2 posicionar
        this.setupCurrentPlayer = 2;
        this.showCurtainScreen(
          'Cortina do Projetor: Troca de Equipe',
          'A Equipe Prótons terminou o posicionamento! Por favor, passem o controle para a Equipe Elétrons posicionar sua esquadra.',
          () => {
            this.renderSetupView();
            this.showScreen(this.viewSetup);
          }
        );
      } else {
        // Ambas as equipes terminaram o setup! Cortina para o combate
        this.showCurtainScreen(
          'Tudo Pronto para a Batalha!',
          'As frotas de ambas as equipes foram posicionadas. Que a ciência comece! Equipe Prótons fará o primeiro disparo.',
          () => {
            this.startBattle();
          }
        );
      }
    }
  }

  // ==================== CORTINA DE PRIVACIDADE DO PROJETOR ====================
  showCurtainScreen(heading, message, onRevealCallback) {
    this.curtainHeading.textContent = heading;
    this.curtainMessage.textContent = message;
    this.curtainOnReveal = onRevealCallback;
    this.showScreen(this.viewCurtain);
  }

  onCurtainRevealed() {
    soundFX.playClick();
    if (this.curtainOnReveal) {
      this.curtainOnReveal();
      this.curtainOnReveal = null;
    }
  }

  // ==================== TELA DE BATALHA ====================
  startBattle() {
    this.game.phase = 'BATTLE';
    this.game.currentTurn = 1;
    this.updateScoreboard();
    this.renderBattleView();
    this.showScreen(this.viewBattle);
    this.showToast('Batalha iniciada! Selecione um elemento inimigo para atacar.');
  }

  renderBattleView() {
    const isP1Turn = this.game.currentTurn === 1;
    const attacker = isP1Turn ? this.game.player1 : this.game.player2;
    const defender = isP1Turn ? this.game.player2 : this.game.player1;

    // Atualizar botões de abas
    if (this.btnTabAttack && this.btnTabDefense) {
      this.btnTabAttack.classList.toggle('active', this.battleViewTab === 'attack');
      this.btnTabDefense.classList.toggle('active', this.battleViewTab === 'defense');
    }

    if (this.battleViewTab === 'attack') {
      // Atualizar Título do Tabuleiro
      this.battleBoardTitle.textContent = `Tabela Inimiga (${defender.nome}) - Vez de ${attacker.nome}`;
      this.battleBoardHint.textContent = `Clique em um elemento para lançar o disparo atômico!`;

      // Desabilitar células que já receberam disparos
      const shotKeys = Object.keys(defender.shotsReceived).map(Number);

      this.renderTableGrid(this.battleGrid, {
        shotsData: defender.shotsReceived,
        disabledCells: shotKeys,
        onCellClick: (el) => this.onBattleShotClick(el)
      });
    } else {
      // Visualização da Frota Própria e Defesa
      this.battleBoardTitle.textContent = `Sua Frota & Defesa (${attacker.nome})`;
      this.battleBoardHint.textContent = `Visualizando suas 5 embarcações químicas (⚓) e os disparos do adversário.`;

      this.renderTableGrid(this.battleGrid, {
        showShipsOfPlayer: attacker,
        shotsData: attacker.shotsReceived,
        onCellClick: (el) => {
          this.updateDidacticCard(el, false);
          soundFX.playClick();
        }
      });
    }

    // Renderizar Mini Frota Própria
    this.myFleetTitle.textContent = `Sua Frota (${attacker.nome})`;
    this.myFleetList.innerHTML = '';
    attacker.ships.forEach(s => {
      const isSunk = s.hits.length === s.cells.length;
      const item = document.createElement('div');
      item.className = `mini-ship-item ${isSunk ? 'sunk' : ''}`;

      let pipsHtml = '';
      for (let i = 0; i < s.tamanho; i++) {
        const isHit = i < s.hits.length;
        pipsHtml += `<div class="ship-pip ${isHit ? 'hit' : ''}"></div>`;
      }

      item.innerHTML = `
        <span>${s.simboloIcone} ${s.nome}</span>
        <div class="ship-pips">${pipsHtml}</div>
      `;
      this.myFleetList.appendChild(item);
    });

    this.updateScoreboard();
  }

  onBattleShotClick(el) {
    if (this.game.phase !== 'BATTLE' || this.game.isAiShooting) return;

    const isP1Turn = this.game.currentTurn === 1;
    const attacker = isP1Turn ? this.game.player1 : this.game.player2;
    const defender = isP1Turn ? this.game.player2 : this.game.player1;

    // Disparo
    soundFX.playShot();
    const result = this.game.fireShot(attacker, defender, el.z);

    if (result.error) {
      soundFX.playError();
      this.showToast(result.error);
      return;
    }

    // Processar Resultado
    this.processShotResult(result);
  }

  processShotResult(result) {
    const { isHit, isSunk, isGameOver, element, attacker, defender } = result;

    // Efeitos Sonoros e Visuais
    if (isHit) {
      if (isSunk) {
        soundFX.playSink();
        this.showToast(`🔥 AFUNDOU! ${attacker.nome} destruiu o ${result.sunkShip.nome}!`);
        this.addBattleLog(`💥 <strong>${attacker.nome}</strong> afundou o <strong>${result.sunkShip.nome}</strong> no elemento <strong>${element.nome} (${element.simbolo})</strong>!`);
      } else {
        soundFX.playHit();
        this.showToast(`🔥 FOGO! ${attacker.nome} atingiu um navio em ${element.nome} (${element.simbolo})!`);
        this.addBattleLog(`🔥 <strong>${attacker.nome}</strong> acertou o elemento <strong>${element.nome} (${element.simbolo})</strong>!`);
      }
    } else {
      soundFX.playMiss();
      this.showToast(`🌊 ÁGUA! Elemento ${element.nome} (${element.simbolo}) está vazio.`);
      this.addBattleLog(`🌊 <strong>${attacker.nome}</strong> disparou em <strong>${element.nome} (${element.simbolo})</strong>: ÁGUA!`);
    }

    // Atualizar Ficha Didática
    this.updateDidacticCard(element, isHit);

    // Re-renderizar tabuleiro
    this.renderBattleView();

    // Checar Fim de Jogo
    if (isGameOver) {
      setTimeout(() => {
        this.handleGameOver(attacker);
      }, 700);
      return;
    }

    // Transição de Turno
    if (this.game.mode === 'VS_AI') {
      if (this.game.currentTurn === 1) {
        // Vez da IA
        this.game.currentTurn = 2;
        this.game.isAiShooting = true;
        this.updateScoreboard();

        setTimeout(() => {
          this.executeAiTurn();
        }, 1300);
      } else {
        this.game.currentTurn = 1;
        this.game.isAiShooting = false;
        this.updateScoreboard();
      }
    } else if (this.game.mode === 'PASS_AND_PLAY') {
      // No modo 2 equipes com projetor, mostrar cortina para manter privacidade dos alvos
      const nextPlayerName = this.game.currentTurn === 1 ? this.game.player2.nome : this.game.player1.nome;
      this.game.currentTurn = this.game.currentTurn === 1 ? 2 : 1;

      setTimeout(() => {
        this.showCurtainScreen(
          'Cortina do Projetor: Troca de Turno',
          `Vez da ${nextPlayerName}! Chame o próximo representante para o projetor e clique abaixo quando estiverem prontos.`,
          () => {
            this.renderBattleView();
            this.showScreen(this.viewBattle);
          }
        );
      }, 1600);
    }
  }

  // Turno da IA (Professor Mendeleev)
  executeAiTurn() {
    const aiTargetZ = this.game.getAiTargetShot();
    if (!aiTargetZ) return;

    const result = this.game.fireShot(this.game.player2, this.game.player1, aiTargetZ);
    this.game.updateAiMemoryAfterShot(aiTargetZ, result.isHit, result.isSunk);

    // Processar disparo da IA
    this.processShotResult(result);
    this.game.isAiShooting = false;
  }

  updateDidacticCard(el, wasHit) {
    const family = getFamily(el.familiaId);

    this.didacticCardContent.innerHTML = `
      <div class="element-didactic-header">
        <div class="element-didactic-symbol" style="border-color: ${family.cor}; color: ${family.cor};">
          ${el.simbolo}
        </div>
        <div class="element-didactic-title">
          <h3>${el.nome} (Z = ${el.z})</h3>
          <span>${family.nome} • ${family.grupo}</span>
        </div>
      </div>

      <div class="didactic-specs">
        <div><strong>Massa Atômica:</strong> ${el.massa} u</div>
        <div><strong>Período:</strong> ${el.periodo}º Período</div>
        <div><strong>Camadas (Níveis):</strong> ${el.distribuicao}</div>
        <div><strong>Estado Físico:</strong> ${el.estado}</div>
        <div style="grid-column: span 2;"><strong>Valência:</strong> ${family.valencia}</div>
      </div>

      <div class="didactic-curiosity">
        <strong>💡 Curiosidade do 9º Ano:</strong><br>
        ${el.curiosidade}
      </div>

      <div style="margin-top: 0.5rem; font-size: 0.85rem; color: var(--text-muted);">
        <strong>🛠️ Aplicação no Cotidiano:</strong> ${el.aplicacao}
      </div>
    `;
  }

  addBattleLog(htmlMsg) {
    const div = document.createElement('div');
    div.innerHTML = htmlMsg;
    this.battleLog.prepend(div);
  }

  updateScoreboard() {
    const p1 = this.game.player1;
    const p2 = this.game.player2;

    this.teamP1Name.textContent = p1.nome;
    this.teamP2Name.textContent = p2.nome;

    const p1Unsunk = p1.ships.filter(s => s.hits.length < s.cells.length).length;
    const p2Unsunk = p2.ships.filter(s => s.hits.length < s.cells.length).length;

    this.teamP1Ships.textContent = `${p1Unsunk}/${p1.ships.length || 5}`;
    this.teamP2Ships.textContent = `${p2Unsunk}/${p2.ships.length || 5}`;

    this.teamP1Hits.textContent = p1.stats.hits;
    this.teamP2Hits.textContent = p2.stats.hits;

    if (this.game.currentTurn === 1) {
      this.teamP1Pill.classList.add('active-turn');
      this.teamP2Pill.classList.remove('active-turn');
      this.turnText.textContent = `Vez de ${p1.nome} - Selecione onde atacar!`;
    } else {
      this.teamP2Pill.classList.add('active-turn');
      this.teamP1Pill.classList.remove('active-turn');
      this.turnText.textContent = `Vez de ${p2.nome}...`;
    }
  }

  // ==================== QUIZ DA SONDA DE NÊUTRONS (RADAR) ====================
  openQuizModal() {
    soundFX.playClick();
    this.activeQuizQuestion = getRandomQuizQuestion(this.game.usedQuizIds);
    this.game.usedQuizIds.push(this.activeQuizQuestion.id);

    this.quizQuestionText.textContent = this.activeQuizQuestion.pergunta;
    this.quizFeedbackBox.style.display = 'none';
    this.btnQuizContinue.style.display = 'none';

    this.quizOptionsList.innerHTML = '';
    this.activeQuizQuestion.opcoes.forEach((opcao, idx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.textContent = `${String.fromCharCode(65 + idx)}) ${opcao}`;
      btn.addEventListener('click', () => this.onQuizAnswerSelected(idx, btn));
      this.quizOptionsList.appendChild(btn);
    });

    this.quizModal.classList.add('active');
  }

  onQuizAnswerSelected(selectedIndex, selectedBtn) {
    const isCorrect = selectedIndex === this.activeQuizQuestion.correta;
    const buttons = this.quizOptionsList.querySelectorAll('.quiz-option-btn');
    buttons.forEach(b => b.disabled = true);

    if (isCorrect) {
      selectedBtn.classList.add('correct');
      soundFX.playRadar();
      const defender = this.game.currentTurn === 1 ? this.game.player2 : this.game.player1;
      const radarClue = this.game.generateRadarScan(defender);

      this.quizFeedbackBox.style.display = 'block';
      this.quizFeedbackBox.style.borderLeft = '4px solid #06d6a0';
      this.quizFeedbackBox.innerHTML = `
        <h4 style="color: #06d6a0; margin-bottom: 0.25rem;">✨ Resposta Correta!</h4>
        <p style="margin-bottom: 0.75rem;">${this.activeQuizQuestion.explicacao}</p>
        <div style="background: rgba(6, 214, 160, 0.2); padding: 0.75rem; border-radius: 8px; font-weight: 700;">
          ${radarClue.mensagem}
        </div>
      `;
      this.addBattleLog(`📡 <strong>Sonda de Nêutrons:</strong> ${radarClue.mensagem}`);
    } else {
      selectedBtn.classList.add('wrong');
      buttons[this.activeQuizQuestion.correta].classList.add('correct');
      soundFX.playError();

      this.quizFeedbackBox.style.display = 'block';
      this.quizFeedbackBox.style.borderLeft = '4px solid #ef476f';
      this.quizFeedbackBox.innerHTML = `
        <h4 style="color: #ef476f; margin-bottom: 0.25rem;">Incorreto!</h4>
        <p>${this.activeQuizQuestion.explicacao}</p>
        <div style="margin-top: 0.5rem; color: var(--text-muted);">
          A sonda não pôde ser calibrada nesta rodada. Tente novamente no próximo turno!
        </div>
      `;
    }

    this.btnQuizContinue.style.display = 'inline-block';
  }

  onQuizContinue() {
    this.closeQuizModal();
  }

  closeQuizModal() {
    this.quizModal.classList.remove('active');
  }

  // ==================== FIM DE JOGO ====================
  handleGameOver(winner) {
    soundFX.playVictory();
    this.victoryTitle.textContent = `Vitória de ${winner.nome}! 🏆`;
    this.victoryMessage.textContent = `Parabéns à equipe! Todas as 5 embarcações químicas foram desvendadas com grande maestria científica!`;

    const total = winner.stats.shots;
    const hits = winner.stats.hits;
    const accuracy = total > 0 ? Math.round((hits / total) * 100) : 0;

    this.statTotalShots.textContent = total;
    this.statTotalHits.textContent = hits;
    this.statAccuracy.textContent = `${accuracy}%`;

    this.victoryModal.classList.add('active');
  }

  restartCurrentGame() {
    this.victoryModal.classList.remove('active');
    this.startMode(this.game.mode);
  }

  // ==================== REGRAS MODAL ====================
  openRulesModal() {
    soundFX.playClick();
    this.rulesModal.classList.add('active');
  }

  closeRulesModal() {
    this.rulesModal.classList.remove('active');
  }

  // ==================== MODO EXPLORADOR DA TABELA ====================
  renderExplorerView() {
    this.renderTableGrid(this.explorerGrid, {
      onCellClick: (el) => {
        soundFX.playClick();
        this.updateExplorerDetail(el);
      }
    });

    // Abrir o Hidrogênio inicialmente
    const initialEl = getElementByZ(1);
    this.updateExplorerDetail(initialEl);
  }

  updateExplorerDetail(el) {
    const family = getFamily(el.familiaId);
    this.explorerDetailCard.innerHTML = `
      <div style="display: flex; align-items: center; gap: 1.25rem; margin-bottom: 1rem;">
        <div style="width: 70px; height: 70px; border-radius: 14px; border: 3px solid ${family.cor}; display: flex; align-items: center; justify-content: center; font-size: 2.2rem; font-weight: 900; color: ${family.cor};">
          ${el.simbolo}
        </div>
        <div>
          <h2 style="font-size: 1.8rem; margin-bottom: 0.25rem;">${el.nome} (${el.simbolo})</h2>
          <span style="font-size: 1.1rem; color: var(--accent-cyan); font-weight: 700;">${family.nome} • ${family.grupo}</span>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.75rem; background: var(--bg-card); padding: 1rem; border-radius: 10px; margin-bottom: 1rem;">
        <div><strong>Número Atômico (Z):</strong> ${el.z} prótons</div>
        <div><strong>Massa Atômica:</strong> ${el.massa} u</div>
        <div><strong>Período (Linha):</strong> ${el.periodo}º Período</div>
        <div><strong>Grupo (Coluna):</strong> ${el.grupo}</div>
        <div><strong>Estado Físico:</strong> ${el.estado}</div>
        <div><strong>Camadas Eletrônicas:</strong> ${el.distribuicao}</div>
        <div style="grid-column: 1 / -1;"><strong>Camada de Valência:</strong> ${family.valencia}</div>
      </div>

      <div style="background: rgba(72, 202, 228, 0.1); border-left: 4px solid var(--accent-cyan); padding: 1rem; border-radius: 8px; margin-bottom: 0.75rem; font-size: 1.05rem;">
        <strong>💡 Curiosidade Pedagógica (9º Ano):</strong><br>
        ${el.curiosidade}
      </div>

      <div style="background: rgba(6, 214, 160, 0.1); border-left: 4px solid #06d6a0; padding: 1rem; border-radius: 8px; font-size: 1.05rem;">
        <strong>🛠️ Aplicações no Cotidiano:</strong><br>
        ${el.aplicacao}
      </div>
    `;
  }
}

// Inicialização Global
window.addEventListener('DOMContentLoaded', () => {
  window.app = new AppUI();
});
