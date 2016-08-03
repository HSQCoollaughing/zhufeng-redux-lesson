import React,{Component,PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';

import {Provider,connect} from 'react-redux';

class Counter extends Component {
    render() {
        const {value,onIncrease,onDecrease} = this.props;
        return (
            <div>
                <span>{value}</span>
                <button onClick={onIncrease}>加1</button>
                <button onClick={onDecrease}>减1</button>
            </div>
        )
    }
}

Counter.propTypes = {
    value: PropTypes.number.isRequired,
    onIncrease: PropTypes.func.isRequired,
    onDecrease: PropTypes.func.isRequired
}

const increaseAction = {type: 'increase'};
const decreaseAction = {type: 'decrease'};

function counter(state = {count: 0}, action) {
    let count = state.count;
    switch (action.type) {
        case 'increase':
            return {count: count + 1};
        case 'decrease':
            return {count: count - 1};
        default:
            return state;
    }
}

let store = createStore(counter);

function mapStateToProps(state) {
    return {
        value: state.count
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onIncrease: () => dispatch({type: 'increase'}),
        onDecrease: () => dispatch({type: 'decrease'})
    }
}

let App = connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.querySelector('#app')
);