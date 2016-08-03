import { createStore } from 'redux';
import ReactDOM from 'react-dom';
import React from 'react';
import reducer from './reducer';

let store = createStore(reducer)

class App extends React.Component {
    render() {
        return (
            <table>
                <tbody>
                    <tr>
                        <td>体力</td>
                        <td>{this.props.health}</td>
                        <td>
                            <buton onClick={()=>store.dispatch({type:'ADD_HEALTH',amount:10})}>增加体力</buton>
                        </td>
                    </tr>
                    <tr>
                        <td>魔力</td>
                        <td>{this.props.magic}</td>
                        <td>
                            <buton onClick={()=>store.dispatch({type:'ADD_MAGIC',amount:20})}>增加魔力</buton>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }
}
function render() {
    ReactDOM.render(<App health={store.getState().health}
                         magic={store.getState().magic}></App>, document.querySelector('#app'));
}

store.subscribe(render);

store.dispatch({
    type: 'ADD_HEALTH',
    amount: 10
})
store.dispatch({
    type: 'ADD_MAGIC',
    amount: 20
})




