import type { FormData } from '../hooks/useCalculator';
import { INCOME_OPTIONS } from '../data/content';

export interface PensionResult {
  incomeUsed: number;
  basePercent: number;
  careAdjust: number;
  weekendAdjust: number;
  consultationAdjust: number;
  specialNeedsAdjust: number;
  medicationAdjust: number;
  participationReduction: number;
  finalPercent: number;
  estimatedValue: number;
  estimatedMin: number;
  estimatedMax: number;
  annualValue: number;
  annualMin: number;
  annualMax: number;
}

export function getIncomeValue(formData: FormData): number {
  if (formData.incomeRange === 'custom') {
    return formData.incomeCustom ?? 0;
  }
  const option = INCOME_OPTIONS.find(o => o.value === formData.incomeRange);
  return option?.incomeValue ?? 2000;
}

export function calculatePension(formData: FormData): PensionResult {
  const income = getIncomeValue(formData);

  // --- Percentual base por número de filhos ---
  const baseMap: Record<number, number> = { 1: 18, 2: 22, 3: 28 };
  const basePercent = baseMap[formData.children] ?? 28;

  // --- Ajuste por horas de cuidado exclusivo ---
  const careMap: Record<string, number> = {
    lt_20: 0, '20_40': 2, '40_60': 4, gt_60: 7,
  };
  const careAdjust = careMap[formData.careHours] ?? 0;

  // --- Ajuste por finais de semana não cumpridos ---
  const weekendMap: Record<string, number> = {
    '0_1': 0, '2': 2, '3': 4, '4': 6,
  };
  const weekendAdjust = weekendMap[formData.weekendsNotTaken] ?? 0;

  // --- Ajuste por consultas/terapias ---
  const consultMap: Record<string, number> = {
    '0_1': 0, '2_3': 2, '4_6': 4, gt_6: 6,
  };
  const consultationAdjust = consultMap[formData.consultations] ?? 0;

  // --- Ajuste por necessidade especial ---
  const specialMap: Record<string, number> = {
    none: 0, mild: 5, moderate: 10, intense: 20,
  };
  const specialNeedsAdjust = specialMap[formData.specialNeeds] ?? 0;

  // --- Ajuste por medicação contínua ---
  let medicationAdjust = 0;
  if (formData.hasMedication && formData.medicationCost && income > 0) {
    const rawAdj = (formData.medicationCost / income) * 100;
    medicationAdjust = Math.min(rawAdj, 10);
  }

  // --- Soma bruta dos percentuais ---
  const grossPercent =
    basePercent +
    careAdjust +
    weekendAdjust +
    consultationAdjust +
    specialNeedsAdjust +
    medicationAdjust;

  // --- Redução pela participação do pai ---
  const participationMap: Record<string, number> = {
    none: 0, rarely: 0, little: 5, frequently: 10,
  };
  const participationReduction = participationMap[formData.fatherParticipation] ?? 0;

  // --- Percentual final com limites (10%–60%) ---
  const rawFinal = grossPercent - participationReduction;
  const finalPercent = Math.min(Math.max(rawFinal, 10), 60);

  // --- Valores estimados com faixa ±15% ---
  const estimatedValue = (income * finalPercent) / 100;
  const estimatedMin   = Math.round(estimatedValue * 0.85);
  const estimatedMax   = Math.round(estimatedValue * 1.15);

  return {
    incomeUsed: income,
    basePercent,
    careAdjust,
    weekendAdjust,
    consultationAdjust,
    specialNeedsAdjust,
    medicationAdjust: Math.round(medicationAdjust * 10) / 10,
    participationReduction,
    finalPercent: Math.round(finalPercent * 10) / 10,
    estimatedValue: Math.round(estimatedValue),
    estimatedMin,
    estimatedMax,
    annualValue: Math.round(estimatedValue * 12),
    annualMin:   estimatedMin * 12,
    annualMax:   estimatedMax * 12,
  };
}
