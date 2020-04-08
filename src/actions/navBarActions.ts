export const GET_LOCAL = {
  type: "GET_LOCAL",
};

export const REDIRECT = (value: string) => {
  return {
    type: "REDIRECT",
    payload: { value },
  };
};

export const CHANGE_SUGGESTIONS = (inputValue: string) => {
  return {
    type: "CHANGE_SUGGESTIONS",
    payload: { inputValue },
  };
};

export const ON_BLUR = {
  type: "ON_BLUR",
};

export const START_SEARCHING = {
  type: "START_SEARCHING",
};

export const CLEAR_SEARCH_TERM = {
  type: "CLEAR_SEARCH_TERM",
};

export const CLEAR_HISTORY = {
  type: "CLEAR_HISTORY",
};
