interface ObjectType {
  [key: string]: any;
}

const areEqualShallow = (
  obj1: ObjectType,
  obj2: ObjectType,
  keys: string[] = []
) => {
  let keyArray = keys.length === 0 ? Object.keys(obj1) : keys;
  for (let key of keyArray) {
    if (obj1[key] !== obj2[key]) return false;
  }
  return true;
};

export default areEqualShallow;
