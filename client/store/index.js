import {createSlice, configureStore} from "@reduxjs/toolkit";
import { getDefaultMiddleware } from "@reduxjs/toolkit";


const initialState ={
    signer:null,
    contract:null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        connect(state, data){
            return {
                signer: data.payload.signer,
                contract: data.payload.contract
            }
        }
    }
});

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    middleware: getDefaultMiddleware => 
    getDefaultMiddleware({serializableCheck:false})
});

export const authActions = authSlice.actions;

export default store;