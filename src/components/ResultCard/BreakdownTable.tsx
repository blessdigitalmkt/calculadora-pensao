import { formatPercent } from '../../utils/formatPercent';
import { formatCurrency } from '../../utils/formatCurrency';
import type { PensionResult } from '../../utils/calculatePension';
import styles from './BreakdownTable.module.css';

interface Props {
  result: PensionResult;
}

export function BreakdownTable({ result }: Props) {
  const rows = [
    { label: 'Renda considerada', value: formatCurrency(result.incomeUsed), highlight: false },
    { label: 'Percentual base (nº de filhos)', value: `+${formatPercent(result.basePercent)}`, highlight: false },
    { label: 'Ajuste por horas de cuidado', value: result.careAdjust > 0 ? `+${formatPercent(result.careAdjust)}` : '—', highlight: result.careAdjust > 0 },
    { label: 'Ajuste por finais de semana', value: result.weekendAdjust > 0 ? `+${formatPercent(result.weekendAdjust)}` : '—', highlight: result.weekendAdjust > 0 },
    { label: 'Ajuste por consultas/terapias', value: result.consultationAdjust > 0 ? `+${formatPercent(result.consultationAdjust)}` : '—', highlight: result.consultationAdjust > 0 },
    { label: 'Ajuste por necessidade especial', value: result.specialNeedsAdjust > 0 ? `+${formatPercent(result.specialNeedsAdjust)}` : '—', highlight: result.specialNeedsAdjust > 0 },
    { label: 'Ajuste por medicação contínua', value: result.medicationAdjust > 0 ? `+${formatPercent(result.medicationAdjust)}` : '—', highlight: result.medicationAdjust > 0 },
    { label: 'Redução (participação do pai)', value: result.participationReduction > 0 ? `-${formatPercent(result.participationReduction)}` : '—', highlight: false, negative: true },
  ].filter(r => r.value !== '—' || r.label.includes('base') || r.label.includes('Renda'));

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Como chegamos a esse valor</h3>
      <div className={styles.table}>
        {rows.map((row, i) => (
          <div
            key={i}
            className={[
              styles.row,
              row.highlight ? styles.rowHighlight : '',
              (row as { negative?: boolean }).negative ? styles.rowNegative : '',
            ].join(' ')}
          >
            <span className={styles.rowLabel}>{row.label}</span>
            <span className={styles.rowValue}>{row.value}</span>
          </div>
        ))}
        <div className={styles.rowTotal}>
          <span className={styles.rowLabel}>Percentual final estimado</span>
          <span className={styles.rowValue}>{formatPercent(result.finalPercent)}</span>
        </div>
      </div>
      <p className={styles.note}>
        Os ajustes refletem critérios normalmente observados na prática jurídica brasileira.
        Não constituem fórmula legal obrigatória.
      </p>
    </div>
  );
}
