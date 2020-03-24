import { createContext, useContext } from 'react';

interface Progress {
  n_ahead_in_queue: number;
  fraction: number;
  message: string | null;
  returncode: number | null;
  error: string | null;
}
interface ModelState {
  lastProgress: Progress | null;
  isSuccess: boolean;
}
interface ContextInterface {
  docset: {
    models: {
      id: number;
      foundTokens: string[];
      similarTokens: {
        count: number;
        similarity: number;
        token: string;
      }[];
      sortedSimilarTokensByCount: {
        count: number;
        similarity: number;
        token: string;
      }[];
    }[];
    searchHistory: {
      id: number;
      term: string | null;
    }[];
    token: string[];
    similarSuggestionslist: string[];
  };
  clearAll: () => void;
  deleteModel: (modelId: number) => void;
  sortBy: string;
  keywordMode: React.MutableRefObject<boolean>;
  selectedId: number | null;
  selectModel: (id: number | null) => void;
  term: string | null;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  modelState: ModelState;
}

const searchContext = createContext<Partial<ContextInterface>>({});

export default searchContext;
