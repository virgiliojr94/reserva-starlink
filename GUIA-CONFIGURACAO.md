# 🎯 Sistema de Reservas Starlink - Configuração

## ⚡ Configuração Rápida

### 1. Configurar seu WhatsApp

Edite o arquivo `config-reserva.js` e altere o número do WhatsApp:

```javascript
whatsappNumber: '5511987654321', // SEU NÚMERO AQUI
```

**Formato:** `código do país + DDD + número` (sem espaços ou símbolos)

**Exemplos:**
- 🇧🇷 Brasil SP: `5511987654321` para (11) 98765-4321
- 🇧🇷 Brasil RJ: `5521987654321` para (21) 98765-4321

### 2. Personalizar Dados da Empresa

```javascript
businessName: 'Sua Empresa Starlink',
messageHeader: '🛰️ *Nova Reserva - Sua Empresa*',
```

### 3. Configurar Datas Ocupadas

```javascript
reservedDates: [
    '2025-11-15',  // Formato: YYYY-MM-DD
    '2025-11-16',
    '2025-11-20'
]
```

## 📁 Arquivos Disponíveis

### Versões da Página:
1. **`reserva-premium.html`** ⭐ - Versão completa com melhor design
2. **`reserva-cliente.html`** - Versão simples e funcional  
3. **`reserva-starlink.html`** - Versão original (controle administrativo)

### Configuração:
- **`config-reserva.js`** - Arquivo de configuração principal

## 🚀 Como Usar

### Método 1: Servidor Local
```bash
cd reserva-starlink
python3 -m http.server 8000
```

Acesse: `http://localhost:8000/reserva-premium.html`

### Método 2: Docker
```bash
docker-compose up -d
```

Acesse: `http://localhost:8080`

## 🎨 Fluxo de Reserva

### Passo 1: Seleção de Datas
- ✅ Cliente clica nos dias disponíveis (verdes)
- ✅ Pode selecionar múltiplas datas
- ✅ Vê resumo das datas selecionadas
- ✅ Botão "Continuar" só ativa com datas selecionadas

### Passo 2: Formulário de Dados
- ✅ Nome completo (obrigatório)
- ✅ WhatsApp (obrigatório)
- ✅ E-mail (opcional)
- ✅ Local da instalação (obrigatório)
- ✅ Observações (opcional)

### Passo 3: Confirmação e WhatsApp
- ✅ Resumo final da reserva
- ✅ Botão para enviar via WhatsApp
- ✅ Mensagem formatada automaticamente

## 📱 Mensagem do WhatsApp

A mensagem enviada inclui:

```
🛰️ Nova Solicitação de Reserva Starlink

👤 Nome: João Silva
📞 WhatsApp: (11) 99999-9999
📧 E-mail: joao@email.com
📍 Local: São Paulo, SP - 01234-567

📅 Datas Solicitadas:
• segunda-feira, 15 de novembro de 2025
• terça-feira, 16 de novembro de 2025

📝 Observações: 
Preferência pela manhã

---
💻 Enviado pelo sistema de reservas Starlink Services
🕐 15/11/2025 14:30:25
```

## 🎛️ Personalização Avançada

### Cores do Sistema
```javascript
colors: {
    primary: '#3b82f6',    // Azul principal
    secondary: '#10b981',  // Verde
    accent: '#8b5cf6'      // Roxo
}
```

### Campos Obrigatórios
```javascript
requiredFields: {
    name: true,        // Nome sempre obrigatório
    phone: true,       // WhatsApp sempre obrigatório  
    email: false,      // E-mail opcional
    location: true,    // Local obrigatório
    observations: false // Observações opcionais
}
```

## 🛠️ Recursos Incluídos

### Interface
- ✅ Design responsivo (mobile/desktop)
- ✅ Indicador de progresso em 3 passos
- ✅ Calendário interativo
- ✅ Validação de formulário
- ✅ Máscaras de entrada (telefone)
- ✅ Animações suaves
- ✅ Modal de ajuda

### Funcionalidades
- ✅ Seleção múltipla de datas
- ✅ Datas bloqueadas (já reservadas)
- ✅ Navegação entre meses
- ✅ Destaque do dia atual
- ✅ Botão de limpar seleção
- ✅ Resumo das datas escolhidas
- ✅ Redirecionamento automático para WhatsApp

### Validações
- ✅ Impede seleção de datas ocupadas
- ✅ Exige pelo menos uma data selecionada
- ✅ Valida campos obrigatórios do formulário
- ✅ Formatação automática de telefone

## 📞 Suporte

Para dúvidas sobre configuração:
1. Verifique o arquivo `config-reserva.js`
2. Teste com um número de WhatsApp válido
3. Confirme que o servidor está rodando
4. Verifique o console do navegador para erros

## 🎯 Próximos Passos

1. ✅ Configure seu número do WhatsApp
2. ✅ Personalize nome da empresa
3. ✅ Defina datas já ocupadas
4. ✅ Teste o fluxo completo
5. ✅ Compartilhe o link da página

---

**Versão atual:** Premium v1.0  
**Status:** ✅ Totalmente funcional  
**Compatibilidade:** Todos os navegadores modernos