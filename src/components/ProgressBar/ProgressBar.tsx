import { STEPS } from '../../data/content';
import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  currentStep: number;
}

export function ProgressBar({ currentStep }: ProgressBarProps) {
  const totalSteps = STEPS.length;
  const progress = Math.min(((currentStep - 1) / (totalSteps - 1)) * 100, 100);

  return (
    <div className={styles.wrapper}>
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${progress}%` }} />
        {STEPS.map((s) => (
          <div
            key={s.number}
            className={[
              styles.dot,
              currentStep >= s.number ? styles.dotActive : '',
              currentStep === s.number ? styles.dotCurrent : '',
            ].join(' ')}
            style={{ left: `${((s.number - 1) / (totalSteps - 1)) * 100}%` }}
          >
            <span className={styles.dotNumber}>{s.number}</span>
            <span className={styles.dotLabel}>{s.short}</span>
          </div>
        ))}
      </div>
      <p className={styles.stepInfo}>
        Etapa {currentStep} de {totalSteps}
        <span className={styles.stepTitle}> — {STEPS[currentStep - 1]?.title}</span>
      </p>
    </div>
  );
}
