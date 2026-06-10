export const SITE_CONFIG = {
  lawyerName: 'Dra. Fernanda Corrêa',
  whatsappNumber: '5548999102385',
  website: 'https://fernandacorreaadvogada.com.br',
  email: 'contato@fernandacorreaadvogada.com.br',
  toolName: 'Calculadora Educativa de Pensão Alimentícia',
};

export const INCOME_OPTIONS = [
  { value: 'unknown',   label: 'Não sei', incomeValue: 2000 },
  { value: 'up_2000',   label: 'Até R$ 2.000', incomeValue: 2000 },
  { value: '2000_4000', label: 'R$ 2.000 a R$ 4.000', incomeValue: 3000 },
  { value: '4000_8000', label: 'R$ 4.000 a R$ 8.000', incomeValue: 6000 },
  { value: 'above_8000', label: 'Acima de R$ 8.000', incomeValue: 8000 },
  { value: 'custom',    label: 'Informar valor', incomeValue: 0 },
] as const;

export const CHILDREN_OPTIONS = [
  { value: 1, label: '1 filho' },
  { value: 2, label: '2 filhos' },
  { value: 3, label: '3 ou mais' },
] as const;

export const PARTICIPATION_OPTIONS = [
  { value: 'none',       label: 'Não' },
  { value: 'rarely',     label: 'Raramente' },
  { value: 'little',     label: 'Sim, mas pouco' },
  { value: 'frequently', label: 'Sim, com frequência' },
] as const;

export const WEEKENDS_OPTIONS = [
  { value: '0_1', label: '0 a 1 final de semana' },
  { value: '2',   label: '2 finais de semana' },
  { value: '3',   label: '3 finais de semana' },
  { value: '4',   label: '4 finais de semana (todos)' },
] as const;

export const CARE_HOURS_OPTIONS = [
  { value: 'lt_20',  label: 'Menos de 20 horas' },
  { value: '20_40',  label: '20 a 40 horas' },
  { value: '40_60',  label: '40 a 60 horas' },
  { value: 'gt_60',  label: 'Mais de 60 horas' },
] as const;

export const CONSULTATIONS_OPTIONS = [
  { value: '0_1', label: '0 a 1 consulta/terapia' },
  { value: '2_3', label: '2 a 3 consultas/terapias' },
  { value: '4_6', label: '4 a 6 consultas/terapias' },
  { value: 'gt_6', label: 'Mais de 6' },
] as const;

export const SPECIAL_NEEDS_OPTIONS = [
  { value: 'none',     label: 'Não' },
  { value: 'mild',     label: 'Leve' },
  { value: 'moderate', label: 'Moderada' },
  { value: 'intense',  label: 'Intensa' },
] as const;

export const EXPENSE_CATEGORIES = [
  { value: 'school',    label: 'Escola / Educação' },
  { value: 'health',    label: 'Saúde' },
  { value: 'insurance', label: 'Plano de saúde' },
  { value: 'food',      label: 'Alimentação' },
  { value: 'housing',   label: 'Moradia' },
  { value: 'transport', label: 'Transporte' },
  { value: 'other',     label: 'Outras despesas' },
] as const;

export const STEPS = [
  { number: 1, title: 'Dados básicos', short: 'Dados' },
  { number: 2, title: 'Participação do pai', short: 'Pai' },
  { number: 3, title: 'Cuidados e saúde', short: 'Saúde' },
  { number: 4, title: 'Despesas', short: 'Despesas' },
] as const;

export const LEGAL_DISCLAIMER = `Este resultado é uma estimativa educativa, baseada em critérios normalmente observados na prática jurídica brasileira. Não representa um valor garantido, oficial ou judicialmente vinculante.

A Justiça analisa cada caso individualmente, considerando as necessidades reais da criança, a capacidade financeira comprovada de quem paga e a realidade específica da família. O valor fixado pelo juiz pode ser diferente desta estimativa.

Esta ferramenta não substitui a orientação de uma advogada especializada.`;

export const LGPD_NOTICE = `Seus dados permanecem apenas no seu navegador e são utilizados exclusivamente para gerar esta simulação e o relatório PDF. Nenhuma informação é enviada para servidores ou armazenada.`;
