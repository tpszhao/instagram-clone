const RESET = "RESET";
const ALLOW_FETCHING = "ALLOW_FETCHING";
const PAUSE_FETCHING = "PAUSE_FETCHING";
const START_LOADING = "START_LOADING";
const NEXT_PAGE = "NEXT_PAGE";
const UPDATE_TOTAL = "UPDATE_TOTAL";
const NO_MORE_RESULTS = "NO_MORE_RESULTS";
const REQUEST_ERROR = "REQUEST_ERROR";



export const initialState={
    page:1,
    hasMore:true,
    allowFetching:false,  
    isLoading:false,
    dataList:[],
    total:null
}

const infiniteLoaderReducer = (state = initialState,action) =>{
    switch(action.type){
        case RESET:
            return initialState;
        case ALLOW_FETCHING:
            return {...state,allowFetching:true}
        case PAUSE_FETCHING:
            return {...state,allowFetching:false}
        case START_LOADING:
            return {...state,isLoading:true};
        case NEXT_PAGE:
            const page = state.page + 1;
            const dataList = [...state.dataList,...action.payload];
            return {...state,page,dataList,isLoading:false}
        case UPDATE_TOTAL:
            const total = action.payload;
            return {...state,total}
        case NO_MORE_RESULTS:
        case REQUEST_ERROR:
            return {...state,hasMore:false,isLoading:false};
        default:
            return state;
    }
}

export default infiniteLoaderReducer;