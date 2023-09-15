const initialState = {
    userId: null,
    userRole: null,
}

const userinfo = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return {
                ...state,
                userId: action.userId,
                userRole: action.userRole
            }
        default:
            return state
    }
}

export default userinfo;