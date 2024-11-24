// const initialState = [{ "temple": "Srikalahasthi", "darshanamDate": "2024-11-04T18:30:00.000Z", "isAccommodation": "Y", "accommodationDate": "2024-11-03T18:30:00.000Z", "members": [{ "name": "vinay", "age": "23", "aadhar": "234234234234", "gender": "M", "mobile": "5555523232" }], "uuid": "fdee1614-28df-4979-a804-acd94ab8197a", "candidateName": "Ashok Bendalam", "party": "TDP", "constituency": "Chirala", "role": "mla", "bookingDate": "23-11-2024 03:17:06 PM" }, { "temple": "Vijayawada", "darshanamDate": "2024-11-20T18:30:00.000Z", "isAccommodation": "Y", "accommodationDate": "2024-11-19T18:30:00.000Z", "members": [{ "name": "vk", "age": "12", "gender": "M", "mobile": "5555523232", "aadhar": "234234234234" }, { "name": "cwew", "age": "23", "aadhar": "343423432423", "gender": "F", "mobile": "2323232323" }, { "name": "ss", "age": "22", "aadhar": "323234234234", "gender": "O", "mobile": "3243243242" }], "uuid": "b4878c45-bda3-4cb6-bedf-80ffaacaf3ba", "candidateName": "Ashok Bendalam", "party": "TDP", "constituency": "Chirala", "role": "mla", "bookingDate": "23-11-2024 03:23:51 PM" }, { "temple": "Mahanandi", "darshanamDate": "2024-11-04T18:30:00.000Z", "isAccommodation": "Y", "accommodationDate": "2024-11-03T18:30:00.000Z", "members": [{ "name": "fasf", "age": "23", "aadhar": "234234234234", "gender": "M", "mobile": "5555523232" }], "uuid": "ccf67d23-d3bf-410f-bc43-bf5ade78efc3", "candidateName": "Julakanti Brahmananda Reddy", "party": "Telugu Desam", "constituency": "Macherla", "role": "mp", "bookingDate": "23-11-2024 03:47:13 PM" }];
const initialState = [];

const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD":
            return [action.payload, ...state];
        case "UPDATE":
            const index = state.findIndex(x => x.uuid === action.payload.uuid);
            state[index].members = action.payload.members
            return state;
        default:
            return state;
    }
}

export default bookingReducer