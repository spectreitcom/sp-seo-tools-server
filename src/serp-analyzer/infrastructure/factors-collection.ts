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
    label: 'H1',
    factors: [
      {
        label: 'Words count',
        key: H1_WORDS_COUNT,
      },
      {
        label: 'Characters count',
        key: H1_CHARACTERS_COUNT,
      },
      {
        label: 'Elements count',
        key: H1_ELEMENTS_COUNT,
      },
      {
        label: 'Exact keywords count',
        key: H1_EXACT_KEYWORDS_COUNT,
      },
      {
        label: 'Exact keywords density',
        key: H1_EXACT_KEYWORDS_DENSITY,
      },
      {
        label: 'Partial keywords count',
        key: H1_PARTIAL_KEYWORDS_COUNT,
      },
      {
        label: 'Partial keywords density',
        key: H1_PARTIAL_KEYWORDS_DENSITY,
      },
    ],
  },
  // --------------------
  // H2
  {
    label: 'H2',
    factors: [
      {
        label: 'Words count',
        key: H2_WORDS_COUNT,
      },
      {
        label: 'Characters count',
        key: H2_CHARACTERS_COUNT,
      },
      {
        label: 'Elements count',
        key: H2_ELEMENTS_COUNT,
      },
      {
        label: 'Exact keywords count',
        key: H2_EXACT_KEYWORDS_COUNT,
      },
      {
        label: 'Exact keywords density',
        key: H2_EXACT_KEYWORDS_DENSITY,
      },
      {
        label: 'Partial keywords count',
        key: H2_PARTIAL_KEYWORDS_COUNT,
      },
      {
        label: 'Partial keywords density',
        key: H2_PARTIAL_KEYWORDS_DENSITY,
      },
    ],
  },
  // --------------------
  // H3
  {
    label: 'H3',
    factors: [
      {
        label: 'Words count',
        key: H3_WORDS_COUNT,
      },
      {
        label: 'Characters count',
        key: H3_CHARACTERS_COUNT,
      },
      {
        label: 'Elements count',
        key: H3_ELEMENTS_COUNT,
      },
      {
        label: 'Exact keywords count',
        key: H3_EXACT_KEYWORDS_COUNT,
      },
      {
        label: 'Exact keywords density',
        key: H3_EXACT_KEYWORDS_DENSITY,
      },
      {
        label: 'Partial keywords count',
        key: H3_PARTIAL_KEYWORDS_COUNT,
      },
      {
        label: 'Partial keywords density',
        key: H3_PARTIAL_KEYWORDS_DENSITY,
      },
    ],
  },
  // --------------------
  // H4
  {
    label: 'H4',
    factors: [
      {
        label: 'Words count',
        key: H4_WORDS_COUNT,
      },
      {
        label: 'Characters count',
        key: H4_CHARACTERS_COUNT,
      },
      {
        label: 'Elements count',
        key: H4_ELEMENTS_COUNT,
      },
      {
        label: 'Exact keywords count',
        key: H4_EXACT_KEYWORDS_COUNT,
      },
      {
        label: 'Exact keywords density',
        key: H4_EXACT_KEYWORDS_DENSITY,
      },
      {
        label: 'Partial keywords count',
        key: H4_PARTIAL_KEYWORDS_COUNT,
      },
      {
        label: 'Partial keywords density',
        key: H4_PARTIAL_KEYWORDS_DENSITY,
      },
    ],
  },
  // --------------------
  // H5
  {
    label: 'H5',
    factors: [
      {
        label: 'Words count',
        key: H5_WORDS_COUNT,
      },
      {
        label: 'Characters count',
        key: H5_CHARACTERS_COUNT,
      },
      {
        label: 'Elements count',
        key: H5_ELEMENTS_COUNT,
      },
      {
        label: 'Exact keywords count',
        key: H5_EXACT_KEYWORDS_COUNT,
      },
      {
        label: 'Exact keywords density',
        key: H5_EXACT_KEYWORDS_DENSITY,
      },
      {
        label: 'Partial keywords count',
        key: H5_PARTIAL_KEYWORDS_COUNT,
      },
      {
        label: 'Partial keywords density',
        key: H5_PARTIAL_KEYWORDS_DENSITY,
      },
    ],
  },
  // --------------------
  // H6
  {
    label: 'H6',
    factors: [
      {
        label: 'Words count',
        key: H6_WORDS_COUNT,
      },
      {
        label: 'Characters count',
        key: H6_CHARACTERS_COUNT,
      },
      {
        label: 'Elements count',
        key: H6_ELEMENTS_COUNT,
      },
      {
        label: 'Exact keywords count',
        key: H6_EXACT_KEYWORDS_COUNT,
      },
      {
        label: 'Exact keywords density',
        key: H6_EXACT_KEYWORDS_DENSITY,
      },
      {
        label: 'Partial keywords count',
        key: H6_PARTIAL_KEYWORDS_COUNT,
      },
      {
        label: 'Partial keywords density',
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
        label: 'Words count',
        key: P_WORDS_COUNT,
      },
      {
        label: 'Characters count',
        key: P_CHARACTERS_COUNT,
      },
      {
        label: 'Elements count',
        key: P_ELEMENTS_COUNT,
      },
      {
        label: 'Exact keywords count',
        key: P_EXACT_KEYWORDS_COUNT,
      },
      {
        label: 'Exact keywords density',
        key: P_EXACT_KEYWORDS_DENSITY,
      },
      {
        label: 'Partial keywords count',
        key: P_PARTIAL_KEYWORDS_COUNT,
      },
      {
        label: 'Partial keywords density',
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
        label: 'Words count',
        key: STRONG_WORDS_COUNT,
      },
      {
        label: 'Characters count',
        key: STRONG_CHARACTERS_COUNT,
      },
      {
        label: 'Elements count',
        key: STRONG_ELEMENTS_COUNT,
      },
      {
        label: 'Exact keywords count',
        key: STRONG_EXACT_KEYWORDS_COUNT,
      },
      {
        label: 'Exact keywords density',
        key: STRONG_EXACT_KEYWORDS_DENSITY,
      },
      {
        label: 'Partial keywords count',
        key: STRONG_PARTIAL_KEYWORDS_COUNT,
      },
      {
        label: 'Partial keywords density',
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
        label: 'Words count',
        key: IMG_ALT_WORDS_COUNT,
      },
      {
        label: 'Characters count',
        key: IMG_ALT_CHARACTERS_COUNT,
      },
      {
        label: 'Exact keywords count',
        key: IMG_ALT_EXACT_KEYWORDS_COUNT,
      },
      {
        label: 'Exact keywords density',
        key: IMG_ALT_EXACT_KEYWORDS_DENSITY,
      },
      {
        label: 'Partial keywords count',
        key: IMG_ALT_PARTIAL_KEYWORDS_COUNT,
      },
      {
        label: 'Partial keywords density',
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
        label: 'Words count',
        key: TITLE_WORDS_COUNT,
      },
      {
        label: 'Characters count',
        key: TITLE_CHARACTERS_COUNT,
      },
      {
        label: 'Exact keywords count',
        key: TITLE_EXACT_KEYWORDS_COUNT,
      },
      {
        label: 'Exact keywords density',
        key: TITLE_EXACT_KEYWORDS_DENSITY,
      },
      {
        label: 'Partial keywords count',
        key: TITLE_PARTIAL_KEYWORDS_COUNT,
      },
      {
        label: 'Partial keywords density',
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
        label: 'Words count',
        key: META_DESC_WORDS_COUNT,
      },
      {
        label: 'Characters count',
        key: META_DESC_CHARACTERS_COUNT,
      },
      {
        label: 'Exact keywords count',
        key: META_DESC_EXACT_KEYWORDS_COUNT,
      },
      {
        label: 'Exact keywords density',
        key: META_DESC_EXACT_KEYWORDS_DENSITY,
      },
      {
        label: 'Partial keywords count',
        key: META_DESC_PARTIAL_KEYWORDS_COUNT,
      },
      {
        label: 'Partial keywords density',
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
        label: 'Elements count',
        key: LINK_ELEMENTS_COUNT,
      },
      {
        label: 'Nofollow count',
        key: LINK_NOFOLLOW_ELEMENTS_COUNT,
      },
      {
        label: 'Dofollow count',
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
        label: 'Words count',
        key: BODY_WORDS_COUNT,
      },
      {
        label: 'Characters count',
        key: BODY_CHARACTERS_COUNT,
      },
      {
        label: 'Exact keywords count',
        key: BODY_EXACT_KEYWORDS_COUNT,
      },
      {
        label: 'Exact keywords density',
        key: BODY_EXACT_KEYWORDS_DENSITY,
      },
      {
        label: 'Partial keywords count',
        key: BODY_PARTIAL_KEYWORDS_COUNT,
      },
      {
        label: 'Partial keywords density',
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
        label: 'Elements count',
        key: IMAGE_ELEMENTS_COUNT,
      },
      {
        label: "Elements with 'alt' attribute count",
        key: IMAGE_ELEMENTS_WITH_ALT_COUNT,
      },
      {
        label: "Elements without or empty 'alt' attribute count",
        key: IMAGE_ELEMENTS_WITHOUT_OR_WITH_EMPTY_ALT_COUNT,
      },
    ],
  },
  // --------------------
];
