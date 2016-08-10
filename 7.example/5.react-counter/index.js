function counter(state, action) {
    if (typeof state == 'undefined') {
        return 0;
    }
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}
import React from 'react';
import ReactDOM from 'react-dom'
import {createStore} from 'redux';
const store = createStore(counter);

const Counter = ({
    value,
    onIncrement,
    onDecrement})=>(
    <div>
        <h1>{value}</h1>
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
    </div>
)
function render() {
    ReactDOM.render(<Counter
        value={store.getState()}
        onIncrement={()=>store.dispatch({type:'INCREMENT'})}
        onDecrement={()=>store.dispatch({type:'DECREMENT'})}
    />, document.getElementById('app'))
}
store.subscribe(render);

render();