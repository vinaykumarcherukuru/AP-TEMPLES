const initialState = [];

const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, action.payload];
        case "UPDATE":
            return action.payload;
        default:
            return state;
    }
}

export default bookingReducer