export type SearchResult = {
  url: string;
  position: number;
};

export type SendQueryResponse = {
  response_id: string;
};

export type GetDataResponse = {
  organic?: {
    link: string;
    display_link: string;
    title: string;
    description: string;
    rank: number;
    global_rank: number;
    image?: string;
    image_alt?: string;
    image_base64?: string;
  }[];
};

export type Metadata = Record<string, string | number | boolean> | null;
