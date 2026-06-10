import { Button } from '../common/Button';
import { RadioGroup } from '../common/RadioGroup';
import { InputCurrency } from '../common/InputCurrency';
import { INCOME_OPTIONS, CHILDREN_OPTIONS } from '../../data/content';
import type { FormData } from '../../hooks/useCalculator';
import styles from './StepWrapper.module.css';

interface Props {
  formData: FormData;
  updateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
  onNext: () => void;
  isValid: boolean;
}

export function Step1BasicData({ formData, updateField, onNext, isValid }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <h2 className={styles.title}>Vamos começar com o básico</h2>
        <p className={styles.subtitle}>
          Informe o que você sabe sobre a renda do pai e quantos filhos estão envolvidos.
          Não precisa ser exato — uma estimativa já ajuda.
        </p>
      </div>

      <div className={styles.fieldGroup}>
        <div>
          <label className={styles.fieldLabel}>
            Qual é a renda mensal aproximada do pai?
          </label>
          <RadioGroup
            name="incomeRange"
            options={INCOME_OPTIONS}
            value={formData.incomeRange}
            onChange={(v) => updateField('incomeRange', v)}
          />
          {formData.incomeRange === 'custom' && (
            <div style={{ marginTop: 'var(--space-4)' }}>
              <InputCurrency
                label="Informe o valor aproximado"
                value={formData.incomeCustom}
                onChange={(v) => updateField('incomeCustom', v)}
                hint="Se não tiver certeza, informe o que você estima ou o que sabe."
              />
            </div>
          )}
        </div>

        <div>
          <label className={styles.fieldLabel}>
            Quantos filhos estão envolvidos?
          </label>
          <RadioGroup
            name="children"
            options={CHILDREN_OPTIONS}
            value={formData.children}
            onChange={(v) => updateField('children', parseInt(v))}
            columns={2}
          />
        </div>
      </div>

      <div className={styles.nav}>
        <span />
        <Button onClick={onNext} disabled={!isValid} size="lg">
          Próximo →
        </Button>
      </div>
    </div>
  );
}
