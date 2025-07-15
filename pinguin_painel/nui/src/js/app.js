// ===== CONFIGURAÇÕES E VARIÁVEIS GLOBAIS =====
const CONFIG = {
  ANIMATION_DURATION: 300,
  RIPPLE_DURATION: 600,
  DEBOUNCE_DELAY: 150,
  RESOURCE_NAME: 'pinguin_painel'
};

let isNuiOpen = false;
let isProcessing = false;

// ===== UTILITÁRIOS =====
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const createRipple = (event, element) => {
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  
  // Remove ripple anterior se existir
  const existingRipple = element.querySelector('.ripple');
  if (existingRipple) {
    existingRipple.remove();
  }
  
  element.appendChild(ripple);
  
  // Remove o ripple após a animação
  setTimeout(() => {
    if (ripple.parentNode) {
      ripple.remove();
    }
  }, CONFIG.RIPPLE_DURATION);
};

const addClickFeedback = (element) => {
  const card = element.closest('.option-card');
  if (!card) return;
  
  card.classList.add('clicked');
  setTimeout(() => {
    card.classList.remove('clicked');
  }, 150);
};

const setLoadingState = (element, loading = true) => {
  const card = element.closest('.option-card');
  if (!card) return;
  
  if (loading) {
    card.classList.add('loading');
  } else {
    card.classList.remove('loading');
  }
};

// ===== FUNÇÕES DE COMUNICAÇÃO COM LUA =====
const sendNuiMessage = (action, data = {}) => {
  return new Promise((resolve, reject) => {
    $.post(`http://${CONFIG.RESOURCE_NAME}/${action}`, JSON.stringify(data))
      .done(resolve)
      .fail(reject);
  });
};

// ===== FUNÇÕES PRINCIPAIS =====
const setShow = (show) => {
  if (show) {
    $('body').show();
    isNuiOpen = true;
    document.body.classList.add('nui-open');
  } else {
    $('body').hide();
    isNuiOpen = false;
    isProcessing = false;
    document.body.classList.remove('nui-open');
    
    // Remove todos os estados de loading
    $('.option-card').removeClass('loading clicked');
  }
};

const closeNui = async () => {
  if (isProcessing) return;
  
  try {
    await sendNuiMessage('closeNui');
    setShow(false);
  } catch (error) {
    console.error('Erro ao fechar NUI:', error);
    setShow(false); // Fechar mesmo com erro
  }
};

// ===== FUNÇÕES DE AÇÃO =====
const setGun = async (event) => {
  if (isProcessing) return;
  
  isProcessing = true;
  const element = event?.target || document.querySelector('[data-kit="influencer"]');
  
  try {
    addClickFeedback(element);
    setLoadingState(element, true);
    
    await sendNuiMessage('setGun');
    
    // Pequeno delay para feedback visual
    setTimeout(() => {
      setShow(false);
    }, 500);
    
  } catch (error) {
    console.error('Erro ao solicitar kit Influencer:', error);
    setLoadingState(element, false);
    isProcessing = false;
  }
};

const setGun2 = async (event) => {
  if (isProcessing) return;
  
  isProcessing = true;
  const element = event?.target || document.querySelector('[data-kit="investidor"]');
  
  try {
    addClickFeedback(element);
    setLoadingState(element, true);
    
    await sendNuiMessage('setGun2');
    
    // Pequeno delay para feedback visual
    setTimeout(() => {
      setShow(false);
    }, 500);
    
  } catch (error) {
    console.error('Erro ao solicitar kit Investidor:', error);
    setLoadingState(element, false);
    isProcessing = false;
  }
};

const setCar = async (event) => {
  if (isProcessing) return;
  
  isProcessing = true;
  const element = event?.target || document.querySelector('[data-vehicle="car"]');
  
  try {
    addClickFeedback(element);
    setLoadingState(element, true);
    
    await sendNuiMessage('setCar');
    
    // Pequeno delay para feedback visual
    setTimeout(() => {
      setShow(false);
    }, 500);
    
  } catch (error) {
    console.error('Erro ao spawnar carro:', error);
    setLoadingState(element, false);
    isProcessing = false;
  }
};

const setMoto = async (event) => {
  if (isProcessing) return;
  
  isProcessing = true;
  const element = event?.target || document.querySelector('[data-vehicle="moto"]');
  
  try {
    addClickFeedback(element);
    setLoadingState(element, true);
    
    await sendNuiMessage('setMoto');
    
    // Pequeno delay para feedback visual
    setTimeout(() => {
      setShow(false);
    }, 500);
    
  } catch (error) {
    console.error('Erro ao spawnar moto:', error);
    setLoadingState(element, false);
    isProcessing = false;
  }
};

// ===== EVENT LISTENERS =====
$(document).ready(() => {
  // Listener para mensagens do cliente Lua
  window.addEventListener('message', (event) => {
    const { type, detail } = event.data;
    
    switch (type) {
      case 'setShow':
        setShow(detail);
        break;
      default:
        console.warn('Tipo de mensagem desconhecido:', type);
    }
  });

  // Fechar NUI com ESC
  $(document).on('keyup', (e) => {
    if (e.key === 'Escape' && isNuiOpen && !isProcessing) {
      closeNui();
    }
  });

  // Event listeners para os cards
  $('.option-card').each(function() {
    const $card = $(this);
    
    // Click handler
    $card.on('click', function(e) {
      if (isProcessing) return;
      
      createRipple(e, this);
      
      const kit = $card.data('kit');
      const vehicle = $card.data('vehicle');
      
      if (kit === 'influencer') {
        setGun(e);
      } else if (kit === 'investidor') {
        setGun2(e);
      } else if (vehicle === 'car') {
        setCar(e);
      } else if (vehicle === 'moto') {
        setMoto(e);
      }
    });
    
    // Keyboard support
    $card.on('keydown', function(e) {
      if ((e.key === 'Enter' || e.key === ' ') && !isProcessing) {
        e.preventDefault();
        $card.trigger('click');
      }
    });
    
    // Hover effects melhorados
    $card.on('mouseenter', function() {
      if (!isProcessing) {
        $(this).addClass('hovered');
      }
    });
    
    $card.on('mouseleave', function() {
      $(this).removeClass('hovered');
    });
  });

  // Prevenir context menu
  $(document).on('contextmenu', (e) => {
    e.preventDefault();
    return false;
  });

  // Prevenir seleção de texto
  $(document).on('selectstart', (e) => {
    e.preventDefault();
    return false;
  });

  // Debounced resize handler
  const handleResize = debounce(() => {
    // Ajustes responsivos se necessário
    console.log('Window resized');
  }, CONFIG.DEBOUNCE_DELAY);

  $(window).on('resize', handleResize);

  // Inicialização completa
  console.log('NUI Ricoz inicializada com sucesso');
});

// ===== FUNÇÕES GLOBAIS (para compatibilidade) =====
window.setGun = setGun;
window.setGun2 = setGun2;
window.setCar = setCar;
window.setMoto = setMoto;
window.closeNui = closeNui;

// ===== TRATAMENTO DE ERROS GLOBAL =====
window.addEventListener('error', (event) => {
  console.error('Erro JavaScript:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Promise rejeitada:', event.reason);
});

// ===== CSS ADICIONAL DINÂMICO =====
const addDynamicStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    .nui-open {
      pointer-events: auto;
    }
    
    .option-card.hovered {
      transform: translateY(-6px);
    }
    
    .option-card.processing {
      pointer-events: none;
    }
    
    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
  `;
  document.head.appendChild(style);
};

// Adicionar estilos dinâmicos quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addDynamicStyles);
} else {
  addDynamicStyles();
}

