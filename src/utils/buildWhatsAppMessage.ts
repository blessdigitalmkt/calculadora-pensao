import type { PensionResult } from './calculatePension';
import type { FormData } from '../hooks/useCalculator';
import { formatCurrency, } from './formatCurrency';
import { formatPercent } from './formatPercent';
import { SITE_CONFIG } from '../data/content';

export function buildWhatsAppUrl(formData: FormData, result: PensionResult): string {
  const message = [
    'Olá, Fernanda.',
    '',
    'Realizei uma simulação na Calculadora Educativa de Pensão Alimentícia e gostaria de receber uma análise personalizada do meu caso.',
    '',
    '*Resultado estimado:*',
    `• Valor mensal estimado: ${formatCurrency(result.estimatedMin)} a ${formatCurrency(result.estimatedMax)}`,
    `• Percentual aplicado: ${formatPercent(result.finalPercent)}`,
    `• Número de filhos: ${formData.children}`,
    '',
    'Aguardo orientação.',
  ].join('\n');

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encoded}`;
}
