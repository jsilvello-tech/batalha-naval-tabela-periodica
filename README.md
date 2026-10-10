# ⚛️ Batalha Naval da Tabela Periódica (9º Ano)

Aplicativo web educacional interativo desenvolvido especialmente para alunos e professores do **9º Ano do Ensino Fundamental II**, projetado para uso com **projetores em sala de aula**.

---

## 🎯 Alinhamento Pedagógico com a BNCC

O aplicativo trabalha de forma lúdica e investigativa as seguintes habilidades da Base Nacional Comum Curricular de Ciências do 9º ano:
- **EF09CI01:** Investigar a constituição atômica da matéria (prótons, elétrons, nêutrons), o número atômico ($Z$) e o número de massa.
- **EF09CI02:** Compreender a organização periódica dos elementos químicos e prever o comportamento de substâncias a partir de sua localização.
- **EF09CI03:** Identificar e diferenciar as **famílias ou grupos** (Metais Alcalinos, Alcalino-Terrosos, Halogênios, Gases Nobres, etc.) e os **períodos** (camadas eletrônicas).

---

## 🚀 Como Executar o Projeto

O aplicativo é 100% autônomo, não necessita de instalações pesadas (Node.js/Python não são necessários) e funciona perfeitamente **offline** em qualquer computador com Windows, macOS ou Linux!

### Opção 1: Execução Direta no Navegador (Mais Rápida)
1. Dê um duplo clique no arquivo [`index.html`](file:///C:/Users/joao-/.gemini/antigravity/scratch/batalha-naval-quimica/index.html).
2. Ele abrirá instantaneamente no seu navegador padrão (Microsoft Edge, Google Chrome, Mozilla Firefox).

### Opção 2: Servidor Local via PowerShell
Para simular um servidor HTTP padrão na rede da escola:
1. Abra o PowerShell na pasta do projeto.
2. Execute o script:
   ```powershell
   .\run_server.ps1
   ```
3. Acesse no navegador: **`http://localhost:8080`**

---

## 🎮 Modos de Jogo Didáticos

### 1. 🤖 Turma vs. Prof. Mendeleev (IA Cooperativa)
- Toda a turma joga cooperativamente contra o "Professor Mendeleev" (Inteligência Artificial).
- O professor projeta no telão, lê as sugestões dos alunos, estimula debates sobre qual elemento atacar e comemora os acertos.
- A IA possui algoritmos pedagógicos que reagem aos tiros e realizam comentários didáticos.

### 2. 👥 Equipe Prótons vs. Equipe Elétrons (2 Equipes na Mesma Sala)
- A sala é dividida em dois grandes grupos.
- Possui o recurso especial **Cortina de Privacidade**: uma tela de transição que bloqueia o projetor durante o posicionamento ou a troca de turnos para impedir que a equipe adversária espie as posições dos navios!

### 3. 🔬 Laboratório Interativo da Tabela Periódica
- Modo livre de exploração. Ao clicar em qualquer um dos 36 elementos (do Hidrogênio ao Criptônio), projeta na parede:
  - Símbolo e Nome
  - Número Atômico ($Z$) e Massa Atômica
  - Família Química e Período
  - Distribuição em Camadas (K, L, M, N)
  - Curiosidades do Cotidiano e Aplicações Práticas (baterias de lítio, microchips de silício, sal de cozinha, etc.)

---

## 📽️ Otimizações para Projetor de Sala de Aula

- **Modo Sala Clara / Lousa:** Cores de altíssimo contraste e fundo ultra nítido, ideal para salas com lâmpadas acesas ou cortinas abertas.
- **Modo Sala Escura / Neon:** Fundo escuro com elementos vibrantes fluorescentes para ambientes com baixa luminosidade.
- **Controles de Zoom da Grade (A- / 100% / A+):** Ajusta o tamanho dos quadrados para que alunos no fundo da sala consigam ler o símbolo, nome e número atômico com facilidade.
- **Botão Tela Cheia (Fullscreen):** Maximiza na parede/lousa digital com 1 clique.
- **Sons Procedurais Offline:** Sons sintetizados via Web Audio API (sonar, explosão atômica, borrifo de água, alarme de radar, vitória) sem carregar nenhum arquivo de áudio externo.

---

## 🛳️ As Embarcações Químicas

Cada jogador comanda uma esquadra de 5 embarcações científicas:
1. **🚢 Porta-Aviões de Valência:** 4 elementos contíguos (horizontal em um período ou vertical em uma família).
2. **🛳️ Encouraçado Molecular:** 3 elementos contíguos.
3. **🛥️ Cruzador Iônico Alfa:** 2 elementos contíguos.
4. **🚤 Cruzador Covalente Beta:** 2 elementos contíguos.
5. **⚓ Submarino Nuclear:** 1 elemento isolado.

> **Regra Pedagógica Chave:** Os navios só podem ser ancorados sobre elementos químicos reais! Os espaços vazios da tabela periódica (mar aberto) não são navegáveis.

---

## 📡 Sonda de Nêutrons (Radar com Quiz)

Durante o jogo, os alunos podem ativar a **Sonda de Nêutrons**. O jogo sorteia uma pergunta de química do 9º ano. Se a turma acertar a resposta, recebe uma dica estratégica gerada por radar (por exemplo: *"A Sonda detectou vibrações no 3º Período!"* ou *"O espectrômetro identificou uma embarcação na família dos Gases Nobres!"*).

---

## 🧪 Estrutura dos Arquivos

```
batalha-naval-quimica/
├── index.html                    # Estrutura principal da aplicação
├── README.md                     # Documentação e guia do professor
├── run_server.ps1                # Servidor local nativo em PowerShell
├── css/
│   └── styles.css                # Estilos, temas claro/escuro e layout para projetor
├── js/
│   ├── elements_data.js          # Base de dados dos elementos com dados da BNCC
│   ├── quiz_data.js              # Banco com 20 questões pedagógicas de química
│   ├── audio.js                  # Sintetizador sonoro Web Audio API nativo
│   ├── game_state.js             # Lógica de jogo, IA de Mendeleev e radar
│   └── ui.js                     # Renderizador de interface e controladores
└── test/
    ├── verify.js                 # Testes unitários de regras e dados químicos
    ├── run_tests.html            # Executor de testes automatizados
    └── integration_browser_test.html # Teste de ponta a ponta no navegador
```
