const capitalize = str=>{
    if (!str.length) return str;
    const firstLetter = str.charAt(0);
    const res = str.replace(firstLetter,firstLetter.toUpperCase())
    return res;
}

export default capitalize;