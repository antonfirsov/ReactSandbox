﻿import { Utils } from './Utils';

import { Constants } from './Constants';
import * as Interfaces from "./Interfaces"
import ITodoModel = Interfaces.ITodoModel;
import ITodo = Interfaces.ITodo;

export class TodoModel implements ITodoModel {

    key: any;
    todos: ITodo[];
    onChanges: any[];

    constructor(key) {
        this.key = key;
        this.todos = Utils.store(key);
        this.onChanges = [];
    }

    subscribe(onChange) {
        this.onChanges.push(onChange);
    }

    inform() {
        Utils.store(this.key, this.todos);
        this.onChanges.forEach(cb => { cb(); });
    }

    addTodo(title: string) {
        this.todos = this.todos.concat({
            id: Utils.uuid(),
            title: title,
            completed: false
        });

        this.inform();
    }

    toggleAll(checked) {
        this.todos = this.todos.map<ITodo>((todo: ITodo) => {
            return Utils.extend(
                {}, todo, { completed: checked }
            );
        });

        this.inform();
    }

    toggle(todoToToggle) {
        this.todos = this.todos.map<ITodo>((todo: ITodo) => {
            return todo !== todoToToggle ?
                todo :
                Utils.extend(
                    {}, todo, { completed: !todo.completed }
                );
        });

        this.inform();
    }

    destroy(todo) {
        this.todos = this.todos.filter(candidate => candidate !== todo);

        this.inform();
    }

    save(todoToSave, text) {
        this.todos = this.todos.map(todo => todo !== todoToSave ? todo : Utils.extend({}, todo, { title: text }));

        this.inform();
    }

    clearCompleted() {
        this.todos = this.todos.filter(todo => !todo.completed);

        this.inform();
    }

}
