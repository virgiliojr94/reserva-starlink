// Configuração da Página de Reservas Starlink
const CONFIG = {
    // Número do WhatsApp (OBRIGATÓRIO)
    // Formato: código do país + DDD + número (sem espaços, traços ou parênteses)
    // Exemplo: 5511987654321 para Brasil, SP, 11 98765-4321
    whatsappNumber: '5595981121572', // ALTERE AQUI PARA SEU NÚMERO
    
    // Nome da empresa/pessoa (aparece na mensagem)
    businessName: 'Starlink Services',
    
    // Texto personalizado da mensagem WhatsApp
    messageHeader: '🛰️ *Nova Solicitação de Reserva Starlink*',
    
    // Planos disponíveis
    plans: {
        residencial: {
            name: 'Fixo Residencial',
            icon: '🏠',
            description: 'Ideal para residências e uso fixo',
            pricing: {
                daily: 60.00,
                weekly: 300.00,
                monthly: 1110.00
            },
            features: [
                'Conexão estável para casa',
                'Velocidade otimizada',
                'Suporte técnico',
                'Instalação incluída'
            ],
            // Datas reservadas específicas da antena Residencial
            reservedDates: [

            ],
            // Informações sobre reservas (para tooltips)
            reservationInfo: {}
        },
        movel: {
            name: 'Móvel/Viagem',
            icon: '🚗',
            description: 'Perfeito para viagens e mobilidade',
            pricing: {
                daily: 80.00,
                weekly: 400.00,  // 80 * 5 dias úteis
                monthly: 1480.00 // 80 * 18.5 dias úteis médios
            },
            features: [
                'Portabilidade total',
                'Conexão em movimento',
                'Kit completo',
                'Suporte 24h'
            ],
            // Datas reservadas específicas da antena Móvel
            reservedDates: [
                '2025-12-05',
                '2025-12-06',
                '2025-12-07',
                '2025-12-08',
                '2025-12-09',
                '2025-12-10',
                '2025-12-11',
                '2025-12-12'
            ],
            // Informações sobre reservas (para tooltips)
            reservationInfo: {
                '2025-12-05': 'Reservado para Yuri Gustavo (militar)',
                '2025-12-06': 'Reservado para Yuri Gustavo (militar)',
                '2025-12-07': 'Reservado para Yuri Gustavo (militar)',
                '2025-12-08': 'Reservado para Yuri Gustavo (militar)',
                '2025-12-09': 'Reservado para Yuri Gustavo (militar)',
                '2025-12-10': 'Reservado para Yuri Gustavo (militar)',
                '2025-12-11': 'Reservado para Yuri Gustavo (militar)',
                '2025-12-12': 'Reservado para Yuri Gustavo (militar)'

            }
        }
    },
    
    // Configurações visuais
    colors: {
        primary: '#3b82f6',    // Azul
        secondary: '#10b981',  // Verde
        accent: '#8b5cf6'      // Roxo
    },
    
    // Campos obrigatórios do formulário
    requiredFields: {
        name: true,
        phone: true,
        email: false,
        location: true,
        observations: false
    }
};

// Torna a configuração disponível globalmente
window.RESERVA_CONFIG = CONFIG;