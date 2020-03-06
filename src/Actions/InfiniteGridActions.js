export const reset = {
    type:'reset'
}

export const allowFetching = {
    type:'allowFetching'
}

export const pauseFetching = {
    type:'pauseFetching'
}


export const startLoading = {
    type:'startLoading'
}

export const nextPage = photos => {
    return{
        type:'nextPage',
        payload:photos
    }
}

export const updateTotal = total =>{
    return{
        type:'updateTotal',
        payload:total
    }
}

export const noMoreResults = {
    type:'noMoreResults'
}

export const requestError = {
    type:'requestError'
}