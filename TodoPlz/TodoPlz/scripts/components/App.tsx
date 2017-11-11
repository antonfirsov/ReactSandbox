import * as React from 'react';
import * as ReactDOM from "react-dom";
import { TodoFooter} from './TodoFooter'
import { TodoItem } from './TodoItem'
import { TodoModel } from './TodoModel'

import { Constants } from './Constants'
import * as Interfaces from "./Interfaces"
import IAppProps = Interfaces.IAppProps;
import IAppState = Interfaces.IAppState;

declare var Router: any;

export class TodoApp extends React.Component<IAppProps, IAppState> {

    constructor(props: IAppProps) {
        super(props);
        this.state = {
            nowShowing: Constants.ALL_TODOS,
            editing: null
        };
    }

    //public componentDidMount() {
    //    var setState = this.setState;
    //    // we will configure the Router here
    //    // our router is provided by the
    //    // director npm module
    //    // the router observes changes in the URL and 
    //    // triggers some component's event accordingly 
    //    var router = Router({
    //        '/': setState.bind(this, { nowShowing: Constants.ALL_TODOS }),
    //        '/active': setState.bind(this, { nowShowing: Constants.ACTIVE_TODOS }),
    //        '/completed': setState.bind(this, { nowShowing: Constants.COMPLETED_TODOS })
    //    });
    //    router.init('/');
    //}

    public handleNewTodoKeyDown(event) {
        if (event.keyCode !== Constants.ENTER_KEY) {
            return;
        }

        event.preventDefault();

        var input = ReactDOM.findDOMNode(this.refs["newField"]) as HTMLInputElement;
        var val = input.value.trim();

        if (val) {
            this.props.model.addTodo(val);
            input.value = '';
        }
    }

    public toggleAll(event) {
        var checked = event.target.checked;
        this.props.model.toggleAll(checked);
    }

    public toggle(todoToToggle) {
        this.props.model.toggle(todoToToggle);
    }

    public destroy(todo) {
        this.props.model.destroy(todo);
    }

    public edit(todo) {
        this.setState({ editing: todo.id });
    }

    public save(todoToSave, text) {
        this.props.model.save(todoToSave, text);
        this.setState({ editing: null });
    }

    public cancel() {
        this.setState({ editing: null });
    }

    public clearCompleted() {
        this.props.model.clearCompleted();
    }

    // the JSX syntax is quite intuitive but check out
    // https://facebook.github.io/react/docs/jsx-in-depth.html
    // if you need additional help
    public render() {
        var footer;
        var main;
        var todos = this.props.model.todos;

        var dahState = this.state;

        var shownTodos = todos.filter(todo => {
            switch (dahState.nowShowing) {
            case Constants.ACTIVE_TODOS:
                return !todo.completed;
            case Constants.COMPLETED_TODOS:
                return todo.completed;
            default:
                return true;
            }
        }, this);

        var todoItems = shownTodos.map(todo => <TodoItem
                                                   key={todo.id}
                                                   todo={todo}
                                                   onToggle={this.toggle.bind(this, todo)}
                                                   onDestroy={this.destroy.bind(this, todo)}
                                                   onEdit={this.edit.bind(this, todo)}
                                                   editing={this.state.editing === todo.id}
                                                   onSave={this.save.bind(this, todo)}
                                                   onCancel={e => this.cancel()}
                                               />, this);

        var activeTodoCount = todos.reduce((accum, todo) => todo.completed ? accum : accum + 1, 0);

        var completedCount = todos.length - activeTodoCount;

        if (activeTodoCount || completedCount) {
            footer =
                <TodoFooter
                    count={activeTodoCount}
                    completedCount={completedCount}
                    nowShowing={this.state.nowShowing}
                    onClearCompleted={e => this.clearCompleted()}
                />;
        }

        if (todos.length) {
            main = (
                <section className="main">
                    <input
                        className="toggle-all"
                        type="checkbox"
                        onChange={e => this.toggleAll(e)}
                        checked={activeTodoCount === 0}
                    />
                    <ul className="todo-list">
                        {todoItems}
                    </ul>
                </section>
            );
        }

        return (
            <div>
                <header className="header">
                    <h1>todos</h1>
                    <input
                        ref="newField"
                        className="new-todo"
                        placeholder="What needs to be done?"
                        onKeyDown={e => this.handleNewTodoKeyDown(e)}
                        autoFocus={true}
                    />
                </header>
                {main}
                {footer}
            </div>
        );
    }
}

var model = new TodoModel('react-todos');

export function initTodo(elementId: string) {
    function render() {
        ReactDOM.render(
            <TodoApp model={model} />,
            document.getElementById(elementId)
        );
    }

    model.subscribe(render);
    render();    
}