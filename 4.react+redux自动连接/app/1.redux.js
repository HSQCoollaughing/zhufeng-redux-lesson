import React,{Component,PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
//导入自动连接工具
import {Provider,connect} from 'react-redux';
//计时器组件
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
//对类型进行校验
Counter.propTypes = {
    value: PropTypes.number.isRequired,
    onIncrease: PropTypes.func.isRequired,
    onDecrease: PropTypes.func.isRequired
}
//增加的action
const increaseAction = {type: 'increase'};
//减少的action
const decreaseAction = {type: 'decrease'};

//reducer
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
//把状态映射到属性上 参数是store.getState()属性,作为组件的初始状态
function mapStateToProps(state) {
    return {
        value: state.count
    }
}
//把dispatch映射到属性上
function mapDispatchToProps(dispatch) {
    return {
        onIncrease: () => dispatch({type: 'increase'}),
        onDecrease: () => dispatch({type: 'decrease'})
    }
}

let App = connect(
    mapStateToProps,//把状态映射到属性上
    mapDispatchToProps //把dispatch映射到属性上
)(Counter);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.querySelector('#app')
);