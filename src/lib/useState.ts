import { useState } from "react";
import { proxyState } from "./proxy";
const _useState = <K>(initialState: K): K => {
  const [newState, setState] = useState<K>(initialState);
  const _newState = proxyState(newState, setState);
  return _newState;
};
export default _useState;
