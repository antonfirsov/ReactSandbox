import * as React from "react";

import * as ReactDOM from "react-dom";

import { Hello } from "./components/Hello";

function renderHello(elementId: string): void {
    ReactDOM.render(
        <Hello text="béla"/>,
        document.getElementById(elementId)
    );
}

renderHello("root");

export class Main {
    
}
