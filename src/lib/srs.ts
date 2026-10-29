import type { SRSItem, SRSStatus } from '@/types';

/**
 * SuperMemo-2 (SM-2) Spaced Repetition Algorithm Implementation
 * Quality Ratings:
 * 1 = Hard / Failed to recall (Reset interval to 1 day)
 * 3 = Good / Recalled with effort (Progress interval)
 * 5 = Easy / Recalled instantly (Bonus ease factor & interval)
 */

export interface SRSReviewResult {
  interval: number;
  repetition: number;
  easeFactor: number;
  dueDate: string;
  lastReviewed: string;
  status: SRSStatus;
}

export const SRS_CONFIG = {
  MIN_EASE_FACTOR: 1.3,
  DEFAULT_EASE_FACTOR: 2.5,
  MASTERED_REPETITIONS: 4,
  MASTERED_INTERVAL_DAYS: 21,
};

export function calculateSRS(
  current: Pick<SRSItem, 'interval' | 'repetition' | 'easeFactor'>,
  quality: 1 | 3 | 5,
  currentDate: Date = new Date()
): SRSReviewResult {
  const currentRepetition = current.repetition || 0;
  let easeFactor = current.easeFactor || SRS_CONFIG.DEFAULT_EASE_FACTOR;
  let interval: number;
  let repetition: number;

  if (quality < 3) {
    // Forgot or failed recall: reset repetition to 0, review again tomorrow
    repetition = 0;
    interval = 1;
    // Lower ease factor slightly when failed
    easeFactor = Math.max(SRS_CONFIG.MIN_EASE_FACTOR, easeFactor - 0.2);
  } else {
    // Successfully recalled
    if (currentRepetition === 0) {
      interval = 1;
    } else if (currentRepetition === 1) {
      interval = quality === 5 ? 6 : 4;
    } else {
      interval = Math.round(current.interval * easeFactor);
      if (quality === 5) {
        interval = Math.round(interval * 1.3); // Bonus for easy recall
      }
    }
    repetition = currentRepetition + 1;

    // SM-2 Ease Factor calculation formula
    // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
    const qDiff = 5 - quality;
    const efDelta = 0.1 - qDiff * (0.08 + qDiff * 0.02);
    easeFactor = Math.max(SRS_CONFIG.MIN_EASE_FACTOR, +(easeFactor + efDelta).toFixed(2));
  }

  // Calculate new due date
  const nextDueDate = new Date(currentDate);
  nextDueDate.setDate(nextDueDate.getDate() + interval);

  // Determine mastery status
  let status: SRSStatus = 'learning';
  if (repetition >= SRS_CONFIG.MASTERED_REPETITIONS && interval >= SRS_CONFIG.MASTERED_INTERVAL_DAYS) {
    status = 'mastered';
  } else if (repetition === 0) {
    status = 'learning';
  }

  return {
    interval,
    repetition,
    easeFactor,
    dueDate: nextDueDate.toISOString(),
    lastReviewed: currentDate.toISOString(),
    status,
  };
}

export function isItemDue(dueDateIso: string, referenceDate: Date = new Date()): boolean {
  const due = new Date(dueDateIso);
  // Set reference to end of day to include all items due today
  return due.getTime() <= referenceDate.getTime();
}

export function createInitialSRSItem(vocabId: string): SRSItem {
  const now = new Date();
  return {
    id: `srs_${vocabId}`,
    vocabId,
    interval: 0,
    repetition: 0,
    easeFactor: SRS_CONFIG.DEFAULT_EASE_FACTOR,
    dueDate: now.toISOString(),
    lastReviewed: now.toISOString(),
    status: 'new',
  };
}
