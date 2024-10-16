const initialState = {
  showAddInvoice: false
};

//Invoice Floating Action Button to Add Invoice Reducer
const invoiceReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_ADD_INVOICE':
        return {
            ...state,
            showAddInvoice: !state.showAddInvoice
        };
        default:
            return state;
    }
}

export default invoiceReducer;