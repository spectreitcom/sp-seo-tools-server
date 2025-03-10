// todo: depracated

export type SearchResult = {
  url: string;
  position: number;
};

export type SerpApiResponse = {
  organic_results: {
    position: number;
    link: string;
  }[];
};
