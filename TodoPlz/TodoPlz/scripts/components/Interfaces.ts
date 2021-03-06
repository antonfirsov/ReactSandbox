﻿export interface ITodo {
    id: string;
    title: string;
    completed: boolean;
}

export interface ITodoItemProps {
    key: string;
    todo: ITodo;
    editing?: boolean;
    onSave: (val: any) => void;
    onDestroy: () => void;
    onEdit: () => void;
    onCancel: (event: any) => void;
    onToggle: () => void;
}

export interface ITodoItemState {
    editText:string;
}

export interface ITodoFooterProps {
    completedCount: number;
    onClearCompleted: any;
    nowShowing: string;
    count: number;
}

export interface ITodoModel {
    key: any;
    todos: ITodo[];
    onChanges: any[];

    subscribe(onChange);
    inform();
    addTodo(title: string);
    toggleAll(checked);
    toggle(todoToToggle);
    destroy(todo);
    save(todoToSave, text);
    clearCompleted();
}

export interface IAppProps {
    model: ITodoModel;
}

// Defines the interface of the state of the App component
export interface IAppState {
    editing?: string;
    nowShowing?: string;
}