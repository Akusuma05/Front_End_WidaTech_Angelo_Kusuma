import getInvoiceReducer from "./getInvoice";
import getProductReducer from "./getProduct";
import createProductReducer from "./createProducts";
import createInvoiceReducer from "./createInvoice";
import sidebarReducer from "./sideBarReducer"
import fabInvoice from "./fabInvoice";
import fabProduct from "./fabProduct";
import { combineReducers } from "@reduxjs/toolkit";

//Combine Reducers For Store Reducer
const rootReducers = combineReducers({
    getInvoices: getInvoiceReducer,
    getProducts: getProductReducer,
    createProducts: createProductReducer,
    createInvoice: createInvoiceReducer,
    sidebar: sidebarReducer,
    invoice: fabInvoice,
    product: fabProduct
})

export default rootReducers;