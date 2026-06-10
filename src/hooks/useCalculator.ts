import { useState, useCallback } from 'react';
import { calculatePension, type PensionResult } from '../utils/calculatePension';

export interface ExpenseItem {
  category: string;
  value?: number;
}

export interface FormData {
  // Step 1 — Dados básicos
  incomeRange: string;
  incomeCustom?: number;
  children: number;

  // Step 2 — Participação do pai
  fatherParticipation: string;
  weekendsNotTaken: string;

  // Step 3 — Cuidados e saúde
  careHours: string;
  consultations: string;
  specialNeeds: string;
  hasMedication: boolean;
  medicationCost?: number;

  // Step 4 — Despesas
  expenses: ExpenseItem[];

  // Step 5 — Dados opcionais
  responsibleName?: string;
  childName?: string;
  observations?: string;
}

const INITIAL_FORM: FormData = {
  incomeRange: '',
  incomeCustom: undefined,
  children: 1,
  fatherParticipation: '',
  weekendsNotTaken: '',
  careHours: '',
  consultations: '',
  specialNeeds: 'none',
  hasMedication: false,
  medicationCost: undefined,
  expenses: [],
  responsibleName: '',
  childName: '',
  observations: '',
};

export type Step = 1 | 2 | 3 | 4 | 5 | 'result';

export function useCalculator() {
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [result, setResult] = useState<PensionResult | null>(null);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  const updateField = useCallback(<K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const goNext = useCallback(() => {
    setDirection('forward');
    setStep(prev => {
      if (prev === 4) return 5;
      if (prev === 5) {
        const r = calculatePension(formData);
        setResult(r);
        return 'result';
      }
      return (prev as number) + 1 as Step;
    });
  }, [formData]);

  const goBack = useCallback(() => {
    setDirection('backward');
    setStep(prev => {
      if (prev === 'result') return 5;
      if ((prev as number) <= 1) return 1;
      return (prev as number) - 1 as Step;
    });
  }, []);

  const goToStep = useCallback((target: Step) => {
    setDirection('forward');
    setStep(target);
  }, []);

  const reset = useCallback(() => {
    setFormData(INITIAL_FORM);
    setResult(null);
    setStep(1);
  }, []);

  const isStepValid = useCallback((s: Step): boolean => {
    switch (s) {
      case 1:
        return !!formData.incomeRange && formData.children > 0 &&
          (formData.incomeRange !== 'custom' || (formData.incomeCustom ?? 0) > 0);
      case 2:
        return !!formData.fatherParticipation && !!formData.weekendsNotTaken;
      case 3:
        return !!formData.careHours && !!formData.consultations && !!formData.specialNeeds &&
          (!formData.hasMedication || (formData.medicationCost ?? 0) > 0);
      case 4:
        return true;
      case 5:
        return true;
      default:
        return true;
    }
  }, [formData]);

  return {
    step,
    formData,
    result,
    direction,
    updateField,
    goNext,
    goBack,
    goToStep,
    reset,
    isStepValid,
  };
}
