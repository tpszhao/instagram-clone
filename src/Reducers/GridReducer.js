export const initialState={
    page:1,
    hasMore:true,
    allowFetching:false,  
    isLoading:false,
    photos:[],
    total:null
}

const GridReducer = (state = initialState,action) =>{
    switch(action.type){
        case "reset":
            return initialState;
        case "start":
            return {...state,allowFetching:true}
        case "startLoading":
            return {...state,isLoading:true};
        case "nextPage":
            console.log(`finished fetching page ${state.page}`);
            const page = state.page + 1;
            const photos = [...state.photos,...action.payload];
            return {...state,page,photos,isLoading:false}
        case "updateTotal":
            const total = action.payload;
            return {...state,total}
        case "noMorePhotos":
        case "requestError":
            console.log("set isLoading to false")
            return {...state,hasMore:false,isLoading:false};
        default:
            return state;
    }
}

export default GridReducer;