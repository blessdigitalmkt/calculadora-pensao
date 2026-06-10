import { Button } from '../common/Button';
import { InputCurrency } from '../common/InputCurrency';
import { EXPENSE_CATEGORIES } from '../../data/content';
import type { FormData, ExpenseItem } from '../../hooks/useCalculator';
import styles from './StepWrapper.module.css';
import expStyles from './Step4Expenses.module.css';

interface Props {
  formData: FormData;
  updateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step4Expenses({ formData, updateField, onNext, onBack }: Props) {
  const selected = formData.expenses;

  function isSelected(cat: string) {
    return selected.some(e => e.category === cat);
  }

  function toggle(cat: string) {
    if (isSelected(cat)) {
      updateField('expenses', selected.filter(e => e.category !== cat));
    } else {
      updateField('expenses', [...selected, { category: cat }]);
    }
  }

  function setValue(cat: string, value: number) {
    updateField(
      'expenses',
      selected.map(e => e.category === cat ? { ...e, value } : e)
    );
  }

  function getItem(cat: string): ExpenseItem | undefined {
    return selected.find(e => e.category === cat);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <h2 className={styles.title}>Despesas mensais</h2>
        <p className={styles.subtitle}>
          Selecione as categorias que fazem parte da vida do seu filho.
          Os valores são opcionais — servem apenas para o relatório.
        </p>
      </div>

      <div className={expStyles.categories}>
        {EXPENSE_CATEGORIES.map(cat => {
          const sel = isSelected(cat.value);
          const item = getItem(cat.value);
          return (
            <div key={cat.value} className={expStyles.categoryBlock}>
              <label
                className={[expStyles.categoryChip, sel ? expStyles.chipSelected : ''].join(' ')}
              >
                <input
                  type="checkbox"
                  checked={sel}
                  onChange={() => toggle(cat.value)}
                  className={expStyles.hiddenCheck}
                />
                <span className={expStyles.checkmark}>{sel ? '✓' : '+'}</span>
                <span>{cat.label}</span>
              </label>
              {sel && (
                <div className={expStyles.valueInput}>
                  <InputCurrency
                    label={`Valor mensal — ${cat.label}`}
                    value={item?.value}
                    onChange={(v) => setValue(cat.value, v)}
                    hint="Opcional"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selected.length === 0 && (
        <p className={expStyles.hint}>
          Nenhuma despesa selecionada. Você pode pular esta etapa.
        </p>
      )}

      <div className={styles.nav}>
        <Button variant="ghost" onClick={onBack}>
          ← Voltar
        </Button>
        <Button onClick={onNext} size="lg">
          Próximo →
        </Button>
      </div>
    </div>
  );
}
