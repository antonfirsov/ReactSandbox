import * as React from "react";
import * as ReactDOM from "react-dom";
import { Ajax } from './Ajax';

interface IHelloAjaxState {
    text : string;
}

export class HelloAjax extends React.Component<{}, IHelloAjaxState> {

    constructor() {
        super(null);

        this.state = { text: "INITIAL STATE" };
    }

    render(): React.ReactNode {
        return <div>
                   <strong>{this.state.text}</strong>
               </div>;
    }

    componentDidMount(): void {
        Ajax.get("/home/test").then(result => {

            this.setState({text : result});
            this.forceUpdate();
        });
    }

    static renderToElement(elementId: string): void {
        ReactDOM.render(
            <HelloAjax/>,
            document.getElementById(elementId)
        );
    }
}