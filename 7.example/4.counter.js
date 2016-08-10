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
console.log(createStore);
const store = createStore(counter);
//1.获取当前状态
console.log(store.getState());
//2.发送action
store.dispatch({type:'INCREMENT'});
//3.获取当前状态
console.log(store.getState());
//https://www.npmjs.com/package/browserify
//browserify main.js > bundle.js
function render(){
   document.body.innerText = store.getState();
}
store.subscribe(render);
document.addEventListener('click',()=>{
    store.dispatch({type:'INCREMENT'})
});