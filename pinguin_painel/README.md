# NUI Ricoz - Painel de Kits Melhorado

## Descrição
Este projeto é uma versão melhorada da NUI (Native User Interface) para FiveM, mantendo os mesmos ícones originais mas com um design moderno e responsivo.

## Melhorias Implementadas

### Design Visual
- **Gradiente de fundo moderno** com efeito de blur
- **Animações suaves** de entrada e hover
- **Efeitos de transição** aprimorados
- **Tipografia melhorada** com fontes personalizadas
- **Responsividade** para diferentes tamanhos de tela
- **Acessibilidade** com suporte a teclado e ARIA labels

### Funcionalidades
- **Feedback visual** ao clicar nos botões
- **Efeito de ondulação (ripple)** nos botões
- **Animações escalonadas** para entrada dos elementos
- **Suporte completo ao ESC** para fechar a NUI
- **Callbacks melhorados** com confirmação

### Estrutura de Arquivos
```
nui/
├── index.html          # HTML principal com melhorias de acessibilidade
├── src/
│   ├── css/
│   │   ├── style.css   # CSS moderno com animações
│   │   ├── FreeSansBold.woff2
│   │   ├── FreeSansBold.woff
│   │   ├── PFDinDisplayPro-Regular.woff
│   │   └── PFDinDisplayPro-Bold.woff
│   └── js/
│       ├── app.js      # JavaScript com funcionalidades melhoradas
│       └── font.js     # Gerenciamento de fontes
```

## Backend Lua

### Arquivos Principais
- `client.lua` - Comunicação cliente-servidor melhorada
- `server.lua` - Lógica do servidor com correções
- `shared.lua` - Configurações compartilhadas
- `fxmanifest.lua` - Manifesto do recurso

### Funcionalidades do Backend
- **Sistema de cooldown** para kits e veículos
- **Verificação de permissões** por grupo
- **Logs via webhook** para auditoria
- **Notificações melhoradas** para o usuário
- **Spawn de veículos** com feedback

## Como Usar

1. Coloque todos os arquivos na pasta do seu recurso FiveM
2. Certifique-se de que as dependências (vrp, vrp_admin, vrp_garages) estão funcionando
3. Configure as permissões no arquivo `shared.lua`
4. Reinicie o recurso no servidor
5. Use o comando `/painel` no jogo

## Configurações

### Permissões (shared.lua)
```lua
permissao='painel.permissao'        -- Permissão para abrir a NUI
groupInfluencer='influencer'         -- Grupo Influencer
groupInvestidor1='investidor'        -- Grupo Investidor
groupInvestidor2='investidorplus'    -- Grupo Investidor Plus
```

### Veículos
```lua
carro='lancersport'    -- Modelo do carro
moto='cbr'            -- Modelo da moto
cooldownCars=30       -- Cooldown em segundos
```

### Kits
```lua
cooldown=2700         -- Cooldown em segundos (45 minutos)
webhook=""           -- URL do webhook para logs
```

## Recursos Técnicos

### CSS Moderno
- Flexbox para layout responsivo
- CSS Grid para organização
- Variáveis CSS para consistência
- Animações com `cubic-bezier`
- Backdrop-filter para efeitos de blur

### JavaScript Avançado
- Event listeners otimizados
- Callbacks com confirmação
- Gerenciamento de estado da NUI
- Efeitos visuais dinâmicos
- Suporte a acessibilidade

### Compatibilidade
- Compatível com FiveM
- Suporte a VRP framework
- Responsivo para diferentes resoluções
- Otimizado para performance

## Créditos
Desenvolvido com foco em usabilidade, performance e design moderno.

