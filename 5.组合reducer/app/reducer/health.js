export default function health(state = 100, action) {
    switch (action.type) {
        case 'ADD_HEALTH':
            return state + action.amount;
        default:
            return state;
    }
}
