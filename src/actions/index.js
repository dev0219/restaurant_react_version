let incrementId = 0;

export const addItems = item => ({
    type: 'ADD_ITEMS',
    id: incrementId++,
    text: item.text
});

export const updateItem = id => ({
    type: 'UPDATE_ITEM',
    id
});

export const addUser = (payload) => ({
    type: 'LOGIN_USER',
    userId: payload.userId,
    userRole: payload.userRole
});

export const handleStoreConfirm = (payload) => ({
    type: 'STORE_CONFIRM',
    storConfirm: payload
});

export const handleCreateConfirm = (payload) => ({
    type: 'CREATE_CONFIRM',
    is_created: payload
});

export const handleStoreRestaurantInfo = (payload) => ({
    type: 'STORE_RESTAURANT',
    restaurant: payload
});
