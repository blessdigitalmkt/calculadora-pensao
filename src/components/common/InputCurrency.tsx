import { useState } from 'react';
import styles from './InputCurrency.module.css';

interface InputCurrencyProps {
  label: string;
  value?: number;
  onChange: (value: number) => void;
  placeholder?: string;
  hint?: string;
}

export function InputCurrency({ label, value, onChange, placeholder = 'R$ 0,00', hint }: InputCurrencyProps) {
  const [display, setDisplay] = useState(value ? formatDisplay(value) : '');

  function formatDisplay(n: number): string {
    return n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/[^\d]/g, '');
    if (!raw) {
      setDisplay('');
      onChange(0);
      return;
    }
    const numeric = parseInt(raw, 10) / 100;
    setDisplay(formatDisplay(numeric));
    onChange(numeric);
  }

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputWrapper}>
        <span className={styles.prefix}>R$</span>
        <input
          type="text"
          inputMode="numeric"
          className={styles.input}
          value={display}
          onChange={handleChange}
          placeholder={placeholder}
        />
      </div>
      {hint && <p className={styles.hint}>{hint}</p>}
    </div>
  );
}
