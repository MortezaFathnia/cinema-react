export type showItem = {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: "Ended" | "Running" | "To Be Determined";
  runtime: number;
  averageRuntime: number;
  premiered: string;
  ended: null | string;
  officialSite: string;
  schedule: {
    time: string;
    days: string[]
  };
  rating: null | number;
  weight: number;
  network: {
    id: number;
    name: string;
    country: {
      name: string;
      code: string;
      timezone: string;
    };
    officialSite: string
  };
  webChannel: null | string;
  dvdCountry: null | string;
  externals: {
    tvrage: number;
    thetvdb: number;
    imdb: string
  };
  image: {
    medium: string;
    original: string
  };
  summary: string;
  updated: number;
  _links: {
    self: {
      href: string;
    };
    previousepisode: {
      href: string;
      name: string;
    }
  }
}


export type showItemExpanded = {
  show: showItem;
  score: number;
}

export type PageDirection = "next" | "previous";

export type SortBy = "score" | "recent";

export type ShowBy = "card" | "table";

export type SelectOption = { label: string; value: string} | null