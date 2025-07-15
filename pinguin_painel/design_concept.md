# Conceito de Design Moderno para NUI Ricoz

## Visão Geral
Baseado nas tendências de UI/UX para 2025, o novo design focará em:
- **Minimalismo funcional** com elementos limpos
- **Tipografia moderna** com fontes sans-serif contemporâneas
- **Layout mais alinhado** com grid system
- **Micro-interações** suaves e responsivas

## Tipografia Moderna
### Fontes Selecionadas:
1. **Inter** - Para textos principais (Google Fonts)
   - Moderna, legível, otimizada para UI
   - Suporte completo a caracteres especiais

2. **JetBrains Mono** - Para elementos de destaque (Google Fonts)
   - Fonte monospace moderna
   - Excelente para elementos técnicos

3. **Poppins** - Para títulos e headers (Google Fonts)
   - Sans-serif geométrica moderna
   - Boa hierarquia visual

## Layout e Alinhamento
### Grid System:
- **Container centralizado** com max-width
- **Espaçamento consistente** (8px base unit)
- **Alinhamento vertical** perfeito
- **Responsividade** para diferentes resoluções

### Estrutura:
```
┌─────────────────────────────┐
│         HEADER              │
│    ┌─────────────────┐      │
│    │   PACOTES       │      │
│    │  ┌───┐ ┌───┐    │      │
│    │  │ 1 │ │ 2 │    │      │
│    │  └───┘ └───┘    │      │
│    └─────────────────┘      │
│    ┌─────────────────┐      │
│    │   VEÍCULOS      │      │
│    │  ┌───┐ ┌───┐    │      │
│    │  │ 3 │ │ 4 │    │      │
│    │  └───┘ └───┘    │      │
│    └─────────────────┘      │
└─────────────────────────────┘
```

## Paleta de Cores Moderna
### Cores Principais:
- **Background**: `#0A0A0F` (Preto azulado profundo)
- **Surface**: `#1A1A24` (Cinza escuro com tom azul)
- **Primary**: `#3B82F6` (Azul moderno)
- **Secondary**: `#8B5CF6` (Roxo vibrante)
- **Accent**: `#10B981` (Verde esmeralda)

### Cores de Texto:
- **Primary**: `#FFFFFF` (Branco puro)
- **Secondary**: `#A1A1AA` (Cinza claro)
- **Muted**: `#71717A` (Cinza médio)

## Elementos Visuais
### Cards/Botões:
- **Border radius**: 12px (mais arredondado)
- **Backdrop blur**: 20px
- **Box shadow**: Sombras suaves multicamadas
- **Hover states**: Transformações suaves

### Animações:
- **Entrada**: Slide + fade com stagger
- **Hover**: Scale + glow effect
- **Click**: Ripple effect moderno
- **Transições**: cubic-bezier(0.4, 0, 0.2, 1)

## Micro-interações
1. **Loading states** com skeleton
2. **Feedback visual** imediato
3. **Efeitos de hover** responsivos
4. **Animações de entrada** escalonadas

## Acessibilidade
- **Contraste** WCAG AA compliant
- **Focus states** visíveis
- **Keyboard navigation** completa
- **Screen reader** friendly

## Especificações Técnicas
### Breakpoints:
- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

### Performance:
- **CSS Grid** para layout
- **CSS Custom Properties** para temas
- **Transform3d** para animações
- **Will-change** para otimização

