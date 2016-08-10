var expect = require('expect.js');
const todos = (state = [], action)=> {
    switch (action.type) {
        case 'ADD_TODO':
            return state.concat([{
                id: action.id,
                text: action.text,
                completed:false
            }]);
        case 'TOGGLE_TODO':
            return state.map(todo => {
                if(todo.id == action.id)
                    todo.completed = !todo.completed;
                return todo;
            })
        default:
            return state;
    }
}
const stateBefore = [{id: 1, text: 'javascript',completed:false}];
const action = {
    type: 'TOGGLE_TODO',
    id: 1
}
expect(
    todos(stateBefore, action)
).to.eql([{id: 1, text: 'javascript',completed:true}]);
console.log('passed');
