var expect = require('expect.js');
function counter(state, action) {
    if(typeof state == 'undefined'){
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

var Redux  = require('redux');
var createStore = Redux.createStore;
const store = createStore(counter);
//1.获取当前状态
console.log(store.getState());
//2.发送action
store.dispatch({type:'INCREMENT'});
//3.获取当前状态
console.log(store.getState());
function render(){
    console.log(store.getState());
}
store.subscribe(render);

setInterval(()=>store.dispatch({type:'INCREMENT'}),1000);