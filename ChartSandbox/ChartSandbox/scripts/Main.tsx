import * as React from "react";

import * as ReactDOM from "react-dom";

import { Hello } from "./components/Hello";
import { HelloAjax } from "./components/HelloAjax"

import { drawDemoChart } from "./components/ChartDemo"

HelloAjax.renderToElement("test");

drawDemoChart("root");

//function renderHello(elementId: string): void {
//    ReactDOM.render(
//        <Hello text="béla"/>,
//        document.getElementById(elementId)
//    );
//}

//renderHello("root");

export class Main {
    
}
