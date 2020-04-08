import { localGet, localSet } from "api/local";

const GET_LOCAL = "GET_LOCAL";
const REDIRECT = "REDIRECT";
const CHANGE_SUGGESTIONS = "CHANGE_SUGGESTIONS";
const ON_BLUR = "ON_BLUR";
const START_SEARCHING = "START_SEARCHING";
const CLEAR_SEARCH_TERM = "CLEAR_SEARCH_TERM";
const CLEAR_HISTORY = "CLEAR_HISTORY";

interface InitialState {
  inputValue: string;
  searchHistory: string[];
  isSearching: boolean;
  searchSuggestions: string[];
}

export const initialState: InitialState = {
  inputValue: "",
  searchHistory: [],
  isSearching: false,
  searchSuggestions: [],
};

const navBarSearchReducer = (
  state: InitialState = initialState,
  action: any
) => {
  const { searchHistory } = state;
  switch (action.type) {
    case GET_LOCAL:
      const savedSearchHistory = localGet("SearchHistory");

      return {
        ...state,
        searchHistory: savedSearchHistory,
        searchSuggestions: savedSearchHistory,
      };

    case START_SEARCHING:
      return { ...state, isSearching: true };

    case CLEAR_SEARCH_TERM:
      return { ...state, inputValue: "" };

    case REDIRECT:
      const { value } = action.payload;
      const removeRepeat = searchHistory.filter((item) => item !== value);
      const newSearchHistory = [value, ...removeRepeat];
      localSet("SearchHistory", newSearchHistory);

      return {
        ...state,
        isSearching: false,
        searchHistory: newSearchHistory,
        inputValue: value,
      };

    case CHANGE_SUGGESTIONS:
      const { inputValue } = action.payload;
      const searchSuggestions = searchHistory.filter((item) =>
        item.includes(inputValue)
      );
      return {
        ...state,
        isSearching: true,
        inputValue,
        searchSuggestions,
      };

    case ON_BLUR:
      return {
        ...state,
        isSearching: false,
        searchSuggestions: searchHistory,
      };

    case CLEAR_HISTORY:
      localSet("SearchHistory", []);

      return {
        ...state,
        searchHistory: [],
        searchSuggestions: [],
      };

    default:
      return state;
  }
};

export default navBarSearchReducer;
