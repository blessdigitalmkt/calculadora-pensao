# Calculadora Educativa de Pensão Alimentícia

Ferramenta educativa desenvolvida para o site da **Dra. Fernanda Corrêa — Advogada especialista em Direito de Família**.

> Esta ferramenta fornece estimativas educativas e **não substitui orientação jurídica profissional**.

---

## Stack

- React 18 + TypeScript
- Vite
- CSS Modules
- `@react-pdf/renderer` para geração de PDF no navegador
- 100% client-side — sem backend, sem banco de dados, sem armazenamento de dados

---

## Instalação local

```bash
# 1. Clone o repositório
git clone https://github.com/SEU_USUARIO/calculadora-pensao.git
cd calculadora-pensao

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse em: `http://localhost:5173`

---

## Build para produção

```bash
npm run build
```

Os arquivos gerados estarão na pasta `dist/`.

Para testar o build localmente:

```bash
npm run preview
```

---

## Deploy na Vercel (passo a passo)

### 1. Enviar para o GitHub

```bash
# Inicie o repositório Git
git init
git add .
git commit -m "feat: calculadora educativa de pensão alimentícia"

# Crie um repositório no GitHub e faça o push
git remote add origin https://github.com/SEU_USUARIO/calculadora-pensao.git
git branch -M main
git push -u origin main
```

### 2. Conectar o GitHub à Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login com a conta GitHub
2. Clique em **"Add New Project"**
3. Escolha **"Import Git Repository"** e selecione `calculadora-pensao`
4. Configurações (Vercel detecta automaticamente):
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Clique em **"Deploy"**

### 3. Deploy automático

A partir de agora, **cada `git push` na branch `main` atualiza automaticamente o site na Vercel**.

```bash
git add .
git commit -m "fix: descrição da alteração"
git push
```

---

## Domínio personalizado (opcional)

Para usar `calculadora.fernandacorreaadvogada.com.br`:

1. No painel da Vercel → projeto → **Domains**
2. Adicione o subdomínio desejado
3. Configure os registros DNS fornecidos pela Vercel no seu provedor de domínio

---

## Customização

### Alterar WhatsApp e informações de contato

Edite [src/data/content.ts](src/data/content.ts):

```ts
export const SITE_CONFIG = {
  lawyerName: 'Dra. Fernanda Corrêa',
  whatsappNumber: '5548999102385',  // formato: 55 + DDD + número
  website: 'https://fernandacorreaadvogada.com.br',
  email: 'contato@fernandacorreaadvogada.com.br',
};
```

### Alterar cores

Edite [src/styles/variables.css](src/styles/variables.css):

```css
:root {
  --color-primary: #600909;   /* Vinho — cor principal */
  --color-accent:  #E3BC9A;   /* Dourado — destaque */
}
```

---

## Estrutura do projeto

```
src/
├── components/
│   ├── FormSteps/          # Etapas 1–4 + opcional
│   ├── ResultCard/         # Tela de resultado + breakdown
│   ├── Disclaimer/         # Aviso educativo
│   ├── WhatsAppButton/     # CTA WhatsApp
│   ├── ProgressBar/        # Barra de progresso
│   └── common/             # Button, RadioGroup, InputCurrency
├── pdf/
│   └── PensionReport.tsx   # Documento PDF completo
├── hooks/
│   └── useCalculator.ts    # Estado central + navegação
├── utils/
│   ├── calculatePension.ts # Lógica de cálculo
│   ├── formatCurrency.ts
│   ├── formatPercent.ts
│   └── buildWhatsAppMessage.ts
├── data/
│   └── content.ts          # Textos, labels, configurações
└── styles/
    ├── variables.css       # Tokens de design
    ├── global.css
    └── animations.css
```

---

## LGPD

- Nenhum dado é enviado para servidores
- Nenhum cookie de rastreamento
- Todos os dados permanecem apenas na memória do navegador durante a sessão
- O PDF é gerado 100% localmente no navegador

---

## Aviso jurídico

Esta ferramenta possui caráter **exclusivamente educativo**. Os resultados não representam valores jurídicos, garantidos ou vinculantes. Cada caso é analisado individualmente pelo Poder Judiciário.
