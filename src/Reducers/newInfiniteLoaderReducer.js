const RESET = "RESET";
const ALLOW_FETCHING = "ALLOW_FETCHING";
const PAUSE_FETCHING = "PAUSE_FETCHING";
const START_LOADING = "START_LOADING"
const NEXT_PAGE = "NEXT_PAGE";
const NO_MORE_RESULTS = "NO_MORE_RESULTS";
const ERROR = "ERROR";

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
    "/user/:username":{
        keyword:null,
        dataList:[],
        total:null,
        page:1,
        hasMore:true,
    },
    "/collection/:collectionID":{
        keyword:null,
        dataList:[],
        total:null,
        page:1,
        hasMore:true,
    },
    "/search/:searchType/:searchValue":{
        keyword:null,
        searchType:"photos",

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

const updateRouteState = (state,payload)=>{
    const { route } = payload;
    switch(route){
        case "/user/:username":
        case "/collection/:collectionID":
        case "/search/:searchType/:searchValue":
            if (state.keyword === payload.keyword){
                return state;
            }
            return {...state,route:initialState[route]};
        default:
            return state;
    }
}

const nextPage = (state,payload)=>{
    const { route, dataList, total, keyword } = payload;
    const prevState = state[route];
    let newRouteState = {};
    switch (route){
        case "/user/:username":
        case "/collection/:collectionID":
            newRouteState = {
                keyword,
                total,
                hasMore:true,
                dataList:[...prevState.dataList,...dataList],
                page:prevState.page + 1
            }
            return {...state,[route]:newRouteState}
        case "/search/:searchType/:searchValue":
            const { searchType } = payload;
            const {[searchType]:searchTypeState} = prevState;
            newRouteState = {
                ...prevState,
                keyword,
                searchType,
                [searchType]:{
                    total,
                    page:searchTypeState.page + 1,
                    hasMore:true,
                    dataList:[...searchTypeState.dataList,...dataList]
                }
            }
            return {...state,[route]:newRouteState}
        default:
            newRouteState = {
                hasMore:true,
                dataList:[...prevState.dataList],
                page:prevState.page + 1
            }
            return { ...state,[route]:newRouteState }
    }
}

const newInfiniteLoaderReducer = (state=initialState,action)=>{
    switch(action.type){
        case RESET:
            return initialState;
        case ALLOW_FETCHING:
            const updatedState = updateRouteState(state,action.payload)
            return {...updatedState,allowFetching:true}
        case PAUSE_FETCHING:
            return {...state,allowFetching:false};
        case START_LOADING:
            return {...state,isLoading:true};
        case NEXT_PAGE:
            return nextPage(state,action.payload);
        case NO_MORE_RESULTS:
        case ERROR:
            const { route } = action.payload;
            const prevRouteState = state[route];
            return {
                ...state,
                [route]:{
                    ...prevRouteState,
                    hasMore:false
                }
            }
        default:
            return state;
    }
}

export default newInfiniteLoaderReducer
