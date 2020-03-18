const areEqualShallow = (obj1,obj2,keys=[])=>{
    let keyArray = (keys.length === 0)? Object.keys(obj1) : keys;
    for (let key of keyArray){
        if (obj1[key] !== obj2[key]) return false
    }
    return true;
}

export default areEqualShallow