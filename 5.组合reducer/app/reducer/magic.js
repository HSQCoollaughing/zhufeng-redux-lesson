export default function magic(state = 100, action) {
    switch (action.type) {
        case 'ADD_MAGIC':
            return state + action.amount;
        default:
            return state;
    }
}
