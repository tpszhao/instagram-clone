export const ALLOW_FETCHING = (
  route: string,
  keyword: string | null = null
) => {
  return {
    type: "ALLOW_FETCHING",
    payload: {
      route,
      keyword,
      dataList: [],
      total: null,
      searchType: "photos",
    },
  };
};

export const PAUSE_FETCHING = {
  type: "PAUSE_FETCHING",
};

export const START_LOADING = {
  type: "START_LOADING",
};

interface NextPageProps {
  route: string;
  dataList: any[];
  total: number | null;
  keyword: string | null;
  searchType: string;
}

export const NEXT_PAGE = ({
  route,
  dataList = [],
  total = null,
  keyword = null,
  searchType = "photos",
}: NextPageProps) => {
  return {
    type: "NEXT_PAGE",
    payload: {
      route,
      dataList,
      total,
      keyword,
      searchType,
    },
  };
};

export const REQUEST_ERROR = {
  type: "REQUEST_ERROR",
};
