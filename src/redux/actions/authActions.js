export const Auth_Types = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT'
}

export const login = (data) => async (dispatch) => {
    try {
        dispatch({
            type: Auth_Types.LOGIN,
            payload: data
        })
    } catch (error) {

    }
}

export const logout = (data) => async (dispatch) => {
    try {
        dispatch({
            type: Auth_Types.LOGOUT,
            payload: data
        })
    } catch (error) {

    }
}