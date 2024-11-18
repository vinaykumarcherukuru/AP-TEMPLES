const initialState = [];

const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, action.payload];
        case "UPDATE":
            const index = state.findIndex(x => x.uuid === action.payload.uuid);
            state[index].members = action.payload.members
            return state;
        default:
            return state;
    }
}

export default bookingReducer