# proxy-state-react

## how to install


- npm i proxy-state-react --save 

- yarn add proxy-state-react

## how to use

### use in class components

``` typescript
import React from "react";
import { ProxyStateComponent } from "proxy-state-react";
interface PropsType {}
interface StateType {
  a?: number;
  b: number;
  c: { d: number };
  d?: number;
  e?: any;
}
class TestProxyStateComponent extends ProxyStateComponent<
  PropsType,
  StateType
> {
  constructor(props: PropsType) {
    const state = {
      a: 1,
      b: 2,
      c: { d: 3 },
    };
    super(state, props);
  }
  render(): JSX.Element {
    this.state.a;
    return (
      <div>
        <div>{JSON.stringify(this.state, null, 2)}</div>
        <div>
          <button onClick={() => (this.state.d = 5)}>加一个基本属性</button>
          <button onClick={() => (this.state.e = { f: 9 })}>
            加一个引用类型
          </button>
          <button onClick={() => (this.state.a = 11)}>改一个属性</button>
          <button onClick={() => (this.state.e.f = { g: 12 })}>
            改一个加的基本属性
          </button>
          <button onClick={() => delete this.state.a}>删除一个属性</button>
        </div>
      </div>
    );
  }
}
export default TestProxyStateComponent;
```

### use in hooks

``` typescript
import React, { useEffect } from "react";
import { useState } from 'proxy-state-react';
interface StateType {
    count: number;
    count1: {a: number} | number;
    count3?: number;
    count4?: Array<number>;
    count5?: {[key: string]: number};
}
const Test2 = (props) => {
    const initState: any = {count: 1, count1: {a: 2}};
    const state: StateType = useState<StateType>(initState);
    useEffect(()=> {
        state.count1 = 33234;
    },[])
    return <div>
        <div>{JSON.stringify(state)}</div>
        <button onClick={()=> state.count++}>state.count++</button>
        <button onClick={()=> state.count3 = 3}>增加一个属性</button>
        <button onClick={()=> state.count4 = []}>增加一个数组</button>
        <button onClick={()=> state.count5 = {}}>增加一个对象</button>
        <button onClick={()=> state.count4.push(5)}>数组增加一个元素</button>
        <button onClick={()=> state.count5.g = 6}>对象增加一个元素</button>
        <button onClick={()=> delete state.count3 }>删除一个属性</button>
    </div>;
}
export default Test2;
```

## keywords

proxy state react
