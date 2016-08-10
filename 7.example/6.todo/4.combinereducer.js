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

const todoApp = (state={},action)=>{
    return {
        todos:todos(state.todos,action),
        filter:filter(state.filter,action)
    }
}

//import {createStore} from 'redux';
var createStore = require('redux').createStore;
const store = createStore(todoApp);
console.log('init state');
console.log(store.getState());
console.log('-----------');
store.dispatch({
    type:'SET_FILTER',
    filter:'active'
});
console.log(store.getState());
