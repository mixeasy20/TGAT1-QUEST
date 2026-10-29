import { calculateSRS, SRS_CONFIG, isItemDue, SRSReviewResult } from '../src/lib/srs';
import { computeLevelProgress, getXpRequiredForLevel } from '../src/lib/gamification';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    process.exit(1);
  } else {
    console.log(`✅ PASSED: ${message}`);
  }
}

console.log('--- Testing SRS SM-2 Algorithm ---');

// Test 1: New card answered with rating 1 (Hard/Forgot)
const newCard = { interval: 0, repetition: 0, easeFactor: 2.5 };
const resHard = calculateSRS(newCard, 1);
assert(resHard.repetition === 0, 'Repetition should reset to 0 on rating 1');
assert(resHard.interval === 1, 'Interval should be 1 day on rating 1');
assert(resHard.status === 'learning', 'Status should be learning on rating 1');

// Test 2: Card answered with rating 3 (Good)
const resGood1 = calculateSRS(newCard, 3);
assert(resGood1.repetition === 1, 'Repetition should increase to 1 on rating 3');
assert(resGood1.interval === 1, 'First successful interval should be 1');

// Test 3: Second consecutive rating 3
const resGood2 = calculateSRS(resGood1, 3);
assert(resGood2.repetition === 2, 'Repetition should be 2 on second success');
assert(resGood2.interval === 4, 'Second interval should be 4 days');

// Test 4: Consecutive easy recalls reach mastered
let card: SRSReviewResult = calculateSRS(newCard, 5);
for (let i = 0; i < 4; i++) {
  card = calculateSRS(card, 5);
}
assert(card.repetition >= 4, 'Repetition should be at least 4 after 5 easy reviews');
assert(card.interval >= 21, 'Interval should exceed 21 days');
assert(card.status === 'mastered', 'Card should achieve mastered status');

// Test 5: isItemDue check
const pastDate = new Date();
pastDate.setDate(pastDate.getDate() - 1);
assert(isItemDue(pastDate.toISOString()) === true, 'Past date must be due');

const futureDate = new Date();
futureDate.setDate(futureDate.getDate() + 5);
assert(isItemDue(futureDate.toISOString()) === false, 'Future date must not be due');

console.log('--- Testing Gamification Progression ---');

// Level 1: 0 XP
const lvl0 = computeLevelProgress(0);
assert(lvl0.currentLevel === 1, '0 XP should be Level 1');
assert(lvl0.progressPercent === 0, '0 XP should be 0% progress');

// Level 1: 50 XP (Halfway to 100)
const lvl50 = computeLevelProgress(50);
assert(lvl50.currentLevel === 1, '50 XP should still be Level 1');
assert(lvl50.progressPercent === 50, '50 XP should be 50% progress toward next level');

// Level progression above 100 XP
const lvl150 = computeLevelProgress(150);
assert(lvl150.currentLevel === 2, '150 XP should advance to Level 2');

console.log('🎉 ALL CORE ALGORITHM TESTS PASSED SUCCESSFULLY!');

