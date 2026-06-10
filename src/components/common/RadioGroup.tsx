import styles from './RadioGroup.module.css';

interface Option {
  value: string | number;
  label: string;
}

interface RadioGroupProps {
  name: string;
  options: readonly Option[];
  value: string | number;
  onChange: (value: string) => void;
  columns?: 1 | 2;
}

export function RadioGroup({ name, options, value, onChange, columns = 1 }: RadioGroupProps) {
  return (
    <div
      className={styles.group}
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {options.map(opt => {
        const id = `${name}_${opt.value}`;
        const checked = String(opt.value) === String(value);
        return (
          <label
            key={opt.value}
            htmlFor={id}
            className={[styles.option, checked ? styles.selected : ''].join(' ')}
          >
            <input
              type="radio"
              id={id}
              name={name}
              value={String(opt.value)}
              checked={checked}
              onChange={e => onChange(e.target.value)}
              className={styles.input}
            />
            <span className={styles.indicator} />
            <span className={styles.label}>{opt.label}</span>
          </label>
        );
      })}
    </div>
  );
}
