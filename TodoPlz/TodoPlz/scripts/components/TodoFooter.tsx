import * as React from "react";
import * as Interfaces from "./Interfaces"
import { Utils } from "./Utils";

export class TodoFooter extends React.Component<Interfaces.ITodoFooterProps, {}> {
    render(): React.ReactNode {
        var activeTodoWord = Utils.pluralize(this.props.count, "item");

        var clearButton = null;

        if (this.props.completedCount > 0) {
            clearButton = (
                <button onClick={this.props.onClearCompleted} className="clear-completed">
                    Clear completed
                </button>
            );
        }

        var nowShowing = this.props.nowShowing;

        return (
            <footer className="footer">
                <span className="todo-count">
                    <strong>{this.props.count}</strong> {activeTodoWord} left
                </span>
            </footer>
        );
    }
}