import { Lesson, Flashcard, QuizQuestion, DialogueScenario } from '../types';

export const MOT_DU_JOUR = {
  french: 'Éphémère',
  phonetic: '/e.fe.mɛʁ/',
  gender: 'adj.',
  vietnamese: 'Phù du, chóng tàn, ngắn ngủi nhưng đẹp đẽ',
  exampleFrench: 'La beauté des fleurs de cerisier est éphémère.',
  exampleVietnamese: 'Vẻ đẹp của hoa anh đào thật phù du và ngắn ngủi.'
};

export const FLASHCARDS_DATA: Flashcard[] = [
  {
    id: 'fc-1',
    french: 'Bonjour',
    phonetic: '/bɔ̃.ʒuʁ/',
    gender: 'm',
    vietnamese: 'Xin chào (ban ngày) / Chúc một ngày tốt lành',
    exampleFrench: 'Bonjour Madame, comment allez-vous ?',
    exampleVietnamese: 'Xin chào bà, bà có khỏe không?',
    category: 'Chào hỏi',
    level: 'A1'
  },
  {
    id: 'fc-2',
    french: 'Merci beaucoup',
    phonetic: '/mɛʁ.si bo.ku/',
    vietnamese: 'Cảm ơn bạn rất nhiều',
    exampleFrench: 'Merci beaucoup pour votre aide précieuse.',
    exampleVietnamese: 'Cảm ơn bạn rất nhiều vì sự giúp đỡ quý báu.',
    category: 'Chào hỏi',
    level: 'A1'
  },
  {
    id: 'fc-3',
    french: "S'il vous plaît",
    phonetic: '/sil vu plɛ/',
    vietnamese: 'Làm ơn / Xin vui lòng (lịch sự)',
    exampleFrench: 'Un café noir, s’il vous plaît.',
    exampleVietnamese: 'Làm ơn cho tôi một tách cà phê đen.',
    category: 'Chào hỏi',
    level: 'A1'
  },
  {
    id: 'fc-4',
    french: 'Un croissant',
    phonetic: '/œ̃ kʁwa.sɑ̃/',
    gender: 'm',
    vietnamese: 'Bánh sừng bò (đặc sản Pháp)',
    exampleFrench: 'Je voudrais deux croissants croustillants.',
    exampleVietnamese: 'Tôi muốn hai chiếc bánh sừng bò giòn rụm.',
    category: 'Ẩm thực',
    level: 'A1'
  },
  {
    id: 'fc-5',
    french: 'L’amour',
    phonetic: '/la.muʁ/',
    gender: 'm',
    vietnamese: 'Tình yêu',
    exampleFrench: 'Paris est souvent appelée la ville de l’amour.',
    exampleVietnamese: 'Paris thường được gọi là thành phố tình yêu.',
    category: 'Đời sống',
    level: 'A1'
  },
  {
    id: 'fc-6',
    french: 'Enchanté(e)',
    phonetic: '/ɑ̃.ʃɑ̃.te/',
    vietnamese: 'Rất hân hạnh được gặp bạn',
    exampleFrench: 'Enchanté de faire votre connaissance.',
    exampleVietnamese: 'Rất hân hạnh được làm quen với bạn.',
    category: 'Chào hỏi',
    level: 'A1'
  },
  {
    id: 'fc-7',
    french: 'L’addition',
    phonetic: '/la.di.sjɔ̃/',
    gender: 'f',
    vietnamese: 'Hóa đơn tính tiền (nhà hàng, quán ăn)',
    exampleFrench: 'Garçon, l’addition s’il vous plaît !',
    exampleVietnamese: 'Phục vụ ơi, vui lòng tính tiền giúp tôi!',
    category: 'Ẩm thực',
    level: 'A2'
  },
  {
    id: 'fc-8',
    french: 'Flâner',
    phonetic: '/flɑ.ne/',
    vietnamese: 'Đi dạo thong thả, tản bộ không mục đích',
    exampleFrench: 'J’adore flâner le long de la Seine le dimanche.',
    exampleVietnamese: 'Tôi rất thích tản bộ thong dong dọc bờ sông Seine vào Chủ nhật.',
    category: 'Văn hóa',
    level: 'B1'
  },
  {
    id: 'fc-9',
    french: 'Dépaysement',
    phonetic: '/de.pɛ.iz.mɑ̃/',
    gender: 'm',
    vietnamese: 'Cảm giác lạ lẫm, mới mẻ khi đến một vùng đất xa lạ',
    exampleFrench: 'Ce voyage en Provence était un pur dépaysement.',
    exampleVietnamese: 'Chuyến đi tới Provence mang lại cảm giác đổi gió hoàn toàn mới lạ.',
    category: 'Du lịch',
    level: 'B1'
  },
  {
    id: 'fc-10',
    french: 'La boulangerie',
    phonetic: '/la bu.lɑ̃ʒ.ʁi/',
    gender: 'f',
    vietnamese: 'Tiệm bánh mì Pháp',
    exampleFrench: 'L’odeur du pain chaud sort de la boulangerie.',
    exampleVietnamese: 'Mùi bánh mì nóng hổi thơm phức bay ra từ tiệm bánh.',
    category: 'Ẩm thực',
    level: 'A1'
  }
];

export const LESSONS_DATA: Lesson[] = [
  {
    id: 'les-1',
    level: 'A1',
    title: '1. Nhập môn & Chào hỏi chuẩn Paris',
    subTitle: 'Les Salutations & Présentations',
    description: 'Học cách chào hỏi cơ bản, tự giới thiệu tên tuổi, nghề nghiệp và quốc tịch một cách tự nhiên và lịch sự.',
    category: 'Giao tiếp',
    icon: '👋',
    duration: '15 phút',
    xpReward: 50,
    progress: 100,
    topics: ['Chào hỏi trang trọng vs thân mật', 'Động từ S’appeler & Être', 'Cách hỏi tên tuổi']
  },
  {
    id: 'les-2',
    level: 'A1',
    title: '2. Số đếm & Cách gọi món tại Quán Café',
    subTitle: 'Commander au Café Parisien',
    description: 'Nắm vững các con số từ 1 đến 100, cách gọi món nước, bánh ngọt và hỏi giá tiền lịch sự.',
    category: 'Ẩm thực',
    icon: '☕',
    duration: '20 phút',
    xpReward: 60,
    progress: 40,
    topics: ['Số đếm 1-100', 'Mẫu câu "Je voudrais..."', 'Cách hỏi giá "C’est combien ?"']
  },
  {
    id: 'les-3',
    level: 'A1',
    title: '3. Giới tính của Danh từ & Mạo từ',
    subTitle: 'Le genre des noms: Un, Une, Le, La',
    description: 'Quy tắc vàng phân biệt giống đực (Masculin) và giống cái (Féminin) trong tiếng Pháp kèm các mẹo nhớ nhanh.',
    category: 'Ngữ pháp',
    icon: '📚',
    duration: '25 phút',
    xpReward: 75,
    progress: 0,
    topics: ['Mạo từ xác định (Le/La/Les)', 'Mạo từ bất định (Un/Une/Des)', 'Quy tắc đuôi từ']
  },
  {
    id: 'les-4',
    level: 'A2',
    title: '4. Hỏi đường & Di chuyển bằng Metro',
    subTitle: 'Prendre le Métro & Demander le chemin',
    description: 'Tự tin vi vu khắp Paris bằng hệ thống tàu điện ngầm Metro và cách hỏi đường người bản xứ.',
    category: 'Du lịch',
    icon: '🚇',
    duration: '25 phút',
    xpReward: 80,
    progress: 0,
    topics: ['Các hướng: À gauche, À droite, Tout droit', 'Từ vựng Metro & Ga tàu', 'Động từ Aller & Prendre']
  },
  {
    id: 'les-5',
    level: 'B1',
    title: '5. Diễn tả quá khứ với Passé Composé',
    subTitle: 'Raconter ses vacances au passé',
    description: 'Chinh phục thì quá khứ thông dụng nhất trong tiếng Pháp, kết hợp với trợ động từ Avoir và Être.',
    category: 'Ngữ pháp',
    icon: '⏳',
    duration: '35 phút',
    xpReward: 100,
    progress: 0,
    topics: ['Cấu trúc Passé Composé', 'Bảng động từ đi với Être (Nhà Dr. & Mrs. Vandertramp)', 'Phù hợp giống số Participe Passé']
  },
  {
    id: 'les-6',
    level: 'B2',
    title: '6. Tranh luận & Bày tỏ quan điểm',
    subTitle: 'Débattre et exprimer son opinion',
    description: 'Sử dụng các cấu trúc Subjonctif nâng cao để bảo vệ quan điểm trong các cuộc trò chuyện sâu sắc.',
    category: 'Văn hóa',
    icon: '🎭',
    duration: '40 phút',
    xpReward: 120,
    progress: 0,
    topics: ['Cấu trúc Il faut que...', 'Biểu đạt đồng tình / phản biện', 'Subjonctif Présent cơ bản']
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-1',
    question: 'Khi gặp một người lớn tuổi hoặc đối tác vào buổi chiều, câu chào nào sau đây lịch sự và phù hợp nhất?',
    frenchPrompt: 'Saluer poliment une personne l’après-midi',
    options: ['Salut !', 'Bonjour Monsieur / Madame', 'Coucou !', 'À plus tard !'],
    correctAnswer: 1,
    explanation: '"Bonjour Monsieur/Madame" là lời chào trang trọng, chuẩn mực nhất khi giao tiếp với người lớn hoặc đối tác.',
    xp: 20
  },
  {
    id: 'q-2',
    question: 'Để gọi một chiếc bánh sừng bò trong tiệm bánh (Boulangerie), bạn sẽ nói câu nào?',
    frenchPrompt: 'Commander à la boulangerie',
    options: [
      'Je prends la lune, s’il vous plaît.',
      'Je voudrais un croissant, s’il vous plaît.',
      'Tu me donnes un croissant ?',
      'Donne-moi ça vite.'
    ],
    correctAnswer: 1,
    explanation: '"Je voudrais..." (Tôi muốn...) là cách diễn đạt thể điều kiện (Conditionnel de politesse) cực kỳ lịch sự của người Pháp.',
    xp: 20
  },
  {
    id: 'q-3',
    question: 'Từ "Tour Eiffel" trong tiếng Pháp mang giống gì và đi với mạo từ xác định nào?',
    frenchPrompt: 'Le genre de "Tour Eiffel"',
    options: ['Le Tour Eiffel (Giống đực)', 'La Tour Eiffel (Giống cái)', 'Un Tour Eiffel (Bất định)', 'Les Tour Eiffel (Số nhiều)'],
    correctAnswer: 1,
    explanation: '"Tour" trong nghĩa tháp là danh từ giống cái (Une tour), vì vậy phải dùng "La Tour Eiffel".',
    xp: 20
  },
  {
    id: 'q-4',
    question: 'Câu nào sau đây có nghĩa là "Làm ơn cho tôi xin hóa đơn tính tiền"?',
    frenchPrompt: 'Demander l’addition au restaurant',
    options: [
      'Où sont les toilettes ?',
      'L’addition, s’il vous plaît !',
      'C’est délicieux !',
      'Je veux un autre verre.'
    ],
    correctAnswer: 1,
    explanation: '"L’addition, s’il vous plaît !" là câu cửa miệng của thực khách khi muốn thanh toán tại nhà hàng/quán café Pháp.',
    xp: 20
  },
  {
    id: 'q-5',
    question: 'Động từ "Être" khi chia với ngôi "Nous" (Chúng tôi) là:',
    frenchPrompt: 'Conjugaison du verbe Être',
    options: ['Nous avons', 'Nous sommes', 'Nous allons', 'Nous faisons'],
    correctAnswer: 1,
    explanation: 'Chia động từ Être: Je suis, Tu es, Il/Elle est, Nous sommes, Vous êtes, Ils/Elles sont.',
    xp: 20
  }
];

export const DIALOGUES_DATA: DialogueScenario[] = [
  {
    id: 'dial-1',
    title: 'Gặp gỡ tại quán Café de Flore',
    subtitle: 'Học cách chào hỏi và gọi thức uống tại quán cà phê huyền thoại ở quận Saint-Germain-des-Prés.',
    location: 'Quận 6, Paris',
    level: 'A1',
    lines: [
      {
        speaker: 'Le Serveur (Bồi bàn)',
        avatar: '👨‍🍳',
        french: 'Bonjour Madame, Monsieur ! Bienvenue au Café de Flore. Que désirez-vous ?',
        vietnamese: 'Xin chào quý khách! Chào mừng đến với Café de Flore. Quý khách muốn dùng gì ạ?'
      },
      {
        speaker: 'Bạn (Vous)',
        avatar: '🥐',
        french: 'Bonjour ! Je voudrais un café au lait et un croissant bien chaud, s’il vous plaît.',
        vietnamese: 'Xin chào! Làm ơn cho tôi một cà phê sữa và một chiếc bánh sừng bò nóng hổi.',
        isUser: true
      },
      {
        speaker: 'Le Serveur',
        avatar: '👨‍🍳',
        french: 'Très bien. Et avec ceci ? De l’eau fraîche peut-être ?',
        vietnamese: 'Dạ được rồi ạ. Quý khách có muốn dùng thêm gì nữa không? Một ly nước mát nhé?'
      },
      {
        speaker: 'Bạn (Vous)',
        avatar: '🥐',
        french: 'Non, ce sera tout, merci beaucoup ! C’est combien ?',
        vietnamese: 'Dạ không, bấy nhiêu thôi, cảm ơn bạn rất nhiều! Tổng cộng là bao nhiêu tiền vậy ạ?',
        isUser: true
      },
      {
        speaker: 'Le Serveur',
        avatar: '👨‍🍳',
        french: 'Ça fera 7 euros 50, s’il vous plaît.',
        vietnamese: 'Dạ tổng cộng là 7 euro 50 cent ạ.'
      }
    ]
  },
  {
    id: 'dial-2',
    title: 'Hỏi đường đến Bảo tàng Louvre',
    subtitle: 'Cách hỏi và lắng nghe chỉ đường từ người dân bản xứ khi đang dạo quanh bờ sông Seine.',
    location: 'Bờ sông Seine, Paris',
    level: 'A2',
    lines: [
      {
        speaker: 'Bạn (Vous)',
        avatar: '🗺️',
        french: 'Excusez-moi Madame, je suis perdu. Pourriez-vous m’indiquer le chemin pour aller au Musée du Louvre ?',
        vietnamese: 'Xin lỗi bà, tôi bị lạc đường. Bà có thể vui lòng chỉ giúp tôi đường đến Bảo tàng Louvre được không?',
        isUser: true
      },
      {
        speaker: 'La Parisienne',
        avatar: '👩‍🎨',
        french: 'Bien sûr ! C’est tout près. Vous continuez tout droit pendant cinq minutes, puis vous tournez à gauche.',
        vietnamese: 'Tất nhiên rồi! Rất gần đây thôi. Bạn cứ đi thẳng tầm 5 phút, sau đó rẽ trái nhé.'
      },
      {
        speaker: 'Bạn (Vous)',
        avatar: '🗺️',
        french: 'D’accord, tout droit puis à gauche. Et ensuite ?',
        vietnamese: 'Dạ vâng, đi thẳng rồi rẽ trái. Rồi sau đó thế nào nữa ạ?',
        isUser: true
      },
      {
        speaker: 'La Parisienne',
        avatar: '👩‍🎨',
        french: 'Vous verrez la grande Pyramide de verre en face de vous. Vous ne pouvez pas la rater !',
        vietnamese: 'Bạn sẽ thấy ngay Kim tự tháp kính khổng lồ trước mặt. Bạn không thể đi lạc được đâu!'
      },
      {
        speaker: 'Bạn (Vous)',
        avatar: '🗺️',
        french: 'C’est parfait. Mille mercis pour votre gentillesse ! Bonne journée !',
        vietnamese: 'Thật tuyệt vời. Vô cùng cảm ơn lòng tốt của bà! Chúc bà một ngày tốt lành!',
        isUser: true
      }
    ]
  }
];
