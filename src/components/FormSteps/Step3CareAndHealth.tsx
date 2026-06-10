import { Button } from '../common/Button';
import { RadioGroup } from '../common/RadioGroup';
import { InputCurrency } from '../common/InputCurrency';
import {
  CARE_HOURS_OPTIONS,
  CONSULTATIONS_OPTIONS,
  SPECIAL_NEEDS_OPTIONS,
} from '../../data/content';
import type { FormData } from '../../hooks/useCalculator';
import styles from './StepWrapper.module.css';

interface Props {
  formData: FormData;
  updateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
  onNext: () => void;
  onBack: () => void;
  isValid: boolean;
}

export function Step3CareAndHealth({ formData, updateField, onNext, onBack, isValid }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <h2 className={styles.title}>Rotina e cuidados</h2>
        <p className={styles.subtitle}>
          Essas informações refletem a dedicação que você tem com seu filho e
          as necessidades específicas de saúde que ele possui.
        </p>
      </div>

      <div className={styles.fieldGroup}>
        <div>
          <label className={styles.fieldLabel}>
            Quantas horas semanais você dedica exclusivamente ao cuidado do filho?
          </label>
          <RadioGroup
            name="careHours"
            options={CARE_HOURS_OPTIONS}
            value={formData.careHours}
            onChange={(v) => updateField('careHours', v)}
            columns={2}
          />
        </div>

        <div>
          <label className={styles.fieldLabel}>
            Quantas consultas médicas ou sessões de terapia por mês?
          </label>
          <RadioGroup
            name="consultations"
            options={CONSULTATIONS_OPTIONS}
            value={formData.consultations}
            onChange={(v) => updateField('consultations', v)}
            columns={2}
          />
        </div>

        <div>
          <label className={styles.fieldLabel}>
            A criança possui alguma necessidade especial?
          </label>
          <RadioGroup
            name="specialNeeds"
            options={SPECIAL_NEEDS_OPTIONS}
            value={formData.specialNeeds}
            onChange={(v) => updateField('specialNeeds', v)}
            columns={2}
          />
        </div>

        <div>
          <label className={styles.fieldLabel}>
            A criança utiliza medicação contínua?
          </label>
          <div className={styles.checkboxGroup}>
            {[
              { value: false, label: 'Não' },
              { value: true,  label: 'Sim' },
            ].map(opt => (
              <label
                key={String(opt.value)}
                className={[
                  styles.checkOption,
                  formData.hasMedication === opt.value ? styles.checked : '',
                ].join(' ')}
              >
                <input
                  type="radio"
                  name="hasMedication"
                  checked={formData.hasMedication === opt.value}
                  onChange={() => updateField('hasMedication', opt.value)}
                />
                <span className={styles.checkOptionLabel}>{opt.label}</span>
              </label>
            ))}
          </div>

          {formData.hasMedication && (
            <div style={{ marginTop: 'var(--space-4)' }}>
              <InputCurrency
                label="Custo médio mensal com medicação"
                value={formData.medicationCost}
                onChange={(v) => updateField('medicationCost', v)}
                hint="Valor aproximado por mês com todos os medicamentos contínuos."
              />
            </div>
          )}
        </div>
      </div>

      <div className={styles.nav}>
        <Button variant="ghost" onClick={onBack}>
          ← Voltar
        </Button>
        <Button onClick={onNext} disabled={!isValid} size="lg">
          Próximo →
        </Button>
      </div>
    </div>
  );
}
