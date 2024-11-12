export const Booking_Types = {
    ADD: 'ADD',
    UPDATE: 'UPDATE'
}

const BookingDetails = {
    AddDetails: (data) => async (dispatch) => {
        try {
            dispatch({
                type: Booking_Types.ADD,
                payload: data
            })
        } catch (error) {

        }
    },
    UpdateDetails: (data) => async (dispatch) => {
        try {
            dispatch({
                type: Booking_Types.UPDATE,
                payload: data
            })
        } catch (error) {

        }
    }
}

export default BookingDetails;