export const start = {
    type:'start'
}

export const reset = {
    type:'reset'
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

export const noMorePhotos = {
    type:'noMorePhotos'
}

export const requestError = {
    type:'requestError'
}