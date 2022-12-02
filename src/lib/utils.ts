export const isObject = (objLike: any) => {
  return typeof objLike === "object";
};

export const clone = (objLike: any) => {
  if (objLike === undefined || objLike === null) {
    return objLike;
  }

  if (typeof objLike === "function") {
    return objLike;
  }
  const functions = getFunctions(objLike);

  const newObj = JSON.parse(JSON.stringify(objLike));
  functions.forEach((fun) => {
    const { key, func } = fun;
    let item = newObj;
    key.forEach((k, index) => {
      if (index !== key.length - 1) {
        item = item[k];
        return;
      }
      item[k] = func;
    });
  });
  return newObj;
};

const getFunctions = (objLike: any) => {
  const functions: { key: string[]; func: Function }[] = [];
  _getFunctions(objLike, functions);
  return functions;
};

const _getFunctions = (
  objLike: any,
  funcs: { key: string[]; func: Function }[],
  currentPath?: string[]
) => {
  const keys = Object.keys(objLike);
  keys.forEach((key) => {
    const item = objLike[key];
    const newPath = [...(currentPath || []), key];
    if (typeof item === "function") {
      funcs.push({ key: newPath, func: item });
      return;
    }
    if (typeof item === "object") {
      _getFunctions(item, funcs, newPath);
    }
  });
};

export const stringify = (objLike: any) => {
  // const functions = getFunctions(objLike);
  const tempObj = clone(objLike);
  stringifyFunc(tempObj);
  return JSON.stringify(tempObj);
};

const stringifyFunc = (objLike: any) => {
  if (objLike === null || objLike === undefined) {
    return objLike;
  }
  if (typeof objLike === "function") {
    return objLike.toString();
  }
  if (typeof objLike === "object") {
    const keys = Object.keys(objLike);
    keys.forEach((key) => {
      const item = objLike[key];
      if (typeof item === "function") {
        objLike[key] = item.toString();
      } else if (typeof item === "object") {
        stringifyFunc(item);
      }
    });
  }
};
