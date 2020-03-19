
export const ALLOW_FETCHING = (route,keyword = null) => {
    return {
        type:'ALLOW_FETCHING',
        payload:{ route, keyword }
    }
}

export const PAUSE_FETCHING = {
    type:'PAUSE_FETCHING'
}


export const START_LOADING = {
    type:'START_LOADING'
}

export const NEXT_PAGE = ({
    route, 
    dataList=[],
    total=null,
    keyword=null,
    searchType="photos"
}) => {
        return{
            type:'NEXT_PAGE',
            payload:{
                route, 
                dataList,
                total,
                keyword,
                searchType
            }
        }
}

export const REQUEST_ERROR = {
    type:'REQUEST_ERROR'
}