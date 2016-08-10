var expect = require('expect.js');
const todos = (state = [], action)=> {
    switch (action.type) {
        case 'ADD_TODO':
            return state.concat([{
                id: action.id,
                text: action.text,
                completed:false
            }]);
        default:
            return state;
    }
}
const stateBefore = [];
const action = {
    type: 'ADD_TODO',
    id: 1,
    text: 'javascript'
}
expect(
    todos(stateBefore, action)
).to.eql([{id: 1, text: 'javascript',completed:false}]);
console.log('passed');
