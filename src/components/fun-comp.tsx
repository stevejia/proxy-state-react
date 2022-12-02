import React from "react";
import { useState } from "../lib";
import { stringify } from "../lib/utils";
// import { clone } from "../lib/proxy";
import { TestState } from "./types"

export const funComp = () => {
    const initState: TestState = {
        count1: 1
    }
    const state = useState(initState);
    return <div>
        <div>React 函数组件测试proxy state</div>
        <div>{stringify(state)}</div>
        <button onClick={()=> state.count1 ++}>state.count1 number ++</button>
        <button onClick={()=> state.count2 = '我是count2'}>count2 string 赋值</button>
        <button onClick={()=> state.count3 = []}>count3 array 赋值 []</button>
        <button onClick={()=> state.count3?.push(1)}>count3 array push</button>
        <button onClick={()=> state.count3?.pop()}>count3 array pop</button>
        <button onClick={()=> state.count3?.unshift(3)}>count3 array unshift</button>
        <button onClick={()=> state.count3?.shift()}>count3 array shift</button>
        <button onClick={()=> state.count4= {count5: 'count4-5'}}>count4赋值{`{ count5: "count4-5"}`}</button>
        <button onClick={()=> state.count4!.count5= "count4-5-change"}>count5 赋值 count4-5-change</button>
        <button onClick={()=> delete state.count4?.count5}>删除count5属性</button>
        <button onClick={()=> state.count6= {count7: ()=> 3333}}>初始化count7为function</button>
        <button onClick={()=> state.count6!.count7 = new Map<string, string>()}>count7赋值map</button>
        {/* <button onClick={()=> {
            state.count8 = false;
            const newObj = clone({a: 1, b: "2", c: [3], d: {e: ()=>{}}});
            console.log('cloned object with functions', newObj);
        }}>count7赋值map</button> */}
    </div>
}

export default funComp;