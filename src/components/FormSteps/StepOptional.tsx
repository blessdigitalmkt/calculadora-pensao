import { Button } from '../common/Button';
import { LGPD_NOTICE } from '../../data/content';
import type { FormData } from '../../hooks/useCalculator';
import styles from './StepWrapper.module.css';

interface Props {
  formData: FormData;
  updateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepOptional({ formData, updateField, onNext, onBack }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <h2 className={styles.title}>
          Quase pronto!
          <span className={styles.optionalBadge}>Opcional</span>
        </h2>
        <p className={styles.subtitle}>
          Esses dados são usados apenas para personalizar o relatório PDF.
          Você pode pular esta etapa se preferir.
        </p>
      </div>

      <div className={styles.fieldGroup}>
        <div>
          <label className={styles.fieldLabel} htmlFor="responsibleName">
            Seu nome (ou como gostaria de ser chamada)
          </label>
          <input
            id="responsibleName"
            type="text"
            className={styles.textInput}
            value={formData.responsibleName ?? ''}
            onChange={e => updateField('responsibleName', e.target.value)}
            placeholder="Ex: Maria, Mãe da Sofia..."
            autoComplete="off"
          />
        </div>

        <div>
          <label className={styles.fieldLabel} htmlFor="childName">
            Nome ou iniciais do filho
          </label>
          <input
            id="childName"
            type="text"
            className={styles.textInput}
            value={formData.childName ?? ''}
            onChange={e => updateField('childName', e.target.value)}
            placeholder="Ex: Sofia, L.M.S..."
            autoComplete="off"
          />
        </div>

        <div>
          <label className={styles.fieldLabel} htmlFor="observations">
            Observações
            <span className={styles.optionalBadge}>Opcional</span>
          </label>
          <textarea
            id="observations"
            className={[styles.textInput, styles.textArea].join(' ')}
            value={formData.observations ?? ''}
            onChange={e => updateField('observations', e.target.value)}
            placeholder="Alguma informação adicional que queira registrar no relatório..."
          />
        </div>
      </div>

      <div className={styles.lgpdBox}>
        <span className={styles.lgpdIcon}>🔒</span>
        <p className={styles.lgpdText}>{LGPD_NOTICE}</p>
      </div>

      <div className={styles.nav}>
        <Button variant="ghost" onClick={onBack}>
          ← Voltar
        </Button>
        <Button onClick={onNext} size="lg">
          Ver resultado →
        </Button>
      </div>
    </div>
  );
}
