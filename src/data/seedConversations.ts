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
];

