
import './Constants'
import * as React from 'react';
import * as ReactDOM from "react-dom";

import { Constants} from './Constants';
import * as Interfaces from "./Interfaces"
import ITodoItemProps = Interfaces.ITodoItemProps;
import ITodoItemState = Interfaces.ITodoItemState;


export class TodoItem extends React.Component<ITodoItemProps, ITodoItemState> {
    constructor(props: ITodoItemProps) {
        super(props);

        this.state = { editText: this.props.todo.title };
    }

    public handleSubmit(event: any) {
        var val = this.state.editText.trim();

        if (val) {
            this.props.onSave(val);
            this.setState({ editText: val });
        } else {
            this.props.onDestroy();
        }
    }

    public handleEdit() {
        this.props.onEdit();
        this.setState({editText: this.props.todo.title});
    }

    public handleKeyDown(event) {
        if (event.which === Constants.ESCAPE_KEY) {
            this.setState({ editText: this.props.todo.title });
            this.props.onCancel(event);
        } else if (event.which === Constants.ENTER_KEY) {
            this.handleSubmit(event);
        }
    }

    public handleChange(event) {
        this.setState({ editText: event.target.value });
    }

    componentDidUpdate(prevProps: Readonly<ITodoItemProps>): void {
        var editField = this.refs["editField"];
        var node = ReactDOM.findDOMNode(editField) as HTMLInputElement;
        node.focus();
        node.setSelectionRange(node.value.length, node.value.length);
    }

    render(): React.ReactNode {
        return (
            <li>
                <div className="view">
                    <input className="toggle"
                        type="checkbox"
                        checked={this.props.todo.completed}
                        onChange={this.props.onToggle}
                    />
                    <label onClick={e => this.handleEdit()}>
                        {this.props.todo.title}
                    </label>
                    <button className="destroy" onClick={this.props.onDestroy} />
                </div>
                <input
                    ref="editField"
                    className="edit"
                    value={this.state.editText}
                    onBlur={e => this.handleSubmit(e)}
                    onChange={e => this.handleChange(e)}
                    onKeyDown={e => this.handleKeyDown(e)}
                />
            </li>
            );
    }
}