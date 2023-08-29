import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    user: null,
    token: null,
    cards: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setCards: (state, action) => {
            state.cards = action.payload.cards;
        },
        setCard: (state, action) => {
            const updatedCards = state.cards.map((card) => {
                if(card._id === action.payload.card._id) return action.payload.card;
                return card;
            });
            state.cards = updatedCards;
        }
    }
})

export const { setLogin, setLogout, setCards, setCard} = authSlice.actions;
export default authSlice.reducer;