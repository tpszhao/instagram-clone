export const initialState={
    page:1,
    hasMore:true,
    allowFetching:false,  
    isLoading:false,
    dataList:[],
    total:null
}

const InfiniteLoaderReducer = (state = initialState,action) =>{
    switch(action.type){
        case "reset":
            return initialState;
        case "allowFetching":
            return {...state,allowFetching:true}
        case "pauseFetching":
            return {...state,allowFetching:false}
        case "startLoading":
            return {...state,isLoading:true};
        case "nextPage":
            const page = state.page + 1;
            const dataList = [...state.dataList,...action.payload];
            return {...state,page,dataList,isLoading:false}
        case "updateTotal":
            const total = action.payload;
            return {...state,total}
        case "noMoreResults":
        case "requestError":
            return {...state,hasMore:false,isLoading:false};
        default:
            return state;
    }
}

export default InfiniteLoaderReducer;