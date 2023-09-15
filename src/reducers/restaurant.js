const initialState = {
    restaurant: {
        _id: "",
        name: "",
        restaurantImg: "",
        categories: [],
        seats: 2,
        days: [],
        userId: "",
    },
    storConfirm: false,
    is_created: false,
}

const restaurntinfo = (state = initialState, action) => {
    switch (action.type) {
        case 'STORE_CONFIRM':
            return {
                ...state,
                storConfirm: action.storConfirm
            }
        case 'CREATE_CONFIRM':
            return {
                ...state,
                is_created: action.is_created
            }
        default:
            return state
    }
}

export default restaurntinfo;