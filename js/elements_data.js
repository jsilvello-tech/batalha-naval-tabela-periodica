// Base de Dados Didática da Tabela Periódica - 9º Ano do Ensino Fundamental
// Conteúdo alinhado à BNCC (EF09CI01, EF09CI02 e EF09CI03)

const FAMILIES = {
  alcalinos: {
    id: 'alcalinos',
    nome: 'Metais Alcalinos',
    grupo: 'Grupo 1 (1A)',
    cor: '#e63946',
    corClara: '#ffccd5',
    textoCor: '#ffffff',
    valencia: '1 elétron na camada de valência',
    descricao: 'Metais muito macios e extremamente reativos com a água, formando bases fortes.'
  },
  alcalino_terrosos: {
    id: 'alcalino_terrosos',
    nome: 'Metais Alcalino-Terrosos',
    grupo: 'Grupo 2 (2A)',
    cor: '#f77f00',
    corClara: '#ffe3b3',
    textoCor: '#ffffff',
    valencia: '2 elétrons na camada de valência',
    descricao: 'Metais brilhantes encontrados frequentemente na crosta terrestre e rochas.'
  },
  transicao: {
    id: 'transicao',
    nome: 'Metais de Transição',
    grupo: 'Grupos 3 a 12 (Família B)',
    cor: '#4361ee',
    corClara: '#d0daf9',
    textoCor: '#ffffff',
    valencia: 'Valência variável (subnível d incompleto)',
    descricao: 'Metais duros com alto ponto de fusão, ótimos condutores térmicos e elétricos.'
  },
  boro: {
    id: 'boro',
    nome: 'Família do Boro',
    grupo: 'Grupo 13 (3A)',
    cor: '#06d6a0',
    corClara: '#c7f9cc',
    textoCor: '#0f241d',
    valencia: '3 elétrons na camada de valência',
    descricao: 'Inicia com um semimetal (Boro) e segue com metais úteis na indústria (Alumínio, Gálio).'
  },
  carbono: {
    id: 'carbono',
    nome: 'Família do Carbono',
    grupo: 'Grupo 14 (4A)',
    cor: '#028090',
    corClara: '#b5e2fa',
    textoCor: '#ffffff',
    valencia: '4 elétrons na camada de valência',
    descricao: 'Família versátil que faz 4 ligações (tetravalente). Base da química orgânica e da vida.'
  },
  nitrogenio: {
    id: 'nitrogenio',
    nome: 'Família do Nitrogênio',
    grupo: 'Grupo 15 (5A)',
    cor: '#7209b7',
    corClara: '#e2afff',
    textoCor: '#ffffff',
    valencia: '5 elétrons na camada de valência',
    descricao: 'Elementos vitais para fertilizantes, DNA, fósforos e síntese de proteínas.'
  },
  calcogenios: {
    id: 'calcogenios',
    nome: 'Calcogênios',
    grupo: 'Grupo 16 (6A)',
    cor: '#3a0ca3',
    corClara: '#d3c0ff',
    textoCor: '#ffffff',
    valencia: '6 elétrons na camada de valência',
    descricao: 'Formadores de minérios e óxidos. Inclui o Oxigênio essencial para a nossa respiração.'
  },
  halogenios: {
    id: 'halogenios',
    nome: 'Halogênios',
    grupo: 'Grupo 17 (7A)',
    cor: '#d90429',
    corClara: '#ffc2d1',
    textoCor: '#ffffff',
    valencia: '7 elétrons na camada de valência',
    descricao: 'Formadores de sais ("halógenos"). Muito eletronegativos e ávidos por 1 elétron.'
  },
  gases_nobres: {
    id: 'gases_nobres',
    nome: 'Gases Nobres',
    grupo: 'Grupo 18 (8A/0)',
    cor: '#118ab2',
    corClara: '#b8e1f2',
    textoCor: '#ffffff',
    valencia: '8 elétrons (exceto Hélio com 2) - Estáveis',
    descricao: 'Quimicamente inertes e estáveis. Não reagem facilmente com outros elementos.'
  },
  hidrogenio: {
    id: 'hidrogenio',
    nome: 'Hidrogênio (Elemento Especial)',
    grupo: 'Grupo 1 (Sem família fixa)',
    cor: '#2a9d8f',
    corClara: '#d1f2eb',
    textoCor: '#ffffff',
    valencia: '1 elétron na única camada (K)',
    descricao: 'Elemento mais simples e abundante do universo. Não possui uma família idêntica.'
  }
};

const ELEMENTS_DATA = [
  // ================= PERÍODO 1 =================
  {
    z: 1,
    simbolo: 'H',
    nome: 'Hidrogênio',
    massa: '1,008',
    periodo: 1,
    grupo: 1,
    familiaId: 'hidrogenio',
    estado: 'Gasoso',
    distribuicao: 'K: 1',
    curiosidade: 'É o elemento mais abundante de todo o universo e serve de combustível para o Sol.',
    aplicacao: 'Combustível limpo de foguetes, formação de água (H₂O) e produção de amônia.'
  },
  {
    z: 2,
    simbolo: 'He',
    nome: 'Hélio',
    massa: '4,003',
    periodo: 1,
    grupo: 18,
    familiaId: 'gases_nobres',
    estado: 'Gasoso',
    distribuicao: 'K: 2',
    curiosidade: 'Mais leve que o ar! É o segundo elemento mais abundante no cosmos e não pega fogo.',
    aplicacao: 'Balões de festa, dirigíveis e resfriamento magnético em máquinas de ressonância.'
  },

  // ================= PERÍODO 2 =================
  {
    z: 3,
    simbolo: 'Li',
    nome: 'Lítio',
    massa: '6,94',
    periodo: 2,
    grupo: 1,
    familiaId: 'alcalinos',
    estado: 'Sólido',
    distribuicao: 'K: 2, L: 1',
    curiosidade: 'Metal tão leve que flutua no óleo e na água! Reage liberando gás hidrogênio.',
    aplicacao: 'Baterias recarregáveis de smartphones, notebooks e carros elétricos.'
  },
  {
    z: 4,
    simbolo: 'Be',
    nome: 'Berílio',
    massa: '9,012',
    periodo: 2,
    grupo: 2,
    familiaId: 'alcalino_terrosos',
    estado: 'Sólido',
    distribuicao: 'K: 2, L: 2',
    curiosidade: 'Metal cinza muito leve e rígido, presente em pedras preciosas como a esmeralda.',
    aplicacao: 'Espelhos do Telescópio Espacial James Webb e estruturas aeroespaciais leves.'
  },
  {
    z: 5,
    simbolo: 'B',
    nome: 'Boro',
    massa: '10,81',
    periodo: 2,
    grupo: 13,
    familiaId: 'boro',
    estado: 'Sólido',
    distribuicao: 'K: 2, L: 3',
    curiosidade: 'Semimetal muito duro. Quando queima, produz uma chama de cor verde brilhante.',
    aplicacao: 'Vidros resistentes ao calor (Pyrex), fogos de artifício e fertilizantes agrícolas.'
  },
  {
    z: 6,
    simbolo: 'C',
    nome: 'Carbono',
    massa: '12,011',
    periodo: 2,
    grupo: 14,
    familiaId: 'carbono',
    estado: 'Sólido',
    distribuicao: 'K: 2, L: 4',
    curiosidade: 'A base da vida na Terra! Pode formar desde o grafite macio até o diamante ultraduro.',
    aplicacao: 'Grafite do lápis, joias de diamante, fibra de carbono e matéria orgânica viva.'
  },
  {
    z: 7,
    simbolo: 'N',
    nome: 'Nitrogênio',
    massa: '14,007',
    periodo: 2,
    grupo: 15,
    familiaId: 'nitrogenio',
    estado: 'Gasoso',
    distribuicao: 'K: 2, L: 5',
    curiosidade: 'Compõe cerca de 78% do ar que respiramos todos os dias, sendo vital para plantas.',
    aplicacao: 'Adubos agrícolas, congelamento criogênico e preenchimento de pacotes de batata frita.'
  },
  {
    z: 8,
    simbolo: 'O',
    nome: 'Oxigênio',
    massa: '15,999',
    periodo: 2,
    grupo: 16,
    familiaId: 'calcogenios',
    estado: 'Gasoso',
    distribuicao: 'K: 2, L: 6',
    curiosidade: 'Indispensável na respiração celular e forma 21% da atmosfera terrestre e a camada de ozônio.',
    aplicacao: 'Respiração de seres vivos, combustão do fogo e oxigenoterapia hospitalar.'
  },
  {
    z: 9,
    simbolo: 'F',
    nome: 'Flúor',
    massa: '18,998',
    periodo: 2,
    grupo: 17,
    familiaId: 'halogenios',
    estado: 'Gasoso',
    distribuicao: 'K: 2, L: 7',
    curiosidade: 'É o elemento mais eletronegativo e reativo de toda a tabela periódica!',
    aplicacao: 'Creme dental (combate a cáries), água tratada e revestimento antiaderente de Teflon.'
  },
  {
    z: 10,
    simbolo: 'Ne',
    nome: 'Neônio',
    massa: '20,180',
    periodo: 2,
    grupo: 18,
    familiaId: 'gases_nobres',
    estado: 'Gasoso',
    distribuicao: 'K: 2, L: 8',
    curiosidade: 'Gás nobre que brilha com uma intensa luz vermelha-alaranjada sob alta voltagem.',
    aplicacao: 'Letreiros luminosos publicitários, lasers e lâmpadas sinalizadoras.'
  },

  // ================= PERÍODO 3 =================
  {
    z: 11,
    simbolo: 'Na',
    nome: 'Sódio',
    massa: '22,990',
    periodo: 3,
    grupo: 1,
    familiaId: 'alcalinos',
    estado: 'Sólido',
    distribuicao: 'K: 2, L: 8, M: 1',
    curiosidade: 'Metal prateado macio que pode ser cortado com faca e explode ao entrar em contato com água.',
    aplicacao: 'Forma o sal de cozinha comum (Cloreto de Sódio - NaCl) e lâmpadas amarelas de rua.'
  },
  {
    z: 12,
    simbolo: 'Mg',
    nome: 'Magnésio',
    massa: '24,305',
    periodo: 3,
    grupo: 2,
    familiaId: 'alcalino_terrosos',
    estado: 'Sólido',
    distribuicao: 'K: 2, L: 8, M: 2',
    curiosidade: 'Queima com uma luz branca ofuscante e é o átomo central da molécula de clorofila.',
    aplicacao: 'Fotossíntese nas plantas, ligas leves automotivas e antiácido estomacal.'
  },
  {
    z: 13,
    simbolo: 'Al',
    nome: 'Alumínio',
    massa: '26,982',
    periodo: 3,
    grupo: 13,
    familiaId: 'boro',
    estado: 'Sólido',
    distribuicao: 'K: 2, L: 8, M: 3',
    curiosidade: 'Metal mais abundante na crosta da Terra; é 100% reciclável infinitas vezes.',
    aplicacao: 'Latinhas de suco/refrigerante, esquadrias de janelas, fuselagem de aviões.'
  },
  {
    z: 14,
    simbolo: 'Si',
    nome: 'Silício',
    massa: '28,085',
    periodo: 3,
    grupo: 14,
    familiaId: 'carbono',
    estado: 'Sólido',
    distribuicao: 'K: 2, L: 8, M: 4',
    curiosidade: 'O rei da era digital! Principal componente da areia comum (quartzo).',
    aplicacao: 'Processadores de celular e computador, painéis solares e vidros.'
  },
  {
    z: 15,
    simbolo: 'P',
    nome: 'Fósforo',
    massa: '30,974',
    periodo: 3,
    grupo: 15,
    familiaId: 'nitrogenio',
    estado: 'Sólido',
    distribuicao: 'K: 2, L: 8, M: 5',
    curiosidade: 'Seu nome significa "portador da luz" em grego. Brilha no escuro na forma branca!',
    aplicacao: 'Estrutura do DNA/RNA, dentes e ossos, e fita lateral de caixas de fósforo.'
  },
  {
    z: 16,
    simbolo: 'S',
    nome: 'Enxofre',
    massa: '32,060',
    periodo: 3,
    grupo: 16,
    familiaId: 'calcogenios',
    estado: 'Sólido',
    distribuicao: 'K: 2, L: 8, M: 6',
    curiosidade: 'Sólido amarelo vibrante encontrado em regiões vulcânicas e fontes termais.',
    aplicacao: 'Produção de ácido sulfúrico industrial, vulcanização de pneus e pólvora.'
  },
  {
    z: 17,
    simbolo: 'Cl',
    nome: 'Cloro',
    massa: '35,450',
    periodo: 3,
    grupo: 17,
    familiaId: 'halogenios',
    estado: 'Gasoso',
    distribuicao: 'K: 2, L: 8, M: 7',
    curiosidade: 'Gás verde-amarelado sufocante no estado puro, mas companheiro inseparável do sal de cozinha!',
    aplicacao: 'Purificação de água potável, desinfecção de piscinas e alvejantes domésticos.'
  },
  {
    z: 18,
    simbolo: 'Ar',
    nome: 'Argônio',
    massa: '39,948',
    periodo: 3,
    grupo: 18,
    familiaId: 'gases_nobres',
    estado: 'Gasoso',
    distribuicao: 'K: 2, L: 8, M: 8',
    curiosidade: 'Terceiro gás mais abundante na atmosfera terrestre (~0,93%). Significa "preguiçoso/inativo".',
    aplicacao: 'Gás de proteção em soldas industriais e interior de lâmpadas incandescentes.'
  },

  // ================= PERÍODO 4 =================
  {
    z: 19,
    simbolo: 'K',
    nome: 'Potássio',
    massa: '39,098',
    periodo: 4,
    grupo: 1,
    familiaId: 'alcalinos',
    estado: 'Sólido',
    distribuicao: 'K: 2, L: 8, M: 8, N: 1',
    curiosidade: 'Seu símbolo K vem de "Kalium". Vital para evitar cãibras e regular os batimentos cardíacos.',
    aplicacao: 'Alimentos (como banana e batata), fertilizantes NPK e sabões especiais.'
  },
  {
    z: 20,
    simbolo: 'Ca',
    nome: 'Cálcio',
    massa: '40,078',
    periodo: 4,
    grupo: 2,
    familiaId: 'alcalino_terrosos',
    estado: 'Sólido',
    distribuicao: 'K: 2, L: 8, M: 8, N: 2',
    curiosidade: 'Quinto elemento mais abundante no corpo humano, compondo 99% da massa óssea.',
    aplicacao: 'Ossos e dentes, leite e derivados, giz escolar e cimento para construção.'
  },
  {
    z: 21,
    simbolo: 'Sc',
    nome: 'Escândio',
    massa: '44,956',
    periodo: 4,
    grupo: 3,
    familiaId: 'transicao',
    estado: 'Sólido',
    distribuicao: 'K: 2, L: 8, M: 9, N: 2',
    curiosidade: 'Primeiro metal de transição! Nomeado em homenagem à Escandinávia.',
    aplicacao: 'Ligas de alumínio ultraleves para quadros de bicicleta e tacos de beisebol.'
  },
  {
    z: 22,
    simbolo: 'Ti',
    nome: 'Titânio',
    massa: '47,867',
    periodo: 4,
    grupo: 4,
    familiaId: 'transicao',
    estado: 'Sólido',
    distribuicao: 'K: 2, L: 8, M: 10, N: 2',
    curiosidade: 'Tão resistente quanto o aço, porém 45% mais leve! Não é rejeitado pelo organismo humano.',
    aplicacao: 'Implantes ortopédicos e dentários, jatos supersônicos e pigmento branco de tintas.'
  },
  {
    z: 23,
    simbolo: 'V',
    nome: 'Vanádio',
    massa: '50,942',
    periodo: 4,
    grupo: 5,
    familiaId: 'transicao',
    estado: 'Sólido',
    distribuicao: 'K: 2, L: 8, M: 11, N: 2',
    curiosidade: 'Recebeu esse nome por causa de Vanadis, a deusa nórdica da beleza, devido às suas soluções coloridas.',
    aplicacao: 'Aço cromo-vanádio para ferramentas manuais inquebráveis e peças de motor.'
  },
  {
    z: 24,
    simbolo: 'Cr',
    nome: 'Cromo',
    massa: '51,996',
    periodo: 4,
    grupo: 6,
    familiaId: 'transicao',
    estado: 'Sólido',
    distribuicao: 'K: 2, L: 8, M: 13, N: 1',
    curiosidade: 'Dá o tom verde característico das esmeraldas e o vermelho vivo dos rubis.',
    aplicacao: 'Revestimento brilhante de torneiras e carros ("cromagem") e aço inoxidável.'
  },
  {
    z: 25,
    simbolo: 'Mn',
    nome: 'Manganês',
    massa: '54,938',
    periodo: 4,
    grupo: 7,
    familiaId: 'transicao',
    estado: 'Sólido',
    distribuicao: 'K: 2, L: 8, M: 13, N: 2',
    curiosidade: 'Essencial para a fabricação de aço, removendo o oxigênio e enxofre indesejados.',
    aplicacao: 'Trilhos de trem resistentes ao impacto e pilhas alcalinas comuns.'
  },
  {
    z: 26,
    simbolo: 'Fe',
    nome: 'Ferro',
    massa: '55,845',
    periodo: 4,
    grupo: 8,
    familiaId: 'transicao',
    estado: 'Sólido',
    distribuicao: 'K: 2, L: 8, M: 14, N: 2',
    curiosidade: 'O metal mais importante da história da humanidade e responsável pela cor vermelha do nosso sangue.',
    aplicacao: 'Hemoglobina (transporte de oxigênio), construção civil, pontes e ligas de aço.'
  },
  {
    z: 27,
    simbolo: 'Co',
    nome: 'Cobalto',
    massa: '58,933',
    periodo: 4,
    grupo: 9,
    familiaId: 'transicao',
    estado: 'Sólido',
    distribuicao: 'K: 2, L: 8, M: 15, N: 2',
    curiosidade: 'Famoso pelo pigmento "Azul de Cobalto" usado por pintores clássicos há séculos.',
    aplicacao: 'Baterias de íon-lítio, superligas de turbinas de avião e Vitamina B12.'
  },
  {
    z: 28,
    simbolo: 'Ni',
    nome: 'Níquel',
    massa: '58,693',
    periodo: 4,
    grupo: 10,
    familiaId: 'transicao',
    estado: 'Sólido',
    distribuicao: 'K: 2, L: 8, M: 16, N: 2',
    curiosidade: 'Excelente resistência à corrosão e compõe o núcleo derretido do planeta Terra.',
    aplicacao: 'Cunhagem de moedas, cordas de guitarra elétrica e baterias recarregáveis NiMH.'
  },
  {
    z: 29,
    simbolo: 'Cu',
    nome: 'Cobre',
    massa: '63,546',
    periodo: 4,
    grupo: 11,
    familiaId: 'transicao',
    estado: 'Sólido',
    distribuicao: 'K: 2, L: 8, M: 18, N: 1',
    curiosidade: 'Um dos primeiros metais usados pelos humanos. Tem tonalidade avermelhada e ação bactericida natural.',
    aplicacao: 'Fios elétricos de residências, encanamentos de água potável e estátuas de bronze.'
  },
  {
    z: 30,
    simbolo: 'Zn',
    nome: 'Zinco',
    massa: '65,380',
    periodo: 4,
    grupo: 12,
    familiaId: 'transicao',
    estado: 'Sólido',
    distribuicao: 'K: 2, L: 8, M: 18, N: 2',
    curiosidade: 'Protege outros metais contra ferrugem por um processo chamado galvanização sacrificial.',
    aplicacao: 'Pregos e telhas galvanizadas, pomadas de óxido de zinco e imunidade celular.'
  },
  {
    z: 31,
    simbolo: 'Ga',
    nome: 'Gálio',
    massa: '69,723',
    periodo: 4,
    grupo: 13,
    familiaId: 'boro',
    estado: 'Sólido',
    distribuicao: 'K: 2, L: 8, M: 18, N: 3',
    curiosidade: 'Incrível! Seu ponto de fusão é de apenas 29,76 °C: derrete na palma da sua mão como chocolate!',
    aplicacao: 'Semicondutores de LEDs azuis/violetas, circuitos de smartphones e lasers.'
  },
  {
    z: 32,
    simbolo: 'Ge',
    nome: 'Germânio',
    massa: '72,630',
    periodo: 4,
    grupo: 14,
    familiaId: 'carbono',
    estado: 'Sólido',
    distribuicao: 'K: 2, L: 8, M: 18, N: 4',
    curiosidade: 'Mendeleev previu suas propriedades com precisão assustadora antes de ser descoberto, chamando-o de Eka-Silício.',
    aplicacao: 'Fibras ópticas, lentes de câmeras de visão noturna infravermelha e painéis espaciais.'
  },
  {
    z: 33,
    simbolo: 'As',
    nome: 'Arsênio',
    massa: '74,922',
    periodo: 4,
    grupo: 15,
    familiaId: 'nitrogenio',
    estado: 'Sólido',
    distribuicao: 'K: 2, L: 8, M: 18, N: 5',
    curiosidade: 'Conhecido na literatura como veneno histórico dos reis, mas hoje vital na microeletrônica moderna.',
    aplicacao: 'Arseneto de gálio para chips de altíssima velocidade e lasers de telecomunicação.'
  },
  {
    z: 34,
    simbolo: 'Se',
    nome: 'Selênio',
    massa: '78,971',
    periodo: 4,
    grupo: 16,
    familiaId: 'calcogenios',
    estado: 'Sólido',
    distribuicao: 'K: 2, L: 8, M: 18, N: 6',
    curiosidade: 'Conduz eletricidade muito melhor quando exposto à luz (fotocondutividade). Nomeado em homenagem à Lua.',
    aplicacao: 'Nutrição essencial (castanha-do-pará), fotocopiadoras e xampus anticaspa.'
  },
  {
    z: 35,
    simbolo: 'Br',
    nome: 'Bromo',
    massa: '79,904',
    periodo: 4,
    grupo: 17,
    familiaId: 'halogenios',
    estado: 'Líquido',
    distribuicao: 'K: 2, L: 8, M: 18, N: 7',
    curiosidade: 'É o ÚNICO ametal da tabela periódica que se encontra no estado LÍQUIDO em temperatura ambiente!',
    aplicacao: 'Retardantes de chamas para tecidos e plásticos, medicamentos e purificação de água.'
  },
  {
    z: 36,
    simbolo: 'Kr',
    nome: 'Criptônio',
    massa: '83,798',
    periodo: 4,
    grupo: 18,
    familiaId: 'gases_nobres',
    estado: 'Gasoso',
    distribuicao: 'K: 2, L: 8, M: 18, N: 8',
    curiosidade: 'Seu nome significa "o oculto". Inspirou o planeta natal do Superman nos quadrinhos!',
    aplicacao: 'Flashes fotográficos de alta velocidade, lâmpadas fluorescentes e luzes de pistas de aeroportos.'
  }
];

// Funções de acesso rápido
function getElementByZ(z) {
  return ELEMENTS_DATA.find(el => el.z === z) || null;
}

function getElementBySymbol(simbolo) {
  return ELEMENTS_DATA.find(el => el.simbolo.toLowerCase() === simbolo.toLowerCase()) || null;
}

function getElementAt(periodo, grupo) {
  return ELEMENTS_DATA.find(el => el.periodo === periodo && el.grupo === grupo) || null;
}

function getFamily(familiaId) {
  return FAMILIES[familiaId] || {
    id: 'desconhecido',
    nome: 'Outro',
    cor: '#6c757d',
    corClara: '#e9ecef',
    textoCor: '#ffffff',
    valencia: '-',
    descricao: ''
  };
}

// Configuração padrão das frotas da Batalha Naval
const SHIP_CONFIGS = [
  {
    id: 'porta_avioes',
    nome: 'Porta-Aviões de Valência',
    simboloIcone: '🚢',
    tamanho: 4,
    quantidade: 1,
    descricao: 'A maior embarcação química da frota (ocupa 4 elementos contíguos).'
  },
  {
    id: 'encouracado',
    nome: 'Encouraçado Molecular',
    simboloIcone: '🛳️',
    tamanho: 3,
    quantidade: 1,
    descricao: 'Grande poder atômico defensivo (ocupa 3 elementos contíguos).'
  },
  {
    id: 'cruzador_a',
    nome: 'Cruzador Iônico Alfa',
    simboloIcone: '🛥️',
    tamanho: 2,
    quantidade: 1,
    descricao: 'Embarcação média de ligação química (ocupa 2 elementos contíguos).'
  },
  {
    id: 'cruzador_b',
    nome: 'Cruzador Covalente Beta',
    simboloIcone: '🚤',
    tamanho: 2,
    quantidade: 1,
    descricao: 'Embarcação ágil de compartilhamento de elétrons (ocupa 2 elementos contíguos).'
  },
  {
    id: 'submarino',
    nome: 'Submarino Nuclear',
    simboloIcone: '⚓',
    tamanho: 1,
    quantidade: 1,
    descricao: 'Átomo furtivo de alta mobilidade (ocupa 1 elemento).'
  }
];
