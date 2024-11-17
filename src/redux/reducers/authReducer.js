const initialState = {
    isAuthenticated: false,
    users: [
        {
            uid: 1,
            candidatename: 'Ashok Bendalam',
            party: 'TDP',
            constituency: 'Chirala',
            role: 'mla',
            password: '12345'
        },
        {
            uid: 2,
            candidatename: 'Julakanti Brahmananda Reddy',
            party: 'Telugu Desam',
            constituency: 'Macherla',
            role: 'mp',
            password: '12345'
        },
        {
            uid: 3,
            candidatename: 'Temple Eo',
            role: 'eo',
            password: '12345'
        }
    ]
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN":
            return action.payload;
        case "LOGOUT":
            return initialState;
        default:
            return state;
    }
}

export default authReducer