# Teste VR Benefícios

## Tecnologias
- Cypress (Frontend E2E)
- Cucumber + Ruby + HTTParty (Backend / API)
- Mailosaur (captura de OTP por e-mail)

## Requisitos

### Node.js (Frontend) 
- node -v
- npm -v

### Ruby (Backend)
### Instalar: https://rubyinstaller.org/
- ruby -v
gem install bundler

## Execução Frontend

- cd frontend

- npm install

#### Criar arquivo .env com:
MAILOSAUR_API_KEY=SEU_API_KEY

MAILOSAUR_SERVER_ID=SEU_SERVER_ID

e rodar: npx cypress open 
 

### Execução Backend
cd backend
bundle install
bundle exec cucumber

-------------------


## O que cada parte faz

### Frontend (Cypress) 
- Acessa a loja VR
- Adiciona benefício ao carrinho
- Preenche quantidade e valor aleatórios
- Avança no fluxo de contratação
- Preenche dados do usuário
- Preenche o OTP
- Valida finalização da contratação

### Backend (Cucumber + Ruby)
## Teste de API:
- Faz GET no endpoint VRPAT
- Valida status 200
- Valida existência da chave "typeOfEstablishment"
- Valida que é um array
- Exibe um item aleatório

## Teste de lógica:
- Remove texto após símbolos específicos
- Cobertura com múltiplos cenários (Scenario Outline)

## Observações
- OTP é capturado automaticamente via Mailosaur (manter meu e-mail)
- Uso de dados dinâmicos para evitar flakiness
- Estrutura separada entre frontend e backend
- Testes executáveis de ponta a ponta (E2E + API)