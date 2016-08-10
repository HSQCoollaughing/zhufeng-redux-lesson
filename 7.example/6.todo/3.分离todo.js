var expect = require('expect.js');
const todo = (state,action) => {
  switch (action.type){
      case 'ADD_TODO':
          return {
              id:action.id,
              text:action.text,
              completed:false
          }
      case 'TOGGLE_TODO':
          if(state.id == action.id)
              state.completed = !state.completed;
          return state;
      default:
          return state;
  }
}
const todos = (state = [], action)=> {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined,action)
            ]
        case 'TOGGLE_TODO':
            return state.map(t => {
                return todo(t,action);
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
