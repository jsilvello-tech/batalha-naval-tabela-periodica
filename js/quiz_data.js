// Banco Extensivo de Questões de Química - 9º Ano do Ensino Fundamental
// Conteúdo 100% alinhado à BNCC (EF09CI01, EF09CI02, EF09CI03)

const QUIZ_QUESTIONS = [
  {
    id: 1,
    pergunta: "O que indica o Número Atômico (Z) de um elemento químico?",
    opcoes: [
      "A quantidade de prótons no núcleo do átomo",
      "A quantidade total de nêutrons",
      "O número de camadas eletrônicas",
      "A massa do átomo dividida por dois"
    ],
    correta: 0,
    explicacao: "O número atômico (Z) define a identidade do elemento e é exatamente a quantidade de prótons em seu núcleo atômico."
  },
  {
    id: 2,
    pergunta: "Na Tabela Periódica, o que as LINHAS HORIZONTAIS (Períodos) indicam sobre a estrutura dos átomos?",
    opcoes: [
      "O número de camadas (níveis) de elétrons ocupadas",
      "O número de nêutrons no núcleo",
      "A quantidade de elétrons na camada de valência",
      "O estado físico em que o elemento se encontra"
    ],
    correta: 0,
    explicacao: "O período em que o elemento está (1 a 7) corresponde diretamente ao número de camadas eletrônicas (K, L, M, N...) ocupadas."
  },
  {
    id: 3,
    pergunta: "As COLUNAS VERTICAIS da Tabela Periódica são chamadas de Famílias ou Grupos. Elementos do mesmo grupo:",
    opcoes: [
      "Possuem o mesmo número de prótons",
      "Apresentam propriedades químicas semelhantes",
      "Têm sempre a mesma massa atômica",
      "Possuem o mesmo número de camadas de elétrons"
    ],
    correta: 1,
    explicacao: "Elementos da mesma família possuem o mesmo número de elétrons na camada de valência, o que determina comportamento químico similar."
  },
  {
    id: 4,
    pergunta: "A qual família pertencem o Hélio (He), Neônio (Ne), Argônio (Ar) e Criptônio (Kr)?",
    opcoes: [
      "Halogênios (Grupo 17)",
      "Metais Alcalinos (Grupo 1)",
      "Gases Nobres (Grupo 18)",
      "Calcogênios (Grupo 16)"
    ],
    correta: 2,
    explicacao: "Pertencem ao Grupo 18 (Gases Nobres). Possuem a camada de valência completa (8 elétrons, ou 2 no He) e são quimicamente estáveis."
  },
  {
    id: 5,
    pergunta: "Qual elemento químico possui Z = 6 e constitui a base estrutural de todas as moléculas orgânicas da vida?",
    opcoes: [
      "Nitrogênio (N)",
      "Carbono (C)",
      "Oxigênio (O)",
      "Fósforo (P)"
    ],
    correta: 1,
    explicacao: "O Carbono (Z=6) é tetravalente (faz 4 ligações covalentes estáveis) e é a base de toda a vida orgânica na Terra."
  },
  {
    id: 6,
    pergunta: "O elemento Sódio (Na, Z=11) pertence aos Metais Alcalinos (Grupo 1). Quantos elétrons ele tem na camada de valência?",
    opcoes: [
      "1 elétron",
      "2 elétrons",
      "7 elétrons",
      "8 elétrons"
    ],
    correta: 0,
    explicacao: "Os Metais Alcalinos do Grupo 1 possuem exatamente 1 elétron em sua camada mais externa (camada de valência)."
  },
  {
    id: 7,
    pergunta: "Qual é o ÚNICO elemento ametal da Tabela Periódica que se encontra no estado LÍQUIDO em temperatura ambiente?",
    opcoes: [
      "Mercúrio (Hg)",
      "Bromo (Br)",
      "Cloro (Cl)",
      "Enxofre (S)"
    ],
    correta: 1,
    explicacao: "O Bromo (Br, Z=35) é o único ametal líquido na temperatura ambiente (o Mercúrio também é líquido, porém é um metal de transição)."
  },
  {
    id: 8,
    pergunta: "O Flúor (F) e o Cloro (Cl) pertencem à Família dos Halogênios (Grupo 17). Quantos elétrons eles possuem na camada de valência?",
    opcoes: [
      "2 elétrons",
      "4 elétrons",
      "7 elétrons",
      "8 elétrons"
    ],
    correta: 2,
    explicacao: "Os Halogênios têm 7 elétrons na camada de valência e tendem a ganhar 1 elétron para completar a regra do octeto com 8."
  },
  {
    id: 9,
    pergunta: "Qual metal de transição é essencial para a nossa corrente sanguínea, compondo a molécula de hemoglobina?",
    opcoes: [
      "Cobre (Cu)",
      "Zinco (Zn)",
      "Ferro (Fe)",
      "Titânio (Ti)"
    ],
    correta: 2,
    explicacao: "O Ferro (Fe, Z=26) é o íon central da hemoglobina e se liga ao oxigênio para transportá-lo pelo corpo, dando a cor vermelha ao sangue."
  },
  {
    id: 10,
    pergunta: "Qual elemento do Grupo 2 (Metais Alcalino-Terrosos) é o principal constituinte mineral de dentes e ossos?",
    opcoes: [
      "Cálcio (Ca)",
      "Magnésio (Mg)",
      "Berílio (Be)",
      "Potássio (K)"
    ],
    correta: 0,
    explicacao: "O Cálcio (Ca, Z=20) é fundamental na formação da matriz óssea e na mineralização dos dentes humanos."
  },
  {
    id: 11,
    pergunta: "Qual partícula subatômica tem massa desprezível e carga elétrica NEGATIVA, movendo-se na eletrosfera?",
    opcoes: [
      "Próton",
      "Nêutron",
      "Elétron",
      "Pósitron"
    ],
    correta: 2,
    explicacao: "Os elétrons têm carga elétrica negativa (-1) e orbitam ao redor do núcleo positivo formado por prótons e nêutrons."
  },
  {
    id: 12,
    pergunta: "Ao reagirem, o Sódio (Na) doa 1 elétron tornando-se Na⁺ e o Cloro (Cl) recebe 1 elétron tornando-se Cl⁻. Esse tipo de ligação é:",
    opcoes: [
      "Ligação Covalente",
      "Ligação Metálica",
      "Ligação Iônica",
      "Ponte de Hidrogênio"
    ],
    correta: 2,
    explicacao: "A transferência definitiva de elétrons entre um metal e um ametal caracteriza a ligação iônica (formando cristais como o sal de cozinha NaCl)."
  },
  {
    id: 13,
    pergunta: "Dois átomos que possuem o MESMO número de prótons (mesmo Z), mas massas atômicas diferentes são chamados de:",
    opcoes: [
      "Isóbaros",
      "Isótopos",
      "Isótonos",
      "Alótropos"
    ],
    correta: 1,
    explicacao: "Isótopos têm o mesmo número atômico (prótons) e diferente número de nêutrons, pertencendo ao mesmo elemento químico (ex: Carbono-12 e Carbono-14)."
  },
  {
    id: 14,
    pergunta: "Qual cientista russo organizou a primeira versão amplamente aceita da Tabela Periódica em 1869, prevendo novos elementos?",
    opcoes: [
      "Dmitri Mendeleev",
      "Antoine Lavoisier",
      "Ernest Rutherford",
      "John Dalton"
    ],
    correta: 0,
    explicacao: "Dmitri Mendeleev organizou os elementos conhecidos por ordem de massas atômicas e deixou espaços vazios para elementos ainda não descobertos!"
  },
  {
    id: 15,
    pergunta: "O elemento Oxigênio (O) possui Z = 8. Qual é a sua distribuição eletrônica em camadas (níveis de energia)?",
    opcoes: [
      "K: 2, L: 6",
      "K: 4, L: 4",
      "K: 2, L: 8",
      "K: 8"
    ],
    correta: 0,
    explicacao: "A camada K comporta no máximo 2 elétrons; os 6 elétrons restantes ocupam a camada L (2 + 6 = 8 elétrons)."
  },
  {
    id: 16,
    pergunta: "Qual gás nobre é mais leve que o ar, não inflamável e muito utilizado no enchimento de balões meteorológicos e dirigíveis?",
    opcoes: [
      "Hidrogênio (H)",
      "Neônio (Ne)",
      "Hélio (He)",
      "Argônio (Ar)"
    ],
    correta: 2,
    explicacao: "O Hélio (He, Z=2) é mais leve que o ar e inerte (não queima), sendo muito seguro para balões ao contrário do hidrogênio."
  },
  {
    id: 17,
    pergunta: "Qual metal do Grupo 1 (Metais Alcalinos) é famoso por ser usado na fabricação de baterias recarregáveis de celulares modernos?",
    opcoes: [
      "Lítio (Li)",
      "Potássio (K)",
      "Rubídio (Rb)",
      "Césio (Cs)"
    ],
    correta: 0,
    explicacao: "O Lítio (Li, Z=3) é o metal mais leve da tabela periódica, com alto potencial eletroquímico, ideal para baterias de íon-lítio."
  },
  {
    id: 18,
    pergunta: "O Silício (Si, Z=14) é um semimetal abundante na areia da praia (SiO₂). Qual é a sua principal aplicação na tecnologia moderna?",
    opcoes: [
      "Combustível para foguetes",
      "Chips, processadores e células solares",
      "Fabricação de moedas e joias",
      "Remédio antibiótico"
    ],
    correta: 1,
    explicacao: "O Silício é a espinha dorsal de toda a indústria de microeletrônica (Vale do Silício), presente em transistores, computadores e placas solares."
  },
  {
    id: 19,
    pergunta: "A Família 16 da Tabela Periódica é conhecida pelo nome de:",
    opcoes: [
      "Calcogênios",
      "Halogênios",
      "Gases Nobres",
      "Metais Alcalinos"
    ],
    correta: 0,
    explicacao: "Os elementos do Grupo 16 (Oxigênio, Enxofre, Selênio...) são chamados Calcogênios, que significa 'formadores de minérios'."
  },
  {
    id: 20,
    pergunta: "Qual é o estado físico do Mercúrio (Hg) e do Bromo (Br) na temperatura ambiente (25 °C)?",
    opcoes: [
      "Sólido",
      "Gasoso",
      "Líquido",
      "Plasma"
    ],
    correta: 2,
    explicacao: "Mercúrio (metal) e Bromo (ametal) são os únicos dois elementos da tabela periódica que são líquidos na temperatura ambiente!"
  }
];

function getRandomQuizQuestion(excludeIds = []) {
  const available = QUIZ_QUESTIONS.filter(q => !excludeIds.includes(q.id));
  if (available.length === 0) {
    return QUIZ_QUESTIONS[Math.floor(Math.random() * QUIZ_QUESTIONS.length)];
  }
  return available[Math.floor(Math.random() * available.length)];
}
