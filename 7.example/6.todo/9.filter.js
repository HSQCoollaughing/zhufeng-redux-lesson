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

const filter = (state = 'ALL',
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

const FilterLink = ({filter,current,children})=>{
    if(filter == current){
        return <span>{children}</span>
    }
    return (
        <a href="#"
           onClick={e=>{
             e.preventDefault();
             store.dispatch({
              type:'SET_FILTER',
              filter
             })
           }}
        >
            {children}
        </a>
    )
}
const getTodos = (todos,filter) => {
    switch(filter){
        case 'ALL':
            return todos;
        case 'ACTIVE':
            return todos.filter(t=>!t.completed);
        case 'COMPLETED':
            return todos.filter(t=>t.completed);
        default:
            return todos;
    }
}
class TodoApp extends React.Component{
    render(){
        var filter = this.props.filter;
        const todos = getTodos(this.props.todos,filter);
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
                    todos.map(todo=>
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
                <p>
                    show:
                    {' '}
                    <FilterLink current={filter} filter="ALL">全部</FilterLink>
                    {' '}
                    <FilterLink current={filter} filter="ACTIVE">未完成</FilterLink>
                    {' '}
                    <FilterLink current={filter} filter="COMPLETED">已完成</FilterLink>
                </p>

            </div>
        )
    }
}
const render = () => {
    ReactDOM.render(
        <TodoApp {...store.getState()}/>,
        document.getElementById('app')
    );
}
store.subscribe(render);
render();