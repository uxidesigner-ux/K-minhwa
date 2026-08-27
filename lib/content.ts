export type LocaleText = {
  ko: string;
  en: string;
};

export type CatalogueWork = {
  slug: string;
  title: LocaleText;
  description: LocaleText;
  imageAlt: LocaleText;
  image: string;
  /** Confirmed artwork photography. False uses a grayscale archive plate. */
  imageConfirmed: boolean;
  /** Omit when unconfirmed — public UI hides the field instead of showing placeholder copy. */
  year?: string;
  medium?: string;
  sourceNote?: LocaleText;
  /** Artwork front plate vs installation/context view. */
  presentation?: 'artwork' | 'installation';
};

export const siteCopy = {
  home: {
    headline: {
      ko: '오래된 상징,\n새로운 숨결',
      en: 'Old symbols,\nnewly alive.',
    },
    introduction: {
      ko: '운주 김혜진은 우리 삶의 염원과 이야기를 담아온 민화의 전통적 화법과 상징에 충실하면서도, 새로운 색채와 구성을 통해 자신만의 독자적인 예술세계를 만들어가고 있습니다.',
      en: 'Unjoo Kim Hyejin is rooted in the traditional techniques and symbolic language of minhwa. Through new colors, compositions, and interpretations, she continues to shape a visual world distinctly her own.',
    },
    cta: {
      ko: '작품 보기',
      en: 'ENTER ARCHIVE',
    },
    support: {
      ko: '전통의 문법 위에서 다시 피어나는 오늘의 민화.',
      en: 'Contemporary minhwa, growing from the enduring grammar of tradition.',
    },
    heroCaption: {
      ko: '구름을 깨우는 용',
      en: 'Dragon Among Clouds',
    },
  },
  works: {
    title: {
      ko: '전통의 문법 위에서,\n그림은 다시 움직인다.',
      en: 'The archive,\nalive in motion.',
    },
    introduction: {
      ko: '운주의 작품은 민화가 간직해온 복과 장수, 지혜와 평안의 상징을 오늘의 감각으로 다시 바라봅니다. 익숙한 동물과 식물, 책과 문방구, 구름과 상상의 존재들은 새로운 색과 리듬을 만나 또 다른 이야기가 됩니다.',
      en: 'Unjoo revisits the symbols of fortune, longevity, wisdom, and peace carried through traditional minhwa. Familiar animals, plants, books, clouds, and imagined beings take on new stories through contemporary color and rhythm.',
    },
    notice: {
      ko: '작품명은 가칭이며, 제작연월·재료·도상 참고 자료는 확인 후 교체됩니다. 원본 사진이 없는 항목은 아카이브 플레이트로 표시합니다.',
      en: 'Working titles are provisional. Dates, materials, and iconographic sources will be replaced when confirmed. Entries without original photography use archive plates.',
    },
  },
  artist: {
    eyebrow: {
      ko: '작가 / 동시대 민화',
      en: 'ARTIST / CONTEMPORARY MINHWA',
    },
    headline: {
      ko: '옛 그림의 마음을\n오늘의 색으로.',
      en: 'The spirit of old paintings,\nin the colors of today.',
    },
    statement: {
      ko: '운주 김혜진은 민화의 전통적 화법과 상징 체계를 바탕으로 작업하는 작가입니다.',
      en: 'Unjoo Kim Hyejin is an artist whose practice is rooted in the traditional techniques and symbolic language of Korean minhwa.',
    },
    biography: {
      ko: [
        '민화가 오랜 시간 사람들의 일상과 염원, 기쁨과 바람을 담아왔다는 점에 주목하며, 전통적인 구성과 섬세한 채색 과정을 충실하게 이어갑니다. 동시에 색채와 화면 구성, 소재의 결합을 새롭게 시도하며 동시대의 감각이 담긴 자신만의 조형언어를 발전시키고 있습니다.',
        '운주의 작품에서 전통적인 동물과 식물, 책과 문방구, 구름과 길상 문양은 과거에 머무르지 않습니다. 익숙한 상징은 오늘의 감정과 기억을 만나 새롭게 움직이고, 오래된 그림은 현재의 삶을 비추는 또 하나의 풍경이 됩니다.',
        '국내외 민화 공모전과 예술대회에 꾸준히 참가해 여러 차례 입상했으며, 현재도 작품 제작과 발표 활동을 활발히 이어가고 있습니다.',
      ],
      en: [
        'She approaches the structure and meticulous coloring process of minhwa with respect, recognizing its long history of carrying people’s wishes, joys, and everyday hopes. At the same time, she experiments with color, composition, and unexpected combinations of familiar motifs to develop a visual language of her own.',
        'In her work, animals, plants, books, clouds, and auspicious symbols do not remain in the past. They encounter contemporary emotions and memories, allowing old images to become new landscapes for the present.',
        'She has participated in numerous domestic and international minhwa competitions and art contests, receiving multiple awards, and continues an active practice today.',
      ],
    },
    careers: {
      ko: [
        '국내외 민화 공모전 및 예술대회 다수 입상',
        '개인전 및 단체전 참여',
        '민화 작품 제작 및 창작 활동',
        '협업 및 의뢰 작품 제작',
      ],
      en: [
        'Multiple awards in domestic and international minhwa competitions and art contests',
        'Solo and group exhibition participation',
        'Ongoing minhwa painting and creative practice',
        'Collaborative and commissioned works',
      ],
      note: {
        ko: '대회명·주최기관·수상명·연도·전시명·소장처는 확인 후 구체 표기로 교체합니다.',
        en: 'Competition names, organizers, awards, years, exhibition titles, and collections will replace this outline once verified.',
      },
    },
    practice: {
      ko: '운주의 작업 세계는 민화의 전통 문법 위에서 색채와 구성을 다시 살피며, 길상의 상징이 오늘의 감정과 기억으로 이어지도록 하는 데 있습니다.',
      en: 'Her practice revisits minhwa’s traditional grammar through color and composition, so auspicious symbols can carry today’s emotions and memories.',
    },
    contact: {
      label: {
        ko: '문의',
        en: 'INQUIRY',
      },
      body: {
        ko: '전시·협업·작품 문의는 아래로 연락해 주세요. 갤러리 또는 대표 문의 경로는 확인되는 대로 공개합니다.',
        en: 'For exhibitions, collaborations, and artwork inquiries, please get in touch. Gallery or representative contact details will be published when confirmed.',
      },
      email: 'hello@k-minhwa.art',
      emailNote: {
        ko: '임시 문의 주소 — 공식 연락처 확인 후 교체',
        en: 'Temporary inquiry address — replace when the official contact is confirmed',
      },
    },
  },
} as const;

export const pageMeta = {
  siteName: '雲姝 — K-minhwa',
  // Live deployment host until k-minhwa.art is registered and pointed at Vercel.
  // Override with NEXT_PUBLIC_SITE_URL=https://k-minhwa.art after the custom domain resolves.
  siteUrl: 'https://k-minhwa.vercel.app',
  defaultOgImage: '/media/og-default.jpg',
  defaultOgAlt: '雲姝 金慧震 — Korean minhwa artist',
  artistName: {
    hanja: '雲姝 金慧震',
    hangul: '운주 김혜진',
    en: 'Unjoo Kim Hyejin',
  },
  tagline: {
    ko: '한국 민화 작가',
    en: 'Korean minhwa artist',
  },
  keywords: [
    'K-minhwa',
    'minhwa',
    'Korean minhwa',
    '雲姝',
    '金慧震',
    '운주 김혜진',
    'Unjoo Kim Hyejin',
    'Korean folk painting',
    'contemporary minhwa',
  ],
  home: {
    title: {
      ko: '雲姝 — 오래된 상징, 새로운 숨결',
      en: '雲姝 — Old symbols, newly alive',
    },
    description: {
      ko: '운주 김혜진의 동시대 민화 아카이브. 전통의 화법과 상징 위에서 새로운 색채와 구성을 선보입니다.',
      en: 'A moving archive of contemporary Korean minhwa by Unjoo Kim Hyejin — rooted in tradition, renewed through color and composition.',
    },
  },
  works: {
    title: {
      ko: '작품 — 雲姝 김혜진',
      en: 'Works — 雲姝 Unjoo Kim Hyejin',
    },
    description: {
      ko: '운주의 민화 작품 아카이브. 복과 장수, 지혜와 평안의 상징을 오늘의 감각으로 다시 바라봅니다.',
      en: 'Browse Unjoo’s minhwa archive — symbols of fortune, longevity, wisdom, and peace revisited through contemporary color and rhythm.',
    },
  },
  artist: {
    title: {
      ko: '작가 — 雲姝 김혜진',
      en: 'Artist — 雲姝 Unjoo Kim Hyejin',
    },
    description: {
      ko: '민화의 전통적 화법과 상징 체계를 바탕으로 작업하는 운주 김혜진의 소개, 이력, 문의.',
      en: 'About Unjoo Kim Hyejin — practice rooted in minhwa technique and symbol, with selected activity and inquiry.',
    },
  },
} as const;

export const works: CatalogueWork[] = [
  {
    slug: 'dragon-among-clouds',
    title: { ko: '구름을 깨우는 용', en: 'Dragon Among Clouds' },
    description: {
      ko: '겹겹이 쌓인 구름 사이로 푸른 용이 몸을 드러낸다. 용은 힘과 권위의 상징이면서 비와 풍요를 부르는 존재다. 전통적인 운룡의 형상을 바탕으로 강한 색채와 역동적인 움직임을 더해, 새로운 시작을 향해 깨어나는 생명력을 표현했다.',
      en: 'A blue dragon emerges through layered clouds. Rooted in traditional cloud-and-dragon imagery, the composition adds vivid color and motion to express a living force awakening toward a new beginning.',
    },
    imageAlt: {
      ko: '겹겹이 쌓인 구름 사이로 푸른 용이 몸을 드러내는 운룡도 형식의 작품.',
      en: 'A blue-green dragon moving through layered cream and brown clouds.',
    },
    image: '/media/works/dragon-among-clouds.jpg',
    imageConfirmed: true,
    sourceNote: {
      ko: '도상 참고: 전통 운룡도 및 용 문양 — 정확한 자료명 확인 필요',
      en: 'Iconographic reference: traditional cloud-dragon and dragon motifs — exact source to be confirmed',
    },
  },
  {
    slug: 'books-brushes-peonies',
    title: { ko: '책과 붓, 모란의 방', en: 'Books, Brushes and Peonies' },
    description: {
      ko: '책과 붓, 도자기와 모란이 한 화면 안에서 서로의 이야기를 이어간다. 책은 지혜를, 문방구는 배움과 창작을, 모란은 부귀와 풍요를 상징한다. 전통 책거리의 질서에 자유로운 색채를 더해 지식과 아름다움이 함께 머무는 공간을 만들었다.',
      en: 'Books, brushes, vessels, and peonies continue one another’s stories in a single frame. Wisdom, learning, and abundance meet through the order of chaekgeori, renewed with freer contemporary color.',
    },
    imageAlt: {
      ko: '책과 붓, 기물, 분홍 모란이 배치된 책거리 형식의 작품.',
      en: 'Books, brushes, vessels, and pink peonies arranged in a chaekgeori still life.',
    },
    image: '/media/works/books-brushes-peonies.jpg',
    imageConfirmed: true,
    sourceNote: {
      ko: '도상 참고: 조선 후기 책가도·문방도 — 자료명 확인 필요',
      en: 'Iconographic reference: late Joseon chaekgeori and scholar’s-studio paintings — source to be confirmed',
    },
  },
  {
    slug: 'chaekgeori-blue',
    title: { ko: '푸른 기억의 책거리', en: 'Chaekgeori in Blue' },
    description: {
      ko: '푸른빛 책과 문방구 사이에 꽃과 과실이 자라난다. 차분한 청색은 깊은 기억과 사유의 시간을, 화면을 가로지르는 분홍빛 꽃은 새로운 가능성을 의미한다. 배움의 공간을 하나의 살아 있는 정원으로 해석한 작품이다.',
      en: 'Flowers and fruit grow among blue books and scholar’s objects. Cool blue holds memory and thought; pink blossoms cut across the field as possibility, turning a study into a living garden.',
    },
    imageAlt: {
      ko: '푸른빛과 보랏빛으로 구성된 세로형 책거리 작품.',
      en: 'A blue and violet chaekgeori composition shown as a vertical hanging scroll.',
    },
    image: '/media/works/chaekgeori-blue.jpg',
    imageConfirmed: true,
    sourceNote: {
      ko: '도상 참고: 전통 책가도 및 문방도 — 자료명 확인 필요',
      en: 'Iconographic reference: traditional chaekgeori and scholar’s-studio paintings — source to be confirmed',
    },
  },
  {
    slug: 'chaekgeori-red',
    title: { ko: '붉은 소망의 책거리', en: 'Chaekgeori in Red' },
    description: {
      ko: '붉은 책과 기물, 꽃과 과실이 화면을 가득 채운다. 붉은색은 생명과 기쁨, 보호의 의미를 지니며 복숭아와 수박, 모란은 장수와 풍요를 상징한다. 서로 다른 소망을 한자리에 모아 오늘의 행복을 기원한다.',
      en: 'Red books, vessels, flowers, and fruit fill the frame. Red speaks of life, joy, and protection, while peach, watermelon, and peony gather wishes for longevity and abundance into one present tense.',
    },
    imageAlt: {
      ko: '붉은색과 초록, 파랑이 어우러진 세로형 책거리 작품.',
      en: 'A warm chaekgeori composition of books, vessels, flowers, and objects as a hanging scroll.',
    },
    image: '/media/works/chaekgeori-red.jpg',
    imageConfirmed: true,
    sourceNote: {
      ko: '도상 참고: 전통 책가도·길상 문양 — 자료명 확인 필요',
      en: 'Iconographic reference: traditional chaekgeori and auspicious motifs — source to be confirmed',
    },
  },
  {
    slug: 'flowers-after-dark',
    title: { ko: '밤에 피는 꽃', en: 'Flowers After Dark' },
    description: {
      ko: '검은 바탕 위로 부드러운 빛을 품은 꽃과 줄기가 뻗어나간다. 어둠은 끝이 아니라 색과 생명이 더욱 선명해지는 공간이 된다. 고요한 시간 속에서도 이어지는 성장과 회복의 힘을 담았다.',
      en: 'Softly lit flowers and stems reach across a black field. Darkness becomes a space where color and life grow clearer, holding the quiet force of growth and recovery.',
    },
    imageAlt: {
      ko: '검은 바탕 위로 꽃과 줄기가 뻗어 나가는 화훼 작품.',
      en: 'A pale flowering vine and patterned blossoms against a dark field.',
    },
    image: '/media/works/floral-vine.jpg',
    imageConfirmed: true,
    sourceNote: {
      ko: '도상 참고: 전통 화조도 및 화훼 문양 — 자료명 확인 필요',
      en: 'Iconographic reference: traditional flower-and-bird and floral motifs — source to be confirmed',
    },
  },
  {
    slug: 'still-life-of-abundance',
    title: { ko: '풍요를 담은 정물', en: 'A Still Life of Abundance' },
    description: {
      ko: '도자기와 책, 꽃과 과실이 포도주의 이미지와 함께 배치된다. 서로 다른 지역의 문화가 하나의 화면에서 만나며, 민화의 길상적 상징이 새로운 일상의 사물로 확장된다. 전통 정물의 언어를 현대적인 협업 이미지로 재구성한 작품이다.',
      en: 'Vessels, books, flowers, and fruit gather with a wine image. Distinct cultures meet in one frame as minhwa’s auspicious language expands into contemporary daily objects through collaboration.',
    },
    imageAlt: {
      ko: '책거리 도상과 포도주 이미지가 함께하는 협업 정물 작품.',
      en: 'A collaborative still-life image featuring chaekgeori motifs with wine.',
    },
    image: '/media/works/tenuta-del-buonamico.jpg',
    imageConfirmed: true,
    sourceNote: {
      ko: '원본 출처: Tenuta del Buonamico 협업 자료 — 사용 허가 확인',
      en: 'Source: Tenuta del Buonamico collaboration materials — usage permission to be confirmed',
    },
  },
  {
    slug: 'pair-of-chaekgeori',
    presentation: 'installation',
    title: { ko: '마주 보는 책거리', en: 'A Pair of Chaekgeori' },
    description: {
      ko: '한 쌍의 책거리가 서로를 마주 보며 하나의 넓은 공간을 만든다. 반복되는 책과 기물은 지식이 쌓이는 시간을 보여주고, 대칭과 변주의 구성은 전통과 현재가 나누는 대화를 상징한다.',
      en: 'A pair of chaekgeori panels faces itself across a wider field. Repeated books and objects mark the time of accumulating knowledge, while symmetry and variation stage a dialogue between tradition and the present.',
    },
    imageAlt: {
      ko: '두 폭의 책거리가 마주 보며 넓은 공간을 이루는 병풍 형식의 작품.',
      en: 'A wide folding screen with two chaekgeori scenes divided by patterned panels.',
    },
    image: '/media/works/pair-of-chaekgeori.jpg',
    imageConfirmed: true,
    sourceNote: {
      ko: '도상 참고: 전통 책가도 병풍 — 자료명 확인 필요',
      en: 'Iconographic reference: traditional chaekgeori folding screens — source to be confirmed',
    },
  },
  {
    slug: 'tigers-spring-message',
    title: { ko: '호랑이의 봄소식', en: 'The Tiger’s Spring Message' },
    description: {
      ko: '해학적인 호랑이와 소식을 전하는 까치가 봄날의 풍경 속에서 마주한다. 호랑이는 나쁜 기운을 막는 존재이며, 까치는 반가운 소식과 기쁨을 상징한다. 익숙한 호작도의 관계를 따뜻하고 유쾌한 장면으로 다시 그렸다.',
      en: 'A humorous tiger and a magpie meet in a spring landscape. The tiger wards off harm; the magpie carries welcome news. A familiar hajakdo relationship is redrawn as a warm, playful encounter.',
    },
    imageAlt: {
      ko: '호랑이와 까치가 마주하는 호작도 계열 작품의 아카이브 플레이트.',
      en: 'Archive plate reserved for a tiger-and-magpie spring scene pending original photography.',
    },
    image: '/media/archive-placeholder-01.svg',
    imageConfirmed: false,
    sourceNote: {
      ko: '도상 참고: 전통 호작도 — 자료명 확인 필요',
      en: 'Iconographic reference: traditional tiger-and-magpie painting — source to be confirmed',
    },
  },
  {
    slug: 'where-peonies-remain',
    title: { ko: '모란이 머무는 자리', en: 'Where Peonies Remain' },
    description: {
      ko: '풍성하게 피어난 모란이 화면의 중심을 채운다. 부귀와 아름다움을 상징하는 모란을 섬세한 색의 층으로 표현해, 화려함보다는 오래 머무는 생명력과 깊이를 담았다.',
      en: 'Full peonies hold the center of the frame. Painted in layered color, they favor lasting vitality and depth over display, carrying the old wish for beauty and abundance.',
    },
    imageAlt: {
      ko: '풍성한 모란이 화면 중심을 채우는 모란도 계열 작품의 아카이브 플레이트.',
      en: 'Archive plate reserved for a peony-centered composition pending original photography.',
    },
    image: '/media/archive-placeholder-02.svg',
    imageConfirmed: false,
    sourceNote: {
      ko: '도상 참고: 전통 모란도 — 자료명 확인 필요',
      en: 'Iconographic reference: traditional peony painting — source to be confirmed',
    },
  },
  {
    slug: 'message-from-the-lotus',
    title: { ko: '연꽃이 건네는 마음', en: 'A Message from the Lotus' },
    description: {
      ko: '물 위로 피어난 연꽃과 작은 새가 고요한 순간을 만든다. 연꽃은 맑은 마음과 새로운 탄생을 상징한다. 잔잔한 물결과 부드러운 색채를 통해 복잡한 일상 속에서도 지켜지는 내면의 평온을 표현했다.',
      en: 'A lotus and a small bird hold a quiet moment above water. Through soft color and still ripples, the work speaks of an inner calm kept inside ordinary complexity.',
    },
    imageAlt: {
      ko: '연꽃과 새가 고요한 물가에 있는 연화도 계열 작품의 아카이브 플레이트.',
      en: 'Archive plate reserved for a lotus-and-bird scene pending original photography.',
    },
    image: '/media/archive-placeholder-03.svg',
    imageConfirmed: false,
    sourceNote: {
      ko: '도상 참고: 전통 연화도 및 화조도 — 자료명 확인 필요',
      en: 'Iconographic reference: traditional lotus and flower-and-bird painting — source to be confirmed',
    },
  },
  {
    slug: 'landscape-of-longevity',
    title: { ko: '오래 사는 풍경', en: 'A Landscape of Longevity' },
    description: {
      ko: '해와 산, 물과 소나무, 학과 사슴이 하나의 긴 풍경을 이룬다. 장수와 건강을 기원하는 십장생의 상징을 오늘의 색과 화면 구성으로 다시 연결했다. 자연과 사람이 오래도록 조화를 이루기를 바라는 마음을 담은 작품이다.',
      en: 'Sun, mountains, water, pine, crane, and deer form one long landscape. Symbols of longevity are rejoined through present color and composition, wishing for lasting harmony between nature and people.',
    },
    imageAlt: {
      ko: '십장생의 상징이 이어지는 장수 풍경 작품의 아카이브 플레이트.',
      en: 'Archive plate reserved for a longevity landscape pending original photography.',
    },
    image: '/media/archive-placeholder-01.svg',
    imageConfirmed: false,
    sourceNote: {
      ko: '도상 참고: 전통 십장생도 — 자료명 확인 필요',
      en: 'Iconographic reference: traditional sipjangsaeng longevity painting — source to be confirmed',
    },
  },
  {
    slug: 'letters-made-of-memory',
    title: { ko: '기억으로 쓰는 글자', en: 'Letters Made of Memory' },
    description: {
      ko: '문자의 획 사이로 꽃과 새, 책과 길상 문양이 피어난다. 글자는 의미를 전달하는 기호이자 기억을 담는 그릇이 된다. 전통 문자도의 교훈적 구조를 개인의 소망과 감정을 기록하는 화면으로 확장했다.',
      en: 'Flowers, birds, books, and auspicious motifs bloom between the strokes of characters. Letters become vessels of memory, expanding munjado’s didactic structure into a field for personal wish and feeling.',
    },
    imageAlt: {
      ko: '문자 획 사이로 꽃과 길상 문양이 피어나는 문자도 계열 작품의 아카이브 플레이트.',
      en: 'Archive plate reserved for a character painting filled with auspicious motifs pending original photography.',
    },
    image: '/media/archive-placeholder-02.svg',
    imageConfirmed: false,
    sourceNote: {
      ko: '도상 참고: 전통 문자도 — 사용 문자와 참고 자료 확인 필요',
      en: 'Iconographic reference: traditional munjado character painting — characters and sources to be confirmed',
    },
  },
];
