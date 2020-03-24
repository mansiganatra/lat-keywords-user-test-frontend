import { createContext } from 'react';

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
      term: string;
    }[];
    token: string[];
    similarSuggestionslist: string[];
  };
  clearAll: () => void;
  deleteModel: (modelId: number) => void;
  sortBy: string;
  keywordMode: React.MutableRefObject<boolean>;
  selectedId: number | null;
  selectModel: (id: number) => void;
  term: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
}

const searchContext = createContext<ContextInterface>();

export default searchContext;
