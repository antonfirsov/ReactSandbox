import * as React from "react";

import * as ReactDOM from "react-dom";

import { Hello } from "./components/Hello";

import { initTodo } from './components/App'

//function renderHello(elementId: string): void {
//    ReactDOM.render(
//        <Hello text="béla"/>,
//        document.getElementById(elementId)
//    );
//}

//renderHello("root");

initTodo("root");

export class Main {
    
}
