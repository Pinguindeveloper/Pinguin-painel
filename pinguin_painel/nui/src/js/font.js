// ===== GERENCIAMENTO DE FONTES MODERNAS =====

class FontManager {
  constructor() {
    this.fonts = [
      { family: 'Inter', weights: [300, 400, 500, 600, 700] },
      { family: 'Poppins', weights: [400, 500, 600, 700] },
      { family: 'JetBrains Mono', weights: [400, 500, 600] }
    ];
    
    this.loadedFonts = new Set();
    this.fallbackApplied = false;
  }

  // Verificar se as fontes estão carregadas
  async checkFontsLoaded() {
    if (!document.fonts) {
      console.warn('Font Loading API não suportada');
      this.applyFallback();
      return false;
    }

    try {
      // Aguardar todas as fontes carregarem
      await document.fonts.ready;
      
      // Verificar cada fonte individualmente
      for (const font of this.fonts) {
        for (const weight of font.weights) {
          const fontFace = `${weight} 16px "${font.family}"`;
          if (document.fonts.check(fontFace)) {
            this.loadedFonts.add(`${font.family}-${weight}`);
          }
        }
      }

      console.log('Fontes carregadas:', Array.from(this.loadedFonts));
      return this.loadedFonts.size > 0;
      
    } catch (error) {
      console.error('Erro ao verificar fontes:', error);
      this.applyFallback();
      return false;
    }
  }

  // Aplicar fontes de fallback
  applyFallback() {
    if (this.fallbackApplied) return;
    
    const fallbackCSS = `
      :root {
        --font-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        --font-heading: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        --font-mono: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, monospace;
      }
    `;
    
    const style = document.createElement('style');
    style.textContent = fallbackCSS;
    document.head.appendChild(style);
    
    this.fallbackApplied = true;
    console.log('Fontes de fallback aplicadas');
  }

  // Precarregar fontes críticas
  preloadFonts() {
    const criticalFonts = [
      'Inter:400,500,600',
      'Poppins:500,600',
      'JetBrains Mono:400'
    ];

    criticalFonts.forEach(font => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      link.href = `https://fonts.gstatic.com/s/${font.toLowerCase().replace(':', '/').replace(',', '/')}.woff2`;
      document.head.appendChild(link);
    });
  }

  // Otimizar carregamento de fontes
  optimizeFontLoading() {
    // Adicionar font-display: swap para melhor performance
    const optimizationCSS = `
      @font-face {
        font-family: 'Inter';
        font-display: swap;
      }
      
      @font-face {
        font-family: 'Poppins';
        font-display: swap;
      }
      
      @font-face {
        font-family: 'JetBrains Mono';
        font-display: swap;
      }
    `;
    
    const style = document.createElement('style');
    style.textContent = optimizationCSS;
    document.head.appendChild(style);
  }

  // Inicializar gerenciamento de fontes
  async init() {
    console.log('Inicializando gerenciamento de fontes...');
    
    // Precarregar fontes críticas
    this.preloadFonts();
    
    // Otimizar carregamento
    this.optimizeFontLoading();
    
    // Verificar se as fontes carregaram
    const fontsLoaded = await this.checkFontsLoaded();
    
    if (!fontsLoaded) {
      console.warn('Algumas fontes não carregaram, usando fallbacks');
    }
    
    // Aplicar classes CSS baseadas no status das fontes
    document.documentElement.classList.add(
      fontsLoaded ? 'fonts-loaded' : 'fonts-fallback'
    );
    
    return fontsLoaded;
  }
}

// ===== INICIALIZAÇÃO =====
const fontManager = new FontManager();

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    fontManager.init();
  });
} else {
  fontManager.init();
}

// Timeout de segurança para aplicar fallback
setTimeout(() => {
  if (!fontManager.fallbackApplied && fontManager.loadedFonts.size === 0) {
    console.warn('Timeout de carregamento de fontes, aplicando fallback');
    fontManager.applyFallback();
  }
}, 3000);

// Exportar para uso global se necessário
window.fontManager = fontManager;

