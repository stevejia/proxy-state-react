import { clone, isObject, stringify } from "./utils";
const proxyState =function <K>(state: K, setState: any, scope?: any) {
  if(scope) {
    setState = setState.bind(scope);
  }
  proxyChain(state, state, setState, scope);
  const proxyedState = proxy(state, state, setState, scope);
  return proxyedState;
};

const proxyChain = (obj: any, origin: any, setState: any, scope?: any) => {
  obj = proxy(obj, origin, setState, scope);
  Object.keys(obj).forEach((key) => {
    if (isObject(obj[key])) {
      proxyChain(obj[key], origin, setState, scope);
      obj[key] = proxy(obj[key], origin, setState, scope);
    }
  });
};

const proxy = (obj: any, origin: any, setState: any, scope?: any) => {
  const proxyedObj = new Proxy(obj, {
    get: (target, props, receiver) => {
      return Reflect.get(target, props, receiver);
    },
    set: (target, props, value, receiver) => {
      const originTargetJson = stringify(origin);
      if (isObject(value)) {
        const proxyedValue = proxy(value, origin, setState, scope);
        Reflect.set(target, props, proxyedValue, receiver);
      } else {
        Reflect.set(target, props, value, receiver);
      }
      const nowTargetJson = stringify(origin);
      if (nowTargetJson === originTargetJson) {
        return true;
      }
      return updateState(origin, setState, scope);
    },
    deleteProperty: (target, props) => {
      const originTargetJson = stringify(origin);
      Reflect.deleteProperty(target, props);
      const nowTargetJson = stringify(origin);
      if (nowTargetJson === originTargetJson) {
        return true;
      }
      
      return updateState(origin, setState, scope);
    },
  });
  return proxyedObj;
};

const updateState = (origin: any, setState: any, scope?: any) => {
  if(!scope) {
    setState(clone(origin));
    return true;
  }

  setState(clone(origin), ()=> {
    console.log(scope.state);
    scope.state = proxy(origin, origin, setState, scope);
  });

  return true;
}

export {proxyState};