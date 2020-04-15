import areEqualShallow from "utilities/areEqualShallow";
import generateRandomNumber from "utilities/generateRandomNumber";

const ALLOW_FETCHING = "ALLOW_FETCHING";
const PAUSE_FETCHING = "PAUSE_FETCHING";
const START_LOADING = "START_LOADING";
const NEXT_PAGE = "NEXT_PAGE";
const REQUEST_ERROR = "REQUEST_ERROR";

interface BasicRouteType {
  dataList: any[];
  page: number;
  hasMore: boolean;
}

interface ExploreType extends BasicRouteType {
  heightList: string[];
}

interface GridPageType extends BasicRouteType {
  route: string | null;
  keyword: string | null;
  total: number | null;
}

interface SearchPageType {
  route: string;
  keyword: string | null;
  photos: BasicRouteType & { total: number | null };
  collections: BasicRouteType & { total: number | null };
  [key: string]: any;
}

interface StateType {
  allowFetching: boolean;
  isLoading: boolean;
  "/": BasicRouteType;
  "/explore": ExploreType;
  gridPage: GridPageType;
  searchPage: SearchPageType;
  [key: string]: any;
}

export const initialState: StateType = {
  allowFetching: false,
  isLoading: false,
  "/": {
    dataList: [],
    page: 1,
    hasMore: true,
  },
  "/explore": {
    dataList: [],
    heightList: [],
    page: 1,
    hasMore: true,
  },
  gridPage: {
    route: null,
    keyword: null,
    dataList: [],
    total: null,
    page: 1,
    hasMore: true,
  },
  searchPage: {
    route: "/search/:searchType/:searchValue",
    keyword: null,

    photos: {
      dataList: [],
      total: null,
      page: 1,
      hasMore: true,
    },

    collections: {
      dataList: [],
      total: null,
      page: 1,
      hasMore: true,
    },
  },
};

interface PayloadType {
  route: string;
  dataList: any[];
  total: number | null;
  keyword: string | null;
  searchType: string;
}

interface ActionType {
  type: string;
  payload: PayloadType;
}

const PRE_FETCHING_CLEANUP = (
  state: StateType = initialState,
  { payload }: ActionType
) => {
  const { route } = payload;
  let result = { ...state, allowFetching: true };
  let key;
  let prevState;
  switch (route) {
    case "/":
    case "/explore":
      return result;
    case "/search/:searchType/:searchValue":
      key = "searchPage";
      break;
    default:
      key = "gridPage";
  }
  prevState = state[key];
  if (areEqualShallow(prevState, payload, ["route", "keyword"])) return result;

  return { ...result, [key]: initialState[key] };
};

const NEXT_PAGE_ACTION = (
  state: StateType = initialState,
  { payload }: ActionType
) => {
  const { route, dataList, total, keyword, searchType } = payload;
  const stopLoadingState = { ...state, isLoading: false };
  switch (route) {
    case "/": {
      const prevRouteState = state[route];
      const newRouteState = {
        dataList: [...prevRouteState.dataList, ...dataList],
        page: prevRouteState.page + 1,
        hasMore: !!dataList.length,
      };
      return {
        ...stopLoadingState,
        [route]: newRouteState,
      };
    }
    case "/explore": {
      const prevRouteState = state[route];
      const newHeightList = dataList.map(
        () => `${generateRandomNumber(200, 400)}px`
      );
      const newRouteState = {
        dataList: [...prevRouteState.dataList, ...dataList],
        page: prevRouteState.page + 1,
        hasMore: !!dataList.length,
        heightList: [...prevRouteState.heightList, ...newHeightList],
      };

      return {
        ...stopLoadingState,
        [route]: newRouteState,
      };
    }
    case "/search/:searchType/:searchValue": {
      const prevRouteState = state.searchPage;
      const prevSearchTypeState = prevRouteState[searchType];
      const newSearchTypeState = {
        dataList: [...prevSearchTypeState.dataList, ...dataList],
        page: prevSearchTypeState.page + 1,
        hasMore: !!dataList.length,
        total,
        route,
      };
      const newRouteState = {
        ...prevRouteState,
        [searchType]: newSearchTypeState,
        keyword,
      };
      return {
        ...stopLoadingState,
        searchPage: newRouteState,
      };
    }
    default: {
      const prevRouteState = state.gridPage;
      const newRouteState = {
        route,
        keyword,
        total,
        dataList: [...prevRouteState.dataList, ...dataList],
        page: prevRouteState.page + 1,
        hasMore: !!dataList.length,
      };
      return {
        ...stopLoadingState,
        gridPage: newRouteState,
      };
    }
  }
};

const infiniteLoaderReducer = (
  state: StateType,
  action: ActionType
): StateType => {
  let result;
  switch (action.type) {
    case ALLOW_FETCHING:
      result = PRE_FETCHING_CLEANUP(state, action);
      return result;
    case PAUSE_FETCHING:
      return { ...state, allowFetching: false };
    case START_LOADING:
      return { ...state, isLoading: true };
    case NEXT_PAGE:
      result = NEXT_PAGE_ACTION(state, action);
      return result;
    case REQUEST_ERROR:
      return { ...state, allowFetching: false, isLoading: false };
    default:
      return state;
  }
};

export default infiniteLoaderReducer;
