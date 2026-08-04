---
name: "VB Starlink"
description: "Sistema visual editorial para locação de conectividade pronta para operar."
colors:
  signal-green: "#25d366"
  signal-green-deep: "#128c48"
  field-carbon: "#090c0b"
  field-carbon-soft: "#151a18"
  field-paper: "#f4f3ef"
  absolute-white: "#ffffff"
  equipment-gray: "#626965"
  equipment-line: "#d8d9d4"
  equipment-line-dark: "#343a37"
typography:
  display:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(3rem, 5.8vw, 5.25rem)"
    fontWeight: 700
    lineHeight: 0.88
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(2.4rem, 4vw, 4rem)"
    fontWeight: 700
    lineHeight: 0.95
  body:
    fontFamily: "Source Sans 3, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Source Sans 3, Arial, sans-serif"
    fontSize: "0.74rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.1em"
rounded:
  none: "0"
  action: "2px"
  circle: "9999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "48px"
components:
  button-whatsapp:
    backgroundColor: "{colors.signal-green}"
    textColor: "{colors.field-carbon}"
    rounded: "{rounded.action}"
    padding: "0 22px"
    height: "54px"
  input-dark:
    backgroundColor: "{colors.field-carbon-soft}"
    textColor: "{colors.absolute-white}"
    rounded: "{rounded.none}"
    padding: "0 16px"
    height: "56px"
  plan-selected:
    backgroundColor: "{colors.field-carbon}"
    textColor: "{colors.absolute-white}"
    rounded: "{rounded.none}"
    padding: "48px"
---

# Design System: VB Starlink

## Overview

**Creative North Star: "Operação em Campo"**

O sistema parece uma infraestrutura pronta, não uma interface ornamental. Fotografia documental em grande escala prova o contexto de uso; carbono, papel e linhas frias organizam a informação com a objetividade de uma folha operacional premium.

A composição alterna áreas claras e escuras em blocos largos, com hierarquia tipográfica comprimida e poucos estados saturados. O acabamento é convencional para a categoria de conectividade, mas ganha identidade pelas fotos reais, pela escala editorial e pela precisão das divisórias.

**Key Characteristics:**

- Fotografia real e dominante em momentos de decisão.
- Tipografia condensada, pesada e curta para títulos.
- Superfícies planas, quase retas e separadas por linhas finas.
- Verde reservado a ações e confirmações funcionais.

## Colors

A paleta contrasta carbono e papel quente, usando cinzas de equipamento para texto secundário e divisórias.

### Primary

- **Verde de Sinal:** ação principal de WhatsApp, estados ativos e marcadores funcionais.

### Neutral

- **Carbono de Campo:** fundo de hero, simulador, processo, rodapé e cartões selecionados.
- **Papel Técnico:** superfície principal das seções de leitura.
- **Cinza de Equipamento:** corpo secundário, rótulos e notas comerciais.
- **Linha Fria:** divisórias e contornos sem criar caixas decorativas.

**The Verde é Ação Rule.** O verde aparece apenas quando algo inicia, confirma ou orienta uma ação; nunca colore grandes superfícies editoriais.

## Typography

**Display Font:** Barlow Condensed (com Arial Narrow e sans-serif)

**Body Font:** Source Sans 3 (com Arial e sans-serif)

**Character:** a display é estreita, firme e operacional; o corpo é neutro e aberto para preservar leitura em telas pequenas. O contraste entre as famílias cria hierarquia sem recorrer a ornamentos.

### Hierarchy

- **Display** (700, escala fluida, 0.88): headlines de seção e frases de alta prioridade, em caixa alta.
- **Title** (700, escala fluida, 0.95): nomes de planos, etapas e totais.
- **Body** (400–600, 1rem, 1.55): explicações e condições, com linhas moderadas.
- **Label** (700, 0.74rem, 0.1em): termos funcionais, métricas, campos e atributos de plano, em caixa alta.

**The Headline Resolve Primeiro Rule.** Headline contém uma ideia curta e concreta; o corpo explica sem repetir a promessa.

## Layout

O contêiner central mede no máximo 1240px e conserva 24px de margem lateral no desktop, reduzidos para 16px em telas compactas. Seções usam ritmo vertical amplo e grids de duas colunas; planos, métricas e prova numérica usam linhas compartilhadas em vez de cartões isolados.

Em 1000px, os grids editoriais viram uma coluna. Em 820px, a navegação se torna menu em tela inteira e os planos passam a uma coluna. Em 560px, formulário, métricas e galeria também empilham. O hero permanece fotográfico e ocupa pelo menos a altura útil da tela.

**The Prova Antes da Promessa Rule.** Superfícies de entrada usam fotografia documental para estabelecer o cenário antes de aprofundar benefícios e preço.

## Elevation & Depth

O sistema é plano por padrão. Profundidade vem de fotografia, contraste tonal, sobreposição do cabeçalho e divisórias; seções e cartões não usam sombra. Sombras ambientais aparecem apenas no cabeçalho após rolagem e na ação flutuante de WhatsApp.

**The Contraste Estrutural Rule.** Uma superfície ganha hierarquia mudando de tom ou cruzando uma linha; sombra não substitui estrutura.

## Shapes

Controles e botões têm cantos quase retos; campos e cartões permanecem retos. Círculos são exclusivos de marcadores e do botão flutuante. Linhas de 1px e recortes fotográficos retangulares dão o caráter técnico.

**The Quase Reto Rule.** Use 0–2px em superfícies de interface; raio total somente quando a função é literalmente circular.

## Components

### Buttons

- **Shape:** retângulo quase reto, com altura mínima de 54px.
- **Primary:** verde de sinal sobre carbono, ícone SVG e texto em peso 700.
- **Hover / Focus:** mudança tonal curta, foco externo verde de 3px e pressão por escala de 0.97.
- **Tertiary:** texto em peso 700 com sublinhado de 1px e seta direcional.

### Cards / Containers

- **Corner Style:** reto.
- **Background:** papel no repouso e carbono para destaque ou seleção.
- **Shadow Strategy:** nenhuma; usar divisórias compartilhadas.
- **Border:** linha fria de 1px.
- **Internal Padding:** fluido entre 30px e 54px.

### Inputs / Fields

- **Style:** superfície carbono suave, texto branco, contorno cinza e 56px de altura.
- **Focus:** anel verde externo comum a toda interação.
- **Error / Disabled:** erro inline em vermelho claro; ação bloqueada perde opacidade e sai da ordem de tabulação.

### Navigation

O cabeçalho sobrepõe o hero em transparência e torna-se carbono após rolagem. Links usam corpo sem serifa em peso 600; no mobile, o menu ocupa a altura restante da tela e anuncia seu estado com `aria-expanded`.

### Proof Rail

Métricas comerciais usam termos pequenos, numerais condensados e divisórias verticais. No mobile, cada linha emparelha termo e valor para leitura rápida.

### Motion Grammar

O hero entra em sequência na primeira visita. Seções revelam conteúdo uma única vez com opacidade, deslocamento curto e stagger de 45–90ms; o simulador usa feedback de 240ms para mudanças de total. Movimento contínuo fica restrito à barra de progresso da página. Toda translação é removida em `prefers-reduced-motion`.

## Do's and Don'ts

### Do:

- **Do** usar fotografias reais da operação como material principal.
- **Do** manter títulos curtos, condensados e alinhados à esquerda.
- **Do** separar conteúdo com contraste e linhas compartilhadas.
- **Do** preservar foco visível, alvo mínimo e `prefers-reduced-motion`.

### Don't:

- **Don't** adicionar depoimentos, clientes ou selos sem evidência real.
- **Don't** transformar todas as ações em verde; uma ação primária por contexto é suficiente.
- **Don't** usar sombras de cartão, vidro decorativo ou raios grandes.
- **Don't** substituir fotografia documental por gradientes ou ilustrações genéricas.
