// reducer 纯函数，具体的action执行逻辑
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

// 模拟create store
const createStore = (reducer) => {
    let state;
    let listeners = [];

    const getState = () => state;

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    }

    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(item => item !== listener);
        }
    }

    dispatch({});

    return {getState, dispatch, subscribe};
}

const store = createStore(counter);

//把数据渲染到界面上
const render = () => {
    document.body.innerText = store.getState();
}

// 订阅状态变化事件，当状态变化时用监听函数
store.subscribe(render);
render();
var INCREASE_ACTION = {type: 'INCREMENT'};
document.addEventListener('click', function (e) {
    //触发一个Action
    store.dispatch(INCREASE_ACTION);
})
