const counter = (state = 0, action) => {
    if (typeof action == undefined) {
        return 0;
    }
    if (action.type === 'INCREMENT') {
        return state + 1;
    } else if (action.type === 'DECREMENT') {
        return state - 1;
    } else {
        return state;
    }
}

console.log(counter(0, {type: 'INCREMENT'}));
console.log(counter(0, {type: 'DECREMENT'}));
