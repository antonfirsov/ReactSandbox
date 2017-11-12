import * as React from "react";
import { Ajax } from './Ajax';

export interface IHelloProps {
    text: string
}

export class Hello extends React.Component<IHelloProps, {}> {
    render() : React.ReactNode {
        return <div>Hello {this.props.text}!</div>;
    }
}