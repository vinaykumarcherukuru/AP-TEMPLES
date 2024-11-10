export const Auth_Types = {
    SET_USER: 'SET_USER'
}

export const setUser = (data) => async (dispatch) => {
    try {
        dispatch({
            type: Auth_Types.SET_USER,
            payload: data
        })
    } catch (error) {

    }
}