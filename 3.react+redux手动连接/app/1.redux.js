import {createStore} from 'redux';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';

const counter = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}

const store = createStore(counter);

class Counter extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.value}</h1>
                <button onClick={this.props.onIncrement}>点击加1</button>
                <button onClick={this.props.onDecrement}>点击减1</button>
            </div>
        )
    }
}


const render = () => {
    console.log('render');
    ReactDOM.render(<Counter value={store.getState()} onIncrement={()=>store.dispatch({type:'INCREMENT'})} onDecrement={()=>store.dispatch({type:'DECREMENT'})}/>, document.querySelector('#app'));
}

store.subscribe(render);
render();