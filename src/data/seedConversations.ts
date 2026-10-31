import { ConversationItem } from '@/types';

export const SEED_CONVERSATIONS: ConversationItem[] = [
  // ---------------- Short Conversations ----------------
  {
    id: 'conv_short_1',
    type: 'short',
    title: 'Short 1: Rescheduling an Academic Advisory Meeting',
    situation: 'At the Faculty Office, a student approaches an academic advisor due to an unavoidable clash.',
    difficulty: 'B1',
    source: 'Practice Bank',
    examReference: 'TGAT1 Blueprint พาร์ท Situational Dialogue (Academic Advisory) • CEFR B1',
    keyVocab: [
      {
            word: "laboratory",
            meaningTh: "ห้องปฏิบัติการ / การทดลองวิทยาศาสตร์",
            pos: "noun",
            cefrLevel: "B1",
            examRef: "TGAT1 / O-NET"
      },
      {
            word: "reschedule",
            meaningTh: "เปลี่ยนวันเวลานัดหมายใหม่",
            pos: "verb",
            cefrLevel: "B1",
            examRef: "TGAT1 Business & Campus"
      },
      {
            word: "flexibility",
            meaningTh: "ความยืดหยุ่น / การปรับเปลี่ยนได้ตามสถานการณ์",
            pos: "noun",
            cefrLevel: "B2",
            examRef: "CU-TEP / TGAT1"
      }
],
    dialogue: [
      {
        speaker: 'Student (Manee)',
        text: 'Excuse me, Professor Evans. I am really sorry, but I have a laboratory exam tomorrow during our scheduled appointment.',
        translationTh: 'ขอประทานโทษครับอาจารย์อีแวนส์ ผมต้องขอโทษจริงๆ ครับ พอดีวันพรุ่งนี้มีสอบแล็บตรงกับเวลานัดที่เรานัดกันไว้',
      },
      {
        speaker: 'Professor Evans',
        text: 'I see. Laboratory exams cannot be rescheduled. Would Thursday at 2:00 PM work for you instead?',
        translationTh: 'เข้าใจแล้วล่ะ การสอบแล็บเลื่อนไม่ได้อยู่แล้ว วันพฤหัสบดีตอนบ่ายสองโมงสะดวกไหมแทนล่ะ?',
      },
      {
        speaker: 'Student (Manee)',
        text: '[ _______________ ]',
        translationTh: '[ ...คำตอบของนักศึกษา... ]',
      },
    ],
    questions: [
      {
        id: 'q_sc1_1',
        question: 'Which of the following is the most appropriate response for Manee to accept the proposed reschedule?',
        options: {
          A: 'That suits me perfectly. Thank you for your flexibility, Professor.',
          B: 'You should have informed me earlier about Thursday.',
          C: 'I am reluctant to study during that time.',
          D: 'Never mind, I will just skip my laboratory test.',
        },
        correctOption: 'A',
        explanation: 'ตัวเลือก A สุภาพ ถูกกาลเทศะ และแสดงความขอบคุณต่ออาจารย์ที่ยืดหยุ่นเวลาให้ ("That suits me perfectly. Thank you for your flexibility...")',
        optionExplanations: {
          A: 'ถูกต้อง: สุภาพ สื่อความยินดี และขอบคุณที่อาจารย์ช่วยอำนวยความสะดวก',
          B: 'ผิด: ใช้น้ำเสียงตำหนิอาจารย์ (You should have...) ซึ่งไม่สุภาพและไม่เหมาะสมอย่างยิ่ง',
          C: 'ผิด: ความหมายไม่เข้ากับบริบทการนัดหมาย (reluctant แปลว่า ไม่เต็มใจ)',
          D: 'ผิด: ไม่สมเหตุสมผล เพราะอาจารย์ระบุแล้วว่าสอบแล็บเลื่อนไม่ได้ และการโดดสอบไม่ใช่ทางออก',
        },
        skillCategory: 'Appropriate Response',
      },
    ],
  },
  {
    id: 'conv_short_2',
    type: 'short',
    title: 'Short 2: Inquiring About a Cafeteria Order',
    situation: 'In a campus coffee shop, a customer checks about a delayed takeout order.',
    difficulty: 'A2',
    source: 'Practice Bank',
    examReference: 'TGAT1 Blueprint พาร์ท Customer Service & Daily Life • CEFR A2',
    keyVocab: [
      {
            word: "expedite",
            meaningTh: "เร่งกระบวนการให้เร็วขึ้น",
            pos: "verb",
            cefrLevel: "B2",
            examRef: "TGAT1 / IELTS 6.0"
      },
      {
            word: "apologize",
            meaningTh: "กล่าวขออภัย / แสดงความเสียใจต่อข้อผิดพลาด",
            pos: "verb",
            cefrLevel: "A2",
            examRef: "TGAT1 Standard"
      },
      {
            word: "inquire",
            meaningTh: "สอบถามข้อมูล / ตรวจสอบ",
            pos: "verb",
            cefrLevel: "B1",
            examRef: "TGAT1 Travel"
      }
],
    dialogue: [
      {
        speaker: 'Customer',
        text: 'Pardon me, but I placed an order for an iced matcha latte about twenty minutes ago. Could you please check on it?',
        translationTh: 'ขอโทษนะคะ พอดีสั่งมัทฉะลาเต้เย็นไปประมาณ 20 นาทีแล้ว รบกวนช่วยตรวจสอบให้หน่อยได้ไหมคะ?',
      },
      {
        speaker: 'Barista',
        text: '[ _______________ ]',
        translationTh: '[ ...คำตอบของบาริสต้า... ]',
      },
    ],
    questions: [
      {
        id: 'q_sc2_1',
        question: 'How should the barista politely address the situation and assure the customer?',
        options: {
          A: 'You are being very impatient today.',
          B: 'I sincerely apologize for the delay. Let me expedite that for you right now.',
          C: 'It is none of our business if the drinks take long.',
          D: 'You forgot to pay, so we canceled it.',
        },
        correctOption: 'B',
        explanation: 'ตัวเลือก B เป็นคำตอบบริการลูกค้าที่สุภาพที่สุด มีการกล่าวขอโทษอย่างจริงใจ ("I sincerely apologize for the delay") และเสนอทางออกด้วยการเร่งทำให้ทันที ("Let me expedite that...")',
        optionExplanations: {
          A: 'ผิด: หยาบคายและกล่าวหาลูกค้าว่าใจร้อน',
          B: 'ถูกต้อง: แสดงความขอโทษและเสนอความช่วยเหลือทันทีตามมารยาทงานบริการ',
          C: 'ผิด: หยาบคาย ปัดความรับผิดชอบ',
          D: 'ผิด: ไม่สอดคล้องกับบริบท และเป็นการกล่าวหาลูกค้าโดยไม่มีหลักฐาน',
        },
        skillCategory: 'Appropriate Response',
      },
    ],
  },
  {
    id: 'conv_short_3',
    type: 'short',
    title: 'Short 3: Expressing Sympathy and Offering Assistance',
    situation: 'Two classmates meet at the campus library stairwell.',
    difficulty: 'B1',
    source: 'Practice Bank',
    examReference: 'TGAT1 Blueprint พาร์ท Peer Support & Intention • CEFR B1',
    keyVocab: [
      {
            word: "sympathy",
            meaningTh: "ความเห็นอกเห็นใจ",
            pos: "noun",
            cefrLevel: "B1",
            examRef: "TGAT1 Emotions"
      },
      {
            word: "external",
            meaningTh: "ภายนอก / ที่ต่อพ่วงจากภายนอก",
            pos: "adjective",
            cefrLevel: "B1",
            examRef: "TGAT1 Tech"
      },
      {
            word: "extract",
            meaningTh: "ดึงข้อมูล / สกัดข้อมูลออกมา",
            pos: "verb",
            cefrLevel: "B2",
            examRef: "CU-TEP / TGAT1"
      }
],
    dialogue: [
      {
        speaker: 'Ploy',
        text: 'I just found out that my laptop screen cracked, and my final history draft is saved only on that hard drive!',
        translationTh: 'ฉันเพิ่งรู้ว่าหน้าจอแล็ปท็อปแตก แล้วไฟล์รายงานประวัติศาสตร์ฉบับสุดท้ายก็เซฟไว้แค่ในเครื่องนั้นเครื่องเดียว!',
      },
      {
        speaker: 'Ken',
        text: '[ _______________ ]',
        translationTh: '[ ...คำตอบของเคน... ]',
      },
    ],
    questions: [
      {
        id: 'q_sc3_1',
        question: 'What is the most supportive and constructive response Ken can give?',
        options: {
          A: 'Oh no, that sounds awful! If you need, I have an external monitor we can connect to extract your file.',
          B: 'Well, that serves you right for not saving to the cloud.',
          C: 'Congratulations! You finally do not have to submit the paper.',
          D: 'I really do not care about your history course.',
        },
        correctOption: 'A',
        explanation: 'ตัวเลือก A แสดงความเห็นอกเห็นใจ ("Oh no, that sounds awful!") พร้อมทั้งเสนอแนวทางแก้ปัญหาอย่างสร้างสรรค์ โดยให้ยืมจอมอนิเตอร์เพื่อต่อดึงข้อมูลออกมา',
        optionExplanations: {
          A: 'ถูกต้อง: แสดงความเห็นใจและให้ความช่วยเหลือที่เป็นรูปธรรม',
          B: 'ผิด: "serves you right" แปลว่า "สมน้ำหน้า" ซึ่งไม่ใช่การพูดกับเพื่อนที่กำลังเดือดร้อน',
          C: 'ผิด: "Congratulations" (ยินดีด้วย) ขัดแย้งกับสถานการณ์ที่เกิดเรื่องแย่ๆ',
          D: 'ผิด: แสดงความเมินเฉยและเย็นชา',
        },
        skillCategory: 'Speaker Intention',
      },
    ],
  },
  {
    id: 'conv_short_4',
    type: 'short',
    title: 'Short 4: Asking for Clarification on Group Project Tasks',
    situation: 'During an online group call via Zoom, the leader gives complex instructions.',
    difficulty: 'B1',
    source: 'Practice Bank',
    examReference: 'TGAT1 Blueprint พาร์ท Clarification & Academic Terminology • CEFR B1',
    keyVocab: [
      {
            word: "elaborate",
            meaningTh: "อธิบายขยายความเพิ่มเติมอย่างละเอียด",
            pos: "verb",
            cefrLevel: "B2",
            examRef: "TGAT1 / IELTS"
      },
      {
            word: "demographic",
            meaningTh: "ข้อมูลทางประชากรศาสตร์ (เพศ อายุ)",
            pos: "adjective",
            cefrLevel: "B2",
            examRef: "A-Level / TGAT1"
      },
      {
            word: "layman",
            meaningTh: "บุคคลทั่วไป / ภาษาชาวบ้านเข้าใจง่าย",
            pos: "noun",
            cefrLevel: "B2",
            examRef: "TGAT1 High Score"
      }
],
    dialogue: [
      {
        speaker: 'Team Leader',
        text: 'So for Part 3, we need to cross-tabulate the survey responses with demographic variables before creating charts.',
        translationTh: 'ดังนั้นในส่วนที่ 3 เราจำเป็นต้องทำ cross-tabulate ผลการสำรวจกับตัวแปรประชากรศาสตร์ก่อนที่จะสร้างกราฟ',
      },
      {
        speaker: 'Member (Art)',
        text: '[ _______________ ]',
        translationTh: '[ ...คำถามของอาร์ต... ]',
      },
      {
        speaker: 'Team Leader',
        text: 'Sure! It basically means comparing how different age groups responded to each question.',
        translationTh: 'ได้เลย! สรุปง่ายๆ ก็คือการเปรียบเทียบว่ากลุ่มอายุต่างๆ ตอบคำถามแต่ละข้ออย่างไรบ้างนั่นเอง',
      },
    ],
    questions: [
      {
        id: 'q_sc4_1',
        question: 'What did Art ask in the missing blank?',
        options: {
          A: 'Could you please elaborate on that, or explain it in layman terms?',
          B: 'Why are you talking nonsense?',
          C: 'I am finished with Part 3 already.',
          D: 'Who gave you permission to decide our charts?',
        },
        correctOption: 'A',
        explanation: 'ตัวเลือก A เป็นการขอคำอธิบายเพิ่มเติมอย่างสุภาพ ("Could you please elaborate on that...?") ซึ่งสอดคล้องกับคำตอบของหัวหน้าทีมที่อธิบายคำว่า cross-tabulate ด้วยภาษาที่เข้าใจง่ายขึ้น',
        optionExplanations: {
          A: 'ถูกต้อง: ขอคำอธิบายเพิ่มอย่างสุภาพ เหมาะสมกับคำตอบต่อมาของ Team Leader',
          B: 'ผิด: หยาบคายและก้าวร้าว',
          C: 'ผิด: ขัดแย้งกับคำตอบของหัวหน้าทีมที่เพิ่งอธิบายความหมาย',
          D: 'ผิด: แสดงการต่อต้าน ไม่ตรงกับบริบทของการถามหาความหมาย',
        },
        skillCategory: 'Expression',
      },
    ],
  },

  // ---------------- Long Conversations ----------------
  {
    id: 'conv_long_1',
    type: 'long',
    title: 'Long 1: Resolving a Shared Apartment & Utilities Conflict',
    situation: 'Karn and David, two university exchange students sharing an apartment off-campus, are discussing the unusually high electricity bill and household duties.',
    difficulty: 'B2',
    source: 'Official Mock',
    examReference: 'TGAT1 Long Conversation (Apartment Living & Conflict Resolution) • CEFR B2',
    keyVocab: [
      {
            word: "staggering",
            meaningTh: "น่าตกใจ / พุ่งสูงจนน่าตกตะลึง",
            pos: "adjective",
            cefrLevel: "B2",
            examRef: "TGAT1 / IELTS 6.5"
      },
      {
            word: "refrigerant",
            meaningTh: "สารทำความเย็น / น้ำยาแอร์",
            pos: "noun",
            cefrLevel: "B2",
            examRef: "TGAT1 Science & Home"
      },
      {
            word: "in check",
            meaningTh: "ควบคุมให้อยู่ในเกณฑ์ที่เหมาะสม",
            pos: "phrase",
            cefrLevel: "B1",
            examRef: "TGAT1 Idiom"
      },
      {
            word: "thermostat",
            meaningTh: "อุปกรณ์ควบคุมอุณหภูมิ",
            pos: "noun",
            cefrLevel: "B1",
            examRef: "TGAT1 Daily Life"
      }
],
    dialogue: [
      {
        speaker: 'David',
        text: 'Hey Karn, do you have a few minutes? The utility invoice just arrived for this month, and our electricity bill surged by almost sixty percent compared to last month.',
        translationTh: 'เฮ้ กานต์ มีเวลาสักสองสามนาทีไหม? ใบแจ้งหนี้ค่าสาธารณูปโภคเดือนนี้เพิ่งมาถึง แล้วค่าไฟของเราพุ่งขึ้นเกือบหกสิบเปอร์เซ็นต์เมื่อเทียบกับเดือนที่แล้วเลยนะ',
      },
      {
        speaker: 'Karn',
        text: 'Sixty percent? Wow, that is staggering! Could it be because the weather has been scorching and we both left the AC running overnight?',
        translationTh: 'หกสิบเปอร์เซ็นต์เลยเหรอ? ตกใจเลยนะเนี่ย! มันอาจเป็นเพราะช่วงนี้อากาศร้อนจัดแล้วพวกเราเปิดแอร์ทิ้งไว้ข้ามคืนกันทั้งคู่หรือเปล่า?',
      },
      {
        speaker: 'David',
        text: 'That definitely contributed. But I also noticed that the old air conditioning unit in the living room has been humming strangely and blowing warm air even when set to 22 degrees. It might be leaking refrigerant.',
        translationTh: 'เรื่องนั้นมีส่วนแน่นอน แต่ฉันสังเกตเห็นว่าแอร์เครื่องเก่าในห้องนั่งเล่นมีเสียงหึ่งๆ แปลกๆ แถมยังพ่นลมร้อนออกมาแม้จะปรับไว้ที่ 22 องศา มันอาจจะมีน้ำยาแอร์รั่วก็ได้นะ',
      },
      {
        speaker: 'Karn',
        text: 'That makes total sense. Inefficient appliances draw significantly more power. We should contact the landlord immediately to request a technician before next month.',
        translationTh: 'สมเหตุสมผลเลย เครื่องใช้ไฟฟ้าที่ไม่ทำงานอย่างมีประสิทธิภาพจะกินไฟเพิ่มขึ้นมาก เราควรรีบติดต่อเจ้าของหอพักทันทีเพื่อให้ช่างมาดู ก่อนจะถึงเดือนหน้า',
      },
      {
        speaker: 'David',
        text: 'Agreed. And in the meantime, what if we agree to keep the thermostat at 25 degrees and use fans to circulate the air? That could keep our expenses in check.',
        translationTh: 'เห็นด้วยเลย แล้วในระหว่างนี้ ถ้าพวกเราตกลงกันว่าจะตั้งอุณหภูมิไว้ที่ 25 องศา และใช้พัดลมช่วยกระจายลมดูล่ะ? มันน่าจะช่วยคุมค่าใช้จ่ายได้นะ',
      },
      {
        speaker: 'Karn',
        text: 'Count me in. Also, since I am taking online classes from home this week, I will draft the maintenance request email to Mr. Harrison right away.',
        translationTh: 'เอาด้วยเลย! แล้วก็เนื่องจากสัปดาห์นี้ฉันเรียนออนไลน์อยู่ที่ห้อง ฉันจะร่างอีเมลแจ้งซ่อมส่งถึงคุณแฮร์ริสันให้ทันทีเลยนะ',
      },
    ],
    questions: [
      {
        id: 'q_lc1_1',
        question: 'What is the primary reason the roommates are having this conversation?',
        options: {
          A: 'To dispute who broke the kitchen refrigerator.',
          B: 'To address a sudden and substantial increase in their monthly electricity cost.',
          C: 'To complain about the landlord refusing to lower their room rent.',
          D: 'To plan a celebration for David completing his exchange semester.',
        },
        correctOption: 'B',
        explanation: 'เนื้อหาหลักของบทสนทนาเริ่มต้นจาก David แจ้งว่าค่าไฟพุ่งขึ้นถึง 60% ทั้งสองจึงมาหาสาเหตุและวางมาตรการประหยัดไฟร่วมกัน',
        optionExplanations: {
          A: 'ผิด: บทสนทนาพูดถึงเครื่องปรับอากาศ (AC) ไม่ใช่ตู้เย็น (refrigerator)',
          B: 'ถูกต้อง: ประเด็นหลักคือการจัดการกับค่าไฟที่เพิ่มขึ้นอย่างก้าวกระโดด',
          C: 'ผิด: เจ้าของหอยังไม่ได้ถูกกล่าวหาว่าปฏิเสธการลดค่าเช่า',
          D: 'ผิด: ไม่มีเนื้อหาเกี่ยวกับการฉลองจบการศึกษาในบทสนทนา',
        },
        skillCategory: 'Context Understanding',
      },
      {
        id: 'q_lc1_2',
        question: 'According to the dialogue, what is likely wrong with the living room air conditioner?',
        options: {
          A: 'It has been completely unplugged for weeks.',
          B: 'It makes strange humming noises and blows warm air due to a possible refrigerant leak.',
          C: 'It was set on fire during an electrical surge.',
          D: 'The remote control is missing its batteries.',
        },
        correctOption: 'B',
        explanation: 'David ระบุชัดเจนว่า: "the old air conditioning unit in the living room has been humming strangely and blowing warm air... It might be leaking refrigerant."',
        optionExplanations: {
          A: 'ผิด: แอร์ยังคงเปิดใช้งานอยู่ ไม่ได้ถูกถอดปลั๊ก',
          B: 'ถูกต้อง: ตรงตามคำพูดของ David ที่สังเกตเห็นเสียงผิดปกติและลมไม่เย็น',
          C: 'ผิด: ไม่มีการเกิดไฟไหม้',
          D: 'ผิด: ไม่ได้พูดถึงแบตเตอรี่รีโมตคอนโทรล',
        },
        skillCategory: 'Context Understanding',
      },
      {
        id: 'q_lc1_3',
        question: 'What is the meaning of Karn\'s expression "Count me in"?',
        options: {
          A: 'He wants David to calculate his share of the bill.',
          B: 'He enthusiastically agrees to adopt the suggested energy-saving habit.',
          C: 'He refuses to participate in the plan.',
          D: 'He needs more time to count how many fans they own.',
        },
        correctOption: 'B',
        explanation: 'สำนวน "Count me in" แปลว่า "นับฉันไปด้วย / ฉันร่วมมือด้วยอย่างเต็มใจ" ซึ่งเป็นการตอบรับข้อเสนอตั้งแอร์ 25 องศาของ David',
        optionExplanations: {
          A: 'ผิด: เป็นการตีความตามรูปศัพท์คำว่า "count" ซึ่งไม่ใช่ความหมายของสำนวนนี้',
          B: 'ถูกต้อง: แสดงความเห็นชอบและพร้อมปฏิบัติตามแนวคิดของเพื่อน',
          C: 'ผิด: ความหมายตรงกันข้ามกับสำนวน (ปฏิเสธคือ Count me out)',
          D: 'ผิด: ตีความตามตัวอักษรอย่างผิดบริบท',
        },
        skillCategory: 'Expression',
      },
      {
        id: 'q_lc1_4',
        question: 'What immediate action does Karn offer to take at the end of the conversation?',
        options: {
          A: 'Buy a brand new air conditioner with his own savings.',
          B: 'Draft the maintenance request email to their landlord, Mr. Harrison.',
          C: 'Move to another apartment before the next billing cycle.',
          D: 'Call an expensive private electrician without informing the landlord.',
        },
        correctOption: 'B',
        explanation: 'ในประโยคสุดท้าย กานต์กล่าวว่า "I will draft the maintenance request email to Mr. Harrison right away."',
        optionExplanations: {
          A: 'ผิด: กานต์ไม่ได้เสนอซื้อแอร์ใหม่เอง',
          B: 'ถูกต้อง: กานต์อาสาร่างอีเมลแจ้งซ่อมถึงนายแฮร์ริสัน (แลนด์ลอร์ด) ทันที',
          C: 'ผิด: กานต์ไม่ได้คิดจะย้ายหอพัก',
          D: 'ผิด: พวกเขาเลือกแจ้งเจ้าของหอพักแทนการจ้างช่างภายนอกโดยพลการ',
        },
        skillCategory: 'Appropriate Response',
      },
    ],
  },
  {
    id: 'conv_long_2',
    type: 'long',
    title: 'Long 2: Career Fair Consultation with an HR Representative',
    situation: 'At the International Graduate Career Fair, Lin, a senior undergraduate in Information Systems, seeks guidance from an HR director about entry-level openings.',
    difficulty: 'B2',
    source: 'Official Mock',
    examReference: 'TGAT1 Long Conversation (Career Fair & Professional Interview) • CEFR B2',
    keyVocab: [
      {
            word: "liaison",
            meaningTh: "ตัวกลางผู้ประสานงานระหว่างฝ่าย",
            pos: "noun",
            cefrLevel: "B2",
            examRef: "CU-TEP / TGAT1"
      },
      {
            word: "seamlessly",
            meaningTh: "อย่างราบรื่นไร้รอยต่อ",
            pos: "adverb",
            cefrLevel: "B2",
            examRef: "IELTS 6.5 / TGAT1"
      },
      {
            word: "articulate",
            meaningTh: "อธิบายความได้อย่างชัดเจนมีแบบแผน",
            pos: "verb",
            cefrLevel: "B2",
            examRef: "TGAT1 Professional"
      },
      {
            word: "cross-functional",
            meaningTh: "ข้ามสายงาน / สหวิทยาการ",
            pos: "adjective",
            cefrLevel: "B2",
            examRef: "Business English"
      }
],
    dialogue: [
      {
        speaker: 'Lin',
        text: 'Good afternoon. My name is Lin. I was fascinated by your keynote speech on AI-driven supply chain logistics. I would love to inquire about internship or graduate associate opportunities at your firm.',
        translationTh: 'สวัสดีตอนบ่ายค่ะ ดิฉันชื่อหลิน ดิฉันประทับใจการบรรยายพิเศษของคุณเรื่องโลจิสติกส์ซัพพลายเชนขับเคลื่อนด้วย AI มากค่ะ อยากจะสอบถามเกี่ยวกับโอกาสฝึกงานหรือโครงการบัณฑิตจบใหม่ในบริษัทของคุณค่ะ',
      },
      {
        speaker: 'Ms. Vance (HR)',
        text: 'Pleasure to meet you, Lin! It is refreshing to see students interested in the technical side of logistics. What field of study are you currently wrapping up?',
        translationTh: 'ยินดีที่ได้รู้จักนะหลิน! ยอดเยี่ยมมากที่เห็นนักศึกษาให้ความสนใจในด้านเทคนิคของโลจิสติกส์ ตอนนี้คุณกำลังจะสำเร็จการศึกษาในสาขาวิชาใดหรือ?',
      },
      {
        speaker: 'Lin',
        text: 'I am completing my Bachelor of Science in Information Systems with a concentration in Data Analytics. I have also built a predictive inventory prototype as my capstone project.',
        translationTh: 'ดิฉันกำลังจะจบปริญญาตรีสาขาระบบสารสนเทศ โทด้านการวิเคราะห์ข้อมูล (Data Analytics) ค่ะ และได้สร้างระบบต้นแบบทำนายสต็อกสินค้าเป็นโปรเจกต์จบด้วยค่ะ',
      },
      {
        speaker: 'Ms. Vance (HR)',
        text: 'That aligns seamlessly with our Digital Transformation track! While technical competence is mandatory, we place equal weight on how candidates collaborate in cross-functional teams and handle ambiguous requirements.',
        translationTh: 'นั่นตรงกับสายงาน Digital Transformation ของเราอย่างลงตัวเลย! ถึงแม้ความสามารถทางเทคนิคจะเป็นสิ่งจำเป็น แต่เราก็ให้ความสำคัญเท่าเทียมกันกับการทำงานร่วมกันในทีมข้ามสายงานและการจัดการกับโจทย์ที่มีความคลุมเครือ',
      },
      {
        speaker: 'Lin',
        text: 'I completely agree. In my capstone project, I acted as the liaison between our engineering teammates and business stakeholders to ensure our model answered their exact operational pain points.',
        translationTh: 'เห็นด้วยเป็นอย่างยิ่งเลยค่ะ ในโปรเจกต์จบ ดิฉันทำหน้าที่เป็นตัวกลางประสานงานระหว่างเพื่อนวิศวกรกับผู้เกี่ยวข้องฝั่งธุรกิจ เพื่อให้มั่นใจว่าโมเดลที่เราทำตอบโจทย์ปัญหาในการทำงานจริงของพวกเขา',
      },
      {
        speaker: 'Ms. Vance (HR)',
        text: 'Impressive! You articulate your value proposition remarkably well. Please scan this fast-track QR code to submit your resume directly to my recruitment dashboard.',
        translationTh: 'น่าประทับใจมาก! คุณอธิบายจุดเด่นของตัวเองได้ดีเป็นพิเศษเลยนะ รบกวนสแกนคิวอาร์โค้ด Fast-track นี้เพื่อส่งเรซูเม่ตรงเข้าแดชบอร์ดฝ่ายสรรหาของฉันได้เลยจ้ะ',
      },
    ],
    questions: [
      {
        id: 'q_lc2_1',
        question: 'What is Lin\'s primary objective at the career fair booth?',
        options: {
          A: 'To inquire about career and internship opportunities relevant to her background.',
          B: 'To sell her predictive inventory software to Ms. Vance.',
          C: 'To criticize the company\'s current supply chain management.',
          D: 'To apply for a vacant position as a senior human resources manager.',
        },
        correctOption: 'A',
        explanation: 'หลินเริ่มการสนทนาด้วยการแนะนำตัวเองและถามถึง "internship or graduate associate opportunities at your firm" เพื่อมองหาโอกาสร่วมงาน',
        optionExplanations: {
          A: 'ถูกต้อง: หลินเข้ามาติดต่อเพื่อสอบถามตำแหน่งงานและฝึกงานที่ตรงกับสายที่เรียน',
          B: 'ผิด: โปรเจกต์ของเธอเป็น Capstone project สำหรับเรียนจบ ไม่ใช่การมาขายของเชิงพาณิชย์',
          C: 'ผิด: หลินกล่าวชื่นชมการบรรยายพิเศษ ไม่ได้มาวิจารณ์เชิงลบ',
          D: 'ผิด: หลินยังเป็นนักศึกษาจบใหม่ ไม่ได้สมัครเป็นผู้จัดการ HR',
        },
        skillCategory: 'Context Understanding',
      },
      {
        id: 'q_lc2_2',
        question: 'What non-technical attribute does Ms. Vance emphasize as being equally crucial to technical skills?',
        options: {
          A: 'A willingness to work overtime without financial compensation.',
          B: 'Cross-functional collaboration and the ability to navigate ambiguous requirements.',
          C: 'A high GPA above 3.90 in all mathematics examinations.',
          D: 'Extensive background in foreign language translation.',
        },
        correctOption: 'B',
        explanation: 'Ms. Vance กล่าวว่า: "...we place equal weight on how candidates collaborate in cross-functional teams and handle ambiguous requirements."',
        optionExplanations: {
          A: 'ผิด: ไม่มีการกล่าวถึงการทำงานล่วงเวลาโดยไม่ได้เงิน',
          B: 'ถูกต้อง: การทำงานร่วมกับทีมที่หลากหลายและการรับมือกับความไม่แน่นอน/ความคลุมเครือ',
          C: 'ผิด: ไม่ได้ระบุเรื่องเกรดเฉลี่ย',
          D: 'ผิด: ไม่ได้ระบุเรื่องงานแปลภาษา',
        },
        skillCategory: 'Speaker Intention',
      },
      {
        id: 'q_lc2_3',
        question: 'In the context of the dialogue, what does Lin mean by describing herself as a "liaison"?',
        options: {
          A: 'She worked alone without consulting any group members.',
          B: 'She served as an intermediary bridge connecting technical and business perspectives.',
          C: 'She was solely responsible for funding the hardware costs.',
          D: 'She decided to terminate the project early.',
        },
        correctOption: 'B',
        explanation: 'คำว่า "liaison" หมายถึง ผู้ประสานงาน หรือตัวกลางที่เชื่อมโยงระหว่างสองฝ่าย (ในที่นี้คือ engineering team กับ business stakeholders)',
        optionExplanations: {
          A: 'ผิด: ขัดแย้งกับความหมายของการประสานงาน',
          B: 'ถูกต้อง: เธอทำหน้าที่เป็นตัวกลางเชื่อมระหว่างฝ่ายเทคนิคกับฝ่ายธุรกิจ',
          C: 'ผิด: ไม่เกี่ยวข้องกับการออกเงินทุน',
          D: 'ผิด: ไม่เกี่ยวข้องกับการยกเลิกโปรเจกต์',
        },
        skillCategory: 'Vocabulary',
      },
      {
        id: 'q_lc2_4',
        question: 'What can be inferred about Ms. Vance\'s attitude toward Lin by the end of their conversation?',
        options: {
          A: 'She is skeptical of Lin\'s credentials and dismisses her quickly.',
          B: 'She is very impressed and provides a priority channel for her application.',
          C: 'She suggests Lin should switch to an entirely different major.',
          D: 'She advises Lin to avoid logistics companies in the future.',
        },
        correctOption: 'B',
        explanation: 'Ms. Vance กล่าวชม "Impressive! You articulate your value proposition remarkably well" และยื่น Fast-track QR code ให้ส่งเรซูเม่โดยตรง',
        optionExplanations: {
          A: 'ผิด: ผู้จัดการ HR ชื่นชมอย่างมาก ไม่ได้คลางแคลงใจ',
          B: 'ถูกต้อง: แสดงความประทับใจและมอบช่องทางด่วน (Fast-track) ในการส่งประวัติ',
          C: 'ผิด: เธอชมว่าสาขาวิชาตรงกับบริษัทอย่างลงตัว (aligns seamlessly)',
          D: 'ผิด: ขัดแย้งกับท่าทีที่เป็นมิตรและเปิดรับ',
        },
        skillCategory: 'Speaker Intention',
      },
    ],
  },

  // ---------------- Additional Short Conversations ----------------
  {
    id: 'conv_short_5',
    type: 'short',
    title: 'Short 5: Returning a Faulty Gadget at an Electronics Store',
    situation: 'A customer purchased wireless headphones yesterday, but the left earbud produces no sound.',
    difficulty: 'B1',
    source: 'Practice Bank',
    examReference: 'TGAT1 Blueprint พาร์ท Customer Return & Warranty • CEFR B1',
    keyVocab: [
      {
            word: "defective",
            meaningTh: "ที่มีข้อบกพร่อง / ชำรุดเสียหายจากโรงงาน",
            pos: "adjective",
            cefrLevel: "B2",
            examRef: "TGAT1 / TOEIC"
      },
      {
            word: "warranty",
            meaningTh: "การรับประกันสินค้า",
            pos: "noun",
            cefrLevel: "B1",
            examRef: "TGAT1 Business"
      },
      {
            word: "inconvenience",
            meaningTh: "ความไม่สะดวกสบาย",
            pos: "noun",
            cefrLevel: "B1",
            examRef: "TGAT1 Polite Service"
      }
],
    dialogue: [
      {
        speaker: 'Customer',
        text: 'Hello. I purchased these wireless earbuds here yesterday afternoon, but the left earpiece has no sound output at all.',
        translationTh: 'สวัสดีครับ ผมซื้อหูฟังไร้สายคู่นี้จากที่นี่เมื่อวานตอนบ่าย แต่หูฟังข้างซ้ายไม่มีเสียงออกเลยแม้แต่น้อยครับ',
      },
      {
        speaker: 'Sales Associate',
        text: '[ _______________ ]',
        translationTh: '[ ...คำตอบของพนักงานขาย... ]',
      },
      {
        speaker: 'Customer',
        text: 'Yes, here is the receipt along with the original packaging and warranty booklet.',
        translationTh: 'มีครับ นี่ใบเสร็จพร้อมกล่องและสมุดรับประกันสินค้าครับ',
      },
    ],
    questions: [
      {
        id: 'q_sc5_1',
        question: 'Which of the following is the most professional response for the sales associate to ask for proof of purchase?',
        options: {
          A: 'I am so sorry for the inconvenience. Do you happen to have the receipt with you so we can process an immediate replacement?',
          B: 'Why did you break it so quickly? We never sell defective items.',
          C: 'Take it back to the manufacturer in Japan, not here.',
          D: 'I will refund your money only if you pay an extra fee.',
        },
        correctOption: 'A',
        explanation: 'ตัวเลือก A กล่าวขออภัยในความไม่สะดวกอย่างสุภาพ ("I am so sorry for the inconvenience...") และสอบถามใบเสร็จเพื่อดำเนินการเปลี่ยนสินค้าใหม่ทันที ซึ่งเข้ากับคำตอบของลูกค้าที่มีใบเสร็จเตรียมไว้',
        optionExplanations: {
          A: 'ถูกต้อง: สุภาพ ขอหลักฐานใบเสร็จอย่างมืออาชีพเพื่ออำนวยความสะดวกในการเปลี่ยนสินค้า',
          B: 'ผิด: กล่าวหาลูกค้าและปฏิเสธความรับผิดชอบอย่างก้าวร้าว',
          C: 'ผิด: ปัดภาระให้ผู้ผลิตต่างประเทศอย่างไม่สมเหตุสมผล',
          D: 'ผิด: เรียกเก็บค่าธรรมเนียมเพิ่มเติมอย่างไม่ถูกต้องตามเงื่อนไขการรับประกัน',
        },
        skillCategory: 'Appropriate Response',
      },
    ],
  },
  {
    id: 'conv_short_6',
    type: 'short',
    title: 'Short 6: Doctor Consultation on Exam-Induced Insomnia',
    situation: 'A high school senior visits the campus clinic complaining about chronic sleeplessness before the national exam.',
    difficulty: 'B1',
    source: 'Practice Bank',
    examReference: 'TGAT1 Blueprint พาร์ท Health Consultation & Empathy • CEFR B1',
    keyVocab: [
      {
            word: "insomnia",
            meaningTh: "ภาวะนอนไม่หลับเรื้อรัง",
            pos: "noun",
            cefrLevel: "B2",
            examRef: "TGAT1 Health"
      },
      {
            word: "wind-down",
            meaningTh: "การผ่อนคลายลดความตึงเครียดก่อนนอน",
            pos: "noun",
            cefrLevel: "B1",
            examRef: "TGAT1 Daily Life"
      },
      {
            word: "medically sound",
            meaningTh: "ถูกต้องตามหลักการแพทย์",
            pos: "phrase",
            cefrLevel: "B2",
            examRef: "CU-TEP / IELTS"
      }
],
    dialogue: [
      {
        speaker: 'Student (Ben)',
        text: 'Doctor, with the TGAT exam approaching next month, I can barely fall asleep before 3 AM because my mind keeps racing.',
        translationTh: 'คุณหมอครับ พอใกล้จะสอบ TGAT เดือนหน้า ผมแทบนอนไม่หลับเลยก่อนตีสาม เพราะในหัวมันคิดกังวลไม่หยุด',
      },
      {
        speaker: 'Doctor Miller',
        text: '[ _______________ ]',
        translationTh: '[ ...คำแนะนำของแพทย์... ]',
      },
    ],
    questions: [
      {
        id: 'q_sc6_1',
        question: 'What is the most medically sound and empathetic advice Doctor Miller can provide?',
        options: {
          A: 'That is completely normal. I suggest establishing a wind-down routine without digital screens one hour before bed.',
          B: 'You should just drop out of high school if exams cause you stress.',
          C: 'Take five sleeping pills every evening and do not study at all.',
          D: 'Stop complaining; every other student is doing fine.',
        },
        correctOption: 'A',
        explanation: 'ตัวเลือก A แสดงความเข้าอกเข้าใจและให้คำแนะนำเชิงสุขอนามัยการนอนหลับที่ถูกต้อง ("establishing a wind-down routine without digital screens...")',
        optionExplanations: {
          A: 'ถูกต้อง: เห็นอกเห็นใจและให้คำแนะนำสุขนิสัยการนอนที่ปลอดภัยและเป็นไปได้จริง',
          B: 'ผิด: แนะนำให้ลาออกอย่างประชดประชัน',
          C: 'ผิด: แนะนำการใช้ยาเกินขนาดซึ่งเป็นอันตรายอย่างยิ่ง',
          D: 'ผิด: ด้อยค่าความรู้สึกของคนไข้และขาดจรรยาบรรณแพทย์',
        },
        skillCategory: 'Speaker Intention',
      },
    ],
  },
  {
    id: 'conv_short_7',
    type: 'short',
    title: 'Short 7: Requesting a Late Check-Out at a Boutique Hotel',
    situation: 'A hotel guest whose return flight is in the evening calls front desk for an extended stay.',
    difficulty: 'A2',
    source: 'Practice Bank',
    examReference: 'TGAT1 Blueprint พาร์ท Hotel Hospitality & Negotiation • CEFR A2',
    keyVocab: [
      {
            word: "complimentary",
            meaningTh: "ให้บริการฟรีโดยไม่คิดค่าใช้จ่าย",
            pos: "adjective",
            cefrLevel: "B2",
            examRef: "TGAT1 / TOEIC"
      },
      {
            word: "feasible",
            meaningTh: "เป็นไปได้ในทางปฏิบัติ",
            pos: "adjective",
            cefrLevel: "B2",
            examRef: "CU-TEP / TGAT1"
      },
      {
            word: "vacate",
            meaningTh: "ออกจากห้อง / คืนห้องพัก",
            pos: "verb",
            cefrLevel: "B2",
            examRef: "TGAT1 Travel"
      }
],
    dialogue: [
      {
        speaker: 'Hotel Guest',
        text: 'Good morning. Our flight is scheduled for 8:00 PM tonight. Would it be feasible to request a late check-out at 2:00 PM?',
        translationTh: 'สวัสดีตอนเช้าครับ พอดีเที่ยวบินขากลับของเราออกตอนสองทุ่ม เป็นไปได้ไหมครับที่จะขอเลทเช็คเอาต์ตอนบ่ายสองโมง?',
      },
      {
        speaker: 'Front Desk Agent',
        text: '[ _______________ ]',
        translationTh: '[ ...การตอบรับของพนักงานต้อนรับ... ]',
      },
    ],
    questions: [
      {
        id: 'q_sc7_1',
        question: 'How can the front desk agent politely offer a balanced accommodation?',
        options: {
          A: 'Certainly! We can extend your room until 1:00 PM complimentary, and store your luggage free of charge after that.',
          B: 'You must vacate immediately right now or we will double your room charge.',
          C: 'Book an entirely new week if you want to stay past noon.',
          D: 'We have never heard of a flight departing at night.',
        },
        correctOption: 'A',
        explanation: 'ตัวเลือก A สุภาพและเสนอทางออกที่ดีที่สุดสำหรับทั้งสองฝ่าย คือให้ขยายเวลาฟรีถึง 13:00 น. และรับฝากสัมภาระหลังจากนั้น',
        optionExplanations: {
          A: 'ถูกต้อง: สุภาพ เสนอการขยายเวลาตามความเหมาะสมพร้อมบริการรับฝากกระเป๋า',
          B: 'ผิด: ใช้น้ำเสียงข่มขู่และก้าวร้าว',
          C: 'ผิด: บังคับให้จองเพิ่มเป็นสัปดาห์ซึ่งไม่สมเหตุผล',
          D: 'ผิด: ไม่สอดคล้องกับความเป็นจริงของการเดินทางทางอากาศ',
        },
        skillCategory: 'Appropriate Response',
      },
    ],
  },
  {
    id: 'conv_short_8',
    type: 'short',
    title: 'Short 8: Assisting a Commuter at a Crowded MRT Station',
    situation: 'A tourist looks bewildered looking at the metro line map in Bangkok.',
    difficulty: 'A2',
    source: 'Practice Bank',
    examReference: 'TGAT1 Blueprint พาร์ท Public Transport & Direction • CEFR A2',
    keyVocab: [
      {
            word: "interchange",
            meaningTh: "จุดเชื่อมต่อเปลี่ยนสายรถไฟฟ้า",
            pos: "noun",
            cefrLevel: "B1",
            examRef: "TGAT1 Travel"
      },
      {
            word: "bewildered",
            meaningTh: "สับสนงุนงงอย่างยิ่ง",
            pos: "adjective",
            cefrLevel: "B2",
            examRef: "TGAT1 Reading"
      },
      {
            word: "commuter",
            meaningTh: "ผู้เดินทางไปกลับประจำวัน",
            pos: "noun",
            cefrLevel: "B1",
            examRef: "TGAT1 Social"
      }
],
    dialogue: [
      {
        speaker: 'Local Passenger',
        text: 'Excuse me! You seem a bit confused by the transit map. Are you looking for a particular station?',
        translationTh: 'ขอโทษนะครับ! ดูเหมือนคุณกำลังสับสนกับแผนที่รถไฟฟ้า กำลังมองหาสถานีไหนเป็นพิเศษอยู่หรือเปล่าครับ?',
      },
      {
        speaker: 'Tourist',
        text: 'Yes, thank you! I need to transfer to the Airport Rail Link. Could you tell me where to interchange?',
        translationTh: 'ใช่ครับ ขอบคุณมากเลยครับ! พอดีผมต้องเปลี่ยนสายไปแอร์พอร์ตเรลลิงก์ รบกวนบอกได้ไหมครับว่าต้องเปลี่ยนที่สถานีไหน?',
      },
      {
        speaker: 'Local Passenger',
        text: '[ _______________ ]',
        translationTh: '[ ...คำแนะนำเส้นทางของผู้โดยสารคนไทย... ]',
      },
    ],
    questions: [
      {
        id: 'q_sc8_1',
        question: 'What is the most helpful and accurate informational response?',
        options: {
          A: 'Stay on this train until Phetchaburi Station, then follow the skywalk signs directly to Makkasan Airport Link.',
          B: 'Airport Rail Link has been closed for the past ten years.',
          C: 'You should walk along the train tracks for five kilometers.',
          D: 'I do not live on this planet, so I have no clue.',
        },
        correctOption: 'A',
        explanation: 'ตัวเลือก A ให้คำแนะนำเส้นทางที่ชัดเจนและถูกต้องตามระบบขนส่งมวลชนจริง ("Stay on this train until Phetchaburi Station...")',
        optionExplanations: {
          A: 'ถูกต้อง: ให้ข้อมูลการเปลี่ยนสายสถานีเพชรบุรีเชื่อมต่อไปยังมักกะสันอย่างถูกต้องและเข้าใจง่าย',
          B: 'ผิด: ข้อมูลเท็จ',
          C: 'ผิด: แนะนำให้เดินบนรางรถไฟซึ่งอันตรายและผิดกฎหมาย',
          D: 'ผิด: ไร้สาระและไม่ตอบสนองคำถาม',
        },
        skillCategory: 'Context Understanding',
      },
    ],
  },
  {
    id: 'conv_short_9',
    type: 'short',
    title: 'Short 9: Declining a Weekend Party to Prepare for TGAT',
    situation: 'Two friends meet at the university student union lounge on Friday afternoon.',
    difficulty: 'B1',
    source: 'Practice Bank',
    examReference: 'TGAT1 Blueprint พาร์ท Polite Refusal & Social Etiquette • CEFR B1',
    keyVocab: [
      {
            word: "gracious",
            meaningTh: "มีมารยาทดี / สุภาพอ่อนโยน",
            pos: "adjective",
            cefrLevel: "B2",
            examRef: "TGAT1 Manners"
      },
      {
            word: "count someone out",
            meaningTh: "ไม่ต้องนับรวม / ขอไม่เข้าร่วม",
            pos: "phrase",
            cefrLevel: "B1",
            examRef: "TGAT1 Idiom"
      },
      {
            word: "have a blast",
            meaningTh: "สนุกสนานอย่างเต็มที่",
            pos: "idiom",
            cefrLevel: "B1",
            examRef: "TGAT1 Casual"
      }
],
    dialogue: [
      {
        speaker: 'Mark',
        text: 'Hey Nut! A bunch of us are hitting the karaoke club tonight to celebrate the end of midterm week. Want to come along?',
        translationTh: 'เฮ้ ณัฐ! พวกเราชวนกันไปร้องคาราโอเกะคืนนี้เพื่อฉลองสอบกลางภาคเสร็จ นายจะไปด้วยกันไหม?',
      },
      {
        speaker: 'Nut',
        text: '[ _______________ ]',
        translationTh: '[ ...คำปฏิเสธอย่างสุภาพของณัฐ... ]',
      },
    ],
    questions: [
      {
        id: 'q_sc9_1',
        question: 'Which choice represents the most gracious way for Nut to decline the invitation?',
        options: {
          A: 'I would love to, but I have a mock exam early tomorrow morning. Count me out this time, but have a blast!',
          B: 'Karaoke is the most boring activity ever invented.',
          C: 'How dare you invite me when you know I have exams?',
          D: 'I will come only if you pay for my food, drinks, and taxi ride.',
        },
        correctOption: 'A',
        explanation: 'ตัวเลือก A เป็นการปฏิเสธคำชวนที่สมบูรณ์แบบตามหลักภาษาอังกฤษ: ขอบคุณและแสดงความเสียดาย ("I would love to...") ให้เหตุผลจำเป็น ("have a mock exam...") ใช้สำนวนปฏิเสธ ("Count me out this time") และอวยพรให้เพื่อนสนุก ("have a blast!")',
        optionExplanations: {
          A: 'ถูกต้อง: ปฏิเสธอย่างมีมารยาท อธิบายเหตุผล และอวยพรให้เพื่อนเที่ยวอย่างสนุกสนาน',
          B: 'ผิด: วิจารณ์กิจกรรมของเพื่อนในแง่ลบและหยาบคาย',
          C: 'ผิด: ใช้น้ำเสียงโกรธเคืองเกินกว่าเหตุ',
          D: 'ผิด: เอาเปรียบเพื่อนและไม่สุภาพ',
        },
        skillCategory: 'Appropriate Response',
      },
    ],
  },
  {
    id: 'conv_short_10',
    type: 'short',
    title: 'Short 10: Requesting a Project Deadline Extension',
    situation: 'A student approaches a course instructor during office hours.',
    difficulty: 'B2',
    source: 'Official Mock',
    examReference: 'TGAT1 Blueprint พาร์ท Academic Negotiation & Deadlines • CEFR B2',
    keyVocab: [
      {
            word: "extension",
            meaningTh: "การขยายเวลา / การผ่อนผันกำหนดส่ง",
            pos: "noun",
            cefrLevel: "B1",
            examRef: "TGAT1 Campus"
      },
      {
            word: "interim",
            meaningTh: "ชั่วคราว / ระหว่างกาล (เช่น ข้อมูลเบื้องต้น)",
            pos: "adjective",
            cefrLevel: "B2",
            examRef: "CU-TEP / TGAT1"
      },
      {
            word: "fieldwork",
            meaningTh: "การลงพื้นที่เก็บข้อมูลภาคสนาม",
            pos: "noun",
            cefrLevel: "B1",
            examRef: "TGAT1 Academic"
      }
],
    dialogue: [
      {
        speaker: 'Student (Grace)',
        text: 'Professor Wright, our team has encountered unexpected difficulties with data collection for our environmental survey. Would it be at all possible to receive a 48-hour extension?',
        translationTh: 'อาจารย์ไรท์คะ ทีมของพวกเราเจอปัญหาไม่คาดคิดเกี่ยวกับการเก็บข้อมูลสำรวจสิ่งแวดล้อม พอจะเป็นไปได้ไหมคะที่จะขอขยายเวลาส่งงานอีก 48 ชั่วโมง?',
      },
      {
        speaker: 'Professor Wright',
        text: '[ _______________ ]',
        translationTh: '[ ...คำตอบของอาจารย์... ]',
      },
    ],
    questions: [
      {
        id: 'q_sc10_1',
        question: 'What is the most academic and fair response from the professor?',
        options: {
          A: 'I understand these challenges arise in fieldwork. I can grant an extension until Sunday at midnight, provided you submit your interim data by tomorrow noon.',
          B: 'You are clearly lazy and incompetent researchers.',
          C: 'Extension denied. I will give your entire group an F immediately.',
          D: 'I do not read student assignments anyway, submit whenever.',
        },
        correctOption: 'A',
        explanation: 'ตัวเลือก A สะท้อนบริบทการเรียนในระดับมหาวิทยาลัยที่อาจารย์เข้าใจปัญหาหน้างานจริง ("fieldwork challenges") และอนุมัติการผ่อนผันอย่างมีเงื่อนไขที่สร้างสรรค์ ("provided you submit interim data...")',
        optionExplanations: {
          A: 'ถูกต้อง: มีเหตุผล มีความเป็นมืออาชีพ และตั้งเงื่อนไขที่สนับสนุนการเรียนรู้',
          B: 'ผิด: ดูถูกดูแคลนนักศึกษาอย่างไม่เหมาะสม',
          C: 'ผิด: ลงโทษรุนแรงเกินกว่าเหตุโดยไร้เหตุผลรองรับ',
          D: 'ผิด: ขาดความรับผิดชอบในหน้าที่การสอน',
        },
        skillCategory: 'Appropriate Response',
      },
    ],
  },

  // ---------------- Additional Long Conversations ----------------
  {
    id: 'conv_long_3',
    type: 'long',
    title: 'Long 3: Consultation on Study Abroad Exchange and Credit Transfer',
    situation: 'At the University International Relations Office, Pim consults an exchange coordinator about studying abroad in Melbourne next semester.',
    difficulty: 'B2',
    source: 'Official Mock',
    examReference: 'TGAT1 Long Conversation (Study Abroad & Credit Equivalency) • CEFR B2',
    keyVocab: [
      {
            word: "apprehensive",
            meaningTh: "กังวลใจ / หวาดหวั่นต่อความไม่แน่นอน",
            pos: "adjective",
            cefrLevel: "B2",
            examRef: "TGAT1 / TU-GET"
      },
      {
            word: "equivalency",
            meaningTh: "ความเทียบเท่า / ความเท่าเทียมกันของหน่วยกิต",
            pos: "noun",
            cefrLevel: "B2",
            examRef: "TGAT1 Academic"
      },
      {
            word: "stipend",
            meaningTh: "เบี้ยเลี้ยง / เงินอุดหนุนค่าครองชีพ",
            pos: "noun",
            cefrLevel: "B2",
            examRef: "CU-TEP / IELTS"
      },
      {
            word: "straightforward",
            meaningTh: "ตรงไปตรงมา / เข้าใจง่ายไม่ซับซ้อน",
            pos: "adjective",
            cefrLevel: "B1",
            examRef: "TGAT1 Standard"
      }
],
    dialogue: [
      {
        speaker: 'Pim',
        text: 'Good morning, Mr. Cooper. I am here to discuss my nomination for the semester-long exchange program at the University of Melbourne. I have reviewed the course syllabus, but I am somewhat apprehensive about the credit transfer process.',
        translationTh: 'สวัสดีตอนเช้าค่ะ คุณคูเปอร์ ดิฉันมาเพื่อขอปรึกษาเรื่องการได้รับการเสนอชื่อเข้าร่วมโครงการแลกเปลี่ยนหนึ่งภาคการศึกษาที่มหาวิทยาลัยเมลเบิร์นค่ะ ดิฉันได้อ่านโครงสร้างหลักสูตรแล้ว แต่รู้สึกกังวลใจอยู่บ้างเกี่ยวกับขั้นตอนการเทียบโอนหน่วยกิตค่ะ',
      },
      {
        speaker: 'Mr. Cooper (Coordinator)',
        text: 'Good morning, Pim! Congratulations on securing the exchange nomination. Rest assured, credit transfer is straightforward as long as you complete the pre-approval paperwork before departure. What specific courses are you planning to take abroad?',
        translationTh: 'สวัสดีตอนเช้าครับพิม! ขอแสดงความยินดีด้วยนะที่ได้รับคัดเลือกในโครงการแลกเปลี่ยน วางใจได้เลยครับ เรื่องการเทียบโอนหน่วยกิตตรงไปตรงมามาก ตราบใดที่คุณทำเรื่องขออนุมัติล่วงหน้าให้เสร็จก่อนออกเดินทาง คุณวางแผนจะลงเรียนวิชาอะไรบ้างที่นั่นหรือครับ?',
      },
      {
        speaker: 'Pim',
        text: 'I intend to enroll in Cross-Cultural Communication, Advanced Public Relations, and an elective in Australian Indigenous History. My major department requires at least two of these to substitute core curriculum subjects here.',
        translationTh: 'ดิฉันตั้งใจจะลงเรียนวิชาการสื่อสารข้ามวัฒนธรรม การประชาสัมพันธ์ขั้นสูง และวิชาเลือกประวัติศาสตร์ชนเผ่าพื้นเมืองออสเตรเลียค่ะ ซึ่งภาควิชาของดิฉันกำหนดว่าต้องมีอย่างน้อยสองวิชาที่สามารถใช้แทนวิชาแกนหลักที่นี่ได้ค่ะ',
      },
      {
        speaker: 'Mr. Cooper (Coordinator)',
        text: 'The first two will almost certainly be endorsed since their course learning outcomes mirror our own. However, for the Australian History course, I strongly advise having your department head sign off on the equivalency form this week, rather than waiting until you arrive in Melbourne.',
        translationTh: 'สองวิชาแรกได้รับการอนุมัติอย่างแน่นอนครับเพราะผลลัพธ์การเรียนรู้ตรงกับหลักสูตรของเราเป๊ะ แต่สำหรับวิชาประวัติศาสตร์ออสเตรเลีย ผมขอแนะนำอย่างยิ่งให้หัวหน้าภาควิชาของคุณลงนามรับรองในแบบฟอร์มเทียบความเท่าเทียมในสัปดาห์นี้เลย ดีกว่ารอจนเดินทางไปถึงเมลเบิร์นแล้วค่อยทำครับ',
      },
      {
        speaker: 'Pim',
        text: 'Understood. That would prevent any unpleasant surprises upon my return. Does the faculty offer any stipends or housing support for students heading to Australia?',
        translationTh: 'เข้าใจแล้วค่ะ นั่นจะช่วยป้องกันปัญหาไม่คาดคิดตอนดิฉันเดินทางกลับมาได้ ทางคณะมีทุนสนับสนุนค่าใช้จ่ายหรือที่พักสำหรับนักศึกษาที่จะไปออสเตรเลียไหมคะ?',
      },
      {
        speaker: 'Mr. Cooper (Coordinator)',
        text: 'Yes! The Global Mobility Grant offers up to 50,000 Baht toward flights and mandatory overseas health cover. Applications close next Wednesday, so I will email you the registration checklist right after our meeting.',
        translationTh: 'มีครับ! ทุน Global Mobility Grant สนับสนุนสูงสุด 50,000 บาทสำหรับค่าตั๋วเครื่องบินและประกันสุขภาพภาคบังคับในต่างประเทศ การรับสมัครจะปิดวันพุธหน้านี้แล้ว เดี๋ยวผมจะส่งอีเมลรายการเอกสารที่ต้องใช้ให้ทันทีหลังการพูดคุยของเราครับ',
      },
    ],
    questions: [
      {
        id: 'q_lc3_1',
        question: 'What is Pim\'s primary concern at the beginning of the appointment?',
        options: {
          A: 'Whether her grades qualify her for graduation.',
          B: 'The mechanics of transferring credits back to her home university.',
          C: 'The difficulty of obtaining an Australian student visa.',
          D: 'A personal conflict with her assigned Melbourne roommate.',
        },
        correctOption: 'B',
        explanation: 'พิมระบุชัดเจนในประโยคแรกว่า "I have reviewed the course syllabus, but I am somewhat apprehensive about the credit transfer process."',
        optionExplanations: {
          A: 'ผิด: ไม่ได้พูดถึงการไม่จบการศึกษาเพราะเกรด',
          B: 'ถูกต้อง: พิมกังวลเรื่องกระบวนการและเงื่อนไขการเทียบโอนหน่วยกิตจากต่างประเทศ',
          C: 'ผิด: ยังไม่ได้พูดถึงขั้นตอนการขอวีซ่า',
          D: 'ผิด: ยังไม่ได้เดินทางและยังไม่มีเรื่องรูมเมต',
        },
        skillCategory: 'Context Understanding',
      },
      {
        id: 'q_lc3_2',
        question: 'In the dialogue, what does the word "apprehensive" most nearly mean?',
        options: {
          A: 'Anxious and worried about potential complications.',
          B: 'Thoroughly delighted and thrilled.',
          C: 'Indifferent and unmotivated.',
          D: 'Deeply offended and angry.',
        },
        correctOption: 'A',
        explanation: 'คำว่า "apprehensive" แปลว่า กังวลใจ, หวาดหวั่น หรือรู้สึกไม่มั่นใจเกี่ยวกับสิ่งที่จะเกิดขึ้นในอนาคต',
        optionExplanations: {
          A: 'ถูกต้อง: มีความหมายตรงกับ anxious / worried',
          B: 'ผิด: แปลว่าดีใจ ซึ่งตรงข้ามกับความหมายจริง',
          C: 'ผิด: แปลว่าไม่ใส่ใจ เมินเฉย',
          D: 'ผิด: แปลว่าโกรธเคือง ขุ่นเคือง',
        },
        skillCategory: 'Vocabulary',
      },
      {
        id: 'q_lc3_3',
        question: 'What urgent action does Mr. Cooper advise Pim to take this week?',
        options: {
          A: 'Book non-refundable airplane tickets immediately.',
          B: 'Secure her department head\'s pre-approval on the Australian history course equivalency.',
          C: 'Drop all her English communication classes.',
          D: 'Decline the exchange nomination and stay home.',
        },
        correctOption: 'B',
        explanation: 'Mr. Cooper แนะนำว่า: "...for the Australian History course, I strongly advise having your department head sign off on the equivalency form this week..."',
        optionExplanations: {
          A: 'ผิด: ไม่ได้บอกให้รีบจองตั๋วที่ไม่คืนเงิน',
          B: 'ถูกต้อง: รีบให้หัวหน้าภาควิชาเซ็นอนุมัติวิชาประวัติศาสตร์ออสเตรเลียก่อนเดินทาง',
          C: 'ผิด: ไม่ได้แนะนำให้ถอนวิชาเรียนภาษาอังกฤษ',
          D: 'ผิด: ตรงกันข้าม เขาแสดงความยินดีที่เธอได้รับคัดเลือก',
        },
        skillCategory: 'Speaker Intention',
      },
    ],
  },
  {
    id: 'conv_long_4',
    type: 'long',
    title: 'Long 4: Organizing the Annual Campus Charity English Fair',
    situation: 'Two executive committee members of the English Club, Dan and Meena, are troubleshooting logistical roadblocks for their weekend charity festival.',
    difficulty: 'B2',
    source: 'Practice Bank',
    examReference: 'TGAT1 Long Conversation (Event Management & Weather Contingency) • CEFR B2',
    keyVocab: [
      {
            word: "no-brainer",
            meaningTh: "การตัดสินใจที่ง่ายและชัดเจนจนไม่ต้องคิด",
            pos: "idiom",
            cefrLevel: "B2",
            examRef: "TGAT1 Idiom"
      },
      {
            word: "renovation",
            meaningTh: "การปรับปรุงซ่อมแซมอาคารสถานที่",
            pos: "noun",
            cefrLevel: "B1",
            examRef: "TGAT1 Campus"
      },
      {
            word: "paramount",
            meaningTh: "สำคัญที่สุด / มีความสำคัญยิ่งยวด",
            pos: "adjective",
            cefrLevel: "B2",
            examRef: "CU-TEP / IELTS 7.0"
      },
      {
            word: "contingency",
            meaningTh: "แผนสำรองฉุกเฉินกรณีเกิดเหตุไม่คาดคิด",
            pos: "noun",
            cefrLevel: "B2",
            examRef: "TGAT1 Business"
      }
],
    dialogue: [
      {
        speaker: 'Meena',
        text: 'Dan, we have an emergency. The university administration just notified us that the central auditorium is unavailable this Saturday because of unscheduled roof renovations.',
        translationTh: 'แดน เรามีเรื่องด่วนแล้วล่ะ ฝ่ายบริหารมหาวิทยาลัยเพิ่งแจ้งมาว่าหอประชุมใหญ่ไม่สามารถใช้งานได้ในวันเสาร์นี้เพราะมีการซ่อมแซมหลังคาแบบกะทันหัน',
      },
      {
        speaker: 'Dan',
        text: 'You cannot be serious! We have over forty international student volunteers and five local charity booths arriving at 9 AM. Did they offer an alternative venue?',
        translationTh: 'เธอพูดจริงหรือเนี่ย! เรามีอาสาสมัครนักศึกษาต่างชาติกว่า 40 คน และบูธการกุศลท้องถิ่น 5 บูธที่จะมาถึงตอน 9 โมงเช้า ทางมหาลัยเสนอสถานที่สำรองให้ไหม?',
      },
      {
        speaker: 'Meena',
        text: 'They offered the open-air pavilion beside the lotus pond, or the second-floor lobby of the Faculty of Humanities. The open-air pavilion is spacious, but weather forecasts predict an eighty percent chance of afternoon thunderstorms.',
        translationTh: 'พวกเขาเสนอศาลาริมสระบัว หรือไม่ก็โถงชั้นสองของคณะมนุษยศาสตร์ ศาลากลางแจ้งกว้างขวางดีแต่พยากรณ์อากาศบอกว่ามีโอกาสฝนฟ้าคะนองถึง 80% ในช่วงบ่าย',
      },
      {
        speaker: 'Dan',
        text: 'Then the Humanities lobby is a no-brainer. Even if it is slightly more compact, having reliable shelter and power outlets for our microphones and acoustic speakers is paramount.',
        translationTh: 'ถ้าอย่างนั้นโถงคณะมนุษย์ก็เป็นคำตอบที่ไม่ต้องคิดมากเลย ถึงแม้จะแคบกว่าหน่อย แต่การมีหลังคาที่กันฝนได้และมีปลั๊กไฟสำหรับไมโครโฟนกับลำโพงเป็นสิ่งสำคัญที่สุด',
      },
      {
        speaker: 'Meena',
        text: 'I couldn\'t agree more. I will submit the venue change confirmation to the student affairs division right away and draft a broadcast notification for our registered guests.',
        translationTh: 'เห็นด้วยเป็นอย่างยิ่งเลย เดี๋ยวฉันจะส่งแบบยืนยันเปลี่ยนสถานที่ให้ฝ่ายกิจการนักศึกษาทันที และจะร่างข้อความแจ้งเตือนกระจายให้แขกที่ลงทะเบียนไว้ทุกคนทราบจ้ะ',
      },
      {
        speaker: 'Dan',
        text: 'Great. Meanwhile, I will coordinate with the volunteer team to set up signage at the original auditorium entrance directing attendees across to the Humanities building.',
        translationTh: 'เยี่ยมเลย ในระหว่างนี้ ฉันจะประสานงานกับทีมอาสาสมัครเพื่อไปตั้งป้ายบอกทางตรงหน้าทางเข้าหอประชุมเดิม เพื่อนำทางผู้ร่วมงานข้ามไปยังตึกคณะมนุษย์นะ',
      },
    ],
    questions: [
      {
        id: 'q_lc4_1',
        question: 'Why can the English Club no longer hold their event in the central auditorium?',
        options: {
          A: 'They forgot to submit their rental payment on time.',
          B: 'The venue is undergoing unexpected emergency roof repairs.',
          C: 'The charity foundation canceled the festival.',
          D: 'A rival campus club booked the hall before them.',
        },
        correctOption: 'B',
        explanation: 'มีนาระบุเหตุผลว่า: "...the central auditorium is unavailable this Saturday because of unscheduled roof renovations."',
        optionExplanations: {
          A: 'ผิด: ไม่ได้มีปัญหาเรื่องการจ่ายเงินล่าช้า',
          B: 'ถูกต้อง: ทางมหาวิทยาลัยปิดซ่อมแซมหลังคาอย่างกะทันหัน',
          C: 'ผิด: งานไม่ได้ถูกยกเลิก แต่ต้องย้ายสถานที่',
          D: 'ผิด: ไม่ได้มีชมรมอื่นมาจองตัดหน้า',
        },
        skillCategory: 'Context Understanding',
      },
      {
        id: 'q_lc4_2',
        question: 'What does Dan mean when he states that choosing the Humanities lobby is a "no-brainer"?',
        options: {
          A: 'It requires absolutely no preparation or effort.',
          B: 'It is an obvious, logical decision that requires little debate.',
          C: 'It is a foolish and reckless mistake.',
          D: 'Nobody on the committee possesses enough intelligence to choose.',
        },
        correctOption: 'B',
        explanation: 'สำนวน "a no-brainer" หมายถึง การตัดสินใจที่ชัดเจน ง่าย และสมเหตุสมผลจนแทบไม่ต้องเสียเวลาคิด (ในกรณีนี้คือการเลือกห้องในร่มเพื่อเลี่ยงฝนตก)',
        optionExplanations: {
          A: 'ผิด: งานยังคงต้องใช้ความพยายามในการจัดสถานที่',
          B: 'ถูกต้อง: เป็นการตัดสินใจที่เห็นได้ชัดเจนว่าเป็นทางเลือกที่ดีที่สุด',
          C: 'ผิด: ความหมายตรงกันข้ามกับสำนวน',
          D: 'ผิด: เป็นการแปลคำว่า brain ในเชิงดูถูกความฉลาด ซึ่งไม่ใช่ความหมายของสำนวนนี้',
        },
        skillCategory: 'Expression',
      },
      {
        id: 'q_lc4_3',
        question: 'What proactive measure will Dan undertake to prevent attendees from getting lost?',
        options: {
          A: 'Hire shuttle buses to transport attendees across the city.',
          B: 'Station volunteer guides and erect signage at the original venue redirecting visitors.',
          C: 'Call each attendee individually via telephone on Friday night.',
          D: 'Refund everyone\'s tickets and reschedule for next year.',
        },
        correctOption: 'B',
        explanation: 'แดนกล่าวว่า: "I will coordinate with the volunteer team to set up signage at the original auditorium entrance directing attendees across to the Humanities building."',
        optionExplanations: {
          A: 'ผิด: ตึกคณะมนุษยศาสตร์อยู่ในมหาวิทยาลัยเดียวกัน ไม่ต้องใช้รถบัสข้ามเมือง',
          B: 'ถูกต้อง: ติดตั้งป้ายบอกทางและจัดทีมอาสาสมัครคอยแนะนำที่หน้าหอประชุมเดิม',
          C: 'ผิด: ไม่ได้โทรหาเป็นรายบุคคล',
          D: 'ผิด: งานไม่ได้ถูกยกเลิก',
        },
        skillCategory: 'Appropriate Response',
      },
    ],
  },
  {
    id: 'conv_long_5',
    type: 'long',
    title: 'Long 5: TGAT Exam Prep Strategy & Tackling Weak Points',
    situation: 'Two high school friends, Fah and Ohm, meet at a quiet coffee corner to evaluate their diagnostic mock test scores and redesign their study schedule.',
    difficulty: 'B2',
    source: 'Official Mock',
    examReference: 'TGAT1 Long Conversation (Diagnostic Exam Review & Peer Strategy) • CEFR B2',
    keyVocab: [
      {
            word: "reciprocal",
            meaningTh: "ซึ่งกันและกัน / ตอบแทนซึ่งกันและกัน",
            pos: "adjective",
            cefrLevel: "B2",
            examRef: "CU-TEP / TGAT1"
      },
      {
            word: "accountable",
            meaningTh: "มีความรับผิดชอบ / คอยเตือนสติให้ทำตามเป้า",
            pos: "adjective",
            cefrLevel: "B2",
            examRef: "TGAT1 Social"
      },
      {
            word: "distractor",
            meaningTh: "ตัวเลือกหลอกในข้อสอบ",
            pos: "noun",
            cefrLevel: "B2",
            examRef: "TGAT1 Exam Prep"
      },
      {
            word: "plunge",
            meaningTh: "ลดลงอย่างรวดเร็ว / ร่วงฮวบ",
            pos: "verb",
            cefrLevel: "B2",
            examRef: "A-Level / IELTS"
      }
],
    dialogue: [
      {
        speaker: 'Fah',
        text: 'Ohm, did you analyze your breakdown from yesterday\'s TGAT1 mock exam? I scored well on vocabulary, but my accuracy plunged to forty percent in the Speaker Intention section.',
        translationTh: 'โอม เธอได้วิเคราะห์ผลคะแนนแยกตามพาร์ทจากการสอบจำลอง TGAT1 เมื่อวานหรือยัง? ฉันทำคำศัพท์ได้ดีนะ แต่พอเป็นพาร์ทเจตนาผู้พูด (Speaker Intention) ความถูกต้องหล่นฮวบเหลือแค่สี่สิบเปอร์เซ็นต์เอง',
      },
      {
        speaker: 'Ohm',
        text: 'I had the exact opposite issue! I nailed the dialogues because I watch plenty of English sitcoms, but the academic reading passages overwhelmed me with unfamiliar prefixes and idiomatic phrases.',
        translationTh: 'ฉันเจอปัญหาตรงข้ามเป๊ะเลย! ฉันทำบทสนทนาได้สบายมากเพราะดูซีรีส์ซิทคอมภาษาอังกฤษบ่อย แต่พอเป็นบทความวิชาการ ฉันรู้สึกมึนตึ้บกับคำศัพท์ที่มี prefix แปลกๆ และสำนวนที่ไม่คุ้นเคย',
      },
      {
        speaker: 'Fah',
        text: 'That actually gives us a golden opportunity. What if we adopt a reciprocal tutoring system? You can coach me on decoding conversational tones and register, while I quiz you with my Spaced Repetition flashcards every evening.',
        translationTh: 'นั่นเป็นโอกาสทองของพวกเราเลยนะ ถ้าพวกเราใช้ระบบติวแลกเปลี่ยนกันล่ะ? เธอช่วยสอนฉันเรื่องการจับน้ำเสียงและระดับความสุภาพในบทสนทนา ส่วนฉันจะคอยทบทวนแฟลชการ์ดคำศัพท์ระบบ SRS กับเธอทุกเย็น',
      },
      {
        speaker: 'Ohm',
        text: 'Count me in! Consistency is where I struggle most. If we hold each other accountable for thirty minutes daily on Discord, we will be in prime shape before test day.',
        translationTh: 'เอาด้วยเลย! ความสม่ำเสมอคือจุดที่ฉันมีปัญหามากที่สุด ถ้าพวกเราช่วยกันกระตุ้นและเตือนกันวันละ 30 นาทีบน Discord พวกเราจะพร้อมเต็มร้อยก่อนวันสอบแน่นอน',
      },
      {
        speaker: 'Fah',
        text: 'Terrific. Let\'s also set a rule that whenever we get a mock question wrong, we must write down why the correct option works and why the distractors failed in our Mistake Notebook.',
        translationTh: 'ยอดเยี่ยมเลย งั้นเรามาตั้งกฎกันด้วยว่า เมื่อไหร่ก็ตามที่ทำข้อสอบจำลองผิด เราต้องเขียนเหตุผลลงในสมุดบันทึกข้อผิดพลาด ว่าทำไมข้อที่ถูกถึงใช่ และทำไมตัวเลือกหลอกถึงผิด',
      },
      {
        speaker: 'Ohm',
        text: 'Agreed. That tackles the root cause instead of just guessing blindly. Let\'s start our first drill tonight at 8 PM!',
        translationTh: 'เห็นด้วยเลย นั่นคือการแก้ปัญหาที่ต้นเหตุแทนที่จะมานั่งเดาสุ่ม คืนนี้สองทุ่มเริ่มฝึกเซ็ตแรกกันเลยนะ!',
      },
    ],
    questions: [
      {
        id: 'q_lc5_1',
        question: 'What complementary strengths do Fah and Ohm bring to their joint study plan?',
        options: {
          A: 'Fah excels at sports while Ohm excels at mathematics.',
          B: 'Fah is strong in vocabulary while Ohm is skilled in conversational nuances and register.',
          C: 'Both students scored 100% and have nothing left to improve.',
          D: 'Ohm speaks French while Fah speaks German.',
        },
        correctOption: 'B',
        explanation: 'ฟ้าบอกว่าตัวเองทำคำศัพท์ได้ดี ("scored well on vocabulary") ในขณะที่โอมบอกว่าทำบทสนทนาได้ดีเพราะดูซิทคอมบ่อย ทั้งสองจึงมีความถนัดคนละด้านที่มาเติมเต็มกันได้',
        optionExplanations: {
          A: 'ผิด: ทั้งสองกำลังติวภาษาอังกฤษ ไม่ใช่กีฬาหรือคณิตศาสตร์',
          B: 'ถูกต้อง: ฟ้าเด่นคำศัพท์ ส่วนโอมเข้าใจบริบทบทสนทนาและน้ำเสียงผู้พูด',
          C: 'ผิด: ทั้งสองยังมีจุดอ่อนที่ต้องพัฒนา (ฟ้าได้ 40% ในพาร์ทเจตนาผู้พูด โอมอ่อนบทความวิชาการ)',
          D: 'ผิด: ไม่เกี่ยวข้องกับภาษาฝรั่งเศสหรือเยอรมัน',
        },
        skillCategory: 'Context Understanding',
      },
      {
        id: 'q_lc5_2',
        question: 'In the dialogue, what does Fah mean by proposing a "reciprocal tutoring system"?',
        options: {
          A: 'Hiring an expensive private tutor from an elite academy.',
          B: 'A mutual arrangement where each student teaches the other in their area of strength.',
          C: 'Refusing to share any notes or study materials.',
          D: 'Taking turns taking exams on each other\'s behalf.',
        },
        correctOption: 'B',
        explanation: 'คำว่า "reciprocal" แปลว่า ซึ่งกันและกัน ดังนั้น reciprocal tutoring คือการที่ต่างฝ่ายต่างช่วยติวในวิชาหรือเรื่องที่ตนเองถนัดให้แก่อีกฝ่าย',
        optionExplanations: {
          A: 'ผิด: ไม่ได้จ้างติวเตอร์ภายนอก',
          B: 'ถูกต้อง: ติวแลกเปลี่ยนกัน โดยแต่ละคนสอนในส่วนที่ตนเองถนัด',
          C: 'ผิด: ขัดแย้งกับการร่วมมือกัน',
          D: 'ผิด: เป็นการทุจริตการสอบและไม่ใช่ความหมายของระบบนี้',
        },
        skillCategory: 'Vocabulary',
      },
      {
        id: 'q_lc5_3',
        question: 'Why does Ohm emphasize holding each other accountable on Discord?',
        options: {
          A: 'To play multi-player video games during study hours.',
          B: 'Because maintaining daily study consistency is his biggest hurdle.',
          C: 'To complain about their high school teachers anonymously.',
          D: 'Because they are forbidden from studying in person.',
        },
        correctOption: 'B',
        explanation: 'โอมกล่าวว่า: "Consistency is where I struggle most. If we hold each other accountable for thirty minutes daily on Discord..."',
        optionExplanations: {
          A: 'ผิด: ไม่ได้ชวนเล่นเกม',
          B: 'ถูกต้อง: เพราะความสม่ำเสมอเป็นสิ่งที่โอมควบคุมตัวเองได้ยาก จึงต้องมีเพื่อนช่วยกระตุ้น',
          C: 'ผิด: ไม่ได้นินทาอาจารย์',
          D: 'ผิด: ไม่ได้มีข้อห้ามพบปะกัน',
        },
        skillCategory: 'Speaker Intention',
      },
      {
        id: 'q_lc5_4',
        question: 'What strategy do the friends agree to implement regarding mock exam mistakes?',
        options: {
          A: 'Erase all incorrect answers and pretend they never happened.',
          B: 'Analyze why the right answer is correct and why the distractors failed in a Mistake Notebook.',
          C: 'Dispute the test score with the test manufacturer.',
          D: 'Give up studying whenever they get three consecutive questions wrong.',
        },
        correctOption: 'B',
        explanation: 'ฟ้าเสนอและโอมเห็นชอบว่า: "write down why the correct option works and why the distractors failed in our Mistake Notebook... tackles the root cause"',
        optionExplanations: {
          A: 'ผิด: ไม่ใช่การลบทิ้งเพื่อหนีปัญหา',
          B: 'ถูกต้อง: วิเคราะห์เหตุผลทั้งข้อที่ถูกและตัวเลือกหลอกลงในสมุดบันทึกข้อผิดพลาดเพื่อแก้ที่ต้นเหตุ',
          C: 'ผิด: ไม่ได้ไปร้องเรียนข้อสอบ',
          D: 'ผิด: ทั้งสองตั้งใจฝึกอย่างจริงจัง',
        },
        skillCategory: 'Appropriate Response',
      },
    ],
  },
  {
    "id": "conv_short_11",
    "type": "short",
    "title": "Short 11: Inquiring About an Internship Opportunity",
    "situation": "At a University Career Fair, a student approaches a recruiter from a multinational firm.",
    "difficulty": "B2",
    "source": "Practice Bank",
    "examReference": "TGAT1 Blueprint พาร์ท Situational Dialogue (Career & Networking) • CEFR B2",
    "keyVocab": [
      {
        "word": "prospective",
        "meaningTh": "ที่คาดหวังไว้ / ผู้มีโอกาสเป็นลูกค้าหรือพนักงาน",
        "pos": "adjective",
        "cefrLevel": "B2",
        "examRef": "TGAT1 Business"
      },
      {
        "word": "eligibility",
        "meaningTh": "คุณสมบัติที่เหมาะสม / ความมีสิทธิ์",
        "pos": "noun",
        "cefrLevel": "B2",
        "examRef": "TGAT1 Career"
      }
    ],
    "dialogue": [
      {
        "speaker": "Student (Krit)",
        "text": "Good morning! I am a third-year data science major, and I am genuinely keen on your summer analytics program.",
        "translationTh": "สวัสดีตอนเช้าครับ! ผมเป็นนักศึกษาชั้นปีที่ 3 สาขาวิทยาการข้อมูล และสนใจโครงการวิเคราะห์ข้อมูลภาคฤดูร้อนของบริษัทคุณมากครับ"
      },
      {
        "speaker": "Recruiter (Ms. Jenkins)",
        "text": "Fantastic! We love proactive applicants. Have you already had a chance to look over our minimum eligibility criteria online?",
        "translationTh": "ยอดเยี่ยมเลยค่ะ! พวกเราชอบผู้สมัครที่มีความกระตือรือร้นล่วงหน้า คุณได้ลองดูเกณฑ์คุณสมบัติขั้นต่ำบนเว็บไซต์มาแล้วหรือยังคะ?"
      },
      {
        "speaker": "Student (Krit)",
        "text": "[ _______________ ]",
        "translationTh": "[ ...คำตอบของกฤต... ]"
      }
    ],
    "questions": [
      {
        "id": "q_conv_short_11_1",
        "question": "What is the most professional response for Krit to demonstrate readiness and polite initiative?",
        "options": {
          "A": "Yes, I reviewed them carefully yesterday, and I believe my coursework in Python and SQL satisfies all requirements.",
          "B": "No, I didn’t bother reading that because I figured you would just tell me everything right now.",
          "C": "Who cares about requirements as long as you pay good stipends to interns?",
          "D": "I think job requirements are usually exaggerated anyway, so I didn’t read them."
        },
        "correctOption": "A",
        "explanation": "ตัวเลือก A สุภาพและเป็นมืออาชีพ (Formal & Prepared) แสดงให้เห็นว่าทำการบ้านล่วงหน้า และนำเสนอจุดแข็งที่ตรงกับคุณสมบัติของตำแหน่ง",
        "optionExplanations": {
          "A": "ถูกต้อง แสดงความพร้อมและความรอบคอบตรงตามบริบทการสมัครงาน",
          "B": "ไม่เหมาะสม แสดงความเกียจคร้านและไม่ใส่ใจ",
          "C": "ไม่สุภาพอย่างยิ่ง มุ่งเน้นเรื่องเงินจนเสียมารยาท",
          "D": "มีทัศนคติเชิงลบต่อองค์กร"
        },
        "skillCategory": "Appropriate Response"
      }
    ]
  },
  {
    "id": "conv_short_12",
    "type": "short",
    "title": "Short 12: Returning a Defective Item at a Department Store",
    "situation": "A customer approaches the customer service counter to return a recently purchased bluetooth speaker that does not charge.",
    "difficulty": "B1",
    "source": "Practice Bank",
    "examReference": "TGAT1 Daily Life Situations (Customer Service & Complaints) • CEFR B1",
    "keyVocab": [
      {
        "word": "malfunction",
        "meaningTh": "ทำงานผิดปกติ / ขัดข้อง",
        "pos": "verb",
        "cefrLevel": "B1",
        "examRef": "TGAT1 Consumer"
      },
      {
        "word": "receipt",
        "meaningTh": "ใบเสร็จรับเงิน",
        "pos": "noun",
        "cefrLevel": "A2",
        "examRef": "TGAT1 Shopping"
      }
    ],
    "dialogue": [
      {
        "speaker": "Customer",
        "text": "Excuse me. I bought this speaker yesterday, but when I plugged it in overnight, the battery wouldn’t hold any charge.",
        "translationTh": "ขอโทษนะคะ ฉันเพิ่งซื้อลำโพงนี้ไปเมื่อวาน แต่พอเสียบชาร์จทิ้งไว้ข้ามคืน แบตเตอรี่กลับไม่เก็บไฟเลยค่ะ"
      },
      {
        "speaker": "Service Agent",
        "text": "I am terribly sorry about the inconvenience! As long as you have the original receipt and packaging, we can replace it immediately.",
        "translationTh": "ต้องกราบขออภัยในความไม่สะดวกด้วยครับ! ตราบใดที่คุณลูกค้ามีใบเสร็จตัวจริงและกล่องบรรจุภัณฑ์ เราสามารถเปลี่ยนเครื่องใหม่ให้ได้ทันทีครับ"
      },
      {
        "speaker": "Customer",
        "text": "[ _______________ ]",
        "translationTh": "[ ...คำตอบของลูกค้า... ]"
      }
    ],
    "questions": [
      {
        "id": "q_conv_short_12_1",
        "question": "Which option represents the most appropriate response?",
        "options": {
          "A": "That sounds perfect. Here are both the purchase receipt and the original box.",
          "B": "Why do you ask for receipt? You should remember my face from yesterday!",
          "C": "I threw everything away into the trash bin outside.",
          "D": "Never mind, I will just call the police on your store."
        },
        "correctOption": "A",
        "explanation": "ตัวเลือก A ตอบรับความช่วยเหลืออย่างสุภาพและส่งมอบหลักฐานตามที่เจ้าหน้าที่ร้องขออย่างครบถ้วน",
        "optionExplanations": {
          "A": "ถูกต้อง ตอบรับอย่างสุภาพและมีหลักฐานครบถ้วน",
          "B": "ไม่สุภาพและไม่มีเหตุผล",
          "C": "ทำให้ไม่สามารถดำเนินการเปลี่ยนสินค้าได้ตามเงื่อนไข",
          "D": "ตอบสนองเกินกว่าเหตุ (Overreacting)"
        },
        "skillCategory": "Context Understanding"
      }
    ]
  },
  {
    "id": "conv_long_6",
    "type": "long",
    "title": "Long 6: Coordinating a Campus Charity Blood Drive",
    "situation": "Two student council representatives are organizing logistics for an upcoming annual Red Cross Blood Drive.",
    "difficulty": "B2",
    "source": "Practice Bank",
    "examReference": "TGAT1 Campus & Project Coordination • CEFR B2",
    "keyVocab": [
      {
        "word": "volunteer",
        "meaningTh": "อาสาสมัคร",
        "pos": "noun",
        "cefrLevel": "B1",
        "examRef": "TGAT1 Campus"
      },
      {
        "word": "registration",
        "meaningTh": "การลงทะเบียน",
        "pos": "noun",
        "cefrLevel": "A2",
        "examRef": "TGAT1 Campus"
      },
      {
        "word": "contingency",
        "meaningTh": "แผนสำรองฉุกเฉิน",
        "pos": "noun",
        "cefrLevel": "B2",
        "examRef": "TGAT1 Project"
      }
    ],
    "dialogue": [
      {
        "speaker": "Nicha (Event Lead)",
        "text": "Art, the Red Cross medical team just notified us that they are bringing 8 donation beds instead of 5.",
        "translationTh": "อาร์ตคะ ทีมแพทย์สภากาชาดเพิ่งแจ้งมาว่าพวกเขาจะนำเตียงรับบริจาคมา 8 เตียงแทนที่จะเป็น 5 เตียงค่ะ"
      },
      {
        "speaker": "Art (Logistics)",
        "text": "That is wonderful news because our donor pre-registration numbers are higher than expected!",
        "translationTh": "เป็นข่าวดีมากเลยครับ เพราะยอดลงทะเบียนล่วงหน้าของผู้บริจาคเราสูงกว่าที่คาดไว้เยอะเลย!"
      },
      {
        "speaker": "Nicha (Event Lead)",
        "text": "Yes, but the main multipurpose hall might feel congested. Should we relocate the recovery snack station to the foyer?",
        "translationTh": "ใช่ค่ะ แต่หอประชุมอเนกประสงค์หลักอาจจะดูแออัดไป เราควรย้ายจุดพักรับประทานของว่างไปไว้ตรงโถงทางเข้าดีไหมคะ?"
      },
      {
        "speaker": "Art (Logistics)",
        "text": "That makes total sense. Moving the snack area outside frees up ample space for the medical beds and screening booths.",
        "translationTh": "เห็นด้วยอย่างยิ่งเลยครับ การย้ายมุมของว่างออกไปข้างนอกจะช่วยเพิ่มพื้นที่กว้างขวางสำหรับเตียงแพทย์และจุดคัดกรอง"
      }
    ],
    "questions": [
      {
        "id": "q_conv_long_6_1",
        "question": "Why did Nicha propose moving the recovery snack station?",
        "options": {
          "A": "To prevent congestion inside the main hall after bed count increased.",
          "B": "Because the donors complained about the food choices.",
          "C": "Because the event was cancelled by the university.",
          "D": "To charge students for eating snacks."
        },
        "correctOption": "A",
        "explanation": "ในบทสนทนาณิชาระบุว่าจำนวนเตียงเพิ่มเป็น 8 เตียง หอประชุมอาจจะแออัด (congested) จึงเสนอให้ย้ายจุดของว่างไปโถงทางเข้า",
        "optionExplanations": {
          "A": "ถูกต้อง ตรงตามบทสนทนาที่พูดถึงความแออัด",
          "B": "ผิด ไม่มีการร้องเรียนเรื่องอาหาร",
          "C": "ผิด งานไม่ได้ถูกยกเลิก",
          "D": "ผิด งานจิตอาสาไม่มีการเก็บเงิน"
        },
        "skillCategory": "Context Understanding"
      },
      {
        "id": "q_conv_long_6_2",
        "question": "What was Art’s attitude toward the increase in donation beds?",
        "options": {
          "A": "Relieved and pleased, since pre-registration numbers were high.",
          "B": "Annoyed and reluctant to do extra work.",
          "C": "Indifferent and distracted.",
          "D": "Angry at the medical team for changing plans."
        },
        "correctOption": "A",
        "explanation": "อาร์ตกล่าวว่า That is wonderful news แสดงความพึงพอใจและโล่งใจที่รองรับจำนวนคนลงทะเบียนได้ทัน",
        "optionExplanations": {
          "A": "ถูกต้อง แสดงความโล่งใจและยินดีต่อข่าวดังกล่าว",
          "B": "ผิด ไม่ได้แสดงความรำคาญ",
          "C": "ผิด มีความกระตือรือร้นในการจัดสถานที่",
          "D": "ผิด ไม่ได้โกรธทีมแพทย์"
        },
        "skillCategory": "Speaker Intention"
      }
    ]
  }
];

