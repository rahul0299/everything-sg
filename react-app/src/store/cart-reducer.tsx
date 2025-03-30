export interface CartContextState {
    items: string[],
    isOpen: boolean,
}

export interface Action {
    type: string,
    payload: string
}

const initialState: CartContextState = {
    items: [],
    isOpen: false,
}


const reducer = (state: CartContextState, action: Action): CartContextState => {
    switch (action.type) {
        case "ADD_TO_CART": {
            console.log("Adding to cart", state, action.payload);
            return {...state, items: [...state.items, action.payload]};
        }

        case "REMOVE_FROM_CART": {
            console.log("Removed from cart", state, action.payload);
            return {...state, items: state.items.filter(item => item !== action.payload)};
        }

        case "SHOW_CART": {
            console.log("Open cart", state, action);
            return {...state, isOpen: true};
        }

        case "HIDE_CART": {
            console.log("Closed cart", state, action);
            return {...state, isOpen: false};
        }
    }

    return state;
}

export {reducer, initialState};