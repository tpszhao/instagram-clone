const ALLOW_FETCHING = "ALLOW_FETCHING";
const PAUSE_FETCHING = "PAUSE_FETCHING";
const START_LOADING = "START_LOADING";
const NEXT_PAGE = "NEXT_PAGE";
const REQUEST_ERROR = "REQUEST_ERROR";



export const initialState = {
    allowFetching:false,
    isLoading:false,
    "/":{
        dataList:[],
        page:1,
        hasMore:true,
    },
    "/explore":{
        dataList:[],
        page:1,
        hasMore:true,
    },
    gridPage:{
        keyword:null, 
        dataList:[],
        total:null,
        page:1,
        hasMore:true,
    },
    searchPage:{
        keyword:null,

        photos:{
            dataList:[],
            total:null,
            page:1,
            hasMore:true,
        },

        collections:{
            dataList:[],
            total:null,
            page:1,
            hasMore:true,
        }
    }
}

const PRE_FETCHING_CLEANUP = (state,payload)=>{
    const { route, keyword } = payload;
    let result = {...state,allowFetching:true};
    let key;
    let prevState;
    switch(route){
        case "/":
        case "/explore":
            return result
        case "/search/:searchType/:searchValue":
            key = "searchPage";
            break;
        default:
            key = "gridPage";
    }
    prevState = state[key];
    if (keyword === prevState.keyword) return result;
    return {...result,[key]:initialState[key]}
}

const NEXT_PAGE_ACTION = (state,payload)=>{
    const { 
        route, 
        dataList,
        total,
        keyword,
        searchType
    } = payload;
    let prevRouteState;
    let newRouteState;
    const stopLoadingState = {...state,isLoading:false};
    switch(route){
        case "/":
        case "/explore":
            prevRouteState = state[route];
            newRouteState={
                dataList:[...prevRouteState.dataList,...dataList],
                page:prevRouteState.page + 1,
                hasMore: !!dataList.length
            }
            return {
                ...stopLoadingState, 
                [route]:newRouteState,
            }
        
        case "/search/:searchType/:searchValue":
            prevRouteState = state.searchPage;
            const prevSearchTypeState = prevRouteState[searchType];
            const newSearchTypeState = {
                dataList:[...prevSearchTypeState.dataList,...dataList],
                page:prevSearchTypeState.page + 1,
                hasMore: !!dataList.length,
                total,
            }
            newRouteState = {
                ...prevRouteState,
                [searchType]:newSearchTypeState,
                keyword
            }
            return {
                ...stopLoadingState,
                searchPage:newRouteState,
            }
        default:
            prevRouteState = state.gridPage;
            newRouteState = {
                keyword,
                total,
                dataList:[...prevRouteState.dataList,...dataList],
                page:prevRouteState.page + 1,
                hasMore: !!dataList.length
            };
            return {
                ...stopLoadingState, 
                gridPage:newRouteState,
            }
    }

}



const infiniteLoaderReducer = (state = initialState,action) =>{
    let result;
    switch(action.type){
        case ALLOW_FETCHING:
            result = PRE_FETCHING_CLEANUP(state,action.payload);
            return result;
        case PAUSE_FETCHING:
            return {...state,allowFetching:false}
        case START_LOADING:
            return {...state,isLoading:true};
        case NEXT_PAGE:
            result = NEXT_PAGE_ACTION(state,action.payload);
            return result;
        case REQUEST_ERROR:
            return {...state,allowFetching:false,isLoading:false};
        default:
            return state;
    }
}

export default infiniteLoaderReducer;