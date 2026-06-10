import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';
import type { PensionResult } from '../utils/calculatePension';
import type { FormData } from '../hooks/useCalculator';
import { formatCurrency } from '../utils/formatCurrency';
import { formatPercent } from '../utils/formatPercent';
import {
  SITE_CONFIG,
  CHILDREN_OPTIONS,
  PARTICIPATION_OPTIONS,
  CARE_HOURS_OPTIONS,
  CONSULTATIONS_OPTIONS,
  SPECIAL_NEEDS_OPTIONS,
} from '../data/content';


const PRIMARY   = '#600909';
const ACCENT    = '#E3BC9A';
const BG_LIGHT  = '#FAF7F4';
const MUTED     = '#7B5B5B';
const BORDER    = '#DDD0C4';
const TEXT      = '#1A0505';
const WHITE     = '#FFFFFF';
const SUCCESS   = '#4A7C59';
const WARNING_BG = '#FFFBF0';

const s = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: TEXT,
    backgroundColor: WHITE,
    paddingHorizontal: 48,
    paddingTop: 40,
    paddingBottom: 110,
  },

  // Header
  header: {
    backgroundColor: PRIMARY,
    marginHorizontal: -48,
    marginTop: -40,
    paddingHorizontal: 48,
    paddingVertical: 28,
    marginBottom: 24,
  },
  headerTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 20,
    color: WHITE,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 10,
    color: ACCENT,
    marginBottom: 8,
  },
  headerDate: {
    fontSize: 9,
    color: WHITE,
    opacity: 0.65,
  },
  footerLogo: {
    height: 32,
    marginBottom: 6,
  },

  // Section
  sectionTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 12,
    color: PRIMARY,
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 1.5,
    borderBottomColor: ACCENT,
    borderBottomStyle: 'solid',
  },

  section: {
    marginBottom: 20,
  },

  bodyText: {
    fontSize: 9.5,
    color: MUTED,
    lineHeight: 1.6,
  },

  // Executive Summary
  summaryBox: {
    backgroundColor: BG_LIGHT,
    borderRadius: 6,
    padding: 12,
    marginBottom: 4,
    borderLeftWidth: 3,
    borderLeftColor: PRIMARY,
    borderLeftStyle: 'solid',
  },

  // Data table
  table: {
    borderWidth: 1,
    borderColor: BORDER,
    borderStyle: 'solid',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    borderBottomStyle: 'solid',
  },
  tableRowLast: {
    flexDirection: 'row',
  },
  tableRowHeader: {
    flexDirection: 'row',
    backgroundColor: PRIMARY,
  },
  tableCell: {
    flex: 1,
    padding: 7,
    fontSize: 9,
    color: TEXT,
  },
  tableCellHeader: {
    flex: 1,
    padding: 7,
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: WHITE,
  },
  tableCellRight: {
    flex: 1,
    padding: 7,
    fontSize: 9,
    color: TEXT,
    textAlign: 'right',
  },
  tableRowAlt: {
    flexDirection: 'row',
    backgroundColor: BG_LIGHT,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    borderBottomStyle: 'solid',
  },

  // Result box
  resultBox: {
    backgroundColor: PRIMARY,
    borderRadius: 8,
    padding: 20,
    marginBottom: 4,
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: 9,
    color: ACCENT,
    letterSpacing: 1,
    marginBottom: 6,
  },
  resultValue: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 22,
    color: WHITE,
    marginBottom: 4,
  },
  resultSub: {
    fontSize: 9,
    color: WHITE,
    marginBottom: 2,
    opacity: 0.8,
  },

  // Disclaimer
  disclaimerBox: {
    backgroundColor: WARNING_BG,
    borderRadius: 6,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#C9A070',
    borderLeftStyle: 'solid',
    marginBottom: 4,
  },
  disclaimerTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9,
    color: PRIMARY,
    marginBottom: 5,
  },
  disclaimerItem: {
    fontSize: 9,
    color: MUTED,
    marginBottom: 3,
    lineHeight: 1.5,
  },

  // Footer
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: BG_LIGHT,
    borderTopWidth: 1.5,
    borderTopColor: ACCENT,
    borderTopStyle: 'solid',
    paddingHorizontal: 48,
    paddingVertical: 14,
    alignItems: 'center',
  },
  footerName: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9,
    color: PRIMARY,
    marginBottom: 3,
  },
  footerContact: {
    fontSize: 8,
    color: MUTED,
    marginBottom: 2,
    textAlign: 'center',
  },
  footerDisclaimer: {
    fontSize: 7.5,
    color: MUTED,
    marginTop: 6,
    fontFamily: 'Helvetica-Oblique',
    textAlign: 'center',
  },

  // Breakdown
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    borderBottomStyle: 'solid',
  },
  breakdownRowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: PRIMARY,
  },
  breakdownLabel: { fontSize: 9, color: TEXT },
  breakdownValue: { fontFamily: 'Helvetica-Bold', fontSize: 9, color: TEXT },
  breakdownLabelTotal: { fontFamily: 'Helvetica-Bold', fontSize: 9, color: WHITE },
  breakdownValueTotal: { fontFamily: 'Helvetica-Bold', fontSize: 9, color: WHITE },
  breakdownValueGreen: { fontFamily: 'Helvetica-Bold', fontSize: 9, color: SUCCESS },
  breakdownValueRed: { fontFamily: 'Helvetica-Bold', fontSize: 9, color: PRIMARY },
});

function getLabel(options: readonly { value: string | number; label: string }[], val: string | number): string {
  return options.find(o => String(o.value) === String(val))?.label ?? String(val);
}

interface Props {
  result: PensionResult;
  formData: FormData;
}

export function PensionReport({ result, formData }: Props) {
  const now = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric',
  });

  const totalExpenses = formData.expenses.reduce((sum, e) => sum + (e.value ?? 0), 0);

  return (
    <Document
      title="Relatório de Estimativa de Pensão Alimentícia"
      author={SITE_CONFIG.lawyerName}
      subject="Estimativa educativa de pensão alimentícia"
    >
      <Page size="A4" style={s.page}>
        {/* Header */}
        <View style={s.header}>
          <Text style={s.headerTitle}>Relatório de Estimativa de Pensão Alimentícia</Text>
          <Text style={s.headerSubtitle}>Gerado pela {SITE_CONFIG.toolName}</Text>
          <Text style={s.headerDate}>Data da simulação: {now}</Text>
          {formData.responsibleName && (
            <Text style={[s.headerDate, { marginTop: 2 }]}>
              Elaborado para: {formData.responsibleName}
            </Text>
          )}
        </View>

        {/* Sumário Executivo */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Sumário Executivo</Text>
          <View style={s.summaryBox}>
            <Text style={s.bodyText}>
              Este relatório apresenta uma estimativa educativa do valor mensal de pensão alimentícia
              com base nas informações fornecidas pela usuária. Trata-se de uma ferramenta educativa
              e não substitui análise jurídica individualizada. O valor judicialmente fixado pode variar
              conforme as circunstâncias específicas do caso, provas apresentadas e entendimento do magistrado.
            </Text>
          </View>
        </View>

        {/* Dados Informados */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Dados Informados</Text>
          <View style={s.table}>
            <View style={s.tableRowHeader}>
              <Text style={s.tableCellHeader}>Campo</Text>
              <Text style={[s.tableCellHeader, { textAlign: 'right' }]}>Valor</Text>
            </View>
            {[
              ['Renda declarada do pai', formatCurrency(result.incomeUsed)],
              ['Número de filhos', getLabel(CHILDREN_OPTIONS, formData.children)],
              ['Participação do pai nas despesas', getLabel(PARTICIPATION_OPTIONS, formData.fatherParticipation)],
              ['Finais de semana não cumpridos/mês', getLabel([
                { value: '0_1', label: '0 a 1' }, { value: '2', label: '2' },
                { value: '3', label: '3' }, { value: '4', label: '4 (todos)' }
              ], formData.weekendsNotTaken)],
              ['Horas semanais de cuidado exclusivo', getLabel(CARE_HOURS_OPTIONS, formData.careHours)],
              ['Consultas médicas/terapias por mês', getLabel(CONSULTATIONS_OPTIONS, formData.consultations)],
              ['Necessidade especial', getLabel(SPECIAL_NEEDS_OPTIONS, formData.specialNeeds)],
              ['Uso de medicação contínua', formData.hasMedication ? `Sim (${formatCurrency(formData.medicationCost ?? 0)}/mês)` : 'Não'],
              ...(totalExpenses > 0 ? [['Total de despesas informadas', formatCurrency(totalExpenses)]] : []),
            ].map(([label, value], i) => (
              <View key={i} style={i % 2 === 0 ? s.tableRow : s.tableRowAlt}>
                <Text style={s.tableCell}>{label}</Text>
                <Text style={s.tableCellRight}>{value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Metodologia */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Metodologia e Cálculo</Text>
          <View style={s.table}>
            <View style={s.breakdownRow}>
              <Text style={s.breakdownLabel}>Percentual-base (nº de filhos)</Text>
              <Text style={s.breakdownValue}>+{formatPercent(result.basePercent)}</Text>
            </View>
            {result.careAdjust > 0 && (
              <View style={s.breakdownRow}>
                <Text style={s.breakdownLabel}>Ajuste por horas de cuidado exclusivo</Text>
                <Text style={s.breakdownValueGreen}>+{formatPercent(result.careAdjust)}</Text>
              </View>
            )}
            {result.weekendAdjust > 0 && (
              <View style={s.breakdownRow}>
                <Text style={s.breakdownLabel}>Ajuste por finais de semana não cumpridos</Text>
                <Text style={s.breakdownValueGreen}>+{formatPercent(result.weekendAdjust)}</Text>
              </View>
            )}
            {result.consultationAdjust > 0 && (
              <View style={s.breakdownRow}>
                <Text style={s.breakdownLabel}>Ajuste por consultas/terapias</Text>
                <Text style={s.breakdownValueGreen}>+{formatPercent(result.consultationAdjust)}</Text>
              </View>
            )}
            {result.specialNeedsAdjust > 0 && (
              <View style={s.breakdownRow}>
                <Text style={s.breakdownLabel}>Ajuste por necessidade especial</Text>
                <Text style={s.breakdownValueGreen}>+{formatPercent(result.specialNeedsAdjust)}</Text>
              </View>
            )}
            {result.medicationAdjust > 0 && (
              <View style={s.breakdownRow}>
                <Text style={s.breakdownLabel}>Ajuste por medicação contínua</Text>
                <Text style={s.breakdownValueGreen}>+{formatPercent(result.medicationAdjust)}</Text>
              </View>
            )}
            {result.participationReduction > 0 && (
              <View style={s.breakdownRow}>
                <Text style={s.breakdownLabel}>Redução — participação do pai</Text>
                <Text style={s.breakdownValueRed}>-{formatPercent(result.participationReduction)}</Text>
              </View>
            )}
            <View style={s.breakdownRowTotal}>
              <Text style={s.breakdownLabelTotal}>Percentual final estimado</Text>
              <Text style={s.breakdownValueTotal}>{formatPercent(result.finalPercent)}</Text>
            </View>
          </View>
        </View>

        {/* Resultado */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Resultado Estimado</Text>
          <View style={s.resultBox}>
            <Text style={s.resultLabel}>Estimativa mensal de pensão alimentícia</Text>
            <Text style={s.resultValue}>
              {formatCurrency(result.estimatedMin)} a {formatCurrency(result.estimatedMax)}
            </Text>
            <Text style={s.resultSub}>
              Percentual aplicado: {formatPercent(result.finalPercent)} sobre {formatCurrency(result.incomeUsed)}
            </Text>
            <Text style={s.resultSub}>
              Impacto anual estimado: {formatCurrency(result.annualMin)} a {formatCurrency(result.annualMax)}
            </Text>
          </View>
          {formData.observations && (
            <View style={[s.summaryBox, { marginTop: 8 }]}>
              <Text style={[s.bodyText, { fontFamily: 'Helvetica-Bold', marginBottom: 3 }]}>Observações:</Text>
              <Text style={s.bodyText}>{formData.observations}</Text>
            </View>
          )}
        </View>

        {/* Observações Jurídicas */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Observações Jurídicas</Text>
          <View style={s.disclaimerBox}>
            <Text style={s.disclaimerTitle}>Aviso importante — caráter exclusivamente educativo</Text>
            <Text style={s.disclaimerItem}>
              • Este documento é uma estimativa educativa. O valor judicialmente fixado pode variar
              conforme prova documental, capacidade contributiva comprovada do alimentante e entendimento do juiz.
            </Text>
            <Text style={s.disclaimerItem}>
              • A Justiça analisa cada caso individualmente, considerando as necessidades reais da criança,
              a capacidade financeira de quem paga e a realidade específica da família.
            </Text>
            <Text style={s.disclaimerItem}>
              • Recomendamos a consulta com advogada especializada para elaboração de petição ou acordo,
              utilizando este relatório como material de apoio.
            </Text>
            <Text style={s.disclaimerItem}>
              • Esta ferramenta não exerce a advocacia e não substitui orientação jurídica profissional.
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={s.footer} fixed>
          <Image src="/logo.png" style={s.footerLogo} />
          <Text style={s.footerName}>{SITE_CONFIG.lawyerName}</Text>
          <Text style={s.footerContact}>{SITE_CONFIG.website}</Text>
          <Text style={s.footerContact}>(48) 99910-2385  |  {SITE_CONFIG.email}</Text>
          <Text style={s.footerDisclaimer}>
            Ferramenta educativa. Consulte uma advogada.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
