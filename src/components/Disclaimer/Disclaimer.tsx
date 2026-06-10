import styles from './Disclaimer.module.css';

export function Disclaimer() {
  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>
        🔒 Esta ferramenta é 100% educativa. Nenhum dado é armazenado ou enviado.
        O resultado não é um valor jurídico — é uma estimativa de apoio.
      </p>
    </div>
  );
}
