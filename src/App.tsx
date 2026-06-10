import './styles/global.css';
import './styles/animations.css';
import { useEffect, useRef } from 'react';
import { useCalculator } from './hooks/useCalculator';
import { ProgressBar } from './components/ProgressBar/ProgressBar';
import { Disclaimer } from './components/Disclaimer/Disclaimer';
import { Step1BasicData } from './components/FormSteps/Step1BasicData';
import { Step2FatherParticipation } from './components/FormSteps/Step2FatherParticipation';
import { Step3CareAndHealth } from './components/FormSteps/Step3CareAndHealth';
import { Step4Expenses } from './components/FormSteps/Step4Expenses';
import { StepOptional } from './components/FormSteps/StepOptional';
import { ResultCard } from './components/ResultCard/ResultCard';
import styles from './App.module.css';

export function App() {
  const { step, formData, result, updateField, goNext, goBack, reset, isStepValid } = useCalculator();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [step]);

  return (
    <div className={styles.app}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a href="https://fernandacorreaadvogada.com.br" target="_blank" rel="noopener noreferrer" className={styles.logoLink}>
            <img
              src="/logo.png"
              alt="Fernanda Corrêa Advogada"
              className={styles.logoImg}
            />
          </a>
        </div>
      </header>

      {/* Hero */}
      {step !== 'result' && (
        <section className={styles.hero}>
          <div className={styles.container}>
            <h1 className={styles.heroTitle}>
              Calculadora Educativa de<br />
              <em>Pensão Alimentícia</em>
            </h1>
            <p className={styles.heroSubtitle}>
              Essa calculadora te ajuda a ter uma noção, de forma simples e rápida, de quanto costuma
              ser fixado como pensão alimentícia. Ela não substitui um processo judicial ou acordo,
              mas te dá um ponto de partida para organizar sua vida e proteger seu filho.
            </p>
          </div>
        </section>
      )}

      {/* Main content */}
      <main className={styles.main}>
        <div className={styles.container}>

          {step !== 'result' && (
            <>
              <Disclaimer />
              <ProgressBar currentStep={typeof step === 'number' ? step : 5} />
            </>
          )}

          <div className={styles.card} ref={cardRef}>
            {step === 1 && (
              <Step1BasicData
                formData={formData}
                updateField={updateField}
                onNext={goNext}
                isValid={isStepValid(1)}
              />
            )}
            {step === 2 && (
              <Step2FatherParticipation
                formData={formData}
                updateField={updateField}
                onNext={goNext}
                onBack={goBack}
                isValid={isStepValid(2)}
              />
            )}
            {step === 3 && (
              <Step3CareAndHealth
                formData={formData}
                updateField={updateField}
                onNext={goNext}
                onBack={goBack}
                isValid={isStepValid(3)}
              />
            )}
            {step === 4 && (
              <Step4Expenses
                formData={formData}
                updateField={updateField}
                onNext={goNext}
                onBack={goBack}
              />
            )}
            {step === 5 && (
              <StepOptional
                formData={formData}
                updateField={updateField}
                onNext={goNext}
                onBack={goBack}
              />
            )}
            {step === 'result' && result && (
              <ResultCard
                result={result}
                formData={formData}
                onReset={reset}
              />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <img src="/logo.png" alt="Fernanda Corrêa Advogada" className={styles.footerLogo} />
          <p className={styles.footerText}>
            © {new Date().getFullYear()} Dra. Fernanda Corrêa — Advogada especialista em Direito de Família
          </p>
          <p className={styles.footerSub}>
            Ferramenta educativa. Nenhum dado é armazenado.
          </p>
        </div>
      </footer>
    </div>
  );
}
