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
    storeConfirm: false,
    is_created: false,
}

const restaurantinfo = (state = initialState, action) => {
    console.log("---ation retaurnt")
    console.log(action);
    switch (action.type) {
        case 'STORE_CONFIRM':
            return {
                ...state,
                storeConfirm: action.storeConfirm
            }
        case 'CREATE_CONFIRM':
            return {
                ...state,
                is_created: action.is_created
            }
        case 'STORE_RESTAURANT':
            return {
                ...state,
                restaurant: action.restaurant
            }
        default:
            return state
    }
}

export default restaurantinfo;