import React from "react";
import { proxyState } from "./proxy";
class ProxyStateComponent<P={},S={}, SS = any> extends React.Component<P, S, SS> {
    public state: S;
    constructor(state: S, props: P) {
        super(props);
        this.state = proxyState(state, this._setState.bind(this));
    }
    private _setState(state: any) {
        this.state = state;
        this.setState(state, () => {
            this.state = proxyState(this.state, this._setState.bind(this));
        });
    }
}
export default ProxyStateComponent;