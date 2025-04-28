import {
  BODY_CHARACTERS_COUNT,
  BODY_EXACT_KEYWORDS_COUNT,
  BODY_EXACT_KEYWORDS_DENSITY,
  BODY_PARTIAL_KEYWORDS_COUNT,
  BODY_PARTIAL_KEYWORDS_DENSITY,
  BODY_WORDS_COUNT,
  H1_CHARACTERS_COUNT,
  H1_ELEMENTS_COUNT,
  H1_EXACT_KEYWORDS_COUNT,
  H1_EXACT_KEYWORDS_DENSITY,
  H1_PARTIAL_KEYWORDS_COUNT,
  H1_PARTIAL_KEYWORDS_DENSITY,
  H1_WORDS_COUNT,
  H2_CHARACTERS_COUNT,
  H2_ELEMENTS_COUNT,
  H2_EXACT_KEYWORDS_COUNT,
  H2_EXACT_KEYWORDS_DENSITY,
  H2_PARTIAL_KEYWORDS_COUNT,
  H2_PARTIAL_KEYWORDS_DENSITY,
  H2_WORDS_COUNT,
  H3_CHARACTERS_COUNT,
  H3_ELEMENTS_COUNT,
  H3_EXACT_KEYWORDS_COUNT,
  H3_EXACT_KEYWORDS_DENSITY,
  H3_PARTIAL_KEYWORDS_COUNT,
  H3_PARTIAL_KEYWORDS_DENSITY,
  H3_WORDS_COUNT,
  H4_CHARACTERS_COUNT,
  H4_ELEMENTS_COUNT,
  H4_EXACT_KEYWORDS_COUNT,
  H4_EXACT_KEYWORDS_DENSITY,
  H4_PARTIAL_KEYWORDS_COUNT,
  H4_PARTIAL_KEYWORDS_DENSITY,
  H4_WORDS_COUNT,
  H5_CHARACTERS_COUNT,
  H5_ELEMENTS_COUNT,
  H5_EXACT_KEYWORDS_COUNT,
  H5_EXACT_KEYWORDS_DENSITY,
  H5_PARTIAL_KEYWORDS_COUNT,
  H5_PARTIAL_KEYWORDS_DENSITY,
  H5_WORDS_COUNT,
  H6_CHARACTERS_COUNT,
  H6_ELEMENTS_COUNT,
  H6_EXACT_KEYWORDS_COUNT,
  H6_EXACT_KEYWORDS_DENSITY,
  H6_PARTIAL_KEYWORDS_COUNT,
  H6_PARTIAL_KEYWORDS_DENSITY,
  H6_WORDS_COUNT,
  IMAGE_ELEMENTS_COUNT,
  IMAGE_ELEMENTS_WITH_ALT_COUNT,
  IMAGE_ELEMENTS_WITHOUT_OR_WITH_EMPTY_ALT_COUNT,
  IMG_ALT_CHARACTERS_COUNT,
  IMG_ALT_EXACT_KEYWORDS_COUNT,
  IMG_ALT_EXACT_KEYWORDS_DENSITY,
  IMG_ALT_PARTIAL_KEYWORDS_COUNT,
  IMG_ALT_PARTIAL_KEYWORDS_DENSITY,
  IMG_ALT_WORDS_COUNT,
  LINK_DOFOLLOW_ELEMENTS_COUNT,
  LINK_ELEMENTS_COUNT,
  LINK_NOFOLLOW_ELEMENTS_COUNT,
  META_DESC_CHARACTERS_COUNT,
  META_DESC_EXACT_KEYWORDS_COUNT,
  META_DESC_EXACT_KEYWORDS_DENSITY,
  META_DESC_PARTIAL_KEYWORDS_COUNT,
  META_DESC_PARTIAL_KEYWORDS_DENSITY,
  META_DESC_WORDS_COUNT,
  P_CHARACTERS_COUNT,
  P_ELEMENTS_COUNT,
  P_EXACT_KEYWORDS_COUNT,
  P_EXACT_KEYWORDS_DENSITY,
  P_PARTIAL_KEYWORDS_COUNT,
  P_PARTIAL_KEYWORDS_DENSITY,
  P_WORDS_COUNT,
  PAGE_SPEED_DOCUMENT_SIZE,
  PAGE_SPEED_FCP,
  PAGE_SPEED_LCP,
  PAGE_SPEED_TTFB,
  PAGE_SPEED_TTI,
  STRONG_CHARACTERS_COUNT,
  STRONG_ELEMENTS_COUNT,
  STRONG_EXACT_KEYWORDS_COUNT,
  STRONG_EXACT_KEYWORDS_DENSITY,
  STRONG_PARTIAL_KEYWORDS_COUNT,
  STRONG_PARTIAL_KEYWORDS_DENSITY,
  STRONG_WORDS_COUNT,
  TITLE_CHARACTERS_COUNT,
  TITLE_EXACT_KEYWORDS_COUNT,
  TITLE_EXACT_KEYWORDS_DENSITY,
  TITLE_PARTIAL_KEYWORDS_COUNT,
  TITLE_PARTIAL_KEYWORDS_DENSITY,
  TITLE_WORDS_COUNT,
} from './factors';

export type FactorsCollection = {
  label: string;
  factors: { label: string; key: string }[];
}[];

export const factorsCollection: FactorsCollection = [
  // H1
  {
    label: 'H1 elements',
    factors: [
      {
        label: 'H1 words count',
        key: H1_WORDS_COUNT,
      },
      {
        label: 'H1 characters count',
        key: H1_CHARACTERS_COUNT,
      },
      {
        label: 'H1 elements count',
        key: H1_ELEMENTS_COUNT,
      },
      {
        label: 'H1 exact keywords count',
        key: H1_EXACT_KEYWORDS_COUNT,
      },
      {
        label: 'H1 exact keywords density',
        key: H1_EXACT_KEYWORDS_DENSITY,
      },
      {
        label: 'H1 partial keywords count',
        key: H1_PARTIAL_KEYWORDS_COUNT,
      },
      {
        label: 'H1 partial keywords density',
        key: H1_PARTIAL_KEYWORDS_DENSITY,
      },
    ],
  },
  // --------------------
  // H2
  {
    label: 'H2 elements',
    factors: [
      {
        label: 'H2 words count',
        key: H2_WORDS_COUNT,
      },
      {
        label: 'H2 characters count',
        key: H2_CHARACTERS_COUNT,
      },
      {
        label: 'H2 elements count',
        key: H2_ELEMENTS_COUNT,
      },
      {
        label: 'H2 exact keywords count',
        key: H2_EXACT_KEYWORDS_COUNT,
      },
      {
        label: 'H2 exact keywords density',
        key: H2_EXACT_KEYWORDS_DENSITY,
      },
      {
        label: 'H2 partial keywords count',
        key: H2_PARTIAL_KEYWORDS_COUNT,
      },
      {
        label: 'H2 partial keywords density',
        key: H2_PARTIAL_KEYWORDS_DENSITY,
      },
    ],
  },
  // --------------------
  // H3
  {
    label: 'H3 elements',
    factors: [
      {
        label: 'H3 words count',
        key: H3_WORDS_COUNT,
      },
      {
        label: 'H3 characters count',
        key: H3_CHARACTERS_COUNT,
      },
      {
        label: 'H3 elements count',
        key: H3_ELEMENTS_COUNT,
      },
      {
        label: 'H3 exact keywords count',
        key: H3_EXACT_KEYWORDS_COUNT,
      },
      {
        label: 'H3 exact keywords density',
        key: H3_EXACT_KEYWORDS_DENSITY,
      },
      {
        label: 'H3 partial keywords count',
        key: H3_PARTIAL_KEYWORDS_COUNT,
      },
      {
        label: 'H3 partial keywords density',
        key: H3_PARTIAL_KEYWORDS_DENSITY,
      },
    ],
  },
  // --------------------
  // H4
  {
    label: 'H4 elements',
    factors: [
      {
        label: 'H4 words count',
        key: H4_WORDS_COUNT,
      },
      {
        label: 'H4 characters count',
        key: H4_CHARACTERS_COUNT,
      },
      {
        label: 'H4 elements count',
        key: H4_ELEMENTS_COUNT,
      },
      {
        label: 'H4 exact keywords count',
        key: H4_EXACT_KEYWORDS_COUNT,
      },
      {
        label: 'H4 exact keywords density',
        key: H4_EXACT_KEYWORDS_DENSITY,
      },
      {
        label: 'H4 partial keywords count',
        key: H4_PARTIAL_KEYWORDS_COUNT,
      },
      {
        label: 'H4 partial keywords density',
        key: H4_PARTIAL_KEYWORDS_DENSITY,
      },
    ],
  },
  // --------------------
  // H5
  {
    label: 'H5 elements',
    factors: [
      {
        label: 'H5 words count',
        key: H5_WORDS_COUNT,
      },
      {
        label: 'H5 characters count',
        key: H5_CHARACTERS_COUNT,
      },
      {
        label: 'H5 elements count',
        key: H5_ELEMENTS_COUNT,
      },
      {
        label: 'H5 exact keywords count',
        key: H5_EXACT_KEYWORDS_COUNT,
      },
      {
        label: 'H5 exact keywords density',
        key: H5_EXACT_KEYWORDS_DENSITY,
      },
      {
        label: 'H5 partial keywords count',
        key: H5_PARTIAL_KEYWORDS_COUNT,
      },
      {
        label: 'H5 partial keywords density',
        key: H5_PARTIAL_KEYWORDS_DENSITY,
      },
    ],
  },
  // --------------------
  // H6
  {
    label: 'H6 elements',
    factors: [
      {
        label: 'H6 words count',
        key: H6_WORDS_COUNT,
      },
      {
        label: 'H6 characters count',
        key: H6_CHARACTERS_COUNT,
      },
      {
        label: 'H6 elements count',
        key: H6_ELEMENTS_COUNT,
      },
      {
        label: 'H6 exact keywords count',
        key: H6_EXACT_KEYWORDS_COUNT,
      },
      {
        label: 'H6 exact keywords density',
        key: H6_EXACT_KEYWORDS_DENSITY,
      },
      {
        label: 'H6 partial keywords count',
        key: H6_PARTIAL_KEYWORDS_COUNT,
      },
      {
        label: 'H6 partial keywords density',
        key: H6_PARTIAL_KEYWORDS_DENSITY,
      },
    ],
  },
  // --------------------
  // P
  {
    label: 'Paragraphs',
    factors: [
      {
        label: 'P words count',
        key: P_WORDS_COUNT,
      },
      {
        label: 'P characters count',
        key: P_CHARACTERS_COUNT,
      },
      {
        label: 'P elements count',
        key: P_ELEMENTS_COUNT,
      },
      {
        label: 'P exact keywords count',
        key: P_EXACT_KEYWORDS_COUNT,
      },
      {
        label: 'P exact keywords density',
        key: P_EXACT_KEYWORDS_DENSITY,
      },
      {
        label: 'P partial keywords count',
        key: P_PARTIAL_KEYWORDS_COUNT,
      },
      {
        label: 'P partial keywords density',
        key: P_PARTIAL_KEYWORDS_DENSITY,
      },
    ],
  },
  // --------------------
  // Strong
  {
    label: 'Strong elements',
    factors: [
      {
        label: 'Strong words count',
        key: STRONG_WORDS_COUNT,
      },
      {
        label: 'Strong characters count',
        key: STRONG_CHARACTERS_COUNT,
      },
      {
        label: 'Strong elements count',
        key: STRONG_ELEMENTS_COUNT,
      },
      {
        label: 'Strong exact keywords count',
        key: STRONG_EXACT_KEYWORDS_COUNT,
      },
      {
        label: 'Strong exact keywords density',
        key: STRONG_EXACT_KEYWORDS_DENSITY,
      },
      {
        label: 'Strong partial keywords count',
        key: STRONG_PARTIAL_KEYWORDS_COUNT,
      },
      {
        label: 'Strong partial keywords density',
        key: STRONG_PARTIAL_KEYWORDS_DENSITY,
      },
    ],
  },
  // --------------------
  // Img alt
  {
    label: 'Image alt',
    factors: [
      {
        label: 'Image alt words count',
        key: IMG_ALT_WORDS_COUNT,
      },
      {
        label: 'Image alt characters count',
        key: IMG_ALT_CHARACTERS_COUNT,
      },
      {
        label: 'Image alt exact keywords count',
        key: IMG_ALT_EXACT_KEYWORDS_COUNT,
      },
      {
        label: 'Image alt exact keywords density',
        key: IMG_ALT_EXACT_KEYWORDS_DENSITY,
      },
      {
        label: 'Image alt partial keywords count',
        key: IMG_ALT_PARTIAL_KEYWORDS_COUNT,
      },
      {
        label: 'Image alt partial keywords density',
        key: IMG_ALT_PARTIAL_KEYWORDS_DENSITY,
      },
    ],
  },
  // --------------------
  // Title
  {
    label: 'Title',
    factors: [
      {
        label: 'Title words count',
        key: TITLE_WORDS_COUNT,
      },
      {
        label: 'Title characters count',
        key: TITLE_CHARACTERS_COUNT,
      },
      {
        label: 'Title exact keywords count',
        key: TITLE_EXACT_KEYWORDS_COUNT,
      },
      {
        label: 'Title exact keywords density',
        key: TITLE_EXACT_KEYWORDS_DENSITY,
      },
      {
        label: 'Title partial keywords count',
        key: TITLE_PARTIAL_KEYWORDS_COUNT,
      },
      {
        label: 'Title partial keywords density',
        key: TITLE_PARTIAL_KEYWORDS_DENSITY,
      },
    ],
  },
  // --------------------
  // Meta description
  {
    label: 'Meta description',
    factors: [
      {
        label: 'Meta description words count',
        key: META_DESC_WORDS_COUNT,
      },
      {
        label: 'Meta description characters count',
        key: META_DESC_CHARACTERS_COUNT,
      },
      {
        label: 'Meta description exact keywords count',
        key: META_DESC_EXACT_KEYWORDS_COUNT,
      },
      {
        label: 'Meta description exact keywords density',
        key: META_DESC_EXACT_KEYWORDS_DENSITY,
      },
      {
        label: 'Meta description partial keywords count',
        key: META_DESC_PARTIAL_KEYWORDS_COUNT,
      },
      {
        label: 'Meta description partial keywords density',
        key: META_DESC_PARTIAL_KEYWORDS_DENSITY,
      },
    ],
  },
  // --------------------
  // Links
  {
    label: 'Links',
    factors: [
      {
        label: 'Links elements count',
        key: LINK_ELEMENTS_COUNT,
      },
      {
        label: 'Links nofollow count',
        key: LINK_NOFOLLOW_ELEMENTS_COUNT,
      },
      {
        label: 'Links dofollow count',
        key: LINK_DOFOLLOW_ELEMENTS_COUNT,
      },
    ],
  },
  // --------------------
  // Body
  {
    label: 'Body',
    factors: [
      {
        label: 'Body words count',
        key: BODY_WORDS_COUNT,
      },
      {
        label: 'Body characters count',
        key: BODY_CHARACTERS_COUNT,
      },
      {
        label: 'Body exact keywords count',
        key: BODY_EXACT_KEYWORDS_COUNT,
      },
      {
        label: 'Body exact keywords density',
        key: BODY_EXACT_KEYWORDS_DENSITY,
      },
      {
        label: 'Body partial keywords count',
        key: BODY_PARTIAL_KEYWORDS_COUNT,
      },
      {
        label: 'Body partial keywords density',
        key: BODY_PARTIAL_KEYWORDS_DENSITY,
      },
    ],
  },
  // --------------------
  // Images
  {
    label: 'Images',
    factors: [
      {
        label: 'Images elements count',
        key: IMAGE_ELEMENTS_COUNT,
      },
      {
        label: "Images elements with 'alt' attribute count",
        key: IMAGE_ELEMENTS_WITH_ALT_COUNT,
      },
      {
        label: "Images elements without or empty 'alt' attribute count",
        key: IMAGE_ELEMENTS_WITHOUT_OR_WITH_EMPTY_ALT_COUNT,
      },
    ],
  },
  // --------------------
  // Images
  {
    label: 'Page Speed',
    factors: [
      {
        label: 'FCP',
        key: PAGE_SPEED_FCP,
      },
      {
        label: 'LCP',
        key: PAGE_SPEED_LCP,
      },
      {
        label: 'TTFB',
        key: PAGE_SPEED_TTFB,
      },
      {
        label: 'Document size',
        key: PAGE_SPEED_DOCUMENT_SIZE,
      },
      {
        label: 'TTI',
        key: PAGE_SPEED_TTI,
      },
    ],
  },
  // --------------------
];
