const localGet = (key,alternative=[])=>{
    const result = JSON.parse(localStorage.getItem(key))||alternative;
    return result;
}

const localSet = (key,value)=>{
    localStorage.setItem(key,JSON.stringify(value));
}

export {localGet,localSet}