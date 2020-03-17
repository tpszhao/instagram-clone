export const RESET = {
    type:'RESET'
}

export const ALLOW_FETCHING = {
    type:'ALLOW_FETCHING'
}

export const PAUSE_FETCHING = {
    type:'PAUSE_FETCHING'
}


export const START_LOADING = {
    type:'START_LOADING'
}

export const NEXT_PAGE = photos => {
    return{
        type:'NEXT_PAGE',
        payload:photos
    }
}

export const UPDATE_TOTAL = total =>{
    return{
        type:'UPDATE_TOTAL',
        payload:total
    }
}

export const NO_MORE_RESULTS = {
    type:'NO_MORE_RESULTS'
}

export const REQUEST_ERROR = {
    type:'REQUEST_ERROR'
}