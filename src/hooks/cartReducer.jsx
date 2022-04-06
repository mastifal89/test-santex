import { types } from "../types";

export const cartReducer = (state = {}, action) => {
    switch (action.type) {
        case types.addItemToCart:
            return {
                cart: action.payload
            }
        default:
            return state;
    }
}