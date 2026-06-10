import { Button } from '../common/Button';
import { RadioGroup } from '../common/RadioGroup';
import { PARTICIPATION_OPTIONS, WEEKENDS_OPTIONS } from '../../data/content';
import type { FormData } from '../../hooks/useCalculator';
import styles from './StepWrapper.module.css';

interface Props {
  formData: FormData;
  updateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
  onNext: () => void;
  onBack: () => void;
  isValid: boolean;
}

export function Step2FatherParticipation({ formData, updateField, onNext, onBack, isValid }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <h2 className={styles.title}>Participação do pai</h2>
        <p className={styles.subtitle}>
          Essas informações ajudam a entender como o pai está presente na prática,
          tanto financeiramente quanto no cuidado direto.
        </p>
      </div>

      <div className={styles.fieldGroup}>
        <div>
          <label className={styles.fieldLabel}>
            O pai participa das despesas do filho diretamente?
          </label>
          <RadioGroup
            name="fatherParticipation"
            options={PARTICIPATION_OPTIONS}
            value={formData.fatherParticipation}
            onChange={(v) => updateField('fatherParticipation', v)}
            columns={2}
          />
        </div>

        <div>
          <label className={styles.fieldLabel}>
            Quantos finais de semana por mês o pai <strong>não</strong> pega a criança?
          </label>
          <p className={styles.fieldHint}>
            Ou seja, finais de semana em que a criança ficou com você.
          </p>
          <div style={{ marginTop: 'var(--space-3)' }}>
            <RadioGroup
              name="weekendsNotTaken"
              options={WEEKENDS_OPTIONS}
              value={formData.weekendsNotTaken}
              onChange={(v) => updateField('weekendsNotTaken', v)}
            />
          </div>
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
