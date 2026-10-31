import { getVocabList, getExpressions, getMistakes, getSRSList, getPracticeSessions } from './storage';

export interface ExportDataPayload {
  version: string;
  exportedAt: string;
  summary: {
    totalCustomVocab: number;
    totalCustomExpressions: number;
    totalSRSItems: number;
    totalMistakes: number;
  };
  customVocabulary: ReturnType<typeof getVocabList>;
  customExpressions: ReturnType<typeof getExpressions>;
  srsProgress: ReturnType<typeof getSRSList>;
  mistakes: ReturnType<typeof getMistakes>;
  practiceSessions: ReturnType<typeof getPracticeSessions>;
}

export function exportAllDataAsJSON(): void {
  if (typeof window === 'undefined') return;

  const vocabs = getVocabList().filter((v) => v.isCustom);
  const expressions = getExpressions().filter((e) => e.isCustom);
  const srs = getSRSList();
  const mistakes = getMistakes();
  const sessions = getPracticeSessions();

  const payload: ExportDataPayload = {
    version: '1.0.0',
    exportedAt: new Date().toISOString(),
    summary: {
      totalCustomVocab: vocabs.length,
      totalCustomExpressions: expressions.length,
      totalSRSItems: srs.length,
      totalMistakes: mistakes.length,
    },
    customVocabulary: vocabs,
    customExpressions: expressions,
    srsProgress: srs,
    mistakes,
    practiceSessions: sessions,
  };

  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(payload, null, 2)
  )}`;
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', jsonString);
  downloadAnchor.setAttribute('download', `TGAT1_Quest_Backup_${Date.now()}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function exportVocabAsCSV(): void {
  if (typeof window === 'undefined') return;

  const vocabs = getVocabList();
  if (vocabs.length === 0) return;

  // UTF-8 BOM so Excel opens Thai correctly without mojibake
  let csvContent = '\uFEFF';
  csvContent += 'Word,Part of Speech,Phonetic,Thai Meaning,Example EN,Example TH,Category,Difficulty,Exam Reference\n';

  vocabs.forEach((v) => {
    const clean = (text?: string) => `"${(text || '').replace(/"/g, '""')}"`;
    csvContent += [
      clean(v.word),
      clean(v.partOfSpeech),
      clean(v.phonetic),
      clean(v.meaningTh),
      clean(v.exampleEn),
      clean(v.exampleTh),
      clean(v.category),
      clean(v.difficulty),
      clean(v.examReference),
    ].join(',') + '\n';
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `TGAT1_Vocab_List_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
}
