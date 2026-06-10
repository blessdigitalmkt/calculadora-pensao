import { PDFDownloadLink } from '@react-pdf/renderer';
import { Button } from '../common/Button';
import { BreakdownTable } from './BreakdownTable';
import { WhatsAppButton } from '../WhatsAppButton/WhatsAppButton';
import { PensionReport } from '../../pdf/PensionReport';
import { LEGAL_DISCLAIMER, SITE_CONFIG } from '../../data/content';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatPercent } from '../../utils/formatPercent';
import type { PensionResult } from '../../utils/calculatePension';
import type { FormData } from '../../hooks/useCalculator';
import styles from './ResultCard.module.css';

interface Props {
  result: PensionResult;
  formData: FormData;
  onReset: () => void;
}

export function ResultCard({ result, formData, onReset }: Props) {
  const docProps = { result, formData };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.badge}>Estimativa educativa</div>
        <h2 className={styles.title}>Resultado da sua simulação</h2>
        {formData.responsibleName && (
          <p className={styles.greeting}>
            Olá, {formData.responsibleName}. Veja o que encontramos.
          </p>
        )}
      </div>

      {/* Valor principal */}
      <div className={styles.valueCard}>
        <p className={styles.valueLabel}>Estimativa mensal de pensão alimentícia</p>
        <div className={styles.valueRange}>
          <span className={styles.valueMain}>
            {formatCurrency(result.estimatedMin)}
          </span>
          <span className={styles.valueSep}>a</span>
          <span className={styles.valueMain}>
            {formatCurrency(result.estimatedMax)}
          </span>
        </div>
        <p className={styles.percentInfo}>
          Percentual estimado: <strong>{formatPercent(result.finalPercent)}</strong> da renda considerada
        </p>
        <p className={styles.annualInfo}>
          Impacto anual estimado:{' '}
          <strong>{formatCurrency(result.annualMin)} a {formatCurrency(result.annualMax)}</strong>
        </p>
      </div>

      {/* Breakdown */}
      <BreakdownTable result={result} />

      {/* Aviso jurídico */}
      <div className={styles.disclaimer}>
        <div className={styles.disclaimerIcon}>⚖️</div>
        <div>
          <p className={styles.disclaimerTitle}>Aviso importante</p>
          <p className={styles.disclaimerText}>{LEGAL_DISCLAIMER}</p>
        </div>
      </div>

      {/* CTA */}
      <div className={styles.cta}>
        <p className={styles.ctaText}>
          <strong>{SITE_CONFIG.lawyerName}</strong>, preciso te orientar neste caso.
        </p>
        <p className={styles.ctaSubtext}>
          Se você deseja entender melhor a sua situação específica, entre em contato agora.
        </p>

        <div className={styles.ctaButtons}>
          <WhatsAppButton result={result} formData={formData} />

          <PDFDownloadLink
            document={<PensionReport {...docProps} />}
            fileName="estimativa-pensao-alimenticia.pdf"
            className={styles.pdfLink}
          >
            {({ loading }) => (
              <Button variant="secondary" size="lg" fullWidth icon={<span>📄</span>}>
                {loading ? 'Gerando PDF...' : 'Baixar relatório PDF'}
              </Button>
            )}
          </PDFDownloadLink>
        </div>
      </div>

      <div className={styles.resetWrapper}>
        <button className={styles.resetBtn} onClick={onReset}>
          Fazer uma nova simulação
        </button>
      </div>
    </div>
  );
}
