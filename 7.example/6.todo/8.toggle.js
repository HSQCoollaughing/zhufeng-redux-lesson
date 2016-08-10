var expect = require('expect.js');
const todo = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            }
        case 'TOGGLE_TODO':
            if (state.id == action.id)
                state.completed = !state.completed;
            return state;
        default:
            return state;
    }
}
const todos = (state = [], action)=> {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
            ]
        case 'TOGGLE_TODO':
            return state.map(t => {
                return todo(t, action);
            })
        default:
            return state;
    }
}

const filter = (state = 'SHOW_ALL',
                action)=> {
    switch (action.type) {
        case 'SET_FILTER':
            return action.filter;
        default:
            return state;
    }
}
import React from 'react';
import ReactDOM from 'react-dom';
var Redux = require('redux');
var createStore = Redux.createStore;
var combineReducers = Redux.combineReducers;

const todoApp = combineReducers({
    todos,
    filter
})

const store = createStore(todoApp);
let nextId = 1;
class TodoApp extends React.Component{
    render(){
        return (
            <div>
                <input type="text" ref={text=>{
                   this.input = text;
                }}/>
                <button onClick={() => {
                    store.dispatch({
                      type:'ADD_TODO',
                      text:this.input.value,
                      id:nextId++
                    })
                    this.input.value = '';
                }}>
                    增加Todo
                </button>
                {
                    this.props.todos.map(todo=>
                        <li
                            onClick={()=>{
                               store.dispatch({
                                 type:'TOGGLE_TODO',
                                 id:todo.id
                               })
                            }}
                            style={{
                              textDecoration:todo.completed?'line-through':'none'

                            }}
                            key={todo.id}>{todo.text}</li>)
                }
            </div>
        )
    }
}
const render = () => {
    ReactDOM.render(
        <TodoApp todos={store.getState().todos}/>,
        document.getElementById('app')
    );
}
store.subscribe(render);
render();