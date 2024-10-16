const initialState = {
    showAddProduct: false
};

//Floating Action Button Product Reducer
const productReducer = (state = initialState, action) => {
switch (action.type) {
    case 'TOGGLE_ADD_PRODUCT':
        return {
            ...state,
            showAddProduct: !state.showAddProduct
        };
        default:
            return state;
    }
};

export default productReducer;
