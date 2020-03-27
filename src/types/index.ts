export interface GetKeywords {
  token: string | null;
  server: string | null;
  documentSetId: string | null;
  apiToken: string | null;
}
export interface SimilarToken {
  count: number;
  similarity: number;
  token: string;
}
export interface SearchHistory {
  id: number;
  term: string | null;
}
export interface SearchedItem {
  id: number;
  foundTokens: string[];
  similarTokens: SimilarToken[];
  sortedSimilarTokensByCount: SimilarToken[];
}

export interface Progress {
  n_ahead_in_queue: number;
  fraction: number;
  message: string | null;
  returncode: number | null;
  error: string | null;
}

/**
 * State of this state+apiToken on the server, according to the server.
 *
 * !isSuccess && lastProgress === null => this is "UNKNOWN" (server hasn't responded yet)
 * !isSuccess && lastProgress => server says X (may be an error message!)
 * isSuccess && lastProgress === null => server says this was done (long ago)
 * isSuccess && lastProgress => server says this was done (since we started the request)
 */
export interface ProgressState {
  lastProgress: Progress | null;
  isSuccess: boolean;
}

export interface State {
  searchedList: SearchedItem[];
  searchHistory: SearchHistory[];
  token: string[];
  similarSuggestionslist: string[];
}
