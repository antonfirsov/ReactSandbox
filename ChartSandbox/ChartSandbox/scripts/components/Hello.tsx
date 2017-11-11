
import * as React from "react";

export interface IHelloProps {
    text: string
}

export class Hello extends React.Component<IHelloProps, {}> {
    render() : React.ReactNode {
        return <div>Hello {this.props.text}!</div>;
    }
}